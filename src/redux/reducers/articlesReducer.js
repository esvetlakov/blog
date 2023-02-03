const initialState = {
  data: [],
  articlesCount: 0,
};

function articlesReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'LOAD_ARTICLES':
      newState.data = payload.articles;
      newState.articlesCount = payload.articlesCount;
      break;
    default:
      return state;
  }
  return newState;
}

export default articlesReducer;
