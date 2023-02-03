/* eslint no-underscore-dangle: 0 */
// import { uid } from 'uid/single';

const _apiBase = 'https://blog.kata.academy/api';

const sendRequest = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    console.log(res.statusText);
  }

  return res.json();
};

const getArticles = async (offset) => {
  const url = `${_apiBase}/articles?offset=${offset}`;
  const res = await sendRequest(url);
  const { articles, articlesCount } = res;
  return { articles, articlesCount };
};

const api = {
  getArticles,
};

export default api;
