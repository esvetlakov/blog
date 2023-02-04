const initialState = {
  data: [],
  articlesCount: 0,
  currentPage: 1,
  currentArticle: {},
  loading: true,
};

function articlesReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'LOAD_ARTICLES':
      newState.data = payload.articles;
      newState.articlesCount = payload.articlesCount;
      newState.loading = false;
      break;
    case 'CHANGE_PAGE':
      newState.currentPage = payload;
      break;
    case 'LOAD_CURRENT_ARTICLE':
      newState.currentArticle = payload;
      break;
    case 'CLEAR_CURRENT_ARTICLE':
      newState.currentArticle = {};
      break;
    case 'LOADING':
      newState.loading = true;
      break;
    default:
      return state;
  }
  return newState;
}

export default articlesReducer;
