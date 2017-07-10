import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Image } from 'semantic-ui-react';

import Loader from 'components/Loader';
import getImageUrl from 'utils/getImageUrl';
import actions from './redux/actions';
import selectors from './redux/selectors';

class CommunityDetail extends Component {
  componentWillMount() {
    const { city, slug } = this.props.params;
    this.props.loadCommunityDetailRequest(`${city}/${slug}`);
  }

  render() {
    const { communityInfo, loading } = this.props;
    if (!communityInfo) return null;
    if (loading) {
      return <Loader />;
    }

    const community = communityInfo.toJS();

    return (
      <Container>
        <Header as="h2">{community.community}</Header>
        <Header as="h2">{community.price_range}</Header>
        {community.custom_img && <Image bordered src={getImageUrl(`community_images/${community.custom_img}`, 'original', '')} />}
      </Container>
    );
  }
}

CommunityDetail.propTypes = {
  communityInfo: PropTypes.any.isRequired,
  loadCommunityDetailRequest: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  path: PropTypes.string
};

const mapStatesToProps = (state) => ({
  communityInfo: selectors.selectCommunityInfo(state),
  loading: selectors.selectLoading(state),
  path: selectors.selectPath(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadCommunityDetailRequest: (slug) => dispatch(actions.loadCommunityDetailRequest(slug)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(CommunityDetail);
