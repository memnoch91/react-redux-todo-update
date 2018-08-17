import {
  GET_TODOS,
  TODOS_LOADING,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "./types";
import axios from "axios";

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING
  };
};

export function getTodos() {
  return function(dispatch) {
    setTodosLoading(dispatch);
    return axios
      .get("/api/todos/get")
      .then(res => {
        dispatch({
          type: GET_TODOS,
          payload: res.data
        });
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addTodo = load => {
  return function(dispatch) {
    return axios
      .post("/api/todos/add", { todoText: load })
      .then(res => {
        dispatch({
          type: ADD_TODO,
          payload: res.data
          /*{
            _id: res.data._id,
            todoText: load,
            todoComplete: res.data.todoComplete,
            todoDate: res.data.todoDate
          }*/
        });
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteTodo = id => {
  return function(dispatch) {
    return axios
      .delete(`/api/todos/delete/${id}`)
      .then(res => {
        console.log("res:", res);
        dispatch({
          type: DELETE_TODO,
          payload: res.data
        });
      })
      .catch(err => {
        throw err;
      });
  };
};

export const updateTodo = (id, todoText, todoComplete) => {
  return function(dispatch) {
    return axios
      .put(`/api/todos/update/${id}`, {
        _id: id,
        todoText: todoText,
        todoComplete: todoComplete,
        todoDate: Date.now
      })
      .then(res => {
        dispatch({
          type: UPDATE_TODO,
          payload: res.data
        });
      })
      .catch(err => {
        throw err;
      });
  };
};

//
