import React, { Component } from "react";
import propTypes from "prop-types";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Label, Button } from "reactstrap";

class EditTodo extends Component {
  state = {
    loadedTodo: null,
    newTodo: null
  };

  addTodo = event => {
    event.preventDefault();
  };

  deleteTodo = event => {
    event.preventDefault();
    let incTodo = this.props.currentState._id;
    axios
      .delete(`/api/todos/delete/${incTodo}`)
      .then(res => {
        console.log("respone", res);
      })
      .catch(err => console.log(err));
  };

  handleDeleteEvent = evt => {
    this.deleteTodo(evt);
    const selectedTodo = this.props.currentState;
    this.props.handleDeleteTodo(selectedTodo);
  };

  render() {
    let currentTodo = this.props.currentState;
    let post = <p>Please Select a todo</p>;
    if (currentTodo) {
      post = (
        <div className="editTodo">
          <h3>{currentTodo.todoText}</h3>
          <Label for="editTodo">
            <Input type="text" id="editTodo" placeholder="Edit todo here" />
          </Label>
          <div>
            <Button color="primary">Save</Button>
            <Button color="warning" onClick={this.handleDeleteEvent.bind(this)}>
              Delete
            </Button>
          </div>
        </div>
      );
    }
    return post;
  }
}

EditTodo.propTypes = {
  todoText: propTypes.string
};

/*
  componentDidUpdate() {
    const currentId = this.props.currentState._id;
    //console.log(this.state.loadedTodo);

    if (!this.state.loadedTodo) {
      axios.get(`api/todos/get/${currentId}`).then(res => {
        console.log("axios", res.data);

        this.setState({ loadedTodo: res.data });
      });
    }
  }
  */

export default EditTodo;
