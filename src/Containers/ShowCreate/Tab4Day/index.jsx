import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import { EVENT_TYPE } from 'enums'

import { RP_Campaign, RP_Venue } from 'Models'

import { RP_DARKGREY, RP_DDD, RP_BLACK, RP_GREY, RP_RED } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton } from 'Components' //MODAL & MODALOTHERS
import { Select } from 'Components' // INPUT
import { Link } from 'Components' // LINK

import constants from './constants.js'

BigCalendar.momentLocalizer(moment)


export class Tab4Day extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      date: this.props.date,
      showCalendar: (this.props.date == null)
    }
  }

  render() {
    const shows  = this.props.shows || []
    const events = this.props.events || []
    const _Venue = RP_Venue(this.props.venue)

    const show_dates     = shows.map(campaign => this.styleCampaign(campaign))
    const event_dates    = events.map(event => this.styleEvent(event))
    const dates          = show_dates.concat(event_dates)

    const showCalendar  = this.state.showCalendar
    const showNext      = !showCalendar

    return (
      <SidePanel>
        <CalendarContainerizer>
          <Heading>
            { this.state.date
              ? moment(this.state.date).format('MMM Do, YYYY')
              : 'When would you like to play?' }
            <Change show={() => this.updateState({date:null,showCalendar:true})} hidden={showCalendar}/>
            { !showCalendar
              ? _Venue.website
                ? <ModalSubheading style={{textAlign:'center',marginTop:'5vmin'}}>
                    We cannot gaurantee the date you selected is available. We recommend checking the venue's <Link href={_Venue.website} bold red>website</Link> to see their up to date calendar.
                  </ModalSubheading> 
                : <ModalSubheading style={{textAlign:'center',marginTop:'5vmin'}}>
                    We cannot gaurantee the date you selected is available. We highly recommend checking the venue's website to make sure your selected date is available.
                  </ModalSubheading>
              : null }
          </Heading>
          { this.state.showCalendar
            ? <BigCalendar 
                selectable
                events={dates}
                views={['month']}
                startAccessor='startDate'
                endAccessor='startDate'
                titleAccessor='title_text'
                eventPropGetter={(this.eventStyleGetter)}
                onSelectSlot={date => this.dateSelected(date)}
                onSelectEvent={date => {
                  date.campaign
                  ? this.props.error(`There is a RedPine show "${date.campaign.title}" on this day.`)
                  : date.event
                    ? this.props.error(`There is a scheduled event on this day.`)
                    : null
                  }}
                components={{
                  month: { dateHeader: (props) => {
                      return <CalendarDay 
                                day={props.label}
                                passed={moment(props.date) < moment()}
                                too_soon={moment(props.date).diff(moment(),'Weeks') < 4}/>
                  }}
                }}
                popup/>
            : null }
        </CalendarContainerizer>       
        <ModalSection style={{textAlign:'right',marginTop:'10vmin'}}>
          <NegativeButton onClick={() => this.props.back(this.state.date)} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton>
          { showNext 
            ? <PositiveButton onClick={() => this.props.next(this.state.date)}>
                Next&nbsp;&nbsp;
                <i className="fa fa-arrow-right"/>
              </PositiveButton>
            : null }
        </ModalSection>
      </SidePanel>
    )
  }

  styleCampaign(campaign){
    const _Campaign     = RP_Campaign(campaign)
    const isTraditional = _Campaign.isTraditional()

    const start_time    = moment(campaign.timeslot.start_time)
    const end_time      = moment(campaign.timeslot.end_time)

    const isPast = end_time.isBefore(moment(Date.now()))

    return {
      'campaign': {
        'id': _Campaign.id,
        'title': _Campaign.title
      },
      'color': isPast ? RP_GREY : RP_RED,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': 'Show'
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
      'title_text': 'Event'
    }
  }

  eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = event.color;
    return {
      style: {
        backgroundColor: backgroundColor,
        color: '#FFF',
        fontWeight: 'bold',
        border: '0px',
        display: 'block',
        textAlign: 'center',
        fontSize: '1.25vmin'
      }
    }
  }

  dateSelected(date) {
    const day = moment(date.start)
    if(day < moment()){
      this.props.error(constants.DATE_ERROR_CANT_BE_PAST)
    }
    else if(day.diff(moment(),'Weeks') < 4){
      this.props.error(constants.DATE_ERROR_TOO_SOON)
    }
    else{
      this.updateState({date:date.start,showCalendar:false})
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Change = ({show,hidden}) => (
  <ChangeButton onClick={() => show()} hidden={hidden}>
    Edit&nbsp;&nbsp;
    <i className="fa fa-arrow-right"/>
  </ChangeButton>
)

const CalendarDay = ({day,passed,too_soon}) => (
  passed
  ? <DayWrap>Passed</DayWrap>
  : too_soon
    ? <DayWrap>Too soon</DayWrap>
    : <DayWrap number>{day}</DayWrap>
)
const DayWrap = styled.div`
  text-align: center;
  padding-left: 5px;
  color: ${props => props.number ? RP_BLACK : RP_DDD};
  font-size: ${props => props.number ? '3vmin' : '2vmin'};
  cursor: ${props => props.number ? 'pointer' : 'defailt'};
  
  @media (max-width: 500px) and (orientation: portrait) {
    font-size: ${props => props.number ? '3.5vmin' : '2vmin'};
  }
`
const CalendarContainerizer = styled(ModalSection)`
  height: 60vh;
  margin-top: 12vmin;

  @media (max-width: 767px) and (orientation: portrait) {
    height: 50vh;
    font-size: 2.5vmin;
  }

  @media (max-width: 500px) and (orientation: portrait) {
    height: 60vh;
  }
`
const Heading = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`
const ChangeButton = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: 2vmin;
  color: ${RP_DARKGREY};
  cursor: pointer;
`