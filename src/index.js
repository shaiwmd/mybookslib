import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import { loadBooks } from './actions/bookActions';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css'; //Webpack can import CSS files too!

const store = configureStore();
store.dispatch(loadBooks());

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.querySelector('#app')
);
