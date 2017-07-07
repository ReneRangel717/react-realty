import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Container } from 'semantic-ui-react';
import Helmet from 'react-helmet';

import ImageCarousel from 'components/ImageCarousel';
import Loader from 'components/Loader';
import getSiteUrl from 'utils/getSiteUrl';
import getImageUrl from 'utils/getImageUrl';
import actions from './redux/actions';
import selectors from './redux/selectors';
import {
  loadPropertyDetailRequest as loadPropertyDetailSaga,
} from './redux/saga';

class PropertyDetail extends Component {
  componentWillMount() {
    const { city, property } = this.props.params;
    this.props.loadPropertyDetailRequest(`${city}/${property}`);
  }

  render() {
    const { propertyInfo, loading, path } = this.props;
    if (!propertyInfo) return null;
    if (loading) {
      return <Loader />;
    }

    const property = propertyInfo.toJS();
    const {
      city,
      community,
      address,
      remarks,
      mlsid,
      piccount,
    } = property;

    return (
      <Container>
        <Helmet>
          <title>{`${city} ${community} ${address}`}</title>
          <meta name="description" content={remarks} />
          <meta name="keywords" content={`${city} ${community} ${address}`} />
          <meta property="og:url" content={getSiteUrl(path)} />
          <meta property="og:title" content={address} />
          <meta property="og:description" content={remarks} />
          <meta property="og:type" content="place" />
          <meta property="og:image" content={getImageUrl(`${mlsid}-1`, 'original')} />
          <meta property="og:site_name" content="palmettopark.com" />
          <meta property="og:street-address" content={address} />
          <meta property="og:locality" content={community} />
          <meta property="og:region" content={city} />
        </Helmet>
        <Header as="h2">{address}</Header>
        <p>{remarks}</p>
        <ImageCarousel id={mlsid} picCount={piccount} size="original" shortcut />
      </Container>
    );
  }
}

PropertyDetail.preload = ({ city, property }) => ([
  [loadPropertyDetailSaga, { slug: `${city}/${property}` }]
]);

PropertyDetail.propTypes = {
  propertyInfo: PropTypes.any.isRequired,
  loadPropertyDetailRequest: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  path: PropTypes.string
};

const mapStatesToProps = (state) => ({
  propertyInfo: selectors.selectPropertyInfo(state),
  loading: selectors.selectLoading(state),
  path: selectors.selectPath(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadPropertyDetailRequest: (slug) => dispatch(actions.loadPropertyDetailRequest(slug)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyDetail);
