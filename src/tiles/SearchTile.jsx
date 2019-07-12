import React from 'react';
import { MosaicWindow, MosaicContext } from 'react-mosaic-component';
import Selector from './panels/Selector';

class SearchTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: []
    };
  }

  componentDidMount() {
    const classGroups = {};
    for (const s of this.props.servants) {
      if (!classGroups[s.className]) classGroups[s.className] = [];
      classGroups[s.className].push({id: s.id, label: s.name});
    }
    for (const c in classGroups) this.state.tree.push({
      id: c,
      label: c,
      childNodes: classGroups[c],
      icon: 'folder-close'
    });
    this.setState(this.state);
  }

  render() {
    return (<MosaicWindow path={this.props.path} createNode={() => this.props.new} title='Select Servant'>
      <MosaicContext.Consumer>
        {value => <Selector
          tree={this.state.tree}
          onSelect={id => value.mosaicActions.replaceWith(this.props.path, id)}
        />}
      </MosaicContext.Consumer>
    </MosaicWindow>);
  }
}

export default SearchTile;
