import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
require('offline-plugin/runtime').install();
requier('./manifest.json');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
