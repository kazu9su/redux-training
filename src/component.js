import React, { PropTypes, Component } from 'react'

class TodoTextInput extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className='Header'>
        <h1>todos</h1>
        <TodoTextInput newTodo={true}
        onSave={this.handleSave.bind(this)}
        placeholder='What needs to be done?' />
      </header>
    )
  }
}

Header.props = {
  addTodo: PropTypes.func.isRequired
}

export default Header
