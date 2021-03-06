import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {
    // {meta: {touched: touched, error: error}} NOT TRUE HERE!!!
    // {meta: {touched, error}} THIS IS LIKE THIS HERE IN ORDER TO
    // DESTRUCTORE THE meta OBJECT. NOT A SHORTENED FORM HERE.
    // THIS IS HOW THE NESTED OBJECT DESTRUCTURING DONE
    // const {touched, error} = field.meta - can be done like this.
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // we bound this, so this === component
    //
    // <Route path="/posts/new" component={PostsNew} /> in index.js means
    // this component has reach for navigation utilities.
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
         <Field
           label="Categories"   
           name="categories"
           component={this.renderField}
         />
          <Field
           label="Post Content"   
           name="content"
           component={this.renderField}
         />
         <button type="submit" className="btn btn-primary">Submit</button>
         <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

}

function validate(values) {
// console.log(values);
// { title: "asdf", categories: "mnb", content: "lşkj"}
// in quotes are whatever the user typed for the title, categories and content.

  const errors = {};

  // validate the inputs from 'values'
  // you can customize your if statements or make as many checks you want.
  if(!values.title || values.title.length < 3 ) {
    errors.title = "Enter a title that is at least 3 chracters";
  }

  if(!values.categories) {
    errors.categories = "Enter some categories";
  }

  if(!values.content) {
    errors.content = "Enter some content"
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);