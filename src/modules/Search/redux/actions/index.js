import mapActions from './mapActions';
import searchActions from './searchActions';
import googlePlaceActions from './googlePlaceActions';

export default {
  ...mapActions,
  ...searchActions,
  ...googlePlaceActions
};
