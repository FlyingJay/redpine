import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_Campaign } from 'Models'
import { CAMPAIGN_STATUS } from 'enums'

import { ShowStatusHeader } from 'Containers'

import { RP_GREEN, RP_RED, RP_BLUE, RP_DARKBLUE, RP_PINK, RP_DARK_GREY, RP_BLACK, RP_LIGHTGREY } from 'Components' //GLOBALS
import { RoundButton } from 'Components' //BUTTON
import { Image } from 'Components' 

import { Heading } from './../Heading/index.jsx'
import { EditButton } from './../Edit/EditButton/index.jsx'


export class Details extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {}
  }

  render() {
    const can_edit            = this.props.can_edit
    const campaign            = this.props.campaign || null
    const title               = campaign && campaign.title || ''
    const description         = campaign && campaign.description || ''
    const hashtag             = campaign && campaign.hashtag || 'AddHashtag'

    const _Campaign           = RP_Campaign(campaign)
    const is_successful       = _Campaign.isSuccess()
    const is_crowdfunded      = _Campaign.isCrowdfunded()
    const status              = _Campaign.status()

    const show_status_header  = (status !== CAMPAIGN_STATUS.SUCCESSFUL && status !== CAMPAIGN_STATUS.IN_PROGRESS)

    const start_time          = moment(_Campaign.event_start) || null
    const funding_end         = moment(_Campaign.funding_end) || null

    const start_date_string   = start_time && start_time.format("MMMM DD") || ''
    const start_time_string   = start_time && start_time.format("h:mm A") || ''
    const funding_end_string  = funding_end && funding_end.format("MMMM DD, YYYY") || ''

    return <div>
      <Heading text="Show Details" icon="fa fa-flag"/>
      <div style={{padding:'2vmin 2vmin 0 2vmin'}}>
        <ShowStatusHeader campaign={campaign}/>
      </div>
      <LeftPanel>
        <Image inline
          image={_Campaign.picture}
          height="20vmin" 
          width="40vmin" 
          clickable={can_edit} 
          onClick={() => can_edit ? this.props.editDetails() : null}
          style={{borderRadius:'0.5vmin',backgroundSize:'cover'}} />
      </LeftPanel>
      <RightPanel>
        <DateTime>
          <i className="fa fa-calendar" />
          &nbsp;&nbsp;{start_date_string}&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa fa-clock-o" />
          &nbsp;&nbsp;{start_time_string}
        </DateTime>
        <EditButton text="Date & Time" show={can_edit} onClick={() => this.props.editDates()}/>
        <Title>
          {title}
        </Title>
        <Description>
          {description}
        </Description>
        <Hashtag>
          #{hashtag}
        </Hashtag>
        <EditButton text="Edit Details" show={can_edit} onClick={() => this.props.editDetails()}/>
        <Subheading>
          Tickets available until:&nbsp;&nbsp;
          <i className="fa fa-calendar" />&nbsp;&nbsp;{funding_end_string}&nbsp;&nbsp;&nbsp;&nbsp;
        </Subheading>
      </RightPanel>
    </div>
  }
}
const Panel = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  height: auto;
  background: #FFF;
  text-align: left;
`
const LeftPanel = styled(Panel)`
  width: 40vmin;
  padding: 2.5vmin;

  @media (max-width:768px) and (orientation: portrait){
    display: none;
  }
`
const RightPanel = styled(Panel)`
  width: CALC(100% - 45vmin);
  padding: 2.5vmin 0;

  @media (max-width:768px) and (orientation: portrait){
    width: calc(100% - 5vmin);
    padding: 2.5vmin;
  }
`
const Content = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => props.width || '50'}%;
  vertical-align: top;
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;

  span {
    color: ${RP_BLACK};
    font-size: 2.5vmin;
    font-weight: 400;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    width: 100%;
    font-size: 2vmin;

    span {
      color: ${RP_BLACK};
      font-size: 2vmin;
    }
  }
`
const Item = styled.div`
  font-size: 2.5vmin;
  padding: 1vmin 1vmin 0 1vmin;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DateTime = styled(Item)`
  font-weight: bold;
  white-space: nowrap;

  i {
    color: ${RP_BLUE};
  }
`
const Subheading = styled(Item)`
  margin-top: 4vmin;
  text-align: center;
  font-size: 2vmin;
  font-weight: bold;
  line-height: 3.5vmin;
`
const Title = styled(Item)`
  font-size: 2.25vmin;
  font-weight: bold;
  white-space: nowrap;
`
const Description = styled(Item)`
  max-height: 7.5vmin;
  font-size: 2vmin;
`
const Hashtag = styled(Item)`
  color: ${RP_PINK};
  white-space: nowrap;
`
