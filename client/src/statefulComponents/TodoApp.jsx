import React, { Component } from "react";

import Todo from "../functComponents/Todo";
import EditTodo from "./EditTodo";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Input, Label, ListGroup, Button } from "reactstrap";

//import axios from "axios";
import { connect } from "react-redux";
import { getTodos, addTodo } from "../actions/index";

class TodoApp extends Component {
  state = {
    todos: [],
    clickedTodo: null,
    clickedTodoIndex: null,
    deletedTodos: null,
    addTodoText: null
  };

  componentDidMount() {
    this.props.getTodosFromDb();
    /*
    axios.get("/api/todos/get").then(res => {
      this.setState({
        todos: res.data,
        clickedTodo: res.data[0]
      });
      console.log("compDidMount", this.props.tds);
    });
    */
  }

  getTodoTextFromInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handAddTodo = e => {
    e.preventDefault();
    let currentText = this.state.addTodoText;
    this.props.onAddTodo(currentText);
  };

  handleTodoClicked = (todo, index) => {
    this.setState({
      clickedTodo: todo,
      clickedTodoIndex: index
    });
  };

  handleDeleteTodo = todo => {
    this.setState({
      deletedTodos: todo
    });
  };

  componentDidUpdate(prevProps) {
    let index = this.state.clickedTodoIndex;
    let oldProps = prevProps.tds.todos[index];
    let currentProps = this.props.tds.todos[index];

    if (oldProps && currentProps) {
      oldProps = prevProps.tds.todos[index];
      currentProps = this.props.tds.todos[index];
      console.log("O:", oldProps);
      console.log("C:", currentProps);
    }
  }

  render() {
    const todos = this.props.tds.todos.map((todo, index) => {
      return (
        <Todo
          key={todo._id}
          currentTodo={todo}
          text={todo.todoText}
          clicked={this.handleTodoClicked}
          index={index}
        />
      );
    });

    return (
      <Container>
        <Form>
          <Label for="addTodo">New task!</Label>
          <Input
            type="text"
            name="addTodoText"
            id="addTodo"
            placeholder="insert todo here"
            onChange={this.getTodoTextFromInput}
          />
          <Button color="secondary" onClick={this.handAddTodo}>
            Add todo
          </Button>
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
    getTodosFromDb: () => {
      dispatch(getTodos());
    },
    onAddTodo: newTodo => {
      dispatch(addTodo(newTodo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);
