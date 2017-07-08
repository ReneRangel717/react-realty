import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CommunityDetail from 'modules/CommunityDetail';
import PropertyDetail from 'modules/PropertyDetail';
import { decideProperty } from 'utils';
import {
  loadPropertyDetailRequest as loadPropertyDetailSaga,
} from 'modules/PropertyDetail/redux/saga';

class CommunityOrProperty extends Component {
  render() {
    const { params } = this.props;
    if (decideProperty(params.slug)) {
      return <PropertyDetail params={this.props.params} />;
    }

    return <CommunityDetail params={this.props.params} />;
  }
}

CommunityOrProperty.preload = ({ city, slug }) => ([
  [loadPropertyDetailSaga, { slug: `${city}/${slug}` }]
]);

CommunityOrProperty.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStatesToProps, mapDispatchToProps)(CommunityOrProperty);
