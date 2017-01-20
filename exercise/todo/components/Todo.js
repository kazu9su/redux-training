import React from 'react';

const Todo = ({onClick, completed, test}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-though' : 'none';
    }}
  >
    {text}
  </li>
);


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
