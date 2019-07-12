import React from 'react';
import { Tree } from '@blueprintjs/core';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    this.setState({nodes: this.props.tree});
  }

  render() {
    return (<div className='mn-panel'>
      <Tree contents={this.state.nodes}
        onNodeExpand={n => {
          n.isExpanded = true;
          this.setState(this.state);
        }}
        onNodeCollapse={n => {
          n.isExpanded = false;
          this.setState(this.state);
        }}
        onNodeClick={n => {
          if (!n.childNodes) this.props.onSelect(n.id);
        }}
      />
    </div>);
  }
}

export default Selector;
