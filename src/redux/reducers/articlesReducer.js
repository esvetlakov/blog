const initialState = {
  data: [],
  articlesCount: 0,
  currentPage: 1,
  loading: true,
  createSuccess: false,
  deleteSuccess: false,
};

function articlesReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'LOAD_ARTICLES':
      newState.data = payload.articles;
      newState.data.pages = true;
      newState.articlesCount = payload.articlesCount;
      newState.loading = false;
      break;
    case 'CHANGE_PAGE':
      newState.currentPage = payload;
      break;
    case 'LOAD_CURRENT_ARTICLE':
      newState.data.push(payload);
      newState.data.single = true;
      break;
    case 'CLEAR_CURRENT_ARTICLE':
      newState.data = [];
      break;
    case 'LOADING':
      newState.loading = true;
      break;
    case 'LIKED':
      newState.data.forEach((el, index) => {
        if (el.slug === payload.article.slug) {
          newState.data[index].favorited = true;
          newState.data[index].favoritesCount = payload.article.favoritesCount;
        }
      });
      break;
    case 'DISLIKED':
      newState.data.forEach((el, index) => {
        if (el.slug === payload.article.slug) {
          newState.data[index].favorited = false;
          newState.data[index].favoritesCount = payload.article.favoritesCount;
        }
      });
      break;
    case 'CREATE_ARTICLE_STARTED':
      newState.createSuccess = false;
      break;
    case 'CREATE_ARTICLE_SUCCESS':
      newState.createSuccess = true;
      break;
    case 'DELETE_START':
      newState.deleteSuccess = false;
      break;
    case 'DELETE_SUCCESS':
      newState.deleteSuccess = true;
      break;
    default:
      return state;
  }
  return newState;
}

export default articlesReducer;
