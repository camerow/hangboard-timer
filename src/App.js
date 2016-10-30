import React, { Component } from 'react';
import { HangboardTimer } from "./HangboardTimer/index";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HangboardTimer />
      </div>
    );
  }
}

export default App;
