import { GET_TODOS, TODOS_LOADING } from "./types";
import axios from "axios";

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING
  };
};

export const getTodos = dispatch => {
  return () => {
    setTodosLoading(dispatch);
    axios.get("/api/todos/get").then(res => {
      console.log("vasile", res);
      dispatch({
        type: GET_TODOS,
        payload: res.data
      });
    });
  };
};
