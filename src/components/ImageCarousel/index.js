import React, { PropTypes, Component } from 'react';
import Slider from 'react-slick';
import { getImageUrl } from 'utils';
import styles from './styles.scss';

class ImageCarousel extends Component {
  _onClick = (e) => {
    // don't propogate to parent
    e.stopPropagation();
  }

  renderImages = () => {
    const { id, picCount, size } = this.props;
    const className = styles[`image-${size}`];
    return new Array(picCount).fill(1).map((v, index) => (
      <div key={`id-${index}`}>
        <img className={className} src={getImageUrl(id, index + 1, size)} alt={`id-${index}`} />
      </div>
    ));
  }

  render() {
    const sliderSettings = {
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    };

    return (
      <div className={styles.sliderHolder} onClick={this._onClick}>
        <Slider
          {...sliderSettings}
          ref={c => { this.slider = c; }}
        >
          {this.renderImages()}
        </Slider>
      </div>
    );
  }
}

ImageCarousel.propTypes = {
  id: PropTypes.string.isRequired,
  picCount: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired
};

export default ImageCarousel;
