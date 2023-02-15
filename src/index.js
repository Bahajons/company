import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './custom.css'
import { useReducer } from './components/reducer/useReducer';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.min.js'
import { legacy_createStore as createStore } from 'redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(useReducer)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

