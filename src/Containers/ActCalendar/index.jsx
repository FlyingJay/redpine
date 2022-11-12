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

import { RP_RED, RP_ORANGE, RP_GREY, RP_GREEN, SPOTIFY_GREEN, RP_DARKORANGE, RP_BLUE, RP_DARKBLUE } from 'Components' // GLOBALS
import { CalendarHeading, CalendarContainer, ConcertPreview } from 'Components' // CALENDAR
import { LoadingIndicator } from 'Components'
import { BaseButton } from 'Components' //BUTTON
import { Tooltip } from 'Components'
import { Modal } from 'Components' // MODAL & MODALOTHERS

import actions from './actions'
import constants from './constants'
import selectors from './selectors'

BigCalendar.momentLocalizer(moment)


export class ActCalendar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      preventSet: false,
      selected_date: null
    }
    this.preventSet = false

    const act_id = this.props.match.params.actId
    this.props.loadData(act_id,moment())
  }

  render() {
    const act_id = this.props.match.params.actId

    const campaigns = this.props.campaigns || []
    const act       = this.props.act || {}
    const act_title = this.props.act && act.name || 'N/A'

    let dates = campaigns.map(campaign => this.styleCampaign(campaign))
    dates = Array.isArray(dates) && dates.length ? dates : []

    return (
      <App requireAuth>
        <Modal show onClose={() => this.props.history.goBack()}>
          <CalendarHeading>Events - <Red>{act_title}</Red></CalendarHeading>
          <CalendarContainer>
            <div style={{marginBottom:'5vmin'}}>
              <AddButton onClick={() => this.props.bookNow()} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}>
                <i className="fa fa-plus"></i>&nbsp;&nbsp;
                <span>Book a Venue</span>
              </AddButton>
              <AddButton onClick={() => this.props.sellTickets()} color={RP_ORANGE} hoverColor={RP_DARKORANGE}>
                <i className="fa fa-plus"></i>&nbsp;&nbsp;
                <span>Ticket an Event</span>
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
              onNavigate={(date, view) => {
                this.props.loadData(act_id,date)
              }}
              eventPropGetter={(this.eventStyleGetter)}
              popup/>
          </CalendarContainer>
        </Modal>
      </App>
    )
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
  }

  styleCampaign(campaign){
    const _Campaign     = RP_Campaign(campaign)
    const isTraditional = _Campaign.isTraditional()

    const start_time    = moment(_Campaign.event_start)
    const end_time      = moment(_Campaign.event_end)

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
    campaigns: selectors.selectCampaigns(state, props),
    act: selectors.selectAct(state, props)
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
    bookNow: () => {
      dispatch(push(paths.showCreate()))
    },
    sellTickets: () => {
      dispatch(push(paths.sellTickets()))
    },
    error: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActCalendar)


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