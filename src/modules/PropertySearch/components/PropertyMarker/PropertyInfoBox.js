import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import ImageCarousel from 'components/ImageCarousel';

import styles from './styles/infobox.scss';

// @TODO place info box dynamically on the edge of the screen
class PropertyInfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: props.hoverState,
      infoboxState: props.infoboxState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hoverState !== this.props.hoverState) {
      this.setState({ hoverState: nextProps.hoverState });
    }

    if (nextProps.infoboxState !== this.props.infoboxState) {
      this.setState({ infoboxState: nextProps.infoboxState });
    }
  }

  renderCarousel = () => {
    const { data } = this.props;
    const dataObj = data.toJS();
    const { mlsid, piccount } = dataObj;
    const { infoboxState } = this.state;
    if (!infoboxState) {
      return null;
    }

    return (
      <ImageCarousel mlsId={mlsid} picCount={piccount} size="sm" />
    );
  }

  render() {
    const { data } = this.props;
    const { hoverState, infoboxState } = this.state;

    if (!hoverState && !infoboxState) {
      // no need to render
      return null;
    }

    const dataObj = data.toJS();
    const {
      description
    } = dataObj;

    const boxClassNames = cx(styles.infoBoxHolder, {
      [styles.infoBoxBriefState]: hoverState,
      [styles.infoBoxExpandedState]: infoboxState
    });

    // @TODO calculate infobox position dynamically on the edge of map
    return (
      <div className={boxClassNames}>
        {this.renderCarousel()}
        <p>{description}</p>
      </div>
    );
  }
}

PropertyInfoBox.propTypes = {
  data: PropTypes.any,

  hoverState: PropTypes.bool.isRequired,
  infoboxState: PropTypes.bool.isRequired,

  onCloseClick: PropTypes.func
};

export default PropertyInfoBox;
