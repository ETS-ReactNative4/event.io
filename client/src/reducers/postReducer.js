export const GET_POST = 'GET_POST';
export const GET_FEED = 'GET_FEED';

export const postReducer = (state, action) => {
  switch (action.type) {
    case GET_FEED: {
      return { ...state, feed: [] };
    }
    case GET_POST: {
    }
    case GET_PROFILE: {
    }
    default:
      return state;
  }
};
