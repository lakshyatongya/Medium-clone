const initialState = {
    title: '',
    description: '',
    images: [],
    userId: '',
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TITLE':
        return { ...state, title: action.payload };
      case 'SET_DESCRIPTION':
        return { ...state, description: action.payload };
      case 'SET_IMAGES':
        return { ...state, images: action.payload };
      case 'SET_USER_ID':
        return { ...state, userId: action.payload };
      default:
        return state;
    }
};

export default blogReducer;
