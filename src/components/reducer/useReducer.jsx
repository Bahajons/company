
const initialState = {
  user: {
    first_name: '',
    last_name: '',
    middle_name: '',
    gender: '',
    birthday: '',
    avatar: '',
    phone: '',
    address: '',
    region: '',
    city: ''
  }
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
    case 'USER': {
      console.log(action.payload);
      return {
        ...state.user, ...action.payload
      }
    }
    case 'LOGOUT': {
      console.log(action.payload);
      return {
        ...state.user, ...{
          first_name: '',
          last_name: '',
          middle_name: '',
          gender: '',
          birthday: '',
          avatar: '',
          phone: '',
          address: '',
          region: '',
          city: ''
        }
      }
    }
    default: {
      return state;
    }
  }
};