import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { RP_Venue } from 'Models'

import { App, ConcertsPanel } from 'Containers'

import actions from './actions'
import selectors from './selectors'


const max_display_count = 6;

export class WidgetVenueShows extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreConcerts: false
    }
  }

  render() {
    const venue           = this.props.venue
    const _Venue          = RP_Venue(venue)

    const campaigns       = this.props.campaigns || []
    const campaigns_count = campaigns.length
    
    const venue_has_shows = (campaigns_count > 0)

    return <App no_ui>
            {/* CONCERTS WITH THIS VENUE */}
            <ConcertsPanel is_venue
              title={`Shows at ${_Venue.title}`} 
              entity={venue} 
              entity_has_shows={venue_has_shows}
              campaigns={campaigns}
              campaigns_count={campaigns_count}
              max_display_count={max_display_count}
              is_expanded={this.state.showMoreConcerts}
              onClickExpand={() => this.updateState({showMoreConcerts: true})}/>
          </App>
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  loadData(props) {
    const id = props.match.params.venueId

    if (id !== this.state.id) {
      this.props.loadVenue(id)
      this.props.loadCampaigns(id)
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
    campaigns: selectors.selectCampaigns(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadVenue: (id) => {
      dispatch(actions.loadVenue(id))
    },

    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetVenueShows)
