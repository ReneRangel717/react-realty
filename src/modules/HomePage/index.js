import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Hello! Welcome to React Realty!</h1>
        <Link to="/s/boca-raton">Click here to view Boca Raton Map!</Link>
      </div>
    );
  }
}

export default HomePage;
