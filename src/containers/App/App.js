import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './App.scss'; // eslint-disable-line

class App extends Component {
  render() {
    const { children, inputValue } = this.props;
    return (
      <div className={styles.app}>
        <Helmet
          title="React Realty"
          meta={[{ property: 'og:site_name', content: 'React Realty' }]}
        />
        <div className={styles.content}>
          {children}
        </div>
      </div>
      );
  }
}

export default App;
