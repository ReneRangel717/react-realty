import propertySearch from 'modules/PropertySearch/redux/saga';
import search from 'modules/Search/redux/saga';
import propertyDetail from 'modules/PropertyDetail/redux/saga';
import communityDetail from 'modules/CommunityDetail/redux/saga';
import agentDetail from 'modules/AgentDetail/redux/saga';

export default function* root() {
  yield []
    .concat(search)
    .concat(propertySearch)
    .concat(communityDetail)
    .concat(agentDetail)
    .concat(propertyDetail);
}
