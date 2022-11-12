import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'

import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_ORANGE, RP_BLUE, RP_GREEN, RP_BLACK, RP_RED, RP_GREY, RP_DARK_GREY } from 'Components' // GLOBALS
import { ModalHeading, ModalSubheading } from 'Components' // MODALOTHERS
import { Link } from 'Components' // LINK

import selectors from './selectors'
import actions from './actions'


export class Tutorial extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {   
    return (
      this.props.user && this.completionPercentage() < 100
      ? <Wrapper>
          { this.props.is_hidden 
            ? this.renderCollapsed() 
            : this.renderExpanded() }
          { this.props.is_hidden
            ? <ToggleIcon className="fa fa-arrow-down" onClick={() => this.props.toggle(false)}/>
            : <ToggleIcon className="fa fa-arrow-up" onClick={() => this.props.toggle(true)}/> }
        </Wrapper>
      : null
    )
  }

  renderCollapsed(){
    return [
      <ModalHeading style={{display:'inline-block'}} key="collaped_0">Welcome!</ModalHeading>,
      <Progress key="collaped_1">{this.completionPercentage()}% Complete</Progress>
    ]
  }

  renderExpanded(){
    const profile = this.props.user.profile

    return <div>
            <ModalHeading>Welcome!</ModalHeading>
            <ModalSubheading>We'd love for you to take this moment and explore your new account.</ModalSubheading>

            <MiniHeading first>Everyone</MiniHeading>
            <Task icon="fa fa-picture-o" color={RP_BLUE} text='Upload a profile picture' link={paths.settings()} is_complete={profile.welcome_add_profile_pic}/>
            <Task icon="fa fa-ticket" color={RP_ORANGE} text='Visit "My Tickets"' link={paths.tickets()} is_complete={profile.welcome_view_my_tickets}/>

            {
              profile.is_artist
              ? <div>
                  <MiniHeading>Acts</MiniHeading>
                  <Task icon="fa fa-pencil" color={RP_RED} text='Create an Act' link={paths.myActs()} is_complete={profile.welcome_create_act}/>
                  <Task icon="fa fa-share-square-o" color={RP_BLUE} text="Add your act's socials" link={paths.myActs()} is_complete={profile.welcome_add_act_socials}/>
                  <Task icon="fa fa-flag" color={RP_GREEN} text='Submit a booking request' link={paths.showCreate()} is_complete={profile.welcome_submit_booking_request}/>
                </div>
              : null
            }

            {
              profile.is_venue
              ? <div>
                  <MiniHeading>Venues</MiniHeading>
                  <Task icon="fa fa-pencil" color={RP_RED} text='Create a Venue' link={paths.venueCreate()} is_complete={profile.welcome_create_venue}/>
                  <Task icon="fa fa-calendar" color={RP_BLUE} text='View Booking Calendar' link={paths.myVenues()} is_complete is_complete={profile.welcome_check_calendar}/>
                  <Task icon="fa fa-calendar" color={RP_BLUE} text='View "Add Event"' link={paths.myVenues()} is_complete is_complete={profile.welcome_add_event}/>
                  <Task icon="fa fa-flag" color={RP_GREEN} text='Approve a booking request' link={paths.myVenues()} is_complete={profile.welcome_approve_booking_request}/>
                </div>
              : null
            }
            <MiniHeading/>
            <div style={{fontSize:'2.25vmin',textAlign:'right',padding:'2vmin 2vmin 0 2vmin'}}>
              <Link onClick={() => this.props.completeAll(this.props.user)}>Skip Tutorial&nbsp;&nbsp;<i className="fa fa-check"/></Link>
            </div>
           </div>
  }

  completionPercentage(){
    const profile = this.props.user.profile

    let finished_tasks = 0
    let total_tasks = 2
    
    if(profile.welcome_add_profile_pic){ finished_tasks++ }
    if(profile.welcome_view_my_tickets){ finished_tasks++ }

    if(profile.is_artist){
      total_tasks += 3

      if(profile.welcome_create_act){ finished_tasks++ }
      if(profile.welcome_add_act_socials){ finished_tasks++ }
      if(profile.welcome_submit_booking_request){ finished_tasks++ }
    }

    if(profile.is_venue){
      total_tasks += 4

      if(profile.welcome_create_venue){ finished_tasks++ }
      if(profile.welcome_check_calendar){ finished_tasks++ }
      if(profile.welcome_add_event){ finished_tasks++ }
      if(profile.welcome_approve_booking_request){ finished_tasks++ }
    }

    return ((finished_tasks/total_tasks)*100).toFixed(0)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    completeAll: (user) => {
      dispatch(appActions.tutorialEventCompleted(user, {
        welcome_add_profile_pic:true,
        welcome_view_my_tickets:true,
        welcome_create_act:true,
        welcome_add_act_socials:true,
        welcome_submit_booking_request:true,
        welcome_create_venue:true,
        welcome_check_calendar:true,
        welcome_add_event:true,
        welcome_approve_booking_request:true
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)

const Wrapper = styled.div`
  display: block;
  position: fixed;
  top: 8vmin;
  right: 25vmin;
  width: 35%;
  z-index: 99;
  padding: 2vmin;

  background: #FFF;
  border-radius: 0 0 0.5vmin 0.5vmin;
  box-shadow: 0 2px 6px 2px rgba(0,0,0,0.2);

  @media (max-width: 768px) and (orientation: portrait) {
    width: calc(100% - 4vmin);
    top: calc(15vmin - 1px);
    right: 0;
    border-radius: 0;
  }  
`
const ToggleIcon = styled.i`
  position: absolute;
  top: 3vmin;
  right: 3vmin;
  font-size: 3vmin;
  color: ${RP_BLACK};

  &:hover {
    color: ${RP_RED};
    cursor: pointer;
  }
`
const Progress = styled.div`
  display: inline-block;
  margin-left: 1vmin;
  padding: 0 1vmin;
  font-size: 2vmin;
  font-weight: 400;
  line-height: 3vmin;
  color: ${RP_BLACK};

  border-left: 1px solid ${RP_GREY};
`
const MiniHeading = styled.div`
  font-size: 1.75vmin;
  font-weight: bold;
  padding: ${props => props.first ? '0' : '2vmin'} 0 0.25vmin 1vmin;
  color: ${RP_DARK_GREY};

  border-bottom: 1px solid ${RP_GREY};
`
const Task = ({icon,color,text,link,is_complete}) => (
  <Link href={link}>
    <TaskWrap is_complete={is_complete}>
        <i className={icon} style={{color:is_complete ? RP_GREY : color}}/>&nbsp;&nbsp;
        {text}
    </TaskWrap>
  </Link>
)
const TaskWrap = styled.div`
  display: inline-block;
  width: calc(50% - 4vmin);
  padding: 1vmin 2vmin;
  font-size: 2vmin;
  color: ${props => props.is_complete ? RP_GREY : RP_BLACK};
  text-decoration: ${props => props.is_complete ? 'line-through' : 'none'};

  @media (max-width: 768px) and (orientation: portrait) { 
    font-size: 2.5vmin;
    width: calc(50% - 4vmin);
  }  
`