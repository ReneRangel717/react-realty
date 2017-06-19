import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import styles from './styles/row.scss';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: props.hoverState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hoverState !== this.props.hoverState) {
      this.setState({ hoverState: nextProps.hoverState });
    }
  }

  render() {
    const { data, onHover, onClick } = this.props;
    const { hoverState } = this.state;
    const rowClassNames = cx(styles.tableRow, {
      [styles.tableRowHover]: hoverState
    });
    const dataObj = data.toJS();
    const {
      description
    } = dataObj;

    return (
      <div className={rowClassNames} onMouseOver={onHover} onClick={onClick}>
        <p>{description}</p>
      </div>
    );
  }
}

TableRow.propTypes = {
  data: PropTypes.any,
  hoverState: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TableRow;
