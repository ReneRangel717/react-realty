import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import styles from './styles/infobox.scss';

class PropertyInfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      briefState: props.briefState,
      infoboxState: props.infoboxState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.briefState !== this.props.briefState) {
      this.setState({ briefState: nextProps.briefState });
    }

    if (nextProps.infoboxState !== this.props.infoboxState) {
      this.setState({ infoboxState: nextProps.infoboxState });
    }
  }

  render() {
    const { data } = this.props;
    const { briefState, infoboxState } = this.state;

    if (!briefState && !infoboxState) {
      // no need to render
      return null;
    }

    const dataObj = data.toJS();
    const {
      remarks: description
    } = dataObj;

    const boxClassNames = cx(styles.infoBoxHolder, {
      [styles.infoBoxBriefState]: briefState,
      [styles.infoBoxExpandedState]: infoboxState
    });

    // @TODO calculate infobox position dynamically on the edge of map
    return (
      <div className={boxClassNames}>
        <p>{description}</p>
      </div>
    );
  }
}

PropertyInfoBox.propTypes = {
  data: PropTypes.any,

  briefState: PropTypes.bool.isRequired,
  infoboxState: PropTypes.bool.isRequired,

  onCloseClick: PropTypes.func
};

export default PropertyInfoBox;
