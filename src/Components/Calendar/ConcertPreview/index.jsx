import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_Campaign } from 'Models'
import { RP_RED, RP_BLACK, RP_SUPER_LIGHT, RP_DARK_GREY, Clear, TopRight } from 'Components' // GLOBALS
import { ProgressBar } from 'Components'
import { Money } from 'Components'


export class ConcertPreview extends React.PureComponent {
  render() {
    const campaign        = this.props.campaign
    
    const _Campaign       = RP_Campaign(campaign)
    const cheapest_ticket = _Campaign.cheapestTicket()
    const progress        = _Campaign.progress()
    const isTraditional   = _Campaign.isTraditional()
    const timeleft        = _Campaign.timeRemaining()
    const headliner       = _Campaign.headliner()
    const supporting_acts = _Campaign.supportingActs()

    const _Venue          = _Campaign._Venue
    const start_time      = moment(_Campaign.timeslot.start_time).format('h:mm A')
    const end_time        = moment(_Campaign.timeslot.end_time).format('h:mm A')

    const has_supporting_acts = supporting_acts && (supporting_acts.length > 0)
    const has_acts = (headliner || has_supporting_acts)

    return (
      <Container onClick={() => this.props.onClick()}>
        <Thumb image={_Campaign.picture}/>
        <Info>
          <Heading>{campaign.title}</Heading>
          <StatValue>
            { timeleft === 'Completed' 
              ? 'Concert Completed' 
              : `${start_time} to ${end_time}` }
          </StatValue>
          <br/>
          { headliner
            ? headliner.name
            : null
          }

          {/* FEATURED ARTISTS */}
          { has_supporting_acts ? ' ft. ' : null }
          { has_supporting_acts
            ? supporting_acts.map((band, index) => {
                if(band){
                  return `${band.name}${index == (supporting_acts.length - 2)
                                        ? ' and '
                                        : index == (supporting_acts.length - 1)
                                          ? ''
                                          : ', '}`
                }
              }) 
            : null }

          { !has_acts ? '-' : null }
          <SubHeading style={{paddingTop: '1.5vmin'}}>
            {/* TICKET PRICE AND TOTAL FANS */}
            <StatFocus>{isNaN(cheapest_ticket) ? cheapest_ticket : <Money amount={cheapest_ticket} currency={_Venue.currency}/>}</StatFocus>
            <StatValue>{isNaN(cheapest_ticket) ? '' : ` per ticket`}</StatValue>
          </SubHeading>
        </Info>
        { this.props.edit
          ? <TopRight><i className="fa fa-pencil"/></TopRight>
          : null }
      </Container>
    )
  }
}

const ProgressWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.5vmin;
  left: 0;
  pointer-events: none;
`
const Container = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  height: auto;
  width: 50vmin;
  padding: 1vmin;
  color: #494949;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2vmin;
  background: '#FFF';
  border-radius: 0.5vmin;
  text-align: left;

  &:hover {
    background: ${RP_SUPER_LIGHT};
  }
`
const Thumb = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 10vmin;
  width: 10vmin;
  margin-right: 2vmin;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.image ? props.image : '/Assets/images/defaults/default-thumb.png'});
  border-radius: 3px;
`
const Info = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: CALC(100% - 12.1vmin);
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Heading = styled.div`
  display: block;
  position: relative;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2vmin;
  font-weight: bold;
  color: ${RP_BLACK};
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`
const SubHeading = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  color: ${RP_DARK_GREY};
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 1.8vmin;
  pointer-events: none;
`
const Stat = styled.div`
  display: block;
  position: relative;
  float: left;
  width: auto;
  height: 7vmin;
  text-align: left;
  font-family: 'Open Sans',sans-serif;
  font-size: 2.5vmin;
  font-weight: bold;
  color: ${RP_DARK_GREY};
  margin-left: ${(props) => props.first ? '0' : '3vmin'};
  pointer-events: none;
`
const StatValue = styled.span`
  display: inline-block;
  position: relative;
  font-weight: 400;
  pointer-events: none;
`
const StatFocus = styled.span`
  display: inline-block;
  position: relative;
  padding-right: 0.5vmin;
  font-family: 'Open Sans',sans-serif;
  font-size: 1.8vmin;
  font-weight: bold!important;
  color: ${RP_RED}!important;
  pointer-events: none;

  span {
    font-weight: bold!important;
    color: ${RP_RED}!important;
  }
`