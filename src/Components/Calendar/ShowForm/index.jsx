import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { RP_Venue } from 'Models'

import { validators } from 'globals'
import { EVENT_TYPE, FREQUENCY } from 'enums'

import constants from './constants'


export class ShowForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date_range: props.selected_date 
            ? [new Date(props.selected_date[0]),new Date(props.selected_date[1])] 
            : [new Date(),new Date()],
      frequency: FREQUENCY.ONCE,
      frequency_count: '1',
      funding_type: 1,
      min_ticket_price: ''
    }
  }

  render() {
    const _Venue = RP_Venue(this.props.venue)

    return (
      <mobiscroll.Form>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>
            New Show @ {_Venue.title}
          </mobiscroll.FormGroupTitle>
          <Subtitle>
            Use the Show Hub to add acts, ticketing options, and adjust show details.
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
          <div>
            <mobiscroll.Segmented name="group2" value={FREQUENCY.ONCE} checked={this.state.frequency == FREQUENCY.ONCE} onChange={(e) => this.updateState({frequency:e.target.value})}>
              Once
            </mobiscroll.Segmented>
            <mobiscroll.Segmented name="group2" value={FREQUENCY.DAILY} checked={this.state.frequency == FREQUENCY.DAILY} onChange={(e) => this.updateState({frequency:e.target.value})}>
              Daily
            </mobiscroll.Segmented>
            <mobiscroll.Segmented name="group2" value={FREQUENCY.WEEKLY} checked={this.state.frequency == FREQUENCY.WEEKLY} onChange={(e) => this.updateState({frequency:e.target.value})}>
              Weekly
            </mobiscroll.Segmented>
            <mobiscroll.Segmented name="group2" value={FREQUENCY.BIWEEKLY} checked={this.state.frequency == FREQUENCY.BIWEEKLY} onChange={(e) => this.updateState({frequency:e.target.value})}>
              Bi-Weekly
            </mobiscroll.Segmented>
            <mobiscroll.Segmented name="group2" value={FREQUENCY.MONTHLY} checked={this.state.frequency == FREQUENCY.MONTHLY} onChange={(e) => this.updateState({frequency:e.target.value})}>
              Monthly
            </mobiscroll.Segmented>
            { this.state.frequency != FREQUENCY.ONCE
              ? <mobiscroll.Form.Label>
                  How many would you like to create? 
                  <input type="number" step="1" value={this.state.frequency_count} onChange={(e) => this.updateState({frequency_count:e.target.value})} />
                </mobiscroll.Form.Label>
              : null }
          </div>
          <mobiscroll.Form.Label>
            Regular Ticket Price ($)
            <input type="number" step="1.00" value={this.state.min_ticket_price} onChange={(e) => this.updateState({min_ticket_price:e.target.value})}/>
          </mobiscroll.Form.Label>
          <mobiscroll.Form.Label>
            <Subtitle>
              Who earns from ticket sales?
            </Subtitle>
            <mobiscroll.Segmented name="group1" checked={this.state.funding_type == 0 /*ALL_TO_ORGANIZER*/} onChange={(e) => this.updateState({funding_type:0})}>
              Pay me
            </mobiscroll.Segmented>
            <mobiscroll.Segmented name="group1" checked={this.state.funding_type == 1 /*SPLIT_BY_ACT_SALES*/} onChange={(e) => this.updateState({funding_type:1})}>
              Split by act sales
            </mobiscroll.Segmented>
          </mobiscroll.Form.Label>
        </mobiscroll.FormGroup>
        <mobiscroll.FormGroup className="mbsc-btn-group-block">
          <button onClick={() => this.createShow(this.state)} type="button">
            Add Show
          </button>
        </mobiscroll.FormGroup>
        <mobiscroll.FormGroup className="mbsc-btn-group-block">
          <button onClick={() => this.cancel()} type="button">Cancel</button>
        </mobiscroll.FormGroup>
      </mobiscroll.Form>
    )
  }

  updateTime(date) {
    this.updateState({date_range: [date[0], date[1]]})
  }

  createShow(details){
    const start_time = moment(details.date_range[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(details.date_range[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    
    if(details.date_range){
      if(details.title){
        const price = details.min_ticket_price
        if(price && !isNaN(price)){
          const show = {
            //Show params
            title: details.title,
            description: details.title,
            funding_type: details.funding_type,
            funding_start: moment().format('YYYY-MM-DDThh:mm:ss'),
            funding_end: end_time.format('YYYY-MM-DDThh:mm:ss'),
            min_ticket_price: price,
            is_venue_approved: true,
            is_open: false,
            is_successful: true,
            //Timeslot params
            venue: this.props.venue.id,
            start_time: start_time.format('YYYY-MM-DDThh:mm:ss'),
            end_time: end_time.format('YYYY-MM-DDThh:mm:ss'),
            //Additional params
            frequency: details.frequency,
            frequency_count: details.frequency_count
          }
          this.props.createShow(show)
          this.props.onClose()
        }else{this.props.error(constants.PLEASE_ADD_TICKET_PRICE)}
      }else{this.props.error(constants.PLEASE_ADD_TITLE)}
    }else{this.props.error(constants.PLEASE_CHOOSE_DATE)}
  }

  cancel(){
    this.updateState({
      title: '',
      date: [new Date(),new Date()],
      frequency: FREQUENCY.ONCE,
      frequency_count: '1',
      funding_type: 1,
      min_ticket_price: ''
    })
    this.props.onClose()
  }

  componentWillReceiveProps(nextProps){
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

export default ShowForm

const Subtitle = styled.div`
  font-size: 2.25vmin;
  padding: 0 0 1vmin 2vmin;
`