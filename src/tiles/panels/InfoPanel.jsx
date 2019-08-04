import React from 'react';
import { Divider, Tooltip, Position } from '@blueprintjs/core';
import Selector from './Selector';

export class ArtPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgId: null
    };
  }

  componentDidMount() {
    const { id } = this.props.svt;
    const numId = parseFloat(id);
    let imgId = id.replace('.', 'p');
    if (numId < 10) imgId = `00${imgId}`;
    else if (numId < 100) imgId = `0${imgId}`;
    this.setState({imgId});
  }

  render() {
    return (<div className='mn-panel'>
      <img src={`${this.props.host}/img/servants/${this.state.imgId}1.png`} alt=''/>
    </div>);
  }
}

export class StatusPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      npCard: <div></div>
    };
  }

  componentDidMount() {
    const regex = /^([BAQ]+)\(([BAQ])\)$/;
    const captured = regex.exec(this.props.svt.deck);
    const cards = captured[1]
      .split('')
      .map((card, i) => <img key={i} src={`${this.props.host}/img/icon${card}.png`} alt=''/>);
    const npCard = <img src={`${this.props.host}/img/icon${captured[2]}.png`} alt=''/>;
    this.setState({cards, npCard});
  }

  render() {
    const { svt } = this.props;
    return (<div className='mn-panel'>
      <div className='mn-row'>
        <img src={`${this.props.host}/img/icon${svt.className.replace(' ', '')}.png`} alt=''/>
      </div>
      <p className='mn-row-text'>LV{svt.lv} {svt.rarity}★ {svt.className}</p>
      <p className='mn-row-text'>{svt.hps[1]} HP</p>
      <p className='mn-row-text'>{svt.atks[1]} ATK</p>
      <div className='mn-row'>{this.state.cards}</div>
      <Divider/>
      <div className='mn-row-text'>
        <Tooltip position={Position.BOTTOM} content={svt.npDetails.effects.map(npe => <p>{npe}</p>)}>
          {svt.npDetails.name}
        </Tooltip>
      </div>
      <p className='mn-row-text'><i>{svt.npDetails.alias}</i></p>
      <div className='mn-row'>{this.state.npCard}</div>
      <Divider/>
    </div>);
  }
}

export const SkillPanel = props => <Selector
  tree={props.svt.activeDetails.map(ad => ({
    id: ad.id,
    label: <Tooltip
      position={Position.BOTTOM}
      content={ad.effects.map(ade => <p>{ade}</p>)}
    >{ad.id}</Tooltip>
  }))}
  onSelect={() => null}
/>;

export const PassivePanel = props => <Selector
  tree={props.svt.passiveDetails.map(pd => ({
    id: pd.id,
    label: <Tooltip
      position={Position.BOTTOM}
      content={pd.effects.map(pde => <p>{pde}</p>)}
    >{pd.id}</Tooltip>
  }))}
  onSelect={() => null}
/>;

export const AscMatPanel = props => (<div className='mn-panel'>
  <ol>
    {props.svt.ascs.map((a, i) => <li key={i}>{a}</li>)}
  </ol>
</div>);

export const SkillMatPanel = props => (<div className='mn-panel'>
  <ol>
    {props.svt.upgrades.map((u, i) => <li key={i}>{u}</li>)}
  </ol>
</div>);
