import * as types from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  token: '',
  image: '',
  isAuth: false,
  regSuccess: false,
  loginSuccess: false,
  profileSuccess: false,
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
      newState.regSuccess = false;
      newState.loginSuccess = false;
      break;
    case types.IS_PENDING:
      newState.isPending = true;
      newState.profileSuccess = false;
      break;
    case types.REGISTRATION_FAILED:
      newState.isPending = false;
      newState.usernameErr = payload?.errors?.username;
      newState.emailErr = payload?.errors?.email;
      break;
    case types.REGISTRATION_SUCCESS:
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.isAuth = true;
      newState.regSuccess = true;
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
      newState.loginSuccess = true;
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
      newState.profileSuccess = true;
      break;
    case types.ARTICLE_STARTED:
      newState.regSuccess = false;
      newState.loginSuccess = false;
      break;
    case types.LOGOUT:
      newState.username = '';
      newState.email = '';
      newState.image = '';
      newState.token = '';
      newState.isAuth = '';
      newState.loginSuccess = false;
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
