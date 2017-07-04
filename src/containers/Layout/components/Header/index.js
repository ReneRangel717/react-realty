import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
