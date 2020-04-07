import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { render } from 'react-dom';

import App from './App';
import rootReducer from './Reducers/reducers.js'
import { composeWithDevTools } from 'redux-devtools-extension'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
  );
