import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import { RP_Venue } from 'Models'

import { App, ConcertsPanel } from 'Containers'

import { RP_BLUE, RP_RED, RP_GREEN, RP_ORANGE, RP_DARKGREY } from 'Components'
import { VenueBookingCalendar, SexiestPanelEver, PanelHeading, PanelContent } from 'Components'
import { LoadingIndicator } from 'Components' 

import actions from './actions'
import selectors from './selectors'


export class WidgetVenueCalendar extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreConcerts: false
    }
  }

  render() {
    const venue       = this.props.venue
    const _Venue      = RP_Venue(venue)

    const events      = this.props.events
    const openings    = this.props.openings
    const bookedShows = this.props.bookedShows

    return (
      <App no_ui>
        <SexiestPanelEver>
          <PanelHeading color={RP_BLUE}>
            <i className="fa fa-flag" />
            <span>Shows & Opportunities @ {_Venue.title}</span>
          </PanelHeading>
          <PanelContent>
            <VenueBookingCalendar 
              venue={venue}
              bookedShows={bookedShows}
              openings={openings}
              events={events}
              loadDates={(date,view) => this.props.loadVenue(_Venue.id,date)}/>
            <PickDate>
              <LoadingIndicator loading={this.props.dates_loading}>
                <span>Pick a date to play!</span>
                <br/>
                <br/>
                <i className="fa fa-circle" style={{color:RP_RED}}/>&nbsp;Booked Show
                &nbsp;&nbsp;&nbsp;
                <i className="fa fa-circle" style={{color:RP_GREEN}}/>&nbsp;Paid Opportunity
                &nbsp;&nbsp;&nbsp;
                <i className="fa fa-circle" style={{color:RP_ORANGE}}/>&nbsp;Open Mic
                &nbsp;&nbsp;&nbsp;
                <i className="fa fa-circle" style={{color:RP_DARKGREY}}/>&nbsp;Private Event
              </LoadingIndicator>
            </PickDate>
          </PanelContent>            
        </SexiestPanelEver>
      </App>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  loadData(props) {
    const id = props.match.params.venueId

    if (id !== this.state.id) {
      this.props.loadVenue(id,moment())
      this.updateState({id})
    }
  }
  
  componentDidMount() {
    this.loadData(this.props)
  }
}

const mapStateToProps = (state, props) => {
  return {
    venue: selectors.selectVenue(state, props),
    openings: selectors.selectOpenings(state, props),
    events: selectors.selectEvents(state, props),
    bookedShows: selectors.selectBookedShows(state, props),
    dates_loading: selectors.selectDatesLoading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadVenue: (id,date) => {
      dispatch(actions.loadVenue(id,date))
    },

    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetVenueCalendar)


const PickDate = styled.div`
  text-align: center;
  padding-top: 10vmin;

  span {
    font-weight: bold;
  }
`