import api from '../../api/api';

export const loadArticles = (offset) => async (dispatch) => {
  const res = await api.getArticles(offset);
  dispatch({ type: 'LOAD_ARTICLES', payload: res });
};

export const loadUser = () => {};
