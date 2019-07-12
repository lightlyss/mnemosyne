import React from 'react';
import { MosaicWindow } from 'react-mosaic-component';
import { Tab, Tabs } from '@blueprintjs/core';
import { ArtPanel, StatusPanel, SkillPanel, PassivePanel, AscMatPanel, SkillMatPanel } from './panels/InfoPanel';

class Tile extends React.Component {
  render() {
    const { svt } = this.props;
    return (<MosaicWindow path={this.props.path} createNode={() => this.props.new} title={`${svt.name} (#${svt.id})`}>
      <Tabs animate={true} id={`tabs-${svt.id}`} vertical={true}>
        <Tab id='art' title='Art' panel={<ArtPanel host={this.props.host} svt={svt}/>}/>
        <Tab id='stat' title='Status' panel={<StatusPanel host='.' svt={svt}/>}/>
        <Tab id='sk' title='Skills' panel={<SkillPanel svt={svt}/>}/>
        <Tab id='pss' title='Passives' panel={<PassivePanel svt={svt}/>}/>
        <Tab id='ascm' title='Ascension Material' panel={<AscMatPanel svt={svt}/>}/>
        <Tab id='skm' title='Skill Material' panel={<SkillMatPanel svt={svt}/>}/>
        <Tabs.Expander/>
      </Tabs>
    </MosaicWindow>);
  }
}

export default Tile;
