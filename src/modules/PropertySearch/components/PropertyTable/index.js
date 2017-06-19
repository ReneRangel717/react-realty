import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';
import styles from './styles/table.scss';
import TableRow from './TableRow';

class PropertyTable extends Component {
  _onHoverRow = (_id) => () =>
    this.props.mapToggleHoverIndex(_id)

  _onClickRow = (_id) => () =>
    this.props.mapToggleInfobox(_id)

  // @TODO simulate infinite loading by storing endpos in state after API load
  renderTableRows = () => {
    const { filteredMarkers } = this.props;
    return filteredMarkers.map((marker) => {
      const id = marker.get('_id');
      return (
        <TableRow
          key={`${id}`}
          id={id}
          data={marker}
          hoverState={this.props.hoverIndex === id}
          onHover={this._onHoverRow(id)}
          onClick={this._onClickRow(id)}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.tableHolder}>
        {this.renderTableRows()}
      </div>
    );
  }
}


PropertyTable.propTypes = {
  filteredMarkers: PropTypes.any.isRequired,
  hoverState: PropTypes.bool.isRequired,
  hoverIndex: PropTypes.any.isRequired,
  infoBoxIndex: PropTypes.any.isRequired,

  mapToggleHoverIndex: PropTypes.func.isRequired,
  mapToggleInfobox: PropTypes.func.isRequired
};

const mapStatesToProps = (state) => ({
  filteredMarkers: selectors.selectFilteredMarkers(state),
  hoverState: selectors.selectModule(state).get('hoverState'),
  hoverIndex: selectors.selectModule(state).get('hoverIndex'),
  infoBoxIndex: selectors.selectModule(state).get('infoBoxIndex'),
});

const mapDispatchToProps = (dispatch) => ({
  mapToggleHoverIndex: (markerIndex) => dispatch(actions.mapToggleHoverIndex(markerIndex)),
  mapToggleInfobox: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyTable);
