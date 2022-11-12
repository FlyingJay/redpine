import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'
import { CAMPAIGN_STATUS } from 'enums'

import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { RP_DARKGREY, RP_DARK_GREY, RP_BLUE, RP_GREEN, RP_RED } from 'Components' //GLOBALS
import { WarningModal } from 'Components' //MODAL

import actions from './actions'
import selectors from './selectors'


export class ShowStatusHeader extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      reject_warning: false
    }
  }

  render() {
    const user            = this.props.user || null
    const campaign        = this.props.campaign || null

    const _Campaign       = RP_Campaign(campaign)
    const status          = _Campaign.status()
    const isTraditional   = _Campaign.isTraditional()
    const isManager       = _Campaign.userIsVenueManager(user)

    const timeslot        = campaign ? campaign.timeslot : null
    const venue           = timeslot ? timeslot.venue : null
    const venue_title     = venue ? venue.title : 'A Venue'

    const inActNeedAccept = _Campaign.hasOpenInviteToUserAct(user)
    const invited_band    = _Campaign.firstOpenInviteToUserAct(user)
    const invited_band_id = invited_band ? invited_band.id : null

    const inActApplicationPending = _Campaign.hasOpenApplicationFromUserAct(user)

    const show_status_header = campaign ? (!campaign.is_only_tickets) : false

    return <div>
      { show_status_header
         ? inActApplicationPending
            ? <CampaignProgressInd>
                <i className="fa fa-question" />&nbsp;&nbsp;
                Your application to play is awaiting confirmation by the organizers.
              </CampaignProgressInd>

            : inActNeedAccept
              ? <CampaignProgressInd>
                  <i className="fa fa-question" />&nbsp;&nbsp;
                  You have been invited to play!  Will you?
                  <ConfirmButtons visible={!this.props.is_loading}>
                    <ConfirmButton className="fa fa-check" onClick={() => this.acceptShow(_Campaign.id,invited_band_id)} background={RP_GREEN} />
                    <ConfirmButton className="fa fa-times" onClick={() => this.rejectShow(_Campaign.id,invited_band_id)} />
                  </ConfirmButtons>
                </CampaignProgressInd>

              : <div>{{ 
               [CAMPAIGN_STATUS.PENDING_FOREVER]: <CampaignProgressInd>
                                                    <i className="fa fa-times" />&nbsp;&nbsp;
                                                    {
                                                      isManager
                                                      ? 'This show was never approved by you and has passed the funding date.'
                                                      : 'This show was never approved by the venue.'
                                                    }
                                                  </CampaignProgressInd>,

              [CAMPAIGN_STATUS.PENDING_APPROVAL]: <CampaignProgressInd>
                                                    <i className="fa fa-question" />&nbsp;&nbsp;
                                                    { isManager
                                                      ? _Campaign.is_hold
                                                        ? 'The date is held. Confirm this show to move forward!'
                                                        : 'You need to confirm this show, or place a hold!'
                                                      : 'This show is awaiting confirmation by the venue.' }
                                                    <ConfirmButtons visible={isManager && !this.props.is_loading}>
                                                      { !_Campaign.is_hold
                                                        ? <ConfirmButton className="fa fa-lock" onClick={() => this.props.placeHold(_Campaign.id)} background={RP_DARKGREY}/>
                                                        : null }
                                                      <ConfirmButton className="fa fa-check" onClick={() => this.props.confirmCampaign(_Campaign.id)} background={RP_GREEN} />
                                                      <ConfirmButton className="fa fa-times" onClick={() => this.updateState({reject_warning:true})}/>
                                                    </ConfirmButtons>
                                                  </CampaignProgressInd>,

                      [CAMPAIGN_STATUS.FINISHED]: !isTraditional
                                                  ? <CampaignProgressInd active>
                                                    <i className="fa fa-info" />&nbsp;&nbsp;
                                                    This show reached its goal, and the acts performed at {venue_title}!
                                                  </CampaignProgressInd>
                                                  : null,

                      [CAMPAIGN_STATUS.REJECTED]: <CampaignProgressInd>
                                                    <i className="fa fa-times" />&nbsp;&nbsp;
                                                    This show is not active. It has been rejected by the venue.
                                                  </CampaignProgressInd>
              }[status]}</div>
         : null }
        <WarningModal light_warning
          show={this.state.reject_warning}
          description="You are about to reject this show. Remember that every detail in the Show Hub can be modified! - It can be easier to discuss the best arrangement instead of asking to have another request submitted."
          onContinue={() => this.props.denyCampaign(_Campaign.id)}
          onClose={() => this.updateState({reject_warning:false})}/>
      </div>
  }

  acceptShow(campaign,campaign_band){
    const data = {
      id: campaign_band,
      campaign: campaign,
      is_accepted: true
    }
    this.props.updateCampaignBand(campaign_band,data)
    this.props.tutorialEventCompleted(this.props.user, {welcome_approve_booking_request:true})
  }

  rejectShow(campaign,campaign_band){
    const data = {
      id: campaign_band,
      campaign: campaign,
      is_accepted: false
    } 
    this.props.updateCampaignBand(campaign_band,data)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    is_loading: selectors.selectIsLoading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirmCampaign: (id) => {
      dispatch(actions.confirmCampaign(id))
    },
    denyCampaign: (id) => {
      dispatch(actions.denyCampaign(id))
    },
    placeHold: (id) => {
      dispatch(actions.placeHold(id))
    },
    updateCampaignBand: (campaign_band,data) => {
      dispatch(actions.updateCampaignBand(campaign_band,data))
    },
    tutorialEventCompleted: (user, events) => {
      dispatch(appActions.tutorialEventCompleted(user, events))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowStatusHeader)


const CampaignProgressInd = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 2vmin 3vmin;
  margin: 0 0 1vmin 0;
  background: ${props => props.active ? RP_BLUE : RP_DARK_GREY};
  border-radius: 0.75vmin;
  color: #FFF;
  font-size: 1.8vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    margin: 5vmin 0 3vmin 0;
    font-size: 2.75vmin;
  }
`
const ConfirmButtons = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  position: absolute;
  top: 1.5vmin;
  right: 0;
`
const ConfirmButton = styled.i`
  width: 2vmin;
  height: 2vmin;
  padding: 0.75vmin;
  border-radius: 100%;
  background: #EEE;
  text-align: center;
  font-size: 1.7vmin;
  line-height: 2vmin;
  box-shadow: 1px 1px 1px rgba(0,0,0,.2);
  margin-right: 1.75vmin;
  color: ${RP_DARKGREY};

  &:hover {
    cursor: pointer;
    background: ${props => props.background || RP_RED };
    color: #FFF;
  }

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    width: 2.5vmin;
    height: 2.5vmin;
    padding: 1vmin;
    border-radius: 1vmin;
    background: #EEE;
    text-align: center;
    font-size: 1.8vmin;
    line-height: 2.5vmin;
    border-radius: 0.5vmin;
  }
`