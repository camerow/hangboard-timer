import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
require('offline-plugin/runtime').install();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
