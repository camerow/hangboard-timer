import React, { Component } from 'react';
import { HangboardTimer } from "./HangboardTimer/index";
import Toolbar from 'rebass/dist/Toolbar';
// import Space from 'rebass/dist/Space';
import NavItem from 'rebass/dist/NavItem';
import Dropdown from 'rebass/dist/Dropdown';
import DropdownMenu from 'rebass/dist/DropdownMenu';
import Button from 'rebass/dist/Button';
import Arrow from 'rebass/dist/Arrow';
import Container from 'rebass/dist/Container';
import Checkbox from 'rebass/dist/Checkbox';

import '../node_modules/vhs/css/vhs.min.css';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      settingsOpen: false,
      vibrationEnabled: true
    };
  }

  toggleSettingsMenu() {
    this.setState((prevState) => {
      return {
        settingsOpen: !prevState.settingsOpen
      }
    })
  }

  toggleVibration() {
    this.setState((prevState) => {
      return {
        vibrationEnabled: !prevState.vibrationEnabled
      }
    })
  }

  render() {
    console.log(this.state.vibrationEnabled);
    return (
      <div>
        <Toolbar>
          <NavItem style={{ fontSize: '20px'}}>
            Hangboard Timer
          </NavItem>
          <Dropdown>
            <Button
              backgroundColor="primary"
              color="white"
              onClick={ () => this.toggleSettingsMenu() }
              inverted
              rounded
            >
              Settings
              <Arrow direction="down" />
            </Button>
            <DropdownMenu open={this.state.settingsOpen} onDismiss={() => this.toggleSettingsMenu()}>
              <NavItem>
                <Checkbox
                  label="Vibrate"
                  name="vibrate_enabled"
                  checked={this.state.vibrationEnabled}
                  onClick={ () => this.toggleVibration() }
                />
              </NavItem>
            </DropdownMenu>
            </Dropdown>
        </Toolbar>
        <Container>
          <HangboardTimer shouldVibrate={ this.state.vibrationEnabled }/>
        </Container>
      </div>
    );
  }
}

export default App;
