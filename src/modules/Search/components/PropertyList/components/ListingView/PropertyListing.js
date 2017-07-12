import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { Card, Image } from 'semantic-ui-react';
import { getImageUrl } from 'utils';
import ImageCarousel from 'components/ImageCarousel';

import styles from './styles/listing.scss';

class PropertyListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: props.hoverState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hoverState !== this.props.hoverState) {
      this.setState({ hoverState: nextProps.hoverState });
    }
  }

  renderCarousel = () => {
    const { data } = this.props;
    const dataObj = data.toJS();
    const { _id, piccount } = dataObj;

    return (
      <ImageCarousel id={_id} picCount={piccount} size="sm" />
    );
  }

  render() {
    const { data, onHover, onMouseLeave, onClick } = this.props;
    const { hoverState } = this.state;
    const dataObj = data.toJS();
    const {
      address,
      url,
      remarks
    } = dataObj;

    return (
      <Card
        raised={hoverState}
        onMouseEnter={onHover}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <Image src={getImageUrl(`${dataObj._id}-1`, [350, 150])} />
        <Card.Content className={cx({ [styles.hover]: hoverState })}>
          <Card.Header>
            <Link to={`/${url}`}>{address}</Link>
          </Card.Header>
          <Card.Description>{`${remarks.substr(0, 100)}...`}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

PropertyListing.propTypes = {
  data: PropTypes.any,
  hoverState: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PropertyListing;
