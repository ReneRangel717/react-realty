import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Container } from 'semantic-ui-react';

import { getDisplayPrice } from 'utils';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

const defaultPrices = (() => {
  const prices = [];
  for (let i = 50000; i < 1000 * 1000; i = i + 50000) {
    prices.push(i);
  }

  for (let i = 1000 * 1000; i <= 10 * 1000 * 1000; i = i + 500 * 1000) {
    prices.push(i);
  }

  return prices;
})();

class PriceInput extends Component {
  _onPriceChange = (val, name = 'min') => {
    const { filters, setFilter } = this.props;
    let price = filters.get('price');
    price = price && price.toJS();
    if (!price.length) {
      price = [0, 0];
    }

    if (name === 'min') {
      price[0] = val;
    } else {
      price[1] = val;
    }

    setFilter('price', price);
  }

  _onMinPriceChange = (event, data) => {
    this._onPriceChange(data.value, 'min');
  }

  _onMaxPriceChange = (event, data) => {
    this._onPriceChange(data.value, 'max');
  }

  _generateMinOptions = (val = 0, max = 0) => {
    const increment = 50000;
    const values = [val];
    let newVal = val;
    while (newVal > 0 && values.length < 4) {
      newVal = newVal - increment;
      values.unshift(newVal);
    }

    newVal = val;
    while (newVal < max && values.length < 6) {
      newVal = newVal + increment;
      values.push(newVal);
    }

    return values.map((value) => ({
      key: value,
      text: getDisplayPrice(value),
      value
    }));
  }

  _generateMaxOptions = (min) => {
    const options = defaultPrices
      .filter((price) => !min || price > min)
      .map((value) => ({
        key: value,
        text: getDisplayPrice(value),
        value
      }));
    options.unshift({
      key: 'no max',
      text: 'No max',
      value: 0
    });
    return options;
  }

  _generateMinOptions = (max) => {
    const options = defaultPrices
      .filter((price) => !max || price < max)
      .map((value) => ({
        key: value,
        text: getDisplayPrice(value),
        value
      }));
    options.unshift({
      key: 'no min',
      text: 'No min',
      value: 0
    });
    return options;
  }

  render() {
    const { filters } = this.props;
    const price = filters.get('price').toJS() || [0, 0];
    const minOptions = this._generateMinOptions(price[1]);
    const maxOptions = this._generateMaxOptions(price[0]);
    return (
      <Container fluid>
        <Dropdown
          selection
          compact
          defaultValue={price[0] * 1 || 0}
          placeholder="Min Price"
          options={minOptions}
          onChange={this._onMinPriceChange}
        />
        {' to '}
        <Dropdown
          selection
          compact
          defaultValue={price[1] * 1 || 0}
          placeholder="Max Price"
          options={maxOptions}
          onChange={this._onMaxPriceChange}
        />
      </Container>
    );
  }
}

PriceInput.propTypes = {
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PriceInput);
