import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import PureRenderer from '../../components/PureRenderer';

export default class MainViewLayout extends Component {
  static propTypes = {
    renderMap: PropTypes.func,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '62%', height: '100%' }}>
          <PureRenderer render={this.props.renderMap} />
        </div>
      </div>
    );
  }
}
