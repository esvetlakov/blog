import api from '../../api/api';
import storage from '../../api/storage';

import * as types from './actionTypes';

export const loadArticles = (offset) => async (dispatch) => {
  dispatch({ type: types.LOADING });
  dispatch({ type: types.CLEAR_CURRENT_ARTICLE });
  const res = await api.getArticles(offset);
  dispatch({ type: types.LOAD_ARTICLES, payload: res });
};

export const getCurrentArticle = (slug) => async (dispatch) => {
  dispatch({ type: types.CLEAR_CURRENT_ARTICLE });
  const res = await api.getArticleBySlug(slug);
  dispatch({ type: types.LOAD_CURRENT_ARTICLE, payload: res });
};

export const changeCurrentPage = (page) => (dispatch) => {
  dispatch({ type: types.CHANGE_PAGE, payload: page });
};

export const createUser = (data) => async (dispatch) => {
  dispatch({ type: types.REG_STARTED });
  storage.clearStorage();
  const res = await api.createUser(data);
  if (res.errors) {
    dispatch({ type: types.REGISTRATION_FAILED, payload: res });
  } else {
    storage.saveTokenToStorage(res.user.token);
    dispatch({ type: types.REGISTRATION_SUCCESS, payload: res });
    return true;
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: types.REG_STARTED });
  storage.clearStorage();
  const res = await api.loginUser(data);
  if (res.errors) {
    dispatch({ type: types.LOGIN_FAILED, payload: res });
  } else {
    storage.saveTokenToStorage(res.user.token);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res });
    return true;
  }
};

export const logOut = () => async (dispatch) => {
  storage.clearStorage();
  dispatch({ type: types.LOGOUT });
};

export const loadSavedUser = () => async (dispatch) => {
  if (storage.checkToketValidation()) {
    const token = storage.loadTokenFromStorage();
    dispatch({ type: types.SAVED_USER_TRUE });
    const res = await api.loadSavedUser(token);
    dispatch({ type: types.LOAD_SAVED_USER, payload: res });
  }
};

export const updateUser = (data) => async (dispatch) => {
  dispatch({ type: types.IS_PENDING });
  const res = await api.updateUser(data);
  if (res.errors) {
    dispatch({ type: types.PROFILE_FAILED, payload: res });
  } else {
    storage.saveTokenToStorage(res.user.token);
    dispatch({ type: types.PROFILE_SUCCESS, payload: res });
    return true;
  }
};

export const likeArticle = (slug, checked) => async (dispatch) => {
  if (checked) {
    const res = await api.likeArticle(slug);
    if (!res.errors) {
      dispatch({ type: types.LIKED, payload: res });
    }
  } else {
    const res = await api.dislikeArticle(slug);
    if (!res.errors) {
      dispatch({ type: types.DISLIKED, payload: res });
    }
  }
};

export const createArticle = (data) => async () => {
  const res = await api.createArticle(data);
  if (!res.errors) {
    return { type: 'new', body: res };
  }
  return false;
};

export const updateArticle = (data, slug) => async () => {
  const res = await api.updateArticle(data, slug);
  if (!res.errors) {
    return { type: 'edit', body: res };
  }
  return false;
};

export const deleteArticle = (slug) => async () => {
  const res = await api.deleteArticle(slug);
  if (res) {
    return true;
  }
  return false;
};
