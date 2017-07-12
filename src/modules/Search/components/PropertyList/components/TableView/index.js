import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Image } from 'semantic-ui-react';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';
import { getDisplayPrice, getImageUrl } from 'utils';
import styles from './styles.scss';

class PropertyTableView extends Component {
  _onHoverRow = (_id) => () =>
    this.props.mapToggleHoverIndex(_id)

  _onClickRow = (_id) => () =>
    this.props.mapToggleInfobox(_id)

  _sort = (field) => () => {
    const sortOrder = this.props.sortValue.toJS()[1];
    const newOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    this.props.setSort([field, newOrder]);
  }

  renderPropertyListings = () => {
    const { markers } = this.props;
    return markers.map((marker) => {
      const id = marker.get('_id');
      return (
        <Table.Row
          key={`${id}`}
          onMouseEnter={this._onHoverRow(id)}
          onMouseLeave={this._onHoverRow(-1)}
          onClick={this._onClickRow(id)}
          positive={this.props.hoverIndex === id}
        >
          <Table.Cell>
            <Image inline src={getImageUrl(`${id}-1`, 'xs')} />
            {` ${marker.get('address')}`}
          </Table.Cell>
          <Table.Cell>{marker.get('community')}</Table.Cell>
          <Table.Cell>{getDisplayPrice(marker.get('price'))}</Table.Cell>
          <Table.Cell>{marker.get('sqft')}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const sortValue = this.props.sortValue.toJS();
    return (
      <Table sortable celled fixed unstackable className={styles.propertyTable}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={this._sort('address')} sorted={sortValue[0] === 'address' ? sortValue[1] : null}>Address</Table.HeaderCell>
            <Table.HeaderCell onClick={this._sort('community')} sorted={sortValue[0] === 'community' ? sortValue[1] : null}>Community</Table.HeaderCell>
            <Table.HeaderCell onClick={this._sort('price')} width="2" sorted={sortValue[0] === 'price' ? sortValue[1] : null}>Price</Table.HeaderCell>
            <Table.HeaderCell onClick={this._sort('sqft')} width="2" sorted={sortValue[0] === 'sqft' ? sortValue[1] : null}>Sq.Ft</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderPropertyListings()}
        </Table.Body>
      </Table>
    );
  }
}

PropertyTableView.propTypes = {
  markers: PropTypes.any.isRequired,
  hoverState: PropTypes.bool.isRequired,
  hoverIndex: PropTypes.any.isRequired,
  infoBoxIndex: PropTypes.any.isRequired,
  mapToggleHoverIndex: PropTypes.func.isRequired,
  mapToggleInfobox: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  sortValue: PropTypes.any
};

const mapStatesToProps = (state) => ({
  markers: selectors.selectProperties(state),
  hoverState: selectors.selectModule(state).get('hoverState'),
  hoverIndex: selectors.selectModule(state).get('hoverIndex'),
  infoBoxIndex: selectors.selectModule(state).get('infoBoxIndex'),
  sortValue: selectors.selectSort(state)
});

const mapDispatchToProps = (dispatch) => ({
  mapToggleHoverIndex: (markerIndex) => dispatch(actions.mapToggleHoverIndex(markerIndex)),
  mapToggleInfobox: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex)),
  setSort: (sort) => dispatch(actions.setSort(sort))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyTableView);
