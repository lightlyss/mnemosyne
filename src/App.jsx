import React from 'react';
import { Mosaic } from 'react-mosaic-component';
import { Intent } from '@blueprintjs/core';
import Loader from './Loader';
import Tile from './Tile';

const HOSTNAME = 'https://lightlyss.github.io/mooncell';
const INIT_MOSAIC = {
  direction: 'row',
  first: '195',
  second: {
    direction: 'column',
    first: '198',
    second: '150'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: {},
      loading: true,
      err: null
    };
  }

  componentDidMount() {
    fetch(`${HOSTNAME}/json/akasha.json`)
      .then(res => {
        if (!res.ok) throw new Error('Unexpected response');
        return res.json();
      })
      .then(db => this.setState({db, loading: false}))
      .catch(err => this.setState({err, loading: false}));
  }

  renderTile(id, path) {
    const svt = this.state.db.servants.find(s => s.id === id);
    return (<Tile path={path} new='166' host={HOSTNAME} svt={svt}/>);
  }

  render() {
    if (this.state.err) return (<Loader intent={Intent.DANGER}/>);
    if (this.state.loading) return (<Loader intent={Intent.SUCCESS}/>);
    return (<Mosaic
      renderTile={(id, path) => this.renderTile(id, path)}
      initialValue={INIT_MOSAIC}
      className='mosaic-blueprint-theme bp3-dark'
    />);
  }
}

export default App;
