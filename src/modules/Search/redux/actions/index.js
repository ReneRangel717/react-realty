import mapActions from './mapActions';
import searchActions from './searchActions';
import googlePlaceActions from './googlePlaceActions';
import otherActions from './otherActions';

export default {
  ...mapActions,
  ...searchActions,
  ...otherActions,
  ...googlePlaceActions
};
