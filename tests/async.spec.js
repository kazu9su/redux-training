import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/async'
import * as types from '../src/constants/ActionTypes'
import nock from 'nock'
import expect from 'expect'


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it ('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://example.com/')
      .get('/todos')
      .reply(200, { body: {todos: ['do something']} })

    const expectedActions = [
      {type: types.FETCH_TODOS_REQUEST},
      {type: types.FETCH_TODOS_SUCCESS, body: {todos: ['do something']}}
    ]

    const store = mockStore({todos: []})

    return store.dispatch(actions.fetchTodos())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
