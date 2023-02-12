import ky from 'ky';

import storage from './storage';

const logger = (err) => {
  console.log(err.name);
  console.log(err.message);
};

const _api = ky.create({ prefixUrl: 'https://blog.kata.academy/api' });

const getArticles = async (offset) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api
      .get(`articles?offset=${offset}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .json();
    const { articles, articlesCount } = res;
    return { articles, articlesCount };
  } catch (err) {
    logger(err);
  }
  return null;
};

const getArticleBySlug = async (slug) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api
      .get(`articles/${slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .json();
    const { article } = res;
    return { ...article };
  } catch (err) {
    logger(err);
  }
  return null;
};

const createUser = async (data) => {
  try {
    const res = await _api.post('users', { json: data }).json();
    return res;
  } catch (error) {
    if (error.name === 'HTTPError') {
      const errorJson = await error.response.json();
      return errorJson;
    }
  }
};

const loginUser = async (data) => {
  try {
    const res = await _api.post('users/login', { json: data }).json();
    return res;
  } catch (error) {
    if (error.name === 'HTTPError') {
      const errorJson = await error.response.json();
      return errorJson;
    }
  }
};

const updateUser = async (data) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api
      .put('user', {
        headers: {
          Authorization: `Token ${token}`,
        },
        json: data,
      })
      .json();
    return res;
  } catch (error) {
    if (error.name === 'HTTPError') {
      const errorJson = await error.response.json();
      return errorJson;
    }
  }
};

const likeArticle = async (slug) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api
      .post(`articles/${slug}/favorite`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .json();
    return res;
  } catch (error) {
    logger(error);
  }
};

const dislikeArticle = async (slug) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api
      .delete(`articles/${slug}/favorite`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .json();
    return res;
  } catch (error) {
    logger(error);
  }
};

const createArticle = async (data) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api
      .post('articles', {
        headers: {
          Authorization: `Token ${token}`,
        },
        json: data,
      })
      .json();
    return res;
  } catch (error) {
    logger(error);
  }
};

const updateArticle = async (data, slug) => {
  const token = localStorage.getItem('token');
  try {
    const res = await _api
      .put(`articles/${slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        json: data,
      })
      .json();
    return res;
  } catch (error) {
    logger(error);
  }
};

const deleteArticle = async (slug) => {
  const token = storage.loadTokenFromStorage();
  try {
    const res = await _api.delete(`articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return res.ok;
  } catch (error) {
    logger(error);
  }
};

const loadSavedUser = async (token) => {
  try {
    const res = await _api
      .get('user', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .json();
    return res;
  } catch (error) {
    logger(error);
  }
};

const api = {
  getArticles,
  getArticleBySlug,
  createUser,
  loginUser,
  loadSavedUser,
  updateUser,
  likeArticle,
  dislikeArticle,
  createArticle,
  deleteArticle,
  updateArticle,
};

export default api;
