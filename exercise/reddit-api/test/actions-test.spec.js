import assert from 'power-assert'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import rewire from 'rewire'
import mockdate from 'mockdate'
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const actions = rewire('../actions')

describe('selectSubreddit', () => {
  it('should return select_subreddit action', () => {
    assert.deepStrictEqual(actions.selectSubreddit(1), {
      type: 'SELECT_SUBREDDIT',
      subreddit: 1,
    })
  })
})

describe('invalidateSubreddit', () => {
  it('should return request invalidateSubreddit action', () => {
    assert.deepStrictEqual(actions.invalidateSubreddit(1), {
      type: 'INVALIDATE_SUBREDDIT',
      subreddit: 1,
    })
  })
})

describe('requestPosts', () => {
  it('should return request posts action', () => {
    assert.deepStrictEqual(actions.__get__('requestPosts')(1), {
      type: 'REQUEST_POSTS',
      subreddit: 1,
    })
  })
})

describe('receivePosts', () => {
  it ('should return receive posts action', () => {
    mockdate.set('1/1/2000')
    assert.deepStrictEqual(actions.__get__('receivePosts')(1, {
        data: {
          childNodes: [{data: 'hoge'}]
        }
      }), {
      type: 'RECEIVE_POSTS',
      subreddit: 1,
      posts: ['hoge'],
      receivedAt: Date.now()
    })
  })
})

describe('fetchPosts', () => {
  it('should return fetch func', () => {
    mockdate.set('1/1/2000')
    fetchMock.mock('https://www.redit.com/r/1.json', {
      data: {
        childNodes: [],
      }
    })
    const store = mockStore()

    assert(typeof actions.__get__('fetchPosts')(1) === 'function')

    store.dispatch(actions.__get__('fetchPosts')(1)).then(() => {
      assert.deepStrictEqual(store.getActions(), [
        {
          type: 'REQUEST_POSTS',
          subreddit: 1,
        },
        {
          type: 'RECEIVE_POSTS',
          subreddit: 1,
          posts: [],
          receivedAt: Date.now()
        }
      ])
    })
  })
})

describe('shouldFetchPosts', () => {
  const shouldFetchPosts = actions.__get__('shouldFetchPosts')
  it('should return true when subreddit does not exist', () => {
    assert(shouldFetchPosts({
      postsBySubreddit: {},
    }, 1) === true)
  })

  it('should return false when posts exists and is fetching', () => {
    assert(shouldFetchPosts({
      postsBySubreddit: {
        1: {
          isFetching: true,
          didInvalidate: true,
        }
      }
    }, 1) === false)
  })

  it('should return didInvalidate when posts exists and is not fetching', () => {
    assert(shouldFetchPosts({
      postsBySubreddit: {
        1: {
          isFetching: false,
          didInvalidate: false,
        }
      }
    }, 1) === false)
  })
})

describe('fetchPostsIfNeeded', () => {
  it('should dispatch fetchPosts if needed', () => {
    const store = mockStore({
      postsBySubreddit: {}
    })
    mockdate.set('1/1/2000')
    fetchMock.mock('https://www.redit.com/r/2.json', {
      data: {
        childNodes: [{
          data: 'hoge'
        }],
      }
    })

    store.dispatch(actions.fetchPostsIfNeeded(2)).then(() => [
      assert.deepStrictEqual(store.getActions(), [{
        type: 'REQUEST_POSTS',
        subreddit: 2,
      }, {
        type: 'RECEIVE_POSTS',
        subreddit: 2,
        posts: ['hoge'],
        receivedAt: Date.now(),
      }])
    ])
  })
})

