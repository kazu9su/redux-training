import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './basic_reducers'
import App from './components/App'
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './constants/ActionTypes'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

