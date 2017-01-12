import React, { Component } from 'react';
import Toolbar from 'rebass/dist/Toolbar';
// import Space from 'rebass/dist/Space';
import NavItem from 'rebass/dist/NavItem';
import Dropdown from 'rebass/dist/Dropdown';
import DropdownMenu from 'rebass/dist/DropdownMenu';
import Button from 'rebass/dist/Button';
import Arrow from 'rebass/dist/Arrow';
import Checkbox from 'rebass/dist/Checkbox';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      settingsOpen: false,
      vibrationEnabled: JSON.parse(localStorage.getItem('vibrate'))
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
    if (JSON.parse(localStorage.getItem('vibrate')) === true) {
      localStorage.setItem('vibrate', 'false');
    } else {
      localStorage.setItem('vibrate', 'true');
    }

    this.setState({
      vibrationEnabled: JSON.parse(localStorage.getItem('vibrate'))
    })
  }

  render() {
    return (
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
                onChange={ () => this.toggleVibration() }
              />
            </NavItem>
          </DropdownMenu>
          </Dropdown>
      </Toolbar>
    );
  }
}
