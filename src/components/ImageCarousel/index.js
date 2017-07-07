import React, { PropTypes, Component } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';

import { getImageUrl } from 'utils';
import styles from './styles.scss';

class ImageCarousel extends Component {
  _onClick = (e) => {
    // don't propogate to parent
    e.stopPropagation();
  }

  _customPaging = (index) => {
    const { id } = this.props;
    return (
      <a><img src={getImageUrl(`${id}-${index + 1}`, 'xs')} alt={`pager-${index}`} /></a>
    );
  }

  renderImages = () => {
    const { id, picCount, size } = this.props;
    const className = styles[`image-${size}`];
    return new Array(picCount).fill(1).map((v, index) => (
      <div key={`id-${index}`}>
        <img className={className} src={getImageUrl(`${id}-${index + 1}`, size)} alt={`id-${index}`} />
      </div>
    ));
  }

  render() {
    const { shortcut, lazyLoad, size } = this.props;
    const sliderSettings = {
      lazyLoad,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    };

    if (shortcut) {
      Object.assign(sliderSettings, {
        customPaging: this._customPaging,
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
      });
    }

    return (
      <div className={cx(styles.sliderHolder, { [styles.original]: size === 'original' })} onClick={this._onClick}>
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

ImageCarousel.defaultProps = {
  shortcut: false,
  lazyLoad: true
};

ImageCarousel.propTypes = {
  id: PropTypes.string.isRequired,
  picCount: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  shortcut: PropTypes.bool,
  lazyLoad: PropTypes.bool
};

export default ImageCarousel;
