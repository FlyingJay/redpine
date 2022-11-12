import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { HorizontalBar } from 'react-chartjs-2';

import { paths, validators } from 'globals'

import { RP_User, RP_Campaign } from 'Models'

import { RP_GREEN, SPOTIFY_GREEN, RP_DARKBLUE, RP_DARK_GREY, RP_BLACK, RP_LIGHTGREY, RP_RED, RP_BLUE, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA, RP_PINK, RP_SUPER_LIGHT, RP_GREY } from 'Components' //GLOBALS
import { FormButton } from 'Components' //BUTTON
import { Input } from 'Components' // INPUTN
import { LoadingIndicator } from 'Components'
import { Graph } from 'Components'
import { Link } from 'Components' 

import { Heading } from './../Heading/index.jsx'
import { EditButton } from './../Edit/EditButton/index.jsx'


export class Promotion extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      promoter_cut: this.props.promoter_cut || '0.00'
    }

  }

  render() {
    const pledges  = this.props.pledges
    const can_edit = this.props.can_edit

    const bonus_count = this.bonusCount(pledges)

    return <div>
      <Heading text="Promotion" icon="fa fa-flag"/>
      <div>
        <LeftPanel>
          <Requirement>
            <i className="fa fa-users" />&nbsp;
            {bonus_count}
            <RequirementLabel>Fans Referred</RequirementLabel>
          </Requirement>
          <Attendees>
            <EditButton text="More" show={can_edit} onClick={() => this.props.error('Detailed promotion stats are coming soon!')}/>
          </Attendees> 
        </LeftPanel>
        <RightPanel>
          <IntroPanel>
            <span>
              If a fan refers a friend to your show, the fan recieves this amount from the ticket price. 
            </span>
            <br/><br/>
              Tuning this value can help strike a balance between getting the word out, and making enough on the show.
          </IntroPanel>
          <ThirdParty>
            <Input inline
              width="60%"
              value={this.state.promoter_cut}
              validate={validators.POSITIVE_DOLLAR()}
              onValidate={(text) => this.updateState({promoter_cut: text})}
              placeholder="Promoter Cut"
              image="usd" focusImage="usd-focus"/>
            <AddButton onClick={() => this.props.updatePromoterCut(this.state.promoter_cut)}>
              <i className="fa fa-check"/>&nbsp;Save
            </AddButton>
          </ThirdParty> 
        </RightPanel>
      </div> 
    </div>
  }

  bonusCount(pledges){
    if (!pledges) return 0
    if (pledges.length == 0) return 0

    let bonus_count = 0
    pledges.forEach(pledge => {
      if(pledge.promoter && !pledge.is_cancelled){
        bonus_count += pledge.count
      }
    })
    return bonus_count
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
const Panel = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
`
const IntroPanel = styled(Panel)`
  display: block;
  padding: 5vmin;
  font-weight: 200;
  font-style: italic;

  span{
    font-style: normal;
    font-weight: 400;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2vmin;
  }
`
const ThirdParty = styled.div`
  padding: 5vmin;
`
const AddButton = styled(FormButton)`
  vertical-align: top;
  display: inline-block;
  background: ${RP_GREEN};
  margin-left: 1vmin;
  font-size: 2vmin;

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`
const LeftPanel = styled(Panel)`
  width: 40vmin;
  padding: 5vmin 0 2.5vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    display: block;
    padding: 5vmin 0;
    width: 100%;
    border: none;
  }
`
const RightPanel = styled(Panel)`
  width: CALC(100% - 40vmin - 1px);
  padding: 2.5vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    display: none;
  }
`
const Item = styled.div`
  padding: 1vmin 1vmin 0 1vmin;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Requirement = styled(Item)`
  font-size: 3vmin;
  font-weight: 200;
  white-space: nowrap;
  text-align: center;
  padding: 2vmin 0;

  i {
    color: ${RP_BLUE};
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;

    i {
      font-size: 4vmin;
    }
  }
`
const RequirementLabel = styled.div`
  margin: 0 auto;
  font-size: 1.75vmin;
  font-weight: 200;
  white-space: nowrap;
  text-align: center;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;

    i {
      font-size: 4vmin;
    }
  }
`
const SalesClosed = styled(Item)`
  marin-top: 10vmin;
  font-size: 2vmin;
  font-weight: 400;
  white-space: nowrap;
  line-height: 5vmin;
  text-align: center;

  i {
    font-size: 3vmin;
    color: ${RP_BLUE};
  }
`
const Attendees = styled.div`
  padding-top: 2.5vmin;
  text-align: right;
`
