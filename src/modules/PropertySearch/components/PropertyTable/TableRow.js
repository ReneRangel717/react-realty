import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import ImageCarousel from 'components/ImageCarousel';

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

  renderCarousel = () => {
    const { data } = this.props;
    const dataObj = data.toJS();
    const { id, piccount } = dataObj;

    return (
      <ImageCarousel id={id} picCount={piccount} size="sm" />
    );
  }

  render() {
    const { data, onHover, onClick, onMouseLeave } = this.props;
    const { hoverState } = this.state;
    const rowClassNames = cx(styles.tableRow, {
      [styles.tableRowHover]: hoverState
    });
    const dataObj = data.toJS();
    const {
      remarks
    } = dataObj;

    return (
      <div className={rowClassNames} onMouseEnter={onHover} onMouseLeave={onMouseLeave} onClick={onClick}>
        <p className={styles.description}>{remarks}</p>
        {this.renderCarousel()}
      </div>
    );
  }
}

TableRow.propTypes = {
  data: PropTypes.any,
  hoverState: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TableRow;
