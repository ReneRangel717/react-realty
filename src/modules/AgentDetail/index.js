
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Image } from 'semantic-ui-react';

import Loader from 'components/Loader';
import getImageUrl from 'utils/getImageUrl';
import actions from './redux/actions';
import selectors from './redux/selectors';
import { loadAgentDetailRequest as loadAgentDetailSaga } from 'modules/AgentDetail/redux/saga';

class AgentDetail extends Component {
  componentWillMount() {
    const { username } = this.props.params;
    this.props.loadAgentDetailRequest(username);
  }

  render() {
    const { agentInfo, loading } = this.props;
    if (!agentInfo) return null;
    if (loading) {
      return <Loader />;
    }

    const agent = agentInfo.toJS();

    return (
      <Container>
        <Header as="h2">{agent.username}</Header>
        <Image bordered size="small" floated="left" shape="circular" src={getImageUrl(`agents/${agent.username}`, [100, 100], 'png')} />
      </Container>
    );
  }
}


AgentDetail.preload = ({ username }) => ([
  [loadAgentDetailSaga, { username }],
]);

AgentDetail.propTypes = {
  agentInfo: PropTypes.any.isRequired,
  loadAgentDetailRequest: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStatesToProps = (state) => ({
  agentInfo: selectors.selectAgentInfo(state),
  loading: selectors.selectLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadAgentDetailRequest: (username) => dispatch(actions.loadAgentDetailRequest(username)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(AgentDetail);
