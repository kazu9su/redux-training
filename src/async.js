import fetch from 'isomorphic-fetch';
import * as types from './constants/ActionTypes'


function fetchTodosRequest() {
  return {
    type: types.FETCH_TODOS_REQUEST,
  }
}

function fetchTodosSuccess(body) {
  return {
    type: types.FETCH_TODOS_SUCCESS,
    body
  }
}

function fetchTodosFailure(ex) {
  return {
    type: types.FETCH_TODOS_FAILURE,
    ex
  }
}

export function fetchTodos() {
  return dispatch => {
    dispatch(fetchTodosRequest())
    return fetch('http://example.com/todos')
      .then(res => res.json())
      .then(json => dispatch(fetchTodosSuccess(json.body)))
      .catch(ex => dispatch(fetchTodosFailure(ex)))
  }
}
