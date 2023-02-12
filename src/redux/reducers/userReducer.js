import * as types from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  token: '',
  image: '',
  isAuth: false,
  isPending: false,
  usernameErr: false,
  emailErr: false,
  loginErr: false,
};

function userReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case types.REG_STARTED:
      newState.isPending = true;
      newState.usernameErr = false;
      newState.emailErr = false;
      newState.loginErr = false;
      break;
    case types.IS_PENDING:
      newState.isPending = true;
      break;
    case types.REGISTRATION_FAILED:
      newState.isPending = false;
      newState.usernameErr = payload?.errors?.username;
      newState.emailErr = payload?.errors?.email;
      break;
    case types.REGISTRATION_SUCCESS:
      newState.isPending = false;
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.isAuth = true;
      break;
    case types.LOGIN_FAILED:
      newState.isPending = false;
      newState.loginErr = payload?.errors['email or password'];
      break;
    case types.LOGIN_SUCCESS:
      newState.isPending = false;
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.image = payload.user.image;
      newState.isAuth = true;
      break;
    case types.PROFILE_FAILED:
      newState.isPending = false;
      newState.usernameErr = payload?.errors?.username;
      newState.emailErr = payload.errors.email;
      break;
    case types.PROFILE_SUCCESS:
      newState.isPending = false;
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.image = payload.user.image;
      break;
    case types.LOGOUT:
      newState.username = '';
      newState.email = '';
      newState.image = '';
      newState.token = '';
      newState.isAuth = false;
      break;
    case types.LOAD_SAVED_USER:
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.image = payload.user.image;
      newState.isAuth = true;
      break;
    case types.SAVED_USER_TRUE:
      newState.isAuth = true;
      break;
    default:
      return newState;
  }
  return newState;
}

export default userReducer;
