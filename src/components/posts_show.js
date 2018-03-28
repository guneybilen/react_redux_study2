import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {

  componentDidMount(){
    // index page already fetches all posts. You don't have to refetch
    // the posts for this page, but if you think the data may have become 
    // stale you can refetch and you do not put if(!this.props.post) {
    // So, with if(!this.props.post), when there is already posts, 
    // we can use them without refetching. They may be stale but this way 
    // there won't be much network traffic.
    // if(!this.props.post) {     
      const { id } = this.props.match.params; // match is the top level property.
      this.props.fetchPost(id);
    // }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    // DO NOT USE this.props.post.id
    // At the first, initial, render post is undefined.
    // But, url and so this.props.match.params 
    // will always be defined.
    //
    //
    // <Route path="/posts/:id" component={PostsShow} /> in index.js means
    // this component has reach for navigation utilities.
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // this.props === ownProps - this is not a code here.
    // Just to show they are exactly equivalent here.
    // You CANNOT call ownProps here, due scoping.

    const { post } = this.props;

    // The component renders once even before data is fetched.
    // We need to make sure here that the code flow will not reach
    // <h3>{post.title}</h3> below without a post at hand.
    // So, check post in the if statement.
    if(!post) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }

}

// mapStateToProps is called when the component is rendered.
// mapStateToProps passes the necessary props into 
// this component by using the connect function below.


// { posts } is destructured from state object.
// (application) state is the first argument to mapStateToProps.
// By convention the second argument is called ownProps.
// ownProps is all the props object that is headed for this component
function mapStateToProps({ posts }, ownProps){
  return { post: posts[ownProps.match.params.id] };
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);