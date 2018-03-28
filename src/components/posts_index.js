
import _ from 'lodash'; 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';



class PostsIndex extends Component {

  // componentWillMount could have been used. But both
  // componentWillMount and componentDidMount will render
  // the component initially without the data and later with
  // the data, since 'fetchPosts' function is asynchronous. 
  // There is no way in React to say 
  // 'do not render the component without the data initially.'
  // So, basically we can use both lifecycle methods here.
  // They are both called only once each. Lifecycle methods spelling
  // must be exact and they are called automatically by React.
  componentDidMount() {
    this.props.fetchPosts(); 
  }

  renderPosts() {

    // in this project array list of posts has been changed object list
    // of posts see notes in reducer_posts.js.
    // objects do not have map function we need to use lodash map here
    // that is used to mapping objects and here will return here an array 
    // of list just like the Reac expects of lists. 
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

/* 
        Difference between an a tag and a Link tag:
        The path in a tag is a relative path while in the Link tag is absolute.
        The a tag does a server request while the Link tag is used for 
        single page application without a server request.        
 */
  render() {
    // console.log(this.props.posts);

    return (
  
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
  
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);


// You can delete mapDispatchToProps function and delete importing
// bindActionCreators and only do like the following:
// export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);
// { fetchPosts: fetchPosts } can be shortened to { fetchPosts } in ES6
// export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
// short form and the long form are completely identical, you only need to create
// mapDispatchToProps function when you need to make computation prior to
// calling the action creator function (which is fetchPosts here).
