import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Image } from 'semantic-ui-react';
import { getImageUrl } from 'utils';

class AgentDetail extends Component {
  render() {
    const agent = {
      user: 'candice',
      name: 'Candice Herring',
      office: 'Greenville, SC'
    };

    return (
      <Container>
        <Header as="h2">
          <Image bordered size="medium" floated="left" shape="circular" src={getImageUrl(`agents/${agent.user}`, [100, 100], 'png')} />
          {agent.name}
        </Header>
        <p>{agent.name}</p>
      </Container>
    );
  }
}

AgentDetail.propTypes = {
  params: PropTypes.object.isRequired,
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStatesToProps, mapDispatchToProps)(AgentDetail);
