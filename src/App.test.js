import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route } from 'react-router'

import { history, store } from './store'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router history={history} store={store}> <Route exact path="/" component={App} /> </Router>, div);
});
