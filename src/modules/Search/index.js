import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Container } from 'semantic-ui-react';

import SearchToolBar from './components/SearchToolBar';
import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';
import actions from './redux/actions';
import styles from './styles.scss';

class PropertySearch extends Component {
  render() {
    return (
      <Container fluid className={styles.container}>
        <SearchToolBar />
        <Container fluid className={styles.mapContainer}>
          <Sidebar.Pushable>
            <Sidebar
              animation="push"
              width="wide"
              direction="right"
              visible
            >
              <PropertyTable />
            </Sidebar>
            <Sidebar.Pusher className="mapContainer" style={{ height: '100%' }}>
              <PropertyMap />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </Container>
    );
  }
}

PropertySearch.propTypes = {
  esPropertySearchRequest: PropTypes.func.isRequired,
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  esPropertySearchRequest: () => dispatch(actions.esPropertySearchRequest()),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertySearch);
