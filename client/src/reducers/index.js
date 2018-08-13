import { GET_TODOS, TODOS_LOADING } from "../actions/types";

const initialState = {
  todos: [],
  todosLoading: false
};

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        todosLoading: false
      };
    case TODOS_LOADING:
      return {
        ...state,
        todosLoading: true
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
