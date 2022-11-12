import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { FEED_ITEM_TYPE } from 'enums'
import { RP_Campaign } from 'Models'

import { RP_ORANGE, RP_GREEN, RP_FONT, RP_BLACK, RP_RED, RP_BLUE, RP_SUPER_LIGHT } from 'Components' // GLOBALS


export class FeedItem extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const item         = this.props.item
    const type         = item && item.item_type || 0
    const text         = item && item.text || null
    const created_date = item && item.created_date || null

    const sender       = item && item.sender || null
    const first_name   = sender && sender.first_name || null
    const last_name    = sender && sender.last_name || null

    const time = moment(created_date).subtract(new Date().getTimezoneOffset(), 'minutes').format('MMM DD h:mm A') || null
    const user = first_name + ' ' + last_name

    const _Campaign    = RP_Campaign(this.props.campaign)
    const owners_acts  = _Campaign.ownersActs(sender)
    const acts_string  =  owners_acts.map(act => act.name).join(' | ')
    const managers_organizations = _Campaign.managersOrganizations(sender)
    const organizations_string =  managers_organizations.map(organization => organization.title).join(' | ')

    const _Venue = _Campaign._Venue

    return (
      this.props.empty 
      ? <Panel empty>
          <Description center>No messages yet, send one and get the conversation started!</Description>
        </Panel>
      : <Panel>
          {{
            [FEED_ITEM_TYPE.NOTIFICATION]: <RedPineIcon src="/Assets/images/logo/sq1.png"/>,
            [FEED_ITEM_TYPE.MESSAGE]: <Icon className="fa fa-user" color={RP_BLUE}/>
          }[type]}&nbsp;&nbsp;
          <Owner>
            <span style={{color:RP_GREEN}}>{_Venue.userIsManager(sender) ? `${_Venue.title} ${(owners_acts.length > 0 || managers_organizations.length > 0) ? '| ':''}` : null}</span>
            <span style={{color:RP_ORANGE}}>{organizations_string + (organizations_string && owners_acts.length > 0 ? ' | ':'')}</span>
            <span style={{color:RP_RED}}>{acts_string}</span>
            <br/>
            {user}
          </Owner>  
          <Time><i className="fa fa-clock-o" style={{color:RP_SUPER_LIGHT}}/>&nbsp;{time}</Time>
          <Description>&nbsp;{text}</Description>
        </Panel>
    );
  }
}
const Panel = styled.div`
  position: relative;
  padding: 1.5vmin 3.5vmin 1.5vmin 1.5vmin;
  background: rgba(255,255,255,0.9);
  margin-bottom: 0.25vmin;
  ${props => props.empty ? '' : `border-bottom: 1px solid ${RP_SUPER_LIGHT};`}
`
const Info = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: center;
`
const Time = styled.div`
  position: absolute;
  top: 2vmin;
  right: 4vmin;
  font-size:1.8vmin;
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
`
const Description = styled.div`
  display:block;
  position:relative;
  width:auto;
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 2.25vmin;
  margin-top:1vmin;
  text-align: ${props => props.center ? 'center' : 'left'};

  @media (max-width: 1250px) { 
    font-size: 2vmin;
  }

  @media (max-width: 750px) { 
    font-size: 2.4vmin;
  }
`
const Owner = styled.div`
  display:inline-block;
  position:relative;
  line-height: 2.5vmin;
  font-size: 2vmin;
  font-weight: bold;
  vertical-align: middle;

  span {
    font-size: 2vmin;
    font-weight: bold;
    font-style: italic;
    color: ${RP_RED};
  }
`
const Icon = styled.i`
  font-size: 4vmin;
  color: ${props => props.color || RP_BLACK };
  padding-left: 0.5vmin;

  vertical-align: middle;
`
const RedPineIcon = styled.img`
  display: inline-block;
  position: relative; 
  width: 4vmin;
  height: 4vmin;
  border-radius: 0.5vmin;
  vertical-align: middle;
`