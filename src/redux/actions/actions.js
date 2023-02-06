import api from '../../api/api';
import storage from '../../api/storage';

export const loadArticles = (offset, token) => async (dispatch) => {
  dispatch({ type: 'LOADING' });
  const res = await api.getArticles(offset, token);
  dispatch({ type: 'LOAD_ARTICLES', payload: res });
};

export const getCurrentArticle = (slug) => async (dispatch) => {
  dispatch({ type: 'CLEAR_CURRENT_ARTICLE' });
  const res = await api.getArticleBySlug(slug);
  dispatch({ type: 'LOAD_CURRENT_ARTICLE', payload: res });
};

export const changeCurrentPage = (page) => (dispatch) => {
  dispatch({ type: 'CHANGE_PAGE', payload: page });
};

export const createUser = (data) => async (dispatch) => {
  dispatch({ type: 'REG_STARTED' });
  storage.clearStorage();
  const res = await api.createUser(data);
  if (res.errors) {
    dispatch({ type: 'REGISTRATION_FAILED', payload: res });
  } else {
    storage.saveTokenToStorage(res.user.token);
    dispatch({ type: 'REGISTRATION_SUCCESS', payload: res });
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: 'REG_STARTED' });
  storage.clearStorage();
  const res = await api.loginUser(data);
  if (res.errors) {
    dispatch({ type: 'LOGIN_FAILED', payload: res });
  } else {
    storage.saveTokenToStorage(res.user.token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res });
  }
};

export const logOut = () => async (dispatch) => {
  storage.clearStorage();
  dispatch({ type: 'LOGOUT' });
};

export const loadSavedUser = () => async (dispatch) => {
  if (storage.tokenCheck()) {
    const token = storage.loadTokenFromStorage();
    dispatch({ type: 'SAVED_USER_TRUE' });
    const res = await api.loadSavedUser(token);
    dispatch({ type: 'LOAD_SAVED_USER', payload: res });
  }
};

export const updateUser = (data) => async (dispatch) => {
  dispatch({ type: 'IS_PENDING' });
  const res = await api.updateUser(data);
  if (res.errors) {
    dispatch({ type: 'PROFILE_FAILED', payload: res });
  } else {
    storage.saveTokenToStorage(res.user.token);
    dispatch({ type: 'PROFILE_SUCCESS', payload: res });
  }
};
