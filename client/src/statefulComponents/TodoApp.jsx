import React, { Component } from "react";

import Todo from "../functComponents/Todo";
import EditTodo from "./EditTodo";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Input, Label, ListGroup, Button } from "reactstrap";

import axios from "axios";
import { connect } from "react-redux";
import { getTodos } from "../actions/index";

class TodoApp extends Component {
  state = {
    todos: [],
    clickedTodo: null,
    deletedTodos: null,
    toBeAdded: null
  };

  componentDidMount() {
    /*
    axios.get("/api/todos/get").then(res => {
      this.setState({
        todos: res.data,
        clickedTodo: res.data[0]
      });
      console.log("compDidMount", this.props.tds);
    });
    */

    const test = this.props.getTodosFromDb();
    console.log("test", test);
  }

  getTodoTextFromInput = event => {
    let textFromInput = event.target.value;
    this.setState({ toBeAdded: textFromInput });
    //console.log(event.target.value);
  };

  handleTodoClicked = todo => {
    this.setState({
      clickedTodo: todo
    });
  };

  handleDeleteTodo = todo => {
    this.setState({
      deletedTodos: todo
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      axios.get("/api/todos/get").then(res => {
        this.setState({
          todos: res.data
        });
      });
    }
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <Todo
          key={todo._id}
          currentTodo={todo}
          text={todo.todoText}
          clicked={this.handleTodoClicked}
        />
      );
    });

    return (
      <Container>
        <Form>
          <Label for="addTodo">New task!</Label>
          <Input
            type="text"
            name="todo"
            id="addTodo"
            placeholder="insert todo here"
            onChange={this.getTodoTextFromInput}
          />
          <Button color="secondary">Add todo</Button>
        </Form>
        <ListGroup>{todos}</ListGroup>
        <EditTodo
          currentState={this.state.clickedTodo}
          handleDeleteTodo={this.handleDeleteTodo}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    tds: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTodosFromDb: getTodos(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);
