import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Segment, Label, Image, Item, Grid } from 'semantic-ui-react';

import Helmet from 'react-helmet';

import ImageCarousel from 'components/ImageCarousel';
import Loader from 'components/Loader';
import getSiteUrl from 'utils/getSiteUrl';
import getImageUrl from 'utils/getImageUrl';
import actions from './redux/actions';
import selectors from './redux/selectors';

import styles from './styles.scss';

class PropertyDetail extends Component {
  componentWillMount() {
    const { city, slug } = this.props.params;
    this.props.loadPropertyDetailRequest(`${city}/${slug}`);
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
      status,
      state,
      zip,
      price,
      beds,
      baths_full,
      sqft
    } = property;

    console.log(property);

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
        <Segment raised>
          <Label as="a" color="red" ribbon>Just Listed</Label>
          <Header className={styles.header}>
            <Grid>
              <Grid.Column width={7} className={styles.address} verticalAlign="middle">
                <Item>
                  <Item.Image size="tiny" src="/assets/images/image1.png" centered />
                  <Item.Content>
                    <Item.Header as="h2" className={styles.title}>{address}</Item.Header>
                    <Item.Meta as="h6" className={styles.description}>{city}, {state} {zip}</Item.Meta>
                    <Item.Description as="h6" className={styles.description}>
                      Status: {status}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Grid.Column width={6} className={styles.details} textAlign="center">
                <Segment basic as="span">
                  <strong>${price}</strong> <br></br> Listed at Price
                </Segment>
                <Segment basic as="span">
                  <strong>{beds}</strong> <br></br> Beds
                </Segment>
                <Segment basic as="span">
                  <strong>{baths_full.toString()}</strong> <br></br> Baths
                </Segment>
                <Segment basic as="span">
                  <strong>{sqft}</strong> Sq.Ft <br></br> $128/Sq.Ft
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
              </Grid.Column>
            </Grid>
          </Header>
          <p>{remarks}</p>
          <ImageCarousel id={mlsid} picCount={piccount} size="original" shortcut />
        </Segment>
      </Container>
    );
  }
}

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
