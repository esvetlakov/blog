import * as types from '../actions/actionTypes';

const initialState = {
  data: [],
  articlesCount: 0,
  currentPage: 1,
  loading: true,
  createSuccess: false,
  deleteSuccess: false,
  editSuccess: false,
};

function articlesReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case types.LOAD_ARTICLES:
      newState.data = payload.articles;
      newState.data.pages = true;
      newState.articlesCount = payload.articlesCount;
      newState.loading = false;
      break;
    case types.CHANGE_PAGE:
      newState.currentPage = payload;
      break;
    case types.LOAD_CURRENT_ARTICLE:
      newState.data.push(payload);
      newState.data.single = true;
      break;
    case types.CLEAR_CURRENT_ARTICLE:
      newState.data = [];
      break;
    case types.LOADING:
      newState.loading = true;
      break;
    case types.LIKED:
      newState.data.forEach((el, index) => {
        if (el.slug === payload.article.slug) {
          newState.data[index].favorited = true;
          newState.data[index].favoritesCount = payload.article.favoritesCount;
        }
      });
      break;
    case types.DISLIKED:
      newState.data.forEach((el, index) => {
        if (el.slug === payload.article.slug) {
          newState.data[index].favorited = false;
          newState.data[index].favoritesCount = payload.article.favoritesCount;
        }
      });
      break;
    case types.CREATE_ARTICLE_SUCCESS:
      newState.createSuccess = true;
      break;
    case types.ARTICLE_STARTED:
      newState.deleteSuccess = false;
      newState.createSuccess = false;
      newState.editSuccess = false;
      break;
    case types.EDIT_ARTICLE_SUCCESS:
      newState.editSuccess = true;
      break;
    case types.DELETE_SUCCESS:
      newState.deleteSuccess = true;
      break;
    default:
      return state;
  }
  return newState;
}

export default articlesReducer;
