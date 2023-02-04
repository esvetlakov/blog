/* eslint no-underscore-dangle: 0 */
// import { uid } from 'uid/single';
import ky from 'ky';

const _apiBase = 'https://blog.kata.academy/api';

const getArticles = async (offset) => {
  const url = `${_apiBase}/articles?offset=${offset}`;
  try {
    const res = await ky.get(url).json();
    const { articles, articlesCount } = res;
    return { articles, articlesCount };
  } catch (err) {
    console.log(err.message);
  }
  return null;
};

const getArticleBySlug = async (slug) => {
  const url = `${_apiBase}/articles/${slug}`;
  try {
    const res = await ky.get(url).json();
    const { article } = res;
    return { ...article };
  } catch (err) {
    console.log(err.message);
  }
  return null;
};

const api = {
  getArticles,
  getArticleBySlug,
};

export default api;
