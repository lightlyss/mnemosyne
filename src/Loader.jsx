import React from 'react';
import { Spinner } from '@blueprintjs/core';

class Loader extends React.Component {
  render() {
    return (<Spinner
      intent={this.props.intent}
      size={Spinner.SIZE_LARGE}
      className='true-centered'
    />);
  }
}

export default Loader;
