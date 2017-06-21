import propertySearch from 'modules/PropertySearch/redux/saga';

export default function* root() {
  yield []
    .concat(propertySearch);
}
