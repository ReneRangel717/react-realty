import React, { Component } from 'react';
import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';

import styles from './styles.scss';

export default class PropertySearch extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <PropertyMap />
        </div>
        <div className={styles.tableContainer}>
          <PropertyTable />
        </div>
      </div>
    );
  }
}
