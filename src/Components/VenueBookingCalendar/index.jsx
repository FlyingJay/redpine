import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { paths } from 'globals'
import { EVENT_TYPE } from 'enums'

import { RP_Campaign } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'

import { RP_RED, RP_GREEN, RP_PINK, RP_GREY, RP_DARKGREY, RP_ORANGE } from 'Components' // GLOBALS
import { Tooltip } from 'Components' 
import { Modal } from 'Components'

import { ConcertPreview, OpeningPreview } from 'Components'

BigCalendar.momentLocalizer(moment)


export class VenueBookingCalendar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const venue     = this.props.venue || {}
    const venue_id  = venue ? venue.id : null

    const openings  = this.props.openings || []
    const campaigns = (this.props.bookedShows || []).filter(campaign => campaign.is_venue_approved)
    const events    = this.props.events || []

    const campaign_dates = campaigns.map(campaign => this.styleCampaign(campaign))
    const opening_dates  = openings.map(opening => this.styleOpening(opening))
    const event_dates    = events.filter(event => event.event_type == EVENT_TYPE.EVENT).map(event => this.styleEvent(event))
    const dates          = campaign_dates.concat(opening_dates).concat(event_dates)

    const show_calendar = Array.isArray(dates)

    return show_calendar
            ? <CalendarWrapper>
                <BigCalendar 
                  selectable
                  events={dates}
                  startAccessor='startDate'
                  endAccessor='startDate'
                  titleAccessor='title_text'
                  views={['month']}
                  onSelectSlot={(date) => this.props.playShow(venue_id,date)}
                  onSelectEvent={(date) => date.opening 
                                           ? this.props.createShowFromOpening(date.opening) 
                                           : date.event
                                             ? this.props.dateAlreadyBooked()
                                             : this.props.goToCampaign(date.campaign)}
                  onNavigate={(date, view) => this.props.loadDates(date,view)}
                  eventPropGetter={(this.eventStyleGetter)}
                  popup/>
               </CalendarWrapper>
            : null
  }

  styleCampaign(campaign){
    const _Campaign     = RP_Campaign(campaign)
    const isTraditional = _Campaign.isTraditional()

    const start_time    = moment(campaign.timeslot.start_time)
    const end_time      = moment(campaign.timeslot.end_time)

    const is_past = end_time.isBefore(moment(Date.now()))

    return {
      'campaign': campaign.id,
      'color': is_past 
               ? RP_GREY 
               : _Campaign.is_open_mic
                 ? RP_ORANGE
                 : RP_RED,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': _Campaign.is_open_mic
                    ? <Tooltip tip={is_past ? "Date passed." : "Apply Now!"} style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}}>
                        <i className="fa fa-microphone"/>&nbsp;Open Mic
                      </Tooltip>
                    : <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={
                          <ConcertPreview key={_Campaign.id} campaign={campaign}/>
                        }>
                        <i className="fa fa-ticket"/>&nbsp;{_Campaign.title}
                      </Tooltip>
    }
  }

  styleOpening(opening){
    const id          = opening.id 
    const timeslot    = opening.timeslot

    const start_time  = moment(timeslot && timeslot.start_time).toDate()
    const end_time    = moment(timeslot && timeslot.end_time).toDate()

    const isPast      = moment(end_time).isBefore(moment(Date.now()))        

    return isPast ? null : {
      'opening': id,
      'color': isPast ? RP_GREY : RP_GREEN,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={
                        <OpeningPreview key={opening.id} opening={opening}/>
                      }>
                      Paid Gig
                    </Tooltip>
    }
  }

  styleEvent(event){
    const start_time = moment(event.start_time)
    const end_time   = moment(event.end_time)
    
    const event_type = event.event_type
    const isPast = end_time.isBefore(moment(Date.now()))

    return {
      'event': {
        'id': event.id,
        'title': event.title
      },
      'color': isPast ? RP_GREY : RP_DARKGREY,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': <div style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}}>
                      <i className="fa fa-lock"/>&nbsp;Event
                    </div>
    }
  }

  eventStyleGetter(event, start, end, isSelected) {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        color: '#FFF',
        fontWeight: 'bold',
        border: '0px',
        display: 'block',
        textAlign: 'center',
        margin: '0 2px 2px 2px',
        padding: event.padding
      }
    }
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    playShow: (venue_id,date) => {
      dispatch(push(paths.showCreate()+`?venue=${venue_id}&date=${date.start}`))
    },
    createShowFromOpening: (opening_id) => {
      dispatch(push(paths.showCreate()+`?opening=${opening_id}`))
    },
    dateAlreadyBooked: () => {
      dispatch(appActions.error_message(`The venue already has an event scheduled for this day.`))
    },
    goToCampaign: (campaign_id) => {
      dispatch(push(paths.shows(campaign_id)))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VenueBookingCalendar)

const CalendarWrapper = styled.div`
  width: 100%;
  height: 60vh;
`
const Red = styled.span`
  color: ${RP_RED};
`