import api from '../../api/api';

export const loadArticles = (offset) => async (dispatch) => {
  dispatch({ type: 'LOADING' });
  const res = await api.getArticles(offset);
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
  const res = await api.createUser(data);
  dispatch({ type: 'CREATE_USER_RESPONSE', payload: res });
};
