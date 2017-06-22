import mapActions from './mapActions';
import googlePlaceActions from './googlePlaceActions';
import searchActions from './searchActions';

export default {
  ...mapActions,
  ...googlePlaceActions,
  ...searchActions
};
