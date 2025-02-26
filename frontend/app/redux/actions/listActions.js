import axios from 'axios';

// Action Types
export const CREATE_LIST_REQUEST = 'CREATE_LIST_REQUEST';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';

// Action Creators
export const createListRequest = () => ({
  type: CREATE_LIST_REQUEST,
});

export const createListSuccess = (list) => ({
  type: CREATE_LIST_SUCCESS,
  payload: list,
});

export const createListFailure = (error) => ({
  type: CREATE_LIST_FAILURE,
  payload: error,
});

// Thunk Action to handle API request
export const createList = (listName, description, userId) => async (dispatch) => {
  dispatch(createListRequest());

  try {
    const response = await axios.post('http://10.0.2.2:3000/lists/createlists', {
      listname: listName,
      description,
      userId,
    });

    if (response.status === 201) {
      dispatch(createListSuccess(response.data));
    } else {
      dispatch(createListFailure('Failed to create list.'));
    }
  } catch (error) {
    dispatch(createListFailure(error.message));
  }
};
