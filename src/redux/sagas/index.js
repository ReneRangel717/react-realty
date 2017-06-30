import propertySearch from 'modules/PropertySearch/redux/saga';
import propertyDetail from 'modules/PropertyDetail/redux/saga';

export default function* root() {
  yield []
    .concat(propertySearch)
    .concat(propertyDetail);
}
