import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { helpers, validators } from 'globals'

import { RP_Venue } from 'Models'

import { RP_BLUE, Bold } from 'Components' //GLOBALS
import { DateTimePicker } from 'Components' //DATETIMEPICKER
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, FieldName, NegativeButton, PositiveButton, WarningModal } from 'Components' //MODAL
import { Checkbox } from 'Components' //CHECKBOX
import { Input } from 'Components' //INPUT

import constants from './constants'


export class EditGoals extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      goal_count: this.props.goal_count.toString(),
      goal_amount: Number(this.props.goal_amount).toFixed(2),
      funding_end: this.props.funding_end,
      is_successful: this.props.is_successful,

      hide_modal: this.props.is_successful
    }
  }

  render() {
    const campaign         = this.props.campaign 
    const is_successful    = this.state.is_successful
    const timeslot         = campaign && campaign.timeslot || null
    const venue            = timeslot && timeslot.venue || null
    const tickets_sold     = campaign && campaign.tickets_sold || 0
    const total_earned    = Number(campaign && campaign.total_earned || 0).toFixed(2)

    const date             = timeslot && moment(timeslot.start_time).format("MMMM DD") || '____'
    const start_time       = timeslot && moment(timeslot.start_time).format("h:mm A") || '?:??'

    const funding_end_text = this.state.funding_end && moment(this.state.funding_end).toDate() || null
    const booking_string   = 'I will book these acts for ' + date + ' at ' + start_time

    return (
      <SidePanel>
        <ModalSection top>
          <ModalHeading>Booking Requirements</ModalHeading>
          <FieldName>Headcount</FieldName>
          <Requirement>
            <i className="fa fa-users" />
            &nbsp;&nbsp;{tickets_sold}&nbsp;/&nbsp;
            <RequirementInput
              value={this.state.goal_count}
              validate={validators.POSITIVE_NUMBER()}
              onValidate={(goal_count) => this.updateState({goal_count: goal_count})}
              maxLength="8"
              width="10vmin"
              inline/>
          </Requirement>
          <FieldName>Booking Fee</FieldName>
          <Requirement>
            <i className="fa fa-money" />
            &nbsp;&nbsp;${total_earned}&nbsp;/&nbsp;$&nbsp;
            <RequirementInput
              value={this.state.goal_amount}
              validate={validators.POSITIVE_DOLLAR()}
              onValidate={(goal_amount) => this.updateState({goal_amount: goal_amount})}
              maxLength="8"
              width="10vmin"
              inline/>
          </Requirement>
        </ModalSection>
        <ModalSection>
          <label>
            Last day for ticket sales
            <br/>
            <LastDayMessage>
              If the requirements you've set are satisfied by this date, then acts will continue to sell tickets until the date of the show.
            </LastDayMessage>
            <mobiscroll.Datetime
              display="center"
              placeholder="Please Select..."
              value={this.state.funding_end}
              onSet={(value) => this.validateEndTime(value.valueText)}>
              <Input
                image="dot"
                focusImage="dot-focus"/>
            </mobiscroll.Datetime>
          </label>
        </ModalSection>
        <ModalSection>
          <ModalHeading>Book Now!</ModalHeading>
          <ModalSubheading>
            Book this show, regardless of it's current progress.
            &nbsp;<Bold>This cannot be undone.</Bold>
          </ModalSubheading>
          <Checkbox 
            label={booking_string}
            checked={this.state.is_successful}
            onChange={(val) => this.updateState({is_successful: val})}/>
        </ModalSection>
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()}>
            <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
          </NegativeButton>
          <PositiveButton onClick={() => this.saveGoals()}>
            Save
          </PositiveButton>
        </ModalSection>
        <WarningModal
          show={this.state.is_successful && !this.state.hide_modal}
          description={constants.BOOKING_WARNING}
          onContinue={() => this.saveGoals()}
          onClose={() => this.updateState({show_warning:false,hide_warning:true,is_successful:false})}/>
      </SidePanel>
    )
  }

  saveGoals(){
    if(this.validate()){
      const campaign = this.props.campaign
      const timeslot = campaign && campaign.timeslot || null
      const _Venue   = RP_Venue(timeslot && timeslot.venue || null)

      const timeslot_data = {
        asking_price: this.state.goal_amount,
        min_headcount: this.state.goal_count
      }

      const campaign_data = {
        goal_count: this.state.goal_count,
        goal_amount: this.state.goal_amount,
        funding_end: moment.utc(this.state.funding_end).toISOString().replace('.000Z', '')
      }

      this.props.save(campaign_data,timeslot_data,this.state.is_successful)
    }
  }

  validate(){
    if(isNaN(this.state.goal_count)){
      this.props.error(constants.GOAL_COUNT_NOT_VALID)
      return false
    }
    if(isNaN(this.state.goal_amount)){
      this.props.error(constants.GOAL_AMOUNT_NOT_VALID)
      return false
    }
    return true
  }

  validateEndTime(funding_end){
    const _Venue = RP_Venue(this.props.venue)
  
    if(moment(funding_end).isBefore(Date.now())){
      this.props.error(constants.DATE_MUST_BE_IN_FUTURE)
    }else{
      this.updateState({funding_end: moment(funding_end)})
    }
  }

  updateState(update){
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Requirement = styled.div`
  font-size: 2.2vmin;
  font-weight: bold;
  white-space: nowrap;
  line-height: 2.5vmin;
  padding: 1vmin 1vmin 0 1vmin;
  overflow: hidden;
  text-overflow: ellipsis;

  i {
    color: ${RP_BLUE};
  }
`
const RequirementInput = styled(Input)`
  margin: 0;
  padding: 1vmin;
`
const LastDayMessage = styled.div`
  font-size: 1.5vmin;
  font-weight: normal;
  margin-bottom: 1vmin;
`