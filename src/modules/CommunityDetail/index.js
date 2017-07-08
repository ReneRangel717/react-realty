import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Image } from 'semantic-ui-react';
import { getImageUrl } from 'utils';

class CommunityDetail extends Component {
  render() {
    const community = {
      community: 'Boca Pointe',
      city: 'Boca Raton',
      state: 'FL',
      image: 'boca_pointe_boca_raton.jpeg'
    };

    return (
      <Container>
        <Image bordered src={getImageUrl(`community_images/${community.image}`, 'original', '')} />
        <Header as="h2">
          {community.community}
        </Header>
      </Container>
    );
  }
}

CommunityDetail.propTypes = {
  params: PropTypes.object.isRequired,
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStatesToProps, mapDispatchToProps)(CommunityDetail);
