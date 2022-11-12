import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { RP_Act } from 'Models'

import { App, ConcertsPanel } from 'Containers'

import actions from './actions'
import selectors from './selectors'


const max_display_count = 6;

export class WidgetActShows extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreConcerts: false
    }
  }

  render() {
    const act             = this.props.act
    const _Act            = RP_Act(act)

    const campaigns       = this.props.campaigns || []
    const campaigns_count = campaigns.length
    
    const act_has_shows   = (campaigns_count > 0)

    return <App no_ui>
            {/* ACT'S PERFORMED SHOWS */}
            <ConcertsPanel is_act
              title={`${_Act.name}'s Concerts`}
              entity={act}
              entity_has_shows={act_has_shows}
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
    const id = props.match.params.actId

    if (id !== this.state.id) {
      this.props.loadBand(id)
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
    act: selectors.selectBand(state, props),
    campaigns: selectors.selectCampaigns(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBand: (id) => {
      dispatch(actions.loadBand(id))
    },

    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetActShows)
