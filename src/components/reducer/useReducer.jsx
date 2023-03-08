
const initialState = {
  add_answer: ''
}

export const useReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ID': {
      console.log(action.action);
      return {
        ...state,
        id: action.payload
      }
    }
    case 'ADD_ANSWER': {
      return {
        ...state, add_answer: action.payload
      }
    }
    default: {
      return state;
    }
  }
};