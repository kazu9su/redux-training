import assert from 'power-assert'
import freeze from 'deep-freeze'
import rewire from 'rewire'

const actions = rewire('../actions')
const reducers = rewire('../reducers')

describe('selectedSubreddit reducer', ()=> {
  const selectedSubreddit = reducers.__get__('selectedSubreddit')
  it('return initial state', () => {
    assert.deepStrictEqual(selectedSubreddit(undefined, {}), 'reactjs')
  })

  it('can handle select subreddit', () => {
    assert.deepStrictEqual(selectedSubreddit(undefined, {
      type: 'SELECT_SUBREDDIT',
      subreddit: 1,
    }), 1)
  })
})

describe('posts reducer', () => {
  const posts = reducers.__get__('posts')
  it('return initial state', () => {
    assert.deepStrictEqual(posts(undefined, {}), {
      isFetching: false,
      didInvalidate: false,
      items: [],
    })
  })

  it ('can handle invalidate subreddit', () => {
    assert.deepStrictEqual(posts(undefined, {
      type: 'INVALIDATE_SUBREDDIT',
    }), {
      isFetching: false,
      didInvalidate: true,
      items: []
    })
  })

  it('can handle request posts', () => {
    assert.deepStrictEqual(posts(undefined, {
      type: 'REQUEST_POSTS',
    }), {
      isFetching: true,
      didInvalidate: false,
      items: []
    })
  })

  it('can handle receive posts', () => {
    assert.deepStrictEqual(posts(undefined, {
      type: 'RECEIVE_POSTS',
      posts: ['hoge'],
      receivedAt: 1111,
    }), {
      isFetching: false,
      didInvalidate: false,
      items: ['hoge'],
      lastupdated: 1111
    })
  })
})

describe('postsBySubreddit', () => {
  const postsBySubreddit = reducers.__get__('postsBySubreddit')
  it('return initial state', () => {
    assert.deepStrictEqual(postsBySubreddit(undefined, {}), {})
  })

  it('can handle invalidate subreddit', () => {
    assert.deepStrictEqual(postsBySubreddit(undefined, {
      type: 'INVALIDATE_SUBREDDIT',
      subreddit: 1,
    }), {
      1: {
        didInvalidate: true,
        isFetching: false,
        items: [],
      }
    })
  })

  it('can handle receive subreddit', () => {
    assert.deepStrictEqual(postsBySubreddit(undefined, {
      type: 'RECEIVE_POSTS',
      subreddit: 1,
      posts: ['hoge'],
      receivedAt: 1111,
    }), {
      1: {
        didInvalidate: false,
        isFetching: false,
        items: ['hoge'],
        lastupdated: 1111,
      }
    })
  })

  it('can handle request[] subreddit', () => {
    assert.deepStrictEqual(postsBySubreddit(undefined, {
      type: 'REQUEST_POSTS',
      subreddit: 1,
    }), {
      1: {
        didInvalidate: false,
        isFetching: true,
        items: [],
      }
    })
  })
})
