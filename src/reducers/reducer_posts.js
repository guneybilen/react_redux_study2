import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST,DELETE_POST } from '../actions';

// Objects of records are easier to find in a list then 
// an list of records in an array. With objects of records,
//  "Updating records are way more easier, too."
// The API of this project returns an array with objects in it.
// We need to transfer the array to an object and each object
// with a key of its id value as in: 4: {title:'hello', id:4, content:'hi'}
/////////////////////////////////////////////
//
//                {
//                    4: {title:'hello', id:4, content:'hi'} 
// posts are Object    
//                   12: {title:'bye', id:12, content:'BYE'}
//                }
//
// object lookup: state.posts[postId];
//
// Since our items will be in an object, we initialize
// our state below as follows: 
// state = {} in export default function(state = {}...
/////////////////////////////////////////////
export default function(state = {}, action) {

  switch(action.type) {

    case DELETE_POST:
      return _.omit(state, action.payload);

    case FETCH_POST:
      
      /* ES5 
      const post = action.payload.data;
      const newState = { ...state };
      newState[post.id] = post;
      return newState;
      */
      return { ...state, [action.payload.data.id]:action.payload.data }
    case FETCH_POSTS:
      // console.log(action.payload.data); // [ post1, post2 ]
      // we need to transform it to:
      // { 4: post }

      /* 
      try the following in: https://stephengrider.github.io/JSPlaygrounds/
      const posts = [
        {id:4, title:"Hi"},
        {id:25, title:"bye"},
        {id:36, title:"how is it going"},
      ];
      s = _.mapKeys(posts, 'id');  // _ is the above imported library lodash
      the second argument(id) to _.mapKeys is the property we want 
      to pull out and use as the key of the resulting object

      {
        "4":{"id":4,"title":"Hi"},
        "25":{"id":25,"title":"bye"},
        "36":{"id":36,"title":"how is it going"}
      }
      s['4'];
        => {"id":4,"title":"Hi"}
      */  
      return _.mapKeys(action.payload.data, 'id');
      
    default:
      return state;
  }

}