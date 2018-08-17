import {
  GET_TODOS,
  TODOS_LOADING,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "../actions/types";

const initialState = {
  todos: [],
  todosLoading: false
};

export default function todoReducer(state = initialState, action) {
  let newArray = state.todos.slice();
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
        todos: newArray.filter(todo => todo._id !== action.payload._id),
        todosLoading: false
      };
    }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action.payload._id) {
            return Object.assign({}, todo, action.payload);
          }
          return todo;
        }),
        todosLoading: false
      };

    /*{
        ...state,
        todos: state.todos.map((todo, index) => {
          if (todo._id === action.payload._id) {
            //todo[index] = action.payload;
            state.todos[index] = action.payload;
            // state.todos.splice(index, 1);
            // state.todos.splice(index, 0, action.payload);
          }
          return todo;
        })
      };*/
    case TODOS_LOADING:
      return {
        ...state,
        todosLoading: true
      };
    default:
      return state;
  }
}
