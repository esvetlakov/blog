const initialState = {
  username: 'testacc',
  email: 'testacc@mail.ru',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGZiMjNhNmY4YmVlMWIwMDU1MWQzNiIsInVzZXJuYW1lIjoidGVzdGFjYyIsImV4cCI6MTY4MDgwOTU0MiwiaWF0IjoxNjc1NjI1NTQyfQ.QE0CUD2u-poQN1sw1kD81HQf1UYlj0dQmIO3QstgYTE',
  image: '',
  isAuth: false,
  regSuccess: false,
  loginSuccess: false,
  isPending: false,
  usernameErr: false,
  emailErr: false,
  loginErr: false,
};

function userReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'REG_STARTED':
      newState.isPending = true;
      newState.usernameErr = false;
      newState.emailErr = false;
      newState.loginErr = false;
      newState.regSuccess = false;
      newState.loginSuccess = false;
      break;
    case 'REGISTRATION_FAILED':
      newState.isPending = false;
      // eslint-disable-next-line
      newState.usernameErr = payload.errors.username ? true : false;
      // eslint-disable-next-line
      newState.emailErr = payload.errors.email ? true : false;
      break;
    case 'REGISTRATION_SUCCESS':
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.isAuth = true;
      newState.regSuccess = true;
      break;
    case 'LOGIN_FAILED':
      newState.isPending = false;
      // eslint-disable-next-line
      newState.loginErr = payload.errors['email or password'] ? true : false;
      break;
    case 'LOGIN_SUCCESS':
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.image = payload.user.image;
      newState.isAuth = true;
      newState.loginSuccess = true;
      break;
    case 'LOGOUT':
      newState.username = '';
      newState.email = '';
      newState.image = '';
      newState.token = '';
      newState.isAuth = '';
      newState.loginSuccess = false;
      break;
    case 'LOAD_SAVED_USER':
      newState.username = payload.user.username;
      newState.email = payload.user.email;
      newState.token = payload.user.token;
      newState.image = payload.user.image;
      newState.isAuth = true;
      break;
    case 'TEST_USER_CREATE':
      newState.isPending = false;
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
