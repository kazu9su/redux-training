import * as functions from '../src/functions'

describe('functions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
        type: 'ADD_TODO',
        text
    }

    expect(functions.addTodo(text)).toEqual(expectedAction)
  })
})
