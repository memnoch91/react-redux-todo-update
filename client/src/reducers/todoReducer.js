import {
  GET_TODOS,
  TODOS_LOADING,
  ADD_TODO,
  DELETE_TODO
} from "../actions/types";

const initialState = {
  todos: [],
  todo: {},
  todosLoading: false
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        todosLoading: false
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    }
    case TODOS_LOADING:
      return {
        ...state,
        todosLoading: true
      };
    default:
      return state;
  }
}
