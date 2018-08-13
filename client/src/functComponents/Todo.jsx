import React, { Component } from "react";
import PropTypes from "prop-types";

import Auxiliar from "../hoc/auxiliar";
import "./todoStyle.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroupItem } from "reactstrap";

class Todo extends Component {
  handleInCommingClick = () => {
    const clickedToDo = this.props.currentTodo;
    this.props.clicked(clickedToDo);
  };

  render() {
    return (
      <Auxiliar>
        <ListGroupItem onClick={this.handleInCommingClick} className="TodoItem">
          {this.props.text}
        </ListGroupItem>
      </Auxiliar>
    );
  }
}

Todo.propTypes = {
  text: PropTypes.string,
  currentTodo: PropTypes.object
};

export default Todo;
