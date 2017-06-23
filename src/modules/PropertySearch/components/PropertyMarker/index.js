import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getDisplayPrice } from 'utils';
import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';

import PropertyInfoBox from './PropertyInfoBox';
import styles from './styles/marker.scss';

export const MARKER_POS_OFFSET_X = -30;
export const MARKER_POS_OFFSET_Y = -20;
export const BRIEF_BOX_TIMEOUT = 1000; // 1000ms
export const MIN_ZINDEX = 10000;
export const HOVER_DEFAULT_Z_INDEX = 1000000;

class PropertyMarker extends Component {
  constructor(props) {
    super(props);
    this.alive = true;
    this.hoverCounter = null;
  }

  componentWillUnmount() {
    if (this.props.hover) {
      this.props.onHover(-1);
    }

    if (this.props.infoboxState) {
      this.props.showInfoBox(-1);
    }

    this._clearTimeout();
    this.alive = false;
  }

  _elevateHovertoBrief = () => {
    this.props.showBriefBox();
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
    this.props.$onMouseAllow(false); // disable mouse move hovers

    this.props.onHover(this.props.id);
    this._clearTimeout();
    this.hoverCounter = setTimeout(this._elevateHovertoBrief, BRIEF_BOX_TIMEOUT);
  }

  _onMouseLeaveContent = () => {
    this.props.$onMouseAllow(true); // enable mouse move hovers

    this._clearTimeout();
    this.props.onHover(-1);
  }

  _onClick = () => {
    this.props.showInfoBox(this.props.id);
    this._clearTimeout();
  }

  _onCloseClick = () => {
    this.props.showInfoBox(-1);
  }

  render() {
    const {
      customClassName,
      hoverState,
      hover,
      infoboxState,
      data
    } = this.props;
    const briefBoxState = hover && hoverState;
    const displayPrice = getDisplayPrice(data.get('price'));

    // calculating z-index
    const zIndex = MIN_ZINDEX - (briefBoxState || infoboxState ? 20 : 0) + (hover ? HOVER_DEFAULT_Z_INDEX : 0);
    const infoBoxZIndex = HOVER_DEFAULT_Z_INDEX - 20 + 1 + (briefBoxState ? 1 : 0);

    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    const markerPosStyle = {
      left: MARKER_POS_OFFSET_X,
      top: MARKER_POS_OFFSET_Y
    };

    const markerClassName = cx(styles.marker, customClassName, {
      [styles.markerHoverState]: hover && this.alive,
      [styles.markerBriefState]: briefBoxState && this.alive,
      [styles.markerInfoboxState]: infoboxState && this.alive
    });

    return (
      <div className={styles.markerHolder} style={markerPosStyle}>
        <div
          className={markerClassName}
          onMouseEnter={this._onMouseEnterContent}
          onMouseLeave={this._onMouseLeaveContent}
          onClick={this._onClick}
          style={{ zIndex }}
        >
          <div className={styles.markerText}>{displayPrice}</div>
        </div>
        <PropertyInfoBox
          hoverState={hover && hoverState}
          infoboxState={infoboxState}
          data={data}
          onCloseClick={this.onCloseClick}
          style={{ zIndex: infoBoxZIndex }}
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

  hover: PropTypes.bool.isRequired,
  hoverState: PropTypes.bool.isRequired,
  infoboxState: PropTypes.bool.isRequired,
  showBriefBox: PropTypes.func.isRequired,
  showInfoBox: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,

  customClassName: PropTypes.string
};

const mapStatesToProps = (state, props) => ({
  hoverState: selectors.selectModule(state).get('hoverState'),
  hover: selectors.selectModule(state).get('hoverIndex') === props.id,
  infoboxState: selectors.selectModule(state).get('infoBoxIndex') === props.id,
});

const mapDispatchToProps = (dispatch) => ({
  showBriefBox: (markerIndex) => dispatch(actions.mapShowBrief(markerIndex)),
  showInfoBox: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex)),
  onHover: (markerIndex) => dispatch(actions.mapToggleHoverIndex(markerIndex))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMarker);
