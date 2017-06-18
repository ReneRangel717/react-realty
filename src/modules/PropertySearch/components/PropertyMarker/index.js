import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getDisplayPrice } from 'modules/PropertySearch/utils';
import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';

import styles from './styles.scss';

class PropertyMarker extends Component {
  constructor(props) {
    super(props);
    this.alive = true;
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.$hover !== this.props.$hover) {
  //     setTimeout(() => this._onHoverStateChange(), 30);
  //   }
  // }

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
    this.alive = false;
  }

  _onMouseEnterContent = () => {
    this.props.$onMouseAllow(false); // disable mouse move hovers
  }

  _onMouseLeaveContent = () => {
    this.props.$onMouseAllow(true); // enable mouse move hovers
  }

  _onCloseClick = () => {
    this.props.onInfoboxStateChange(-1);
  }

  render() {
    const {
      customClassName,
      data
    } = this.props;
    const displayPrice = getDisplayPrice(data.get('price'));

    return (
      <div className={styles.markerHolder}>
        <div
          className={cx(styles.marker, customClassName)}
          onMouseEnter={this._onMouseEnterContent}
          onMouseLeave={this._onMouseLeaveContent}
        >
          <div className={styles.markerText}>{displayPrice}</div>
        </div>
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
  hoverState: selectors.selectModule(state).highlightIndex === props.id,
  briefState: selectors.selectModule(state).briefBoxIndex === props.id,
  infoboxState: selectors.selectModule(state).infoBoxIndex === props.id,
});

const mapDispatchToProps = (dispatch) => ({
  onBriefStateChange: (markerIndex) => dispatch(actions.mapToggleBrief(markerIndex)),
  onInfoboxStateChange: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex)),
  onHoverStateChange: (markerIndex) => dispatch(actions.mapToggleHighlightIndex(markerIndex))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMarker);
