import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getDisplayPrice } from 'modules/PropertySearch/utils';
import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';

import PropertyInfoBox from './PropertyInfoBox';
import styles from './styles/marker.scss';

import { MARKER_POS_OFFSET_X, MARKER_POS_OFFSET_Y } from 'modules/PropertySearch/utils/customDistanceToMouse';
export const BRIEF_BOX_TIMEOUT = 1000; // 1000ms

class PropertyMarker extends Component {
  constructor(props) {
    super(props);
    this.alive = true;
    this.hoverCounter = null;
  }

  componentWillUnmount() {
    if (this.props.hoverState) {
      this.props.onHoverStateChange(-1);
    }

    if (this.props.briefState) {
      this.props.onBriefStateChange(-1);
    }

    if (this.props.infoboxState) {
      this.props.onInfoboxStateChange(-1);
    }

    this._clearTimeout();
    this.alive = false;
  }

  _elevateHovertoBrief = () => {
    this.props.onHoverStateChange(-1);
    this.props.onBriefStateChange(this.props.id);
  }

  _clearTimeout = () => {
    if (this.hoverCounter) {
      clearTimeout(this.hoverCounter);
      this.hoverCounter = null;
    }
  }

  // NOTE
  // calculating distance by marker pos and mouse pos didn't work out because
  // GoogleMap only supported constant for distanceToMouse
  _onMouseEnterContent = () => {
    this.props.onHoverStateChange(this.props.id);
    this._clearTimeout();
    this.hoverCounter = setTimeout(this._elevateHovertoBrief, BRIEF_BOX_TIMEOUT);
  }

  _onMouseLeaveContent = () => {
    this._clearTimeout();
    this.props.onHoverStateChange(-1);
    this.props.onBriefStateChange(-1);
  }

  _onClick = () => {
    this.props.onInfoboxStateChange(this.props.id);
    this._clearTimeout();
  }

  _onCloseClick = () => {
    this.props.onInfoboxStateChange(-1);
  }

  render() {
    const {
      customClassName,
      hoverState,
      briefState,
      infoboxState,
      data
    } = this.props;
    const displayPrice = getDisplayPrice(data.get('price'));

    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    const markerPosStyle = {
      left: MARKER_POS_OFFSET_X,
      top: MARKER_POS_OFFSET_Y
    };

    const markerClassName = cx(styles.marker, customClassName, {
      [styles.markerHoverState]: hoverState,
      [styles.markerBriefState]: briefState,
      [styles.markerInfoboxState]: infoboxState
    });

    return (
      <div className={styles.markerHolder} style={markerPosStyle}>
        <div
          className={markerClassName}
          onMouseEnter={this._onMouseEnterContent}
          onMouseLeave={this._onMouseLeaveContent}
          onClick={this._onClick}
        >
          <div className={styles.markerText}>{displayPrice}</div>
        </div>
        <PropertyInfoBox
          briefState={briefState}
          infoboxState={infoboxState}
          data={data}
          onCloseClick={this.onCloseClick}
        />
      </div>
    );
  }
}

PropertyMarker.propTypes = {
  // injected props from react-google-map
  $hover: PropTypes.bool,
  $dimensionKey: PropTypes.any,
  $getDimensions: PropTypes.func,
  $geoService: PropTypes.any,
  $onMouseAllow: PropTypes.func,

  // real estate properties from database
  id: PropTypes.string.isRequired,
  data: PropTypes.any,

  // hover -> highlight in table
  // brief state -> small info box
  // info box -> big info box with image carousel
  hoverState: PropTypes.bool.isRequired,
  briefState: PropTypes.bool.isRequired,
  infoboxState: PropTypes.bool.isRequired,
  onHoverStateChange: PropTypes.func.isRequired,
  onBriefStateChange: PropTypes.func.isRequired,
  onInfoboxStateChange: PropTypes.func.isRequired,

  customClassName: PropTypes.string
};

const mapStatesToProps = (state, props) => ({
  hoverState: selectors.selectModule(state).get('highlightIndex') === props.id,
  briefState: selectors.selectModule(state).get('briefBoxIndex') === props.id,
  infoboxState: selectors.selectModule(state).get('infoBoxIndex') === props.id,
});

const mapDispatchToProps = (dispatch) => ({
  onBriefStateChange: (markerIndex) => dispatch(actions.mapToggleBrief(markerIndex)),
  onInfoboxStateChange: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex)),
  onHoverStateChange: (markerIndex) => dispatch(actions.mapToggleHighlightIndex(markerIndex))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMarker);
