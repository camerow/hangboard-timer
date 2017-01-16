import React, { Component } from 'react';
import { Link } from 'react-router';

import Toolbar from 'rebass/dist/Toolbar';
import NavItem from 'rebass/dist/NavItem';
import Dropdown from 'rebass/dist/Dropdown';
import DropdownMenu from 'rebass/dist/DropdownMenu';
import Button from 'rebass/dist/Button';
import Arrow from 'rebass/dist/Arrow';
import Drawer from 'rebass/dist/Drawer';
import Checkbox from 'rebass/dist/Checkbox';
import Block from 'rebass/dist/Block';
import Close from 'rebass/dist/Close';
import Fixed from 'rebass/dist/Fixed';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      settingsOpen: false,
      vibrationEnabled: JSON.parse(localStorage.getItem('vibrate')),
      drawerOpen: false,
      vibrationCompatible: ('vibrate' in navigator)
    };
  }

  toggleDrawer() {
    console.log('toggle drawer!', this.state.drawerOpen);
    this.setState(prevState => {
      return {
        drawerOpen: !prevState.drawerOpen
      }
    });
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
    let vibrateLabel = "Vibrate" + (this.state.vibrationCompatible ? '' : '(unavailable on device)');
    return (
      <div>
        <Drawer
        backgroundColor='#EFE9F4'
        size={240}
        position='right'
        open={this.state.drawerOpen}
        onDismiss={ () => this.toggleDrawer() }>
        <div style={{ padding: '8px', display: 'flex', justifyContent: 'flex-end' }}>
        <Close onClick={ () => this.toggleDrawer() } />
        </div>

        {
          /*<NavItem
          is={ Link }
          to='timer'
          width={200}
          color='black'>
          <Button>  Timer </Button>
          </NavItem> */
        }
        <NavItem>
        <Checkbox
        label={vibrateLabel}
        theme='success'
        style={{ color: "#333"}}
        name="vibrate_enabled"
        disabled={!this.state.vibrationCompatible}
        checked={this.state.vibrationEnabled}
        onChange={ () => this.toggleVibration() }
        />
        </NavItem>
        </Drawer>
        <Fixed style={{ top: 0, left: 0, right: 0}}>
          <Toolbar>
            <NavItem style={{ fontSize: '20px'}}>
              Hangboard Timer
            </NavItem>
            <NavItem onClick={ () => this.toggleDrawer() }>
              Settings
            </NavItem>

          </Toolbar>
        </Fixed>
      </div>
    );
  }
}
