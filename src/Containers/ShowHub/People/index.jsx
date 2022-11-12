import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { paths } from 'globals'

import { RP_Campaign, RP_Venue } from 'Models'

import { RP_BLACK, RP_RED, RP_BLUE, RP_ORANGE, RP_GREEN, RP_GREY, RP_SUPER_LIGHT, RP_DARK_GREY, Bold } from 'Components' //GLOBALS
import { WarningModal } from 'Components' //MODAL 
import { Link } from 'Components' //LINK

import { Heading } from './../Heading/index.jsx'


export class People extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      show_finalize_warning: false,

      act: null,
      show_exit_warning: false,
    }
  }

  render() {
    const _Venue     = RP_Venue(this.props.venue)

    const user       = this.props.user || null
    const userId     = user ? user.id : null

    const acts       = this.set_ordered(this.props.acts || [])

    const is_active       = this.props.is_active || false
    const can_edit        = this.props.can_edit || false
    const is_owner        = this.props.is_owner || false
    const is_manager      = this.props.is_manager || false
    const is_organization = this.props.is_organization || false

    const campaign        = this.props.campaign || null
    const is_open         = campaign ? campaign.is_open : false
    const is_only_tickets = campaign ? campaign.is_only_tickets : false

    const organizations     = this.props.organizations || []
    const has_organizations = (organizations.length > 0)

    const can_accept_applications = (is_owner || is_manager || is_organization)

    return (
      <div style={{paddingRight:'2vmin'}}>
        <Heading text="Participants" icon="fa fa-users"/>
        <HalfWidth>
          <UserGroup icon="fa fa-music" color={RP_BLUE} text="Performers"/>
          { acts.map(act => {
              const band           = act.band
              const bandId         = band && band.id || ''
              const name           = band && band.name || ''
              const is_act_owner   = band && (band.owner == userId)
              const is_accepted    = act.is_accepted
              const is_application = act.is_application
              const is_headliner   = act.is_headliner

              const pending_acceptance  = is_accepted == null
              const pending_application = is_application == null

              const _Campaign = RP_Campaign(this.props.campaign)
              const set_time = moment(act.start_time).format('hh:mm a')

              return  <Panel key={act.id}>
                        <NameLink href={paths.acts(bandId)}>
                          <Bold>
                            &nbsp;&nbsp;&nbsp;
                            {name}
                          </Bold>&nbsp;
                          { (is_accepted && is_application)
                            ? <i className="fa fa-check-circle" style={{color:RP_GREEN}} />
                            : <i className="fa fa-question-circle-o" style={{color:RP_RED}} /> }
                        </NameLink>

                        { is_headliner
                          ? <Headliner className="fa fa-header" headliner/>
                          : can_edit && is_active
                            ? <Headliner className="fa fa-header" onClick={() => this.props.changeHeadliner(act)}/>
                            : null }   

                        { act.start_time
                          ? <mobiscroll.Time timeFormat="hh:ii A" value={act.start_time ? act.start_time : _Campaign.event_start} onSet={(e,date) => this.changeStart(act,date.getVal())}>
                              <SetTime chosen>
                                <i className="fa fa-clock-o"/>&nbsp;{set_time}
                              </SetTime>
                            </mobiscroll.Time>
                          : can_edit && is_active
                            ? <mobiscroll.Time timeFormat="hh:ii A" value={act.start_time ? act.start_time : _Campaign.event_start} onSet={(e,date) => this.changeStart(act,date.getVal())}>
                                <SetTime>
                                  <i className="fa fa-clock-o"/>&nbsp;Pick..
                                </SetTime>
                              </mobiscroll.Time>
                            : <SetTime chosen>
                                <i className="fa fa-clock-o"/>&nbsp;TBD
                              </SetTime> }

                        { pending_acceptance
                          ? pending_application
                            ? <Names>
                              { !can_accept_applications
                                ? <Name>Awaiting approval</Name>
                                : <Name>Act has applied, add them?</Name> }
                              </Names>
                            : <Names>
                                { is_act_owner && is_active
                                  ? <Name>Will you play the show?</Name>
                                  : act.band.is_redpine
                                    ? <Name>Awaiting Confirmation</Name>
                                    : <Name>Signup pending</Name> }
                              </Names>
                          : pending_application
                            ? <Names>
                              { !can_accept_applications
                                ? <Name>Awaiting approval</Name>
                                : <Name>Act has applied, add them?</Name> }
                              </Names>
                            : <Names>
                                Confirmed Playing
                              </Names> }

                        { //NO PRIVLEGES
                          pending_application && !can_accept_applications
                          ? <PendingApplication className="fa fa-question-circle-o"/>
                          : null }

                        { //ACCEPT APPLICATION/INVITATION
                          pending_application && can_accept_applications
                          ? <AcceptPendingApplication className="fa fa-check-circle" onClick={() => this.props.approveApplication(act)}/>
                          : pending_acceptance && is_act_owner
                            ? <AcceptShow className="fa fa-check-circle" onClick={() => this.props.acceptShow(act)}/>
                            : null }

                        { //REJECT APPLICATION/INVITATION 
                          pending_application && can_accept_applications
                          ? <RejectPendingApplication className="fa fa-times-circle" onClick={() => this.props.rejectApplication(act)}/>
                          : pending_acceptance && !pending_application && is_act_owner
                            ? <RemoveAct className="fa fa-times-circle" onClick={() => this.updateState({show_exit_warning:true,act:act})}/>
                            : null }

                        { //REMOVE ACT
                          is_active && can_edit && !pending_application && !pending_acceptance
                          ? <RemoveAct className="fa fa-ban" onClick={() => this.updateState({show_exit_warning:true,act:act})}/>
                          : null }
                      </Panel>
            })
          }

          { can_edit
            ? <Panel hoverColor={RP_GREEN} style={{lineHeight:'3vmin',fontSize:'2.5vmin'}} onClick={() => this.props.searchActs()} hoverSolid>
                <AddAct className="fa fa-plus"/>
              </Panel>
            : null }
          
          { can_edit
            ? is_open
              ? <Panel hoverColor={RP_GREEN} style={{lineHeight:'3vmin'}} onClick={() => this.updateState({show_finalize_warning:true})} hoverSolid>
                  <AddAct className="fa fa-lock" style={{fontSize:'2.5vmin'}}/>&nbsp;&nbsp;
                  This lineup is final!
                </Panel>
              : <Panel hoverColor={RP_GREEN} style={{lineHeight:'3vmin'}} onClick={() => this.updateState({show_opening_warning:true})} hoverSolid>
                  <AddAct className="fa fa-users" style={{fontSize:'2.5vmin'}}/>&nbsp;&nbsp;
                  Open to Public
                </Panel> 
            : null }
        </HalfWidth>

        <HalfWidth>
          <UserGroup icon="fa fa-home" color={RP_GREEN} text="Venue"/>
          <Panel>
            { !_Venue.manager
              ? <Name>
                  <Bold>{_Venue.title}</Bold>
                </Name>
              : <NameLink href={paths.venues(_Venue.id)}>
                  <Bold>{_Venue.title}</Bold>
                </NameLink> }
            <Names>
              { _Venue.manager
                ? _Venue.managers.map(manager => <Name key={manager.id}>{manager.manager.first_name + " " + manager.manager.last_name}</Name>) 
                : null }
            </Names>
          </Panel> 
          { has_organizations
            ? <UserGroup icon="fa fa-users" color={RP_ORANGE} text="Organizations"/>
            : null }
          { organizations.map(campaign_organization => {
              return <Panel key={campaign_organization.id}>
                      <NameLink href={paths.organizations(campaign_organization.organization.id)}>
                        <Bold>{campaign_organization.organization.title || 'Organization'}</Bold>
                      </NameLink>
                      <Names>
                        {
                          (campaign_organization.organization.managers || []).map(manager => {
                            return <Name key={manager.id}>{manager.manager.first_name + " " + manager.manager.last_name}</Name>
                          })
                        }
                      </Names>
                     </Panel>
            }) }
          <div style={{marginTop:can_edit?'4vmin':'2vmin',fontSize:'2vmin'}}>
            <ThirdWidth><i className="fa fa fa-header" style={{color:RP_BLACK}}/>&nbsp;&nbsp;Headliner</ThirdWidth>
            <ThirdWidth><i className="fa fa-check-circle" style={{color:RP_GREEN}}/>&nbsp;&nbsp;Playing</ThirdWidth>
            <ThirdWidth><i className="fa fa-question-circle-o" style={{color:RP_RED}}/>&nbsp;&nbsp;Pending</ThirdWidth>
          </div>
          { can_edit
            ? <div style={{marginTop:'2vmin',fontSize:'2vmin'}}>
                <ThirdWidth><i className="fa fa-ban" style={{color:RP_RED}}/>&nbsp;&nbsp;Remove</ThirdWidth>
                <ThirdWidth><i className="fa fa fa-check-circle" style={{color:RP_DARK_GREY}}/>&nbsp;&nbsp;Confirm</ThirdWidth>
                <ThirdWidth><i className="fa fa-times-circle" style={{color:RP_DARK_GREY}}/>&nbsp;&nbsp;Reject</ThirdWidth>
              </div>
            : null }
        </HalfWidth>
        <WarningModal light_warning
          show={this.state.show_opening_warning}
          description={<div>
                        This will open your show to the public, letting any act join!<br/>
                        You will still be able to curate the lineup, and should select "This lineup is final!" when you wish to stop recieving requests.<br/><br/>
                       </div>}
          onContinue={() => this.props.openCampaign()}
          onClose={() => this.updateState({show_opening_warning:false})}/>
        <WarningModal light_warning
          show={this.state.show_finalize_warning}
          description={<div>
                        You are about to finalize the lineup!<br/>
                        Be sure to double-check that you're happy with the current lineup, becauce public acts will no longer be able to apply.<br/>
                        You can continue adding acts manually, using the "+".<br/><br/>
                       </div>}
          onContinue={() => this.props.saveLineup()}
          onClose={() => this.updateState({show_finalize_warning:false})}/>
        <WarningModal
          show={this.state.show_exit_warning}
          description={`You are about to remove ${this.state.act ? this.state.act.band.name : 'an act'} from the lineup!`}
          onContinue={() => this.props.removeAct(this.state.act)}
          onClose={() => this.updateState({show_exit_warning:false})}/>
      </div>
    )
  }

  changeStart(act,date){
    const time = moment(date.toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')

    this.props.changeStart(act,time.format('YYYY-MM-DDTHH:mm:ss'))
  }

  set_ordered(acts){
    const minutesOfDay = (m) => (m.minutes() + m.hours() * 60)

    let after_midnight = []
    let before_midnight = []
    let no_set_time = []
    acts.forEach(campaign_band => {
      if(campaign_band.start_time){
        minutesOfDay(moment(campaign_band.start_time).local()) < 360 //6:00 AM 
        ? after_midnight.push(campaign_band)
        : before_midnight.push(campaign_band)
      }else{
        no_set_time.push(campaign_band)
      }
    })
    after_midnight.sort((a,b) => moment(a.start_time).isAfter(b.start_time) ? 1 : -1)
    before_midnight.sort((a,b) => moment(a.start_time).isAfter(b.start_time) ? 1 : -1)

    return no_set_time.concat(before_midnight,after_midnight)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}


const UserGroup = ({icon,color,text}) => (<UserGroupWrap color={color}><i className={icon}/>{text}</UserGroupWrap>)


const UserGroupWrap = styled.div`
  background: ${props => props.color || '#FFF'};
  padding: 1vmin 0;
  color: #FFF;
  margin-top: 2vmin;
  border-radius: 0.5vmin;
  font-size: 2.5vmin;

  i {
    padding: 0 1vmin 0 2vmin;
  }

  @media (max-width: 500px) and (orientation: portrait) {
    width: calc(100% - 4vmin);
  }
`
const HalfWidth = styled.div`
  display: inline-block;
  padding-left: 2vmin;
  width: calc(50% - 2vmin);
  vertical-align: top;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    display: block;
    padding-left: 2vmin;
    width: calc(100% - 2vmin);
  }
`
const ThirdWidth = styled.div`
  display: inline-block;
  padding-left: 2vmin;
  width: calc(33% - 2vmin);
  vertical-align: top;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    display: block;
    padding-left: 2vmin;
    width: calc(100% - 2vmin);
  }
`
const Panel = styled.div`
  display: block;
  position: relative;
  background: ${props => props.color || 'rgba(255,255,255,0.9)'};
  color: ${RP_BLACK};
  text-align: center;
  margin-bottom: 0.25vmin;
  padding: 1vmin;
  font-size: 2.25vmin;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};

  &:hover {
    color: ${props => props.hoverColor || RP_BLACK};
    cursor: ${props => props.hoverColor ? 'pointer' : 'default'};
    background: ${props => props.hoverSolid ? '#FFF' : 'rgba(255,255,255,0.9)'};
  }

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2.5vmin;
  }
`
const NameLink = styled(Link)`
  transition: background ease 0.25s;

  &:hover {
    color: ${RP_RED};
  }
`
const Names = styled.div`
  font-size: 2vmin;
  font-style: italic;

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2.5vmin;
  }
`
const Name = styled.div`
  @media (max-width: 500px) { 
    display: inline-block;
    margin-right: 2vmin;
  }
`
const PendingApplication = styled.i`
  position: absolute;
  right: 1vmin;
  bottom: 1vmin;
  font-size: 2.75vmin;
  color: ${RP_DARK_GREY};
`
const AcceptPendingApplication = styled.i`
  position: absolute;
  right: 4vmin;
  bottom: 1vmin;
  font-size: 2.75vmin;
  color: ${RP_DARK_GREY};

  &:hover {
    color: ${RP_GREEN};
    cursor: pointer;
  }
`
const RejectPendingApplication = styled.i`
  position: absolute;
  right: 1vmin;
  bottom: 1vmin;
  font-size: 2.75vmin;
  color: ${RP_DARK_GREY};

  &:hover {
    color: ${RP_RED};
    cursor: pointer;
  }
`
const AcceptShow = styled.i`
  position: absolute;
  right: 4vmin;
  bottom: 1vmin;
  font-size: 2.75vmin;
  color: ${RP_GREEN};
  transition: background ease 0.25s;

  &:hover {
    color: ${RP_BLACK};
    cursor: pointer;
  }
`
const RemoveAct = styled.i`
  position: absolute;
  right: 1vmin;
  bottom: 1vmin;
  font-size: 2.75vmin;
  color: ${RP_RED};
  transition: background ease 0.25s;

  &:hover {
    color: ${RP_BLACK};
    cursor: pointer;
  }
`
const Headliner = styled.i`
  position: absolute;
  left: 1vmin;
  top: 1vmin;
  font-size: 2.5vmin;
  color: ${props => props.headliner ? RP_BLACK : RP_SUPER_LIGHT};
  transition: background ease 0.25s;

  &:hover {
    color: ${RP_BLACK};
    cursor: ${props => props.headliner ? 'default' : 'pointer'};;
  }

  @media (max-width:768px){
    top: 2vmin;
    font-size: 3vmin;
  }
`
const SetTime = styled.span`
  position: absolute;
  left: 1vmin;
  bottom: 1vmin;
  font-size: 2vmin;
  color: ${props => props.chosen ? RP_BLACK : RP_SUPER_LIGHT};
  transition: background ease 0.25s;

  &:hover {
    color: ${RP_BLACK};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`
const AddAct = styled.i`
  line-height: 3vmin;
  transition: background ease 0.25s;

  &:hover {
    cursor: pointer;
  }
`
