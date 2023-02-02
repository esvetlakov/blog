import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/index.scss';

import App from './components/app';
import store from './redux/store/createStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
