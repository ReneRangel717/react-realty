import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import selectors from 'modules/AgentDetail/redux/selectors';

class AgentReviews extends Component {
  render() {
    const { reviews } = this.props;
    const reviewsArray = reviews.toJS();

    return (
      <Container>
        {JSON.stringify(reviewsArray)}
      </Container>
    );
  }
}

AgentReviews.propTypes = {
  reviews: PropTypes.any.isRequired,
};

const mapStatesToProps = (state) => ({
  reviews: selectors.selectReviews(state),
});

export default connect(mapStatesToProps)(AgentReviews);
