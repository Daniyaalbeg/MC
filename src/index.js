import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';

import App from './App';
import rootReducer from './Reducers/reducers.js'
import { composeWithDevTools } from 'redux-devtools-extension'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css' 
import './css/index.css';

// Sentry.init({dsn: "https://5f0004b289e641d8bab375cd18e4eab4@o382800.ingest.sentry.io/5212206"});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

render(
  
  <Provider store={store}>
    <App className="app" />
  </Provider>,
  document.getElementById('root')
);
