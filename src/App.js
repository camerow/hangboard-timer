import React, { Component } from 'react';
import { HangboardTimer } from "./HangboardTimer";
import Navigation from './Navigation';

import Container from 'rebass/dist/Container';

import '../node_modules/vhs/css/vhs.min.css';
import "./App.css";

class App extends Component {
  static childContextTypes = {
    rebass: React.PropTypes.object
  }

  getChildContext () {
    return {
      rebass: {
        colors: {
          primary: '#0088ee',
          white: '#fff',
          black: '#333333',
          success: '#57a773',
          warning: '#EE6352',
          info: '#08e'
        },
        baseStyles: {
          color: '#33333'
        },
        fontSizes: [ 64, 48, 24, 18, 16, 14, 12],
        NavItem: {
          color: '#EFE9F4'
        },
        Close: {
          color: 'black'
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          { this.props.children || HangboardTimer }
        </Container>
      </div>
    );
  }
}

export default App;
