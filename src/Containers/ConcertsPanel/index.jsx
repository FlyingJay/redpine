import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import { paths } from 'globals'
import { CAMPAIGN_STATUS } from 'enums'

import { RP_Act, RP_Venue, RP_Organization } from 'Models'

import { Clear, Bold, TWITTER, RP_BLACK, RP_BLUE, RP_DDD, RP_SUPER_LIGHT, RP_DARK_GREY, RP_PINK, RP_RED } from 'Components' // GLOBALS
import { SexiestPanelEver, PanelHeading, PanelContent, SexifyPersonality, ViewAllData } from 'Components' //PROFILE
import { Tooltip } from 'Components'

import { ConcertResult } from './ConcertResult/index.jsx'

import actions from './actions'


export class ConcertsPanel extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      clicked: false
    }
  }

  render() {
    const title             = this.props.title

    const campaigns         = this.props.campaigns
    const campaigns_count   = this.props.campaigns_count

    const entity_has_shows  = this.props.entity_has_shows
    const entity            = this.props.entity

    const is_expanded       = this.props.is_expanded
    const max_display_count = this.props.max_display_count
    const onClickExpand     = this.props.onClickExpand

    const default_picture = '/Assets/images/defaults/defaultCampaign.png'

    const subscribers = entity ? entity.subscribers : []

    let is_subscribed = subscribers ? subscribers.length > 0 : false
    if (this.state.clicked){
      is_subscribed = !is_subscribed
    }

    return <SexiestPanelEver>
              <PanelHeading color={TWITTER}>
                <i className="fa fa-bars" />
                <span>
                  {title}
                </span>
                { is_subscribed
                  ? <Subscribe onClick={() => this.unsubscribe()}><Tooltip tip="You won't miss a show!"><i className="fa fa-check"/></Tooltip><i className="fa fa-check"/></Subscribe>
                  : <Subscribe onClick={() => this.subscribe()}><Tooltip tip="Subscribe for updates!"><i className="fa fa-bell-o"/></Tooltip><i className="fa fa-bell-o"/></Subscribe> }
              </PanelHeading>
              <PanelContent>
                { entity_has_shows
                  ? campaigns.map((campaign, index) => {
                      return (index > max_display_count && !is_expanded ? null : <ConcertResult key={campaign.id} campaign={campaign} onClick={() => this.props.goToCampaign(campaign.id)}/>)
                    })
                  : <SexifyPersonality>No active RedPine shows at this time</SexifyPersonality> }
                { campaigns_count > max_display_count && !is_expanded
                  ? <ViewAllData show={!is_expanded} onClick={onClickExpand}><i className="fa fa-ellipsis-h" /></ViewAllData>
                  : null }
              </PanelContent> 
            </SexiestPanelEver>
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  subscribe(){
    if(this.props.is_act){
      this.props.subscribeAct(RP_Act(this.props.entity).id)
    }
    else if(this.props.is_organization){
      this.props.subscribeOrganization(RP_Organization(this.props.entity).id)
    }
    else if(this.props.is_venue){
      this.props.subscribeVenue(RP_Venue(this.props.entity).id)
    }
    this.updateState({clicked:!this.state.clicked})
  }

  unsubscribe(){
    if(this.props.is_act){
      this.props.unsubscribeAct(RP_Act(this.props.entity).id)
    }
    else if(this.props.is_organization){
      this.props.unsubscribeOrganization(RP_Organization(this.props.entity).id)
    }
    else if(this.props.is_venue){
      this.props.unsubscribeVenue(RP_Venue(this.props.entity).id)
    }
    this.updateState({clicked:!this.state.clicked})
  }
}
const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToCampaign: (campaign_id) => {
      dispatch(push(paths.shows(campaign_id)))
    },
    subscribeAct: (act_id) => {
      dispatch(actions.subscribeAct(act_id))
    },
    subscribeOrganization: (organization_id) => {
      dispatch(actions.subscribeOrganization(organization_id))
    },
    subscribeVenue: (venue_id) => {
      dispatch(actions.subscribeVenue(venue_id))
    },
    unsubscribeAct: (subscription_id) => {
      dispatch(actions.unsubscribeAct(subscription_id))
    },
    unsubscribeOrganization: (subscription_id) => {
      dispatch(actions.unsubscribeOrganization(subscription_id))
    },
    unsubscribeVenue: (subscription_id) => {
      dispatch(actions.unsubscribeVenue(subscription_id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConcertsPanel)


const Subscribe = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 200;
  transition: 0.25s all ease;

  i { display: inline-block; }
  span { display: none; }

  &:hover {
    cursor: pointer;

    i { display: none; }
    span { 
      display: inline-block; 
      i { display: inline-block; }
    }
  }
`