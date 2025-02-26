// import { createStore } from 'redux';
// import rootReducer from '../reducers/rootReducer';


// const store = createStore(rootReducer);

// export default store;




import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; 
import rootReducer from '../reducers/rootReducer';


const store = createStore(
  rootReducer,   
  applyMiddleware(thunk)  
);

export default store;


