
import axios from 'axios';


export const SET_BLOG = 'SET_BLOG';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';


export const setBlog = (blog) => ({
  type: SET_BLOG,
  payload: blog,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});


export const fetchBlogDetails = (blogId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`http://10.0.2.2:3000/blog/getBlogById/${blogId}`);
    dispatch(setBlog(response.data.blog));
  } catch (err) {
    dispatch(setError('Error fetching blog details.'));
  }
};
