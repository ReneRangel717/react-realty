import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import actions from './redux/actions';
// import {
//   loadPropertyDetailRequest as loadPropertyDetailSaga,
// } from './redux/saga';

class PropertyDetail extends Component {
  componentWillMount() {
    console.log(this.props.params);
    // this.props.loadPropertyDetailRequest(this.props.params.slug);
  }

  render() {
    return (
      <div>
        {this.props.params.property}
      </div>
    );
  }
}

// no need for server side fetch for below atm
// [loadPropertyDetailSaga, { place: params.city }]
// PropertyDetail.preload = (params) => ([
// ]);

PropertyDetail.propTypes = {
  loadPropertyDetailRequest: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  loadPropertyDetailRequest: () => dispatch(actions.loadPropertyDetailRequest()),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyDetail);
