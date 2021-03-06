import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

import thunk from 'redux-thunk';

// redux-logger is for beautiful redux logs. 
// Very important package for debugging.
// Do not forget to add it in among other applyMiddleware arguments.
import logger from 'redux-logger';  


/* 
with the <Switch> component router will not render multiple
matching components on one route and with <Switch> component
only one most specific component will render. You need to
order your components from the most specific at top.
 */

 const createStoreWithMiddleware = applyMiddleware(promise, thunk, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />          
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
