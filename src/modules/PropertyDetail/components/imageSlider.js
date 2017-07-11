import React, { PropTypes, Component } from 'react';

import ImageGallery from 'react-image-gallery';
import { getImageUrl } from 'utils';

class ImageSlider extends Component {

  render() {
    const { id, picCount, size } = this.props;
    const images = new Array(picCount).fill(1).map((v, index) => (
      {
        original: getImageUrl(`${id}-${index + 1}`, size),
        thumbnail: getImageUrl(`${id}-${index + 1}`, 'sm')
      }
    ));

    return (
      <ImageGallery items={images} slideInterval={2000} />
    );
  }
}

ImageSlider.propTypes = {
  id: PropTypes.any,
  picCount: PropTypes.any,
  size: PropTypes.any
};

export default ImageSlider;
