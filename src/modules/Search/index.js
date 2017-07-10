import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Sidebar, Container, Grid } from 'semantic-ui-react';

import SearchToolBar from './components/SearchToolBar';
import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';
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
      <Container fluid className={styles.flexContainer}>
        <SearchToolBar />
        <Container fluid className={styles.flexRow}>
          <Sidebar.Pushable>
            <Sidebar
              animation="push"
              width="wide"
              direction="right"
              visible={this.props.sidebar}
              style={{ width: '100%' }}
            >
              <PropertyTable />
            </Sidebar>
            <Sidebar.Pusher style={{ height: '100%' }}>
              <Grid style={{ height: '100%' }}>
                <Grid.Column width={16} computer={12} className={cx('mapContainer', styles.mapColumn)}>
                  <PropertyMap />
                </Grid.Column>
                <Grid.Column computer={4} only="computer" className={styles.tableColumn}>
                  <PropertyTable />
                </Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </Container>
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
