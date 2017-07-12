import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Sidebar, Container, Grid } from 'semantic-ui-react';

import SearchToolBar from './components/SearchToolBar';
import PropertyMap from './components/PropertyMap';
import PropertyList from './components/PropertyList';
import actions from './redux/actions';
import selectors from './redux/selectors';
import styles from './styles.scss';

class PropertySearch extends Component {
  componentWillMount() {
    const { esCitySearchRequest, esCommunitySearchRequest, esAgentSearchRequest } = this.props;
    esCitySearchRequest();
    esCommunitySearchRequest();
    esAgentSearchRequest();
  }

  render() {
    return (
      <div className={styles.flexContainer}>
        <SearchToolBar />
        <Container fluid className={styles.flexRow}>
          <Sidebar.Pushable>
            <Sidebar
              animation="overlay"
              width="wide"
              direction="right"
              visible={this.props.sidebar}
              className={styles.sidebar}
            >
              <PropertyList />
            </Sidebar>
            <Sidebar.Pusher style={{ height: '100%' }}>
              <Grid style={{ height: '100%' }}>
                <Grid.Column width={16} computer={10} tablet={8} className={cx('mapContainer', styles.mapColumn)}>
                  <PropertyMap />
                </Grid.Column>
                <Grid.Column computer={6} tablet={8} only="computer tablet" className={styles.tableColumn}>
                  <PropertyList />
                </Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </div>
    );
  }
}

PropertySearch.propTypes = {
  esCommunitySearchRequest: PropTypes.func.isRequired,
  esCitySearchRequest: PropTypes.func.isRequired,
  esAgentSearchRequest: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired
};

const mapStatesToProps = (state) => ({
  sidebar: selectors.selectSidebar(state)
});

const mapDispatchToProps = (dispatch) => ({
  esCitySearchRequest: () => dispatch(actions.esCitySearchRequest()),
  esCommunitySearchRequest: () => dispatch(actions.esCommunitySearchRequest()),
  esAgentSearchRequest: () => dispatch(actions.esAgentSearchRequest()),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertySearch);
