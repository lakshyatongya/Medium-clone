
import { SET_BLOG, SET_LOADING, SET_ERROR } from '../actions/blogdetailsActions';

const initialState = {
    blog: null,   
    loading: true, 
    error: '',     
  };
  

const blogdetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_BLOG:
      return { ...state, blog: action.payload, loading: false };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default blogdetailsReducer;
