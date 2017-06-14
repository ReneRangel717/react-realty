import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './MainView.scss'; // eslint-disable-line

const AnyReactComponent = ({ text }) => <div>{text}</div>; // eslint-disable-line

class MainView extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    return (
      <div className={styles.mainView}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

MainView.propTypes = {
  center: {
    lat: PropTypes.number,
    lng: PropTypes.number
  },
  zoom: PropTypes.number
};

export default MainView;
