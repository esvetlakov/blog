const initialState = {
  username: '',
  email: '',
  token: '',
  image: '',
  isAuth: false,
  regSuccess: false,
  regPending: false,
  usernameErr: false,
  emailErr: false,
};

function userReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'REG_STARTED':
      newState.regPending = true;
      newState.usernameErr = false;
      newState.emailErr = false;
      newState.regSuccess = false;
      break;
    case 'CREATE_USER_RESPONSE':
      newState.regPending = false;
      if (payload.errors) {
        // eslint-disable-next-line
        newState.usernameErr = payload.errors.username ? true : false;
        // eslint-disable-next-line
        newState.emailErr = payload.errors.email ? true : false;
        break;
      }
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.isAuth = true;
      newState.regSuccess = true;
      break;
    default:
      return newState;
  }
  return newState;
}

export default userReducer;
