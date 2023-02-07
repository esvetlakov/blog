/* eslint no-underscore-dangle: 0 */
/* eslint no-console: ["error", { allow: ["log"] }] */
// import { uid } from 'uid/single';
import ky from 'ky';

const _api = ky.create({ prefixUrl: 'https://blog.kata.academy/api' });

const getArticles = async (offset, token) => {
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
    console.log(err.message);
  }
  return null;
};

const getArticleBySlug = async (slug) => {
  const token = localStorage.getItem('token');
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
    console.log(err.message);
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
  return null;
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
  return null;
};

const updateUser = async (data) => {
  const token = localStorage.getItem('token');
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
  return null;
};

const likeArticle = async (slug) => {
  const token = localStorage.getItem('token');
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
    if (error.name === 'HTTPError') {
      console.log('err');
    }
  }
  return null;
};

const dislikeArticle = async (slug) => {
  const token = localStorage.getItem('token');
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
    if (error.name === 'HTTPError') {
      console.log('err');
    }
  }
  return null;
};

const createArticle = async (data) => {
  const token = localStorage.getItem('token');
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
    console.log(error);
  }
  return null;
};

const deleteArticle = async (slug) => {
  const token = localStorage.getItem('token');
  try {
    const res = await _api.delete(`articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return res.ok;
  } catch (error) {
    console.log(error);
  }
  return null;
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
  } catch (err) {
    console.log(err.message);
  }
  return null;
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
};

export default api;
