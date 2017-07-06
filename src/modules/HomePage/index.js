import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchInput from 'modules/Search/components/SearchInput';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Hello! Welcome to React Realty!</h1>
        <Link to="/home">Click here to view new Map!</Link> <br />
        <SearchInput />
      </div>
    );
  }
}

export default HomePage;
