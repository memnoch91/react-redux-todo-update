import React, { Component } from "react";
import propTypes from "prop-types";
//import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Label, Button } from "reactstrap";

import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../actions/index";

class EditTodo extends Component {
  state = {
    loadedTodo: null,
    newTodo: null,
    updateTodo: "",
    completedStatus: false
  };

  handleEditTodoText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditTodoCoplete = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  deleteTodo = event => {
    event.preventDefault();
    let incTodoId = this.props.currentState._id;
    this.props.onDeleteTodo(incTodoId);
    /*
    axios
      .delete(`/api/todos/delete/${incTodoId}`)
      .then(res => {
        console.log("respone", res);
      })
      .catch(err => console.log(err));
      */
  };

  handleUpdateTodo = event => {
    event.preventDefault();
    let incTodoId = this.props.currentState._id;
    let incTodoText = this.state.updateTodo;
    let incTodoComplete = this.state.completedStatus;
    this.props.onSaveTodo(incTodoId, incTodoText, incTodoComplete);
  };

  render() {
    let currentTodo = this.props.currentState;
    let post = <p>Please Select a todo</p>;
    if (currentTodo) {
      post = (
        <div className="editTodo">
          <h3>Selected todo: {currentTodo.todoText}</h3>
          <h3>Edit Here: {this.state.updateTodo}</h3>
          <Label for="editTodo">
            <Input
              type="text"
              id="editTodo"
              placeholder="Edit todo here"
              name="updateTodo"
              onChange={this.handleEditTodoText}
              value={this.state.updateTodo}
            />
          </Label>
          <br />
          <Label>
            Toggle Complete: <br />
            <input
              type="checkbox"
              name="completedStatus"
              onChange={this.handleEditTodoCoplete}
            />
          </Label>

          <div>
            <Button color="primary" onClick={this.handleUpdateTodo}>
              Save
            </Button>
            <Button color="warning" onClick={this.deleteTodo}>
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

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTodo: id => {
      dispatch(deleteTodo(id));
    },
    onSaveTodo: (id, todoText, todoComplete) => {
      dispatch(updateTodo(id, todoText, todoComplete));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditTodo);

/*
  handleDeleteEvent = evt => {
    this.deleteTodo(evt);
    const selectedTodo = this.props.currentState;
    this.props.handleDeleteTodo(selectedTodo);
  };
  */
