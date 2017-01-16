import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import App from './App';
import HangboardTimer from './HangboardTimer/HangboardTimer';
import About from './About/About';

require('offline-plugin/runtime').install();
require('../public/manifest.json');

let Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HangboardTimer} />
      <Route path='timer' component={HangboardTimer} />
      <Route path='about' component={About} />
    </Route>
  </Router>
);

ReactDOM.render(
  Routes,
  document.getElementById('root')
);
