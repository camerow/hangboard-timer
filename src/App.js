import React, { Component } from 'react';
import { HangboardTimer } from "./HangboardTimer/index";
import Navigation from './Navigation';

import Container from 'rebass/dist/Container';

import '../node_modules/vhs/css/vhs.min.css';
import "./App.css";

class App extends Component {  
  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <HangboardTimer />
        </Container>
      </div>
    );
  }
}

export default App;
