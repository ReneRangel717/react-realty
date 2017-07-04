import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchBox from 'modules/Search/components/SearchBox';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Hello! Welcome to React Realty!</h1>
        <Link to="/home">Click here to view new Map!</Link> <br />
        <SearchBox />
      </div>
    );
  }
}

export default HomePage;
