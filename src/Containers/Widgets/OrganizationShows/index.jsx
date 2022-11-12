import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { RP_Organization } from 'Models'

import { App, ConcertsPanel } from 'Containers' 

import actions from './actions'
import selectors from './selectors'


const max_display_count = 6;

export class WidgetOrganizationShows extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreConcerts: false
    }
  }

  render() {
    const organization    = this.props.organization
    const _Organization   = RP_Organization(organization)

    const campaigns       = this.props.campaigns || []
    const campaigns_count = campaigns.length

    const organization_has_shows = (campaigns_count > 0)

    return <App no_ui>
            {/* CONCERTS WITH THIS ORGANIZATION */}
            <ConcertsPanel is_organization
              title={`Shows with ${_Organization.title}`}
              entity={organization}
              entity_has_shows={organization_has_shows}
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
    const id = props.match.params.organizationId

    if (id !== this.state.id) {
      this.props.loadOrganization(id)
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
    organization: selectors.selectOrganization(state, props),
    campaigns: selectors.selectCampaigns(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrganization: (id) => {
      dispatch(actions.loadOrganization(id))
    },

    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetOrganizationShows)
