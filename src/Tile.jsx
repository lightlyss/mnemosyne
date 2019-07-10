import React from 'react';
import { MosaicWindow, MosaicContext } from 'react-mosaic-component';
import { Classes, H5, Tab, Tabs } from '@blueprintjs/core';
import Selector from './Selector';

class Tile extends React.Component {
  render() {
    if (!this.props.svt) return (
      <MosaicWindow path={this.props.path} createNode={() => this.props.new} title='Select Servant'>
        <MosaicContext.Consumer>
          {value => <Selector
            tree={this.props.selectorTree}
            onSelect={id => value.mosaicActions.replaceWith(this.props.path, id)}
          />}
        </MosaicContext.Consumer>
      </MosaicWindow>
    );

    return (
      <MosaicWindow
        path={this.props.path} createNode={() => this.props.new}
        title={`${this.props.svt.name} (#${this.props.svt.id})`}
      >
        <Tabs animate={true} id={`tabs-${this.props.svt.id}`} vertical={true}>
          <Tab id='art' title='Art' panel={<ArtPanel host={this.props.host} svt={this.props.svt}/>}/>
          <Tab id='sk' title='Skills' panel={<SkillPanel svt={this.props.svt}/>}/>
          <Tab id='pss' title='Passives' panel={<PassivePanel svt={this.props.svt}/>}/>
          <Tab id='ascm' title='Ascension Material' panel={<AscMatPanel svt={this.props.svt}/>}/>
          <Tab id='skm' title='Skill Material' panel={<SkillMatPanel svt={this.props.svt}/>}/>
          <Tabs.Expander/>
        </Tabs>
      </MosaicWindow>
    );
  }
}

const ArtPanel = props => (
  <div className='svt-cell'>
    <img src={`${props.host}/img/servants/${props.svt.id}1.png`} alt=''/>
  </div>
);

const SkillPanel = props => (
  <div className='svt-cell'>
    <H5>Skills</H5>
    <p className={Classes.RUNNING_TEXT}>{props.svt.actives.join('; ')}</p>
  </div>
);

const PassivePanel = props => (
  <div className='svt-cell'>
    <H5>Passives</H5>
    <p className={Classes.RUNNING_TEXT}>{props.svt.passives.join('; ')}</p>
  </div>
);

const AscMatPanel = props => (
  <div className='svt-cell'>
    <H5>Ascension Materials</H5>
    <p className={Classes.RUNNING_TEXT}>{props.svt.ascs.join(' | ')}</p>
  </div>
);

const SkillMatPanel = props => (
  <div className='svt-cell'>
    <H5>Skill Upgrade Materials</H5>
    <p className={Classes.RUNNING_TEXT}>{props.svt.upgrades.join(' | ')}</p>
  </div>
);

export default Tile;
