


import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import blogdetailsReducer from './blogdetailsReducer';
import commentsReducer from './commentsReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  blog: blogReducer,
  blogDetails: blogdetailsReducer,
  comments:commentsReducer,
  list:listReducer,
});

export default rootReducer; 
