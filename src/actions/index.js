import axios from 'axios';


export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';
export const ERORR = 'error';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=AAASSSDDDFFF';


/* 

Below within comments are code that only worked with
redux-promise. The replaced code works with redux-thunk
and  .then(() => callback(); part after axios calls in 
CREATE_POST and DELETE_POST again works with redux-promise. 

if .then(() => callback(); done with
dispatch(callback()) the result will go to the reducer file as regular
way of working redux-thunk. In the reducer, the reducer_posts.js file,
only redux-logger gives error when there is no type but the rest
of the program does not give error.


In function deletePost below in this files
The correct code is below:
.then((request) => dispatch({ type: DELETE_POST, payload: id }))
but if you make an error like this in the payload key
.then((request) => dispatch({ type: DELETE_POST, payload: request }))
the code  return _.omit(state, action.payload); under case DELETE_POST:
in reducer_posts.js file does NOT delete the cached record. So, the cached 
record flashes in the index page until the new record list comes from database.
So, notice that .omıit from lodash library only deletes through giving the key.

*/


export function fetchPosts() {

  /*  
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
      type: FETCH_POSTS,
      payload: request
    }; 
  */

  return (dispatch) => {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((request) => {
        dispatch({ type: FETCH_POSTS, payload: request })
      })
      .catch((err) => {
        dispatch({ type: ERORR, payload: error })
      })
  }
}

export function createPost(values, callback) {
  /* 
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
      .then(() => callback());

    return {
      type: CREATE_POST,
      payload: request
    };
  */

  return (dispatch) => {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
      .then(() => callback())
      .then((request) => {
        dispatch({ type: CREATE_POST, payload: request })
      })
      .catch((err) => {
        dispatch({ type: ERORR, payload: error })
      })
  }
}

export function fetchPost(id) {
  /* 
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
      type: FETCH_POST,
      payload: request
    };
  */

  return (dispatch) => {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then((request) => {
        dispatch({ type: FETCH_POST, payload: request })
      })
      .catch((err) => {
        dispatch({ type: ERORR, payload: error })
      })
  }
}


export function deletePost(id, callback) {

  /* 
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

    return {
      type: DELETE_POST,
      payload: id
    };
   */

  return (dispatch) => {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then(() => callback())
      .then((request) => dispatch({ type: DELETE_POST, payload: id }))
      .catch((err) => {
        dispatch({ type: ERORR, payload: request })
      })
  }
}
 