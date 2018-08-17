import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store";

/********Componets********/
import TodoApp from "./statefulComponents/TodoApp";

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <TodoApp />
      </Provider>
    );
  }
}

export default App;
