import React, { Component } from "react";

import Todo from "./functComponents/Todo";
import EditTodo from "./statefulComponents/EditTodo";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Input, Label, ListGroup, Button } from "reactstrap";

import axios from "axios";

class App extends Component {
  state = {
    todos: [],
    clickedTodo: null
  };

  componentDidMount() {
    axios.get("/api/todos/get").then(res => {
      this.setState({
        todos: res.data,
        clickedTodo: res.data[0]
      });
      //console.log("app", res.data[0]);
    });
  }

  handleTodoClicked = todo => {
    this.setState({
      clickedTodo: todo
    });
  };

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
          />
          <Button color="secondary">Add todo</Button>
        </Form>
        <ListGroup>{todos}</ListGroup>
        <EditTodo currentState={this.state.clickedTodo} />
      </Container>
    );
  }
}

export default App;
