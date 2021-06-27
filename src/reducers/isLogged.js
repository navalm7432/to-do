const initialState = {
  isAuthenticated: false,
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default loggedReducer;
