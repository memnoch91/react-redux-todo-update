import React, { Component } from "react";
import propTypes from "prop-types";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Label, Button } from "reactstrap";

class EditTodo extends Component {
  state = {
    loadedTodo: null,
    newTodo: null,
    updateTodo: ""
  };

  handleEditTodo = e => {
    let updateTodo = this.state.updateTodo;
    if (!updateTodo) {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        updateTodo: this.props.currentState.todoText
      });
    }
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
          <h3>{this.state.updateTodo}</h3>
          <Label for="editTodo">
            <Input
              type="text"
              id="editTodo"
              placeholder="Edit todo here"
              name="updateTodo"
              onChange={this.handleEditTodo}
              value={this.state.updateTodo}
            />
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
