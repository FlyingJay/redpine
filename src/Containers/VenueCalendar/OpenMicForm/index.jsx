import React from 'react'
import styled from 'styled-components'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { validators } from 'globals'
import { EVENT_TYPE, FREQUENCY } from 'enums'


export class OpenMicForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      frequency: FREQUENCY.ONCE,
      frequency_count: '1',
      funding_type: 1,
      date_range: props.selected_date 
                  ? [new Date(props.selected_date[0]),new Date(props.selected_date[1])] 
                  : [new Date(),new Date()]
    }
  }

  render() {
    return (
      <mobiscroll.Form>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>
            Add an Open Mic
          </mobiscroll.FormGroupTitle>
          <Subtitle>
            Add any open mics and easily accept applicants in the Show Hub!
          </Subtitle>
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
            {
              this.state.frequency != FREQUENCY.ONCE
              ? <mobiscroll.Form.Label>
                  How many would you like to create? 
                  <input type="number" step="1" value={this.state.frequency_count} onChange={(e) => this.updateState({frequency_count:e.target.value})} />
                </mobiscroll.Form.Label>
              : null
            }
          </div>
        </mobiscroll.FormGroup>
        <mobiscroll.FormGroup className="mbsc-btn-group-block">
          <button onClick={() => this.props.createOpenMic(this.state)} type="button">
            Add Open Mic
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

  cancel(){
    this.updateState({
      date: null,
      frequency: FREQUENCY.ONCE,
      frequency_count: '1',
      funding_type: 1
    })
    this.props.onCancel()
  }

  componentWillReceiveProps(nextProps) {
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

export default OpenMicForm

const Subtitle = styled.div`
  font-size: 1.5vmin;
  padding: 0 0 1vmin 2vmin;
`