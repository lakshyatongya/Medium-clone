import axios from 'axios';

export const fetchComments = (blogId) => async (dispatch) => {
  dispatch({ type: 'FETCH_COMMENTS_REQUEST' });
  try {
    const response = await axios.get(`http://10.0.2.2:3000/Comment/comments/${blogId}`);
    dispatch({
      type: 'FETCH_COMMENTS_SUCCESS',
      payload: response.data.comments,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_COMMENTS_FAILURE',
      payload: error.message,
    });
  }
};


export const postComment = (blogId, userId, content) => async (dispatch) => {
  try {
    const requestData = {
      blogId,
      userId,
      content,
    };
    const response = await axios.post('http://10.0.2.2:3000/Comment/add', requestData);
    dispatch({
      type: 'POST_COMMENT_SUCCESS',
      payload: response.data.comment,
    });
  } catch (error) {
    dispatch({
      type: 'POST_COMMENT_FAILURE',
      payload: error.message,
    });
  }
};
