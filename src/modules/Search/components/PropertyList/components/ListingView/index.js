import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';
import styles from './styles/listing-view.scss';
import PropertyListing from './PropertyListing';

class PropertyListingView extends Component {
  _onHoverRow = (_id) => () =>
    this.props.mapToggleHoverIndex(_id)

  _onClickRow = (_id) => () =>
    this.props.mapToggleInfobox(_id)

  // @TODO simulate infinite loading by storing endpos in state after API load
  renderPropertyListings = () => {
    const { markers } = this.props;
    return markers.map((marker) => {
      const id = marker.get('_id');
      return (
        <PropertyListing
          key={`${id}`}
          id={id}
          data={marker}
          hoverState={this.props.hoverIndex === id}
          onHover={this._onHoverRow(id)}
          onMouseLeave={this._onHoverRow(-1)}
          onClick={this._onClickRow(id)}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.tableHolder}>
        {this.renderPropertyListings()}
      </div>
    );
  }
}


PropertyListingView.propTypes = {
  markers: PropTypes.any.isRequired,
  hoverState: PropTypes.bool.isRequired,
  hoverIndex: PropTypes.any.isRequired,
  infoBoxIndex: PropTypes.any.isRequired,

  mapToggleHoverIndex: PropTypes.func.isRequired,
  mapToggleInfobox: PropTypes.func.isRequired
};

const mapStatesToProps = (state) => ({
  markers: selectors.selectProperties(state),
  hoverState: selectors.selectModule(state).get('hoverState'),
  hoverIndex: selectors.selectModule(state).get('hoverIndex'),
  infoBoxIndex: selectors.selectModule(state).get('infoBoxIndex'),
});

const mapDispatchToProps = (dispatch) => ({
  mapToggleHoverIndex: (markerIndex) => dispatch(actions.mapToggleHoverIndex(markerIndex)),
  mapToggleInfobox: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyListingView);
