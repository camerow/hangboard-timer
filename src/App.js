import React, { Component } from 'react';
import { HangboardTimer } from "./HangboardTimer/index";
import Toolbar from 'rebass/dist/Toolbar';
// import Space from 'rebass/dist/Space';
import NavItem from 'rebass/dist/NavItem';
import '../node_modules/vhs/css/vhs.min.css';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar>
          <NavItem style={{ fontSize: '20px'}}>
            Hangboard Timer
          </NavItem>
        </Toolbar>
        <HangboardTimer />
      </div>
    );
  }
}

export default App;
