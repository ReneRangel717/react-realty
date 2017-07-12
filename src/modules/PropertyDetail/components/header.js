import React, { PropTypes, Component } from 'react';
import { Segment, Header, Image, Item, Grid, Button, Menu } from 'semantic-ui-react';

class PropertyHeader extends Component {
  render() {
    const { property, styles } = this.props;

    const {
      city,
      address,
      status,
      state,
      zip,
      price,
      beds,
      baths_full,
      sqft
    } = property;

    return (
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
          <Grid.Column width={3} className={styles.btnGroup}>
            <Button basic icon="heart" content="" />
            <Button basic icon="close" content="" />
            <Button basic icon="share" content="" />
          </Grid.Column>
        </Grid>
        <Menu text className={styles.menuItems}>
          <Menu.Item name="Overview" />
          <Menu.Item name="Property Details" />
          <Menu.Item name="Tour Insights" />
          <Menu.Item name="Redfin Estimate" />
          <Menu.Item name="Property History" />
          <Menu.Item name="Public Facts" />
          <Menu.Item name="Schools" />
          <Menu.Item name="Neighborhood" />
          <Menu.Item name="Similar Homes" />
        </Menu>
      </Header>
    );
  }
}

PropertyHeader.propTypes = {
  property: PropTypes.any,
  styles: PropTypes.any
};

export default PropertyHeader;

