import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { paths } from 'globals'
import { EVENT_TYPE } from 'enums'

import { RP_Campaign, RP_User } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { RP_RED, RP_GREY, RP_PINK, RP_BLUE, RP_DARKBLUE, RP_GREEN, SPOTIFY_GREEN, RP_ORANGE, RP_DARKORANGE, RP_DARKGREY, RP_DARK_GREY } from 'Components' // GLOBALS
import { CalendarHeading, CalendarContainer, ConcertPreview, OpeningPreview, ShowForm, OpportunityForm } from 'Components' // CALENDAR
import { LoadingIndicator } from 'Components'
import { BaseButton } from 'Components' // BUTTON
import { Tooltip } from 'Components'
import { Modal } from 'Components' // MODAL & MODALOTHERS

import EventForm from './EventForm/index.jsx'
import OpenMicForm from './OpenMicForm/index.jsx'

import actions from './actions'
import constants from './constants'
import selectors from './selectors'

BigCalendar.momentLocalizer(moment)


export class VenueCalendar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      preventSet: false,
      showEventForm: false,
      showOpportunityForm: false,
      showShowForm: false,
      showOpenMicForm: false,

      selected_event: null,
      selected_opening: null,
      selected_date: null
    }
    this.preventSet = false

    const venue_id = this.props.match.params.venueId
    this.props.loadData(venue_id,moment())
    
    if(this.props.user && !RP_User(this.props.user).welcome_check_calendar){
      this.props.tutorialEventCompleted(this.props.user, {welcome_check_calendar:true})
    }
  }

  render() {
    const venue_id = this.props.match.params.venueId

    const openings    = this.props.openings || []
    const events      = this.props.events || []
    const campaigns   = this.props.campaigns || []
    const venue       = this.props.venue || {}
    const venue_title = this.props.venue && venue.title || 'N/A'

    const campaign_dates = campaigns.map(campaign => this.styleCampaign(campaign))
    const opening_dates  = openings.map(opening => this.styleOpening(opening))
    const event_dates    = events.map(event => this.styleEvent(event))
    
    let dates = campaign_dates.concat(event_dates).concat(opening_dates)
    dates = Array.isArray(dates) && dates.length ? dates : []    

    const show_form = (this.state.showEventForm || this.state.showOpportunityForm || this.state.showShowForm || this.state.showOpenMicForm)

    return (
      <App requireAuth>
        <Modal show onClose={() => this.props.history.goBack()}>
          <CalendarHeading>Events at <Red>{venue_title}</Red></CalendarHeading>
          <CalendarContainer>
            <CalendarWrap show_form={show_form}>
              <div style={{marginBottom:'5vmin'}}>
                <LoadingIndicator loading={this.props.dates_loading}>
                  <AddButton onClick={() => this.showShowForm()} color={RP_PINK} hoverColor={RP_RED}>
                    <i className="fa fa-plus"></i>&nbsp;&nbsp;
                    <span>Show</span>
                  </AddButton>
                  <AddButton onClick={() => this.showOpenMicForm()} color={RP_ORANGE} hoverColor={RP_DARKORANGE}>
                    <i className="fa fa-plus"></i>&nbsp;&nbsp;
                    <span>Open Mic</span>
                  </AddButton>
                  <AddButton onClick={() => this.showOpportunityForm()} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}>
                    <i className="fa fa-plus"></i>&nbsp;&nbsp;
                    <span>Paid Gig</span>
                  </AddButton>
                  <AddButton onClick={() => this.showEventForm()} color={RP_DARKGREY} hoverColor={RP_DARK_GREY}>
                    <i className="fa fa-plus"></i>&nbsp;&nbsp;
                    <span>Event / Hold</span>
                  </AddButton>
                </LoadingIndicator>
              </div>
              <BigCalendar 
                selectable
                events={dates}
                startAccessor='startDate'
                endAccessor='startDate'
                titleAccessor='title_text'
                views={['month']}
                onSelectSlot={this.onDayChange}
                onSelectEvent={this.onEventSelect}
                onNavigate={(date, view) => {
                  this.props.loadData(venue_id,date)
                }}
                eventPropGetter={(this.eventStyleGetter)}
                popup/>
            </CalendarWrap>
            { show_form
              ? <FormWrap style={{marginTop:'5vmin'}}>
                  { this.state.showEventForm
                    ? <EventForm 
                        selected_date={this.state.selected_date}
                        selected_event={this.state.selected_event}
                        createEvent={(details) => this.createEvent(details)}
                        updateEvent={(details) => this.updateEvent(details)}
                        deleteEvent={(id) => this.deleteEvent(id)}
                        onCancel={() => this.updateState({showEventForm:false,selected_event:null})}/>
                    : null }
                  { this.state.showOpportunityForm
                    ? <OpportunityForm
                        venue={this.props.venue}
                        selected_date={this.state.selected_date}
                        selected_opening={this.state.selected_opening}
                        createOpening={(timeslot,opening) => this.props.createOpening(timeslot,opening)}
                        updateOpening={(timeslot,opening) => this.props.updateOpening(timeslot,opening)}
                        deleteOpening={(opening) => this.props.deleteOpening(opening)}
                        onClose={() => this.updateState({showOpportunityForm:false,selected_opening:null})}/>
                    : null }
                  { this.state.showOpenMicForm
                    ? <OpenMicForm
                        selected_date={this.state.selected_date}
                        createOpenMic={(details) => this.createOpenMic(details)} 
                        onCancel={() => this.updateState({showOpenMicForm:false})}/>
                    : null }
                  { this.state.showShowForm
                    ? <ShowForm
                        venue={this.props.venue}
                        selected_date={this.state.selected_date}
                        createShow={(show) => this.props.createShow(show)}
                        error={(text) => this.props.error(text)}
                        onClose={() => this.updateState({showShowForm:false})}/>
                    : null }
                </FormWrap>
              : null }
          </CalendarContainer>
        </Modal>
      </App>
    )
  }

  showShowForm() {
    this.updateState({showShowForm:true,showOpportunityForm:false,showEventForm:false,showOpenMicForm:false})
  }

  showOpenMicForm() {
    this.updateState({showOpenMicForm:true,showOpportunityForm:false,showEventForm:false,showShowForm:false})
  }

  showOpportunityForm() {
    this.updateState({showOpportunityForm:true,showEventForm:false,showShowForm:false,showOpenMicForm:false,selected_opening:null})
  }

  showEventForm() {
    this.updateState({showEventForm:true,showOpportunityForm:false,showShowForm:false,showOpenMicForm:false,selected_event:null})
    this.props.tutorialEventCompleted(this.props.user, {welcome_add_event:true})
  }

  onDayChange = (date) => {
    if(!this.state.selected_event && date.action == "click"){
      this.updateState({selected_date:[date.start,date.end]})
    }
  }

  onEventSelect = (event, inst) => {
    event.campaign ? this.props.showHub(event.campaign) : null

    event.event    ? this.updateState({
                        showEventForm: true,
                        showShowForm: false,
                        showOpenMicForm: false,
                        showOpportunityForm: false,
                        selected_event: event.event,
                        selected_date: [event.startDate,event.endDate]
                      }) : null

    event.opening  ? this.updateState({
                        showOpportunityForm: true,
                        showShowForm: false,
                        showOpenMicForm: false,
                        showEventForm: false,
                        selected_opening: event.opening,
                        selected_date: [event.startDate,event.endDate]
                      }) : null
  }

  createEvent(details) {
    const start_time = moment(details.date_range[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(details.date_range[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')

    if(details.date_range){
      if(details.title){
        if(!isNaN(details.frequency_count)){
          const event = {
            title: details.title,
            start_time: start_time.format('YYYY-MM-DDThh:mm:ss'),
            end_time: end_time.format('YYYY-MM-DDThh:mm:ss'),
            event_type: details.event_type,
            frequency: details.frequency,
            frequency_count: details.frequency_count,
            event_type: details.event_type,
            venue: this.props.venue.id
          }
          this.props.createEvent(event)
          this.updateState({showEventForm:false,selected_event:null})
        }else{this.props.error(constants.FREQUENCY_MUST_BE_NUMBER)}
      }else{this.props.error(constants.PLEASE_ADD_TITLE)}
    }else{this.props.error(constants.PLEASE_CHOOSE_DATE)}
  }

  updateEvent(details) {
    const start_time = moment(details.date_range[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(details.date_range[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')

    if(details.date_range){
      if(details.title){
        const event = {
          id: details.id,
          title: details.title,
          start_time: start_time.format('YYYY-MM-DDThh:mm:ss'),
          end_time: end_time.format('YYYY-MM-DDThh:mm:ss'),
          event_type: details.event_type,
          venue: this.props.venue.id
        }
        this.props.updateEvent(event)
        this.updateState({showEventForm:false,selected_event:null})
      }else{this.props.error(constants.PLEASE_ADD_TITLE)}
    }else{this.props.error(constants.PLEASE_CHOOSE_DATE)}
  }

  deleteEvent(id) {
    const event = {
      id: id,
      venue: this.props.venue.id
    }
    this.props.deleteEvent(event)
    this.updateState({showEventForm:false})
  }

  createOpenMic(details){
    const start_time = moment(details.date_range[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(details.date_range[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')

    if(details.date_range){
      const show = {
        //Show params
        title: 'Open Mic',
        description: 'Open Mic',
        funding_type: details.funding_type,
        funding_start: moment().format('YYYY-MM-DDThh:mm:ss'),
        funding_end: end_time.format('YYYY-MM-DDTHH:mm:ss'),
        min_ticket_price: 0.00,
        is_venue_approved: true,
        is_open: true,
        is_open_mic: true,
        is_successful: true,
        //Timeslot params
        venue: this.props.venue.id,
        start_time: start_time.format('YYYY-MM-DDTHH:mm:ss'),
        end_time: end_time.format('YYYY-MM-DDTHH:mm:ss'),
        //Additional params
        frequency: details.frequency,
        frequency_count: details.frequency_count
      }
      this.props.createShow(show)
      this.updateState({showShowForm:false})
    }else{this.props.error(constants.PLEASE_CHOOSE_DATE)}
  }

  styleCampaign(campaign){
    const _Campaign     = RP_Campaign(campaign)
    const start_time    = moment(campaign.timeslot.start_time)
    const end_time      = moment(campaign.timeslot.end_time)

    const is_past = end_time.isBefore(moment(Date.now()))

    return {
      'campaign': campaign.id,
      'color': is_past || _Campaign.isHold()
               ? RP_GREY 
               : _Campaign.is_open_mic
                 ? RP_ORANGE
                 : RP_RED,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': _Campaign.is_open_mic
                    ? <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={<i className="fa fa-pencil"/>}>
                        <i className="fa fa-microphone"/>&nbsp;Open Mic
                      </Tooltip>
                    : <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={
                          <ConcertPreview key={_Campaign.id} campaign={campaign} edit/>
                        }>
                        <i className="fa fa-ticket"/>&nbsp;{(_Campaign.isHold() ? `(HOLD) `:``) + _Campaign.title}
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
      'opening': {
        'id': opening.id,
        'title': opening.title,
        'timeslot': timeslot.id,
        'is_open': opening.is_open,
        'extra_details': opening.extra_details
      },
      'color': isPast ? RP_GREY : RP_GREEN,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={
                        <OpeningPreview key={opening.id} opening={opening} edit/>
                      }>
                      { opening.is_open ? <i className="fa fa-eye"/> : <i className="fa fa-eye-slash"/> }&nbsp;
                      { opening.title }
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
        'title': event.title,
        'event_type': event_type
      },
      'color': isPast ? RP_GREY : RP_DARKGREY,
      'endDate': end_time,
      'startDate': start_time,
      'title_text': isPast 
                    ? <BasicDate><i className="fa fa-lock"/>&nbsp;{event.title}</BasicDate>
                    : <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={<i className="fa fa-pencil"/>}>
                        <i className="fa fa-lock"/>&nbsp;{event.title}
                      </Tooltip>
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

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    campaigns: selectors.selectCampaigns(state, props),
    openings: selectors.selectOpenings(state, props),
    events: selectors.selectEvents(state, props),
    venue: selectors.selectVenue(state, props),
    dates_loading: selectors.selectDatesLoading(state, props),
    error: selectors.selectError(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (venue_id,date) => {
      dispatch(actions.loadData(venue_id,date))
    },
    showHub: (campaign_id) => {
      dispatch(push(paths.showHub(campaign_id)))
    },
    createShow: (show) => {
      dispatch(actions.createShow(show))
    },
    createOpening: (timeslot,opening) => {
      dispatch(actions.createOpening(timeslot,opening))
    },
    updateOpening: (timeslot,opening) => {
      dispatch(actions.updateOpening(timeslot,opening))
    },
    deleteOpening: (opening) => {
      dispatch(actions.deleteOpening(opening))
    },
    createEvent: (event) => {
      dispatch(actions.createEvent(event))
    },
    updateEvent: (event) => {
      dispatch(actions.updateEvent(event))
    },
    deleteEvent: (event) => {
      dispatch(actions.deleteEvent(event))
    },
    tutorialEventCompleted: (user, events) => {
      dispatch(appActions.tutorialEventCompleted(user, events))
    },
    error: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VenueCalendar)


const AddButton = styled(BaseButton)`
  color: #FFF;
  font-weight: bold;
  background: ${props => props.color || RP_BLUE};
  line-height: 1.5;
  min-width: 1.8vmin;
  min-height: 1.8vmin;
  padding: 10px 20px;
  transition: background ease 0.25s;
  margin-left: 1.5vmin;
  margin-top: 1.5vmin;
  border-radius: 0.5vmin;

  &:hover {
    background: ${props => props.hoverColor || RP_DARKBLUE};
  }
`
const Red = styled.span`
  color: ${RP_RED};
`
const CalendarWrap = styled.div`
  display: ${props => props.show_form ? 'none' : 'block'};
  height: 60vh;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    display: ${props => props.show_form ? 'inline-block' : 'block'};
    width: ${props => props.show_form ? 'calc(50% - 4vmin)' : '100%'};
    vertical-align: top;
    padding: ${props => props.show_form ? '2vmin' : '0'};
  }
`
const FormWrap = styled.div`
  display: block;
  text-align: left;

  @media (min-width: 1024px) {
    display: inline-block;
    width: calc(50% - 4vmin);
    vertical-align: top;
    padding: 2vmin;
  }
`
const BasicDate = styled.div`
  color: #FFF;
  font-weight: bold;
  font-size: 1.5vmin;
  padding: 2px 0;
`