import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_Campaign } from 'Models'
import { RP_RED, RP_PINK, RP_ORANGE, RP_GREY, RP_DARKGREY, RP_GREEN } from 'Components' //GLOBALS

export { ConcertPreview } from './ConcertPreview/index.jsx'
export { OpeningPreview } from './OpeningPreview/index.jsx'
export { ShowForm } from './ShowForm/index.jsx'
export { OpportunityForm } from './OpportunityForm/index.jsx'


export const CalendarHeading = styled.div`
  display: ${props => props.hide ? 'none' : 'block'};
  width: 95%;
  text-align: center;
  font-size: 30px;
  font-weight: lighter;
  padding: 50px 0 15px 0;

  @media (max-width: 1024px) {
    font-size: 25px;
  }
`
export const CalendarContainer = styled.div`
  display: block;
  position: relative;
  height: 70%;
  width: 80%;
  margin: auto;
  padding-bottom: 12vmin;
  text-align: right;

  @media (max-width: 768px) {
    width: 95%;
  }
`


/***************
* EVENT STYLES *
***************/

export const styleCampaign = (campaign) => {
  const _Campaign     = RP_Campaign(campaign)
  const isTraditional = _Campaign.isTraditional()
  const is_pending    = (_Campaign.is_venue_approved == null)

  const funding_end   = moment(campaign.funding_end)
  const start_time    = moment(campaign.timeslot.start_time)
  const end_time      = moment(campaign.timeslot.end_time)

  const isPast = (isTraditional && end_time.isBefore(moment(Date.now()))) || (!isTraditional && funding_end.isBefore(moment(Date.now())))

  const title = (is_pending ? 'Pending - ' : '') + _Campaign.title 

  return campaign.is_successful 
         ? {
             'campaign': _Campaign.id,
             'text': title,
             'color': RP_RED,
             'background': RP_RED,
             'end': end_time,
             'start': start_time
           }
         : campaign.is_venue_approved
           ? isPast
             ? {
                'campaign': _Campaign.id,
                'text': title,
                'color': RP_PINK,
                'background': RP_PINK,
                'end': end_time,
                'start': start_time
               }
             : {
                'campaign': _Campaign.id,
                'text': title,
                'color': RP_RED,
                'background': RP_RED,
                'end': end_time,
                'start': start_time
               }
           : {
              'campaign': _Campaign.id,
              'text': title,
              'color': is_pending ? RP_ORANGE : RP_RED,
              'background': is_pending ? RP_ORANGE : RP_RED,
              'end': end_time,
              'start': start_time
             }
}

export const styleEvent = (event) => {
  const id         = event.id 
  const event_type = event.event_type 

  const start_time = moment(event.start_time).toDate()
  const end_time   = moment(event.end_time).toDate()

  const isPast     = moment(end_time).isBefore(moment(Date.now()))        
  const text       = event_type == 0
                     ? ''
                     : event_type == 1
                       ? 'HOLD 1 - '
                       : event_type == 2
                         ? 'HOLD 2 - '
                         : 'HOLD 3 - '

  return {
          'event': id,
          'title': event.title,
          'text': text + event.title,
          'color': isPast ? RP_GREY : RP_DARKGREY,
          'background': isPast ? RP_GREY : RP_DARKGREY,
          'end': end_time,
          'start': start_time,
          'event_type': event_type
         }
}

export const styleOpening = (opening) => {
  const id            = opening.id 
  const title         = opening.title 
  const is_open       = opening.is_open ? 1 : 0
  const extra_details = opening.extra_details ? opening.extra_details : ''

  const timeslot    = opening.timeslot
  const timeslot_id = timeslot ? timeslot.id : null

  const start_time  = moment(timeslot && timeslot.start_time).toDate()
  const end_time    = moment(timeslot && timeslot.end_time).toDate()

  const isPast      = moment(end_time).isBefore(moment(Date.now()))        

  return {
          'opening': id,
          'title': title,
          'text': title,
          'color': isPast ? RP_GREY 
                   : is_open ? RP_GREEN 
                     : RP_DARKGREY,
          'background': isPast ? RP_GREY 
                        : is_open ? RP_GREEN 
                          : RP_DARKGREY,
          'timeslot': timeslot_id,
          'end': end_time,
          'start': start_time,
          'is_open': is_open,
          'extra_details': extra_details
         }
}