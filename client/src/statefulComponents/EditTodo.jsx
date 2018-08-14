import React, { Component } from "react";
import propTypes from "prop-types";
//import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Label, Button } from "reactstrap";

import { connect } from "react-redux";
import { deleteTodo } from "../actions/index";

class EditTodo extends Component {
  state = {
    loadedTodo: null,
    newTodo: null,
    updateTodo: ""
  };

  handleEditTodo = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteTodo = event => {
    event.preventDefault();
    let incTodoId = this.props.currentState._id;
    //debugger;
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
          <h3>Selected todo: {currentTodo.todoText}</h3>
          <h3>Edit Here: {this.state.updateTodo}</h3>
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
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditTodo);
