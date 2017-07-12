import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import TableView from './components/TableView';
import ListingView from './components/ListingView';

import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

class PropertyList extends Component {
  render() {
    const { view } = this.props;
    return (
      <Container fluid>
        <Button.Group>
          <Button onClick={() => this.props.setListingView('table')}>Table</Button>
          <Button.Or />
          <Button positive onClick={() => this.props.setListingView('listing')}>Listing</Button>
        </Button.Group>
        {view === 'table' && <TableView />}
        {view === 'listing' && <ListingView />}
      </Container>
    );
  }
}

PropertyList.propTypes = {
  setListingView: PropTypes.func.isRequired,
  view: PropTypes.any
};
const mapStatesToProps = (state) => ({
  view: selectors.selectView(state)
});

const mapDispatchToProps = (dispatch) => ({
  setListingView: (view) => dispatch(actions.setListingView(view))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyList);
