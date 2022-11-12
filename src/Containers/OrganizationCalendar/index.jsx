import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'

import { RP_RED, RP_PINK, RP_ORANGE, RP_GREY, RP_GREEN, SPOTIFY_GREEN, RP_DARKORANGE, RP_BLUE, RP_DARKBLUE } from 'Components' // GLOBALS
import { CalendarHeading, CalendarContainer, ConcertPreview, OpeningPreview, ShowForm, OpportunityForm } from 'Components' // CALENDAR
import { LoadingIndicator } from 'Components'
import { BaseButton } from 'Components' //BUTTON
import { Tooltip } from 'Components'
import { Modal } from 'Components' // MODAL & MODALOTHERS

import { SelectVenue } from './SelectVenue/index.jsx'

import actions from './actions'
import constants from './constants'
import selectors from './selectors'

BigCalendar.momentLocalizer(moment)


export class OrganizationCalendar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      preventSet: false,
      selected_date: null,
      form_type: null,

      showShowForm: false,
      showOpportunityForm: false
    }
    this.preventSet = false

    const organization_id = this.props.match.params.organizationId
    this.props.loadData(organization_id,moment())
  }

  render() {
    const organization_id = this.props.match.params.organizationId

    const openings           = this.props.openings || []
    const campaigns          = this.props.campaigns || []
    const organization       = this.props.organization || {}
    const organization_title = this.props.organization && organization.title || 'N/A'

    const campaign_dates = campaigns.map(campaign => this.styleCampaign(campaign))
    const opening_dates  = openings.map(opening => this.styleOpening(opening))

    let dates = campaign_dates.concat(opening_dates)
    dates = Array.isArray(dates) && dates.length ? dates : []

    const show_form = this.state.showShowForm || this.state.showOpportunityForm

    return (
      <App requireAuth>
        <Modal show onClose={() => this.props.myOrganizations()}>
          <CalendarHeading>Events - <Red>{organization_title}</Red></CalendarHeading>
          <CalendarContainer>
            <CalendarWrap show_form={show_form}>
              <div style={{marginBottom:'5vmin'}}>
                <AddButton onClick={() => this.updateState({show_select_venue:true,form_type:'SHOW'})} color={RP_PINK} hoverColor={RP_RED}>
                  <i className="fa fa-plus"></i>&nbsp;&nbsp;
                  <span>New Show</span>
                </AddButton>
                <AddButton onClick={() => this.updateState({show_select_venue:true,form_type:'OPPORTUNITY'})} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}>
                  <i className="fa fa-plus"></i>&nbsp;&nbsp;
                  <span>Paid Gig</span>
                </AddButton>
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
                onNavigate={(date, view) => this.props.loadData(organization_id,date)}
                eventPropGetter={(this.eventStyleGetter)}
                popup/>
            </CalendarWrap>

            { show_form
              ? <FormWrap style={{marginTop:'5vmin'}}>
                  { this.state.showShowForm
                    ? <ShowForm
                        venue={this.state.selected_venue}
                        selected_date={this.state.selected_date}
                        createShow={(show) => {
                          this.createShow(show)
                          this.updateState({showShowForm:false})
                        }}  
                        error={(text) => this.props.error(text)}
                        onClose={() => this.updateState({showShowForm:false})}/>
                    : null }
                  { this.state.showOpportunityForm
                    ? <OpportunityForm
                        venue={this.state.selected_venue}
                        selected_date={this.state.selected_date}
                        selected_opening={this.state.selected_opening}
                        createOpening={(timeslot,opening) => this.props.createOpening(timeslot,opening,organization_id)}
                        updateOpening={(timeslot,opening) => this.props.updateOpening(timeslot,opening,organization_id)}
                        deleteOpening={(opening) => this.props.deleteOpening(opening,organization_id)}
                        onClose={() => this.updateState({showOpportunityForm:false,selected_opening:null})}/>
                    : null }
                </FormWrap>
              : null }

            { this.state.show_select_venue
              ? <SelectVenue 
                  starting_category={this.state.form_type == 'OPPORTUNITY' ? 'MY_VENUES' : null}
                  venues={this.props.venues}
                  venues_loading={this.props.venues_loading}
                  loadVenues={this.props.loadVenues}
                  search_venues={this.props.search_venues}
                  search_venues_loading={this.props.search_venues_loading}
                  searchVenues={(query) => this.props.searchVenues(query)}
                  sellTickets={() => this.props.sellTickets(organization_id)}
                  venueSelected={(venue,is_manager) => this.venueSelected(venue,is_manager,organization_id)}
                  onClose={() => this.updateState({show_select_venue:false})}/>
              : null }
          </CalendarContainer>
        </Modal>
      </App>
    )
  }

  createShow(show){
    const organization_id = this.props.match.params.organizationId

    show = Object.assign(show,{
      organizations:[organization_id]
    })
    this.props.createShow(show,organization_id)
  }

  venueSelected(venue,is_manager,organization_id){
    if(is_manager){
      if(this.state.form_type == 'SHOW'){
        this.updateState({show_select_venue:false,showShowForm:true,selected_venue:venue})
      }
      else if(this.state.form_type == 'OPPORTUNITY'){
        this.updateState({show_select_venue:false,showOpportunityForm:true,selected_venue:venue})
      }
    }else{
      this.props.bookVenue(venue.id,organization_id)
    }
  }

  onDayChange = (date) => {
    if(!this.state.selected_event && date.action == "click"){
      this.updateState({selected_date:[date.start,date.end]})
    }
  }

  onSetDate = (event, inst) => {
    if (!this.state.preventSet && this.refs.eventList != undefined) {
      this.refs.eventList.instance.navigate(event.date)
    }
    this.state.preventSet = false
  }
  
  onPageChange = (event, inst) => {
    this.state.preventSet = true
    this.refs.eventCal.instance.navigate(event.firstDay)
  }

  onEventSelect = (event, inst) => {
    event.campaign ? this.props.showHub(event.campaign) : null

    event.opening  ? this.updateState({
                        showOpportunityForm: true,
                        showShowForm: false,
                        showOpenMicForm: false,
                        showEventForm: false,
                        selected_opening: event.opening,
                        selected_date: [event.startDate,event.endDate]
                      }) : null
  }

  styleCampaign(campaign){
    const _Campaign     = RP_Campaign(campaign)
    const isTraditional = _Campaign.isTraditional()

    const start_time    = moment(_Campaign.event_start)
    const end_time      = moment(_Campaign.event_end)

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
                    ? <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={<i className="fa fa-pencil"/>}>
                        <i className="fa fa-microphone"/>&nbsp;Open Mic
                      </Tooltip>
                    : <Tooltip effect="float" style={{color:'#FFF',fontWeight:'bold',fontSize:'1.5vmin'}} tip={
                          <ConcertPreview key={_Campaign.id} campaign={campaign} edit/>
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
    venues: selectors.selectVenues(state, props),
    venues_loading: selectors.selectVenuesLoading(state, props),
    search_venues: selectors.selectSearchVenues(state, props),
    search_venues_loading: selectors.selectSearchVenuesLoading(state, props),
    campaigns: selectors.selectCampaigns(state, props),
    openings: selectors.selectOpenings(state, props),
    organization: selectors.selectOrganization(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (organization_id,date) => {
      dispatch(actions.loadData(organization_id,date))
    },
    loadVenues: () => {
      dispatch(actions.loadVenues())
    },
    searchVenues: (query) => {
      dispatch(actions.searchVenues(query))
    },
    createShow: (show,organization_id) => {
      dispatch(actions.createShow(show,organization_id))
    },
    createOpening: (timeslot,opening,organization_id) => {
      dispatch(actions.createOpening(timeslot,opening,organization_id))
    },
    updateOpening: (timeslot,opening,organization_id) => {
      dispatch(actions.updateOpening(timeslot,opening,organization_id))
    },
    deleteOpening: (opening,organization_id) => {
      dispatch(actions.deleteOpening(opening,organization_id))
    },
    myOrganizations: () => {
      dispatch(push(paths.myOrganizations()))
    },
    showHub: (campaign_id) => {
      dispatch(push(paths.showHub(campaign_id)))
    },
    bookVenue: (venue_id,organization_id) => {
      dispatch(push(paths.showCreate()+'?venue='+venue_id+'&organization='+organization_id))
    },
    bookNow: () => {
      dispatch(push(paths.showCreate()))
    },
    sellTickets: (organization_id) => {
      dispatch(push(paths.sellTickets()+'?organization='+organization_id))
    },
    error: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCalendar)


const Red = styled.span`
  color: ${RP_RED};
`
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