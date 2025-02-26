import {
    CREATE_LIST_REQUEST,
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAILURE,
  } from '../actions/listActions.js';
  
  const initialState = {
    loading: false,
    list: null,
    error: null,
  };
  
  const listReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
      case CREATE_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default listReducer;
  