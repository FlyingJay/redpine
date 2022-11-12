import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { EVENT_TYPE, FREQUENCY } from 'enums'


export class EventForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = (
      props.selected_event
      ? {
          is_edit: true,
          id: props.selected_event.id,
          title: props.selected_event.title,
          event_type: props.selected_event.event_type,
          date_range: [new Date(props.selected_date[0]),new Date(props.selected_date[1])]
        }
      : {
          is_edit: false,
          id: null,
          title: '',
          event_type: EVENT_TYPE.EVENT,
          frequency: FREQUENCY.ONCE,
          frequency_count: '1',
          date_range: [new Date(),new Date()]
        }
    )
  }

  render() {
    return (
      <mobiscroll.Form>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>
            {`${this.state.is_edit ? 'Edit ' : 'Add an '} 
              ${this.state.event_type == EVENT_TYPE.EVENT ? 'Event' : 'Hold'}`}
          </mobiscroll.FormGroupTitle>
          <Subtitle>
            Your event schedule helps acts avoid requesting booked days. Holds are kept private.
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

          {/*EVENT TYPE*/}
          <mobiscroll.Segmented name="group1" value={EVENT_TYPE.EVENT} checked={this.state.event_type == EVENT_TYPE.EVENT} onChange={(e) => this.updateState({event_type:e.target.value})}>
            Event  
          </mobiscroll.Segmented>
          <mobiscroll.Segmented name="group1" value={EVENT_TYPE.HOLD_1} checked={this.state.event_type == EVENT_TYPE.HOLD_1} onChange={(e) => this.updateState({event_type:e.target.value})}>
            Hold 1
          </mobiscroll.Segmented>
          <mobiscroll.Segmented name="group1" value={EVENT_TYPE.HOLD_2} checked={this.state.event_type == EVENT_TYPE.HOLD_2} onChange={(e) => this.updateState({event_type:e.target.value})}>
            Hold 2
          </mobiscroll.Segmented>
          <mobiscroll.Segmented name="group1" value={EVENT_TYPE.HOLD_3} checked={this.state.event_type == EVENT_TYPE.HOLD_3} onChange={(e) => this.updateState({event_type:e.target.value})}>
            Hold 3
          </mobiscroll.Segmented>

          {/*EVENT FREQUENCY*/}
          {
            this.props.selected_event
            ? null
            : <div>
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
                {
                  this.state.frequency != FREQUENCY.ONCE
                  ? <mobiscroll.Form.Label>
                      How many would you like to create? 
                      <input type="number" step="1" value={this.state.frequency_count} onChange={(e) => this.updateState({frequency_count:e.target.value})} />
                    </mobiscroll.Form.Label>
                  : null
                }
              </div>
          }
        </mobiscroll.FormGroup>
        <mobiscroll.FormGroup className="mbsc-btn-group-block">
          <button onClick={() => this.state.is_edit ? this.props.updateEvent(this.state) : this.props.createEvent(this.state)} type="button">
            {`
              ${this.state.is_edit ? 'Save ' : 'Add '}
              ${this.state.event_type == EVENT_TYPE.EVENT ? 'Event' : 'Hold'}
            `}
          </button>
        </mobiscroll.FormGroup>
        { this.state.is_edit
          ? <mobiscroll.FormGroup className="mbsc-btn-group-block">
              <button onClick={() => this.props.deleteEvent(this.state.id)} type="button">
                {`Delete ${this.state.event_type == EVENT_TYPE.EVENT ? 'Event' : 'Hold'}`}
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

  cancel(){
    this.updateState({
      id: null,
      title: '',
      event_type: EVENT_TYPE.EVENT,
      date: null
    })
    this.props.onCancel()
  }

  componentWillReceiveProps(nextProps) {
    nextProps.selected_event
    ? this.setState(Object.assign(this.state, {
        id: nextProps.selected_event.id,
        title: nextProps.selected_event.title,
        event_type: nextProps.selected_event.event_type,
        date: nextProps.selected_date,
        is_edit: true
      }))
    : this.setState(Object.assign(this.state, {
        is_edit: false,
        id: null,
        title: '',
        event_type: EVENT_TYPE.EVENT,
        frequency: FREQUENCY.ONCE,
        frequency_count: '1',
        date: null
      }))

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

export default EventForm

const Subtitle = styled.div`
  font-size: 1.5vmin;
  padding: 0 0 1vmin 2vmin;
`