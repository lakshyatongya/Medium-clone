export const setTitle = (title) => {
    return {
      type: 'SET_TITLE',
      payload: title,
    };
  };
  
  export const setDescription = (description) => {
    return {
      type: 'SET_DESCRIPTION',
      payload: description,
    };
  };
  
  export const setImages = (images) => {
    return {
      type: 'SET_IMAGES',
      payload: images,
    };
  };
  
  export const setUserId = (userId) => {
    return {
      type: 'SET_USER_ID',
      payload: userId,
    };
  };
  