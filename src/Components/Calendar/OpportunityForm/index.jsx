import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { RP_Venue } from 'Models'
import { TextBox } from 'Components' //INPUT

import constants from './constants'


export class OpportunityForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = (
      props.selected_opening
      ? { is_edit: true,
          id: props.selected_opening.id,
          title: props.selected_opening.title,
          is_open: props.selected_opening.is_open,
          timeslot: props.selected_opening.timeslot,
          extra_details: props.selected_opening.extra_details,
          date_range: props.selected_date 
                ? [new Date(props.selected_date[0]),new Date(props.selected_date[1])] 
                : [new Date(),new Date()] }
      : { is_edit: false,
          id: null,
          title: '',
          is_open: true,
          date_range: props.selected_date 
                ? [new Date(props.selected_date[0]),new Date(props.selected_date[1])] 
                : [new Date(),new Date()],
          extra_details: ''
        }
    )
  }

  render() {
    const _Venue = RP_Venue(this.props.venue)

    return (
      <mobiscroll.Form>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>
            {`${this.state.is_edit ? 'Edit ' : 'Add a '} Paid Gig`} @ {_Venue.title}
          </mobiscroll.FormGroupTitle>
          <Subtitle>
            Post a paid opportunity for acts to play!
          </Subtitle>
          <mobiscroll.Form.Label>
            Title
            <input value={this.state.title} onChange={(e) => this.updateState({title:e.target.value})} />
          </mobiscroll.Form.Label>
        </mobiscroll.FormGroup>
        <mobiscroll.FormGroup>  
          <mobiscroll.Form.Label>
            Starts
            <input id="startDate" />
          </mobiscroll.Form.Label>
          <mobiscroll.Form.Label>
            Ends
            <input id="endDate" />
          </mobiscroll.Form.Label>
          <mobiscroll.Range
            ref="range"
            type="hidden"
            controls={['date', 'time']}
            dateWheels="|D M d|"
            startInput="#startDate"
            endInput="#endDate"
            tabs={false}
            value={this.state.date_range}
            onSet={(e,date) => this.updateTime(date.getVal())}/>
          <mobiscroll.Form.Label>
            <mobiscroll.Segmented name="group1" checked={this.state.is_open} onChange={(e) => this.updateState({is_open:!this.state.is_open})}>
              Bookable
            </mobiscroll.Segmented>
            <mobiscroll.Segmented name="group1" checked={!this.state.is_open} onChange={(e) => this.updateState({is_open:!this.state.is_open})}>
              Hide it for now..
            </mobiscroll.Segmented>
          </mobiscroll.Form.Label>
          <mobiscroll.Form.Label>
            Pay Arrangement and Gig Details
            <TextBox value={this.state.extra_details} onChange={(e) => this.updateState({extra_details:e.target.value})} />
          </mobiscroll.Form.Label>
        </mobiscroll.FormGroup>  
        <mobiscroll.FormGroup className="mbsc-btn-group-block">
          <button onClick={() => this.state.is_edit ? this.updateOpening(this.state) : this.createOpening(this.state)} type="button">
            {`${this.state.is_edit
                ? 'Save '
                : 'Add '}
              ${this.state.is_open
                ? '' 
                : ' Hidden '} Paid Gig`}
          </button>
        </mobiscroll.FormGroup>
        { this.state.is_edit
          ? <mobiscroll.FormGroup className="mbsc-btn-group-block">
              <button onClick={() => this.deleteOpening(this.state.id)} type="button">
                Delete Paid Gig
              </button>
            </mobiscroll.FormGroup>
          : null }
        <mobiscroll.FormGroup className="mbsc-btn-group-block">
          <button onClick={() => this.cancel()} type="button">Cancel</button>
        </mobiscroll.FormGroup>
      </mobiscroll.Form>
    )
  }

  updateTime(date) {
    this.updateState({date_range: [date[0], date[1]]})
  }
  
  createOpening(details) {
    const start_time = moment(details.date_range[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(details.date_range[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    
    if(details.date_range){
      if(details.title){
        const timeslot = {
          min_headcount: 0,
          asking_price: 0.00,
          start_time: start_time.format('YYYY-MM-DDTHH:mm:ss'),
          end_time: end_time.format('YYYY-MM-DDTHH:mm:ss'),
          venue: this.props.venue.id
        }
        if(details.extra_details.length <= 2000){
          const opening = {
            title: details.title,
            is_open: details.is_open,
            extra_details: details.extra_details
          }
          this.props.createOpening(timeslot,opening)
          this.props.onClose()
        }else{this.props.error(constants.DETAILS_MAX_LENGTH_2000)}
      }else{this.props.error(constants.PLEASE_ADD_TITLE)}
    }else{this.props.error(constants.PLEASE_CHOOSE_DATE)}
  }

  updateOpening(details) {
    const start_time = moment(details.date_range[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(details.date_range[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')

    if(details.date_range){
      if(details.title){
        const timeslot = {
          id: details.timeslot,
          start_time: start_time.format('YYYY-MM-DDTHH:mm:ss'),
          end_time: end_time.format('YYYY-MM-DDTHH:mm:ss'),
          venue: this.props.venue.id
        }
        if(details.extra_details.length <= 2000){
          const opening = {
            id: details.id,
            title: details.title,
            is_open: details.is_open,
            extra_details: details.extra_details,
            timeslot: details.timeslot
          }
          this.props.updateOpening(timeslot,opening)
          this.props.onClose()
        }else{this.props.error(constants.DETAILS_MAX_LENGTH_2000)}
      }else{this.props.error(constants.PLEASE_ADD_TITLE)}
    }else{this.props.error(constants.PLEASE_CHOOSE_DATE)}
  }

  deleteOpening(id) {
    const opening = {
      id: id,
      venue: this.props.venue.id//SHOULD BE TIMESLOT
    }
    this.props.deleteOpening(opening)
    this.props.onClose()
  }

  cancel(){
    this.updateState({
      id: null,
      title: '',
      is_open: true,
      date_range: [new Date(),new Date()]
    })
    this.props.onClose()
  }


  componentWillReceiveProps(nextProps) {
    nextProps.selected_opening
    ? this.setState(Object.assign(this.state, {
        id: nextProps.selected_opening.opening,
        title: nextProps.selected_opening.title,
        is_open: nextProps.selected_opening.is_open,
        timeslot: nextProps.selected_opening.timeslot,
        date_range: nextProps.selected_date 
                    ? [new Date(nextProps.selected_date[0]),new Date(nextProps.selected_date[1])] 
                    : [new Date(),new Date()],
        is_edit: true
      }))
    : null  

    nextProps.selected_date
    ? this.updateState({
        date_range:[new Date(nextProps.selected_date[0]),new Date(nextProps.selected_date[1])]
      })
    : null
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

export default OpportunityForm

const Subtitle = styled.div`
  font-size: 2.25vmin;
  padding: 0 0 1vmin 2vmin;
`