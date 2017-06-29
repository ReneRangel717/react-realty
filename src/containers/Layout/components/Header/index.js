import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';

class Header extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item>Home</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
