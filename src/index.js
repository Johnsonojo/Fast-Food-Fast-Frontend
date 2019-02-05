import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './asset/css/normalize.css';
import './asset/css/styles.css';
import App from './components/app/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const main = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(main, document.getElementById('root'));
