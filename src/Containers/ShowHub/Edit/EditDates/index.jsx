import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { helpers } from 'globals'

import { RP_DARK_GREY, RP_BLACK, RP_FONT } from 'Components' //GLOBALS
import { DateTimePicker } from 'Components' //DATETIMEPICKER
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, FieldName, NegativeButton, PositiveButton } from 'Components' //MODAL
import { Input } from 'Components' //INPUT

import constants from './constants'


export class EditDates extends React.PureComponent {
  constructor(props) {
    super(props) 
    const start = this.props.start_time
    const end   = this.props.end_time

    this.state = {
      date_range: [start,end],
      start_time: start,
      end_time: end
    }
  }

  render() {
    return (
      <SidePanel>
        <ModalSection top>
          <ModalHeading>Date and Time</ModalHeading>
          <ModalSubheading>Note: No time is chosen when submitting a request, 7pm is a default value.</ModalSubheading>
          <mobiscroll.Form>
            <mobiscroll.FormGroup> 
              <mobiscroll.Form.Label>
                Event Start
                <input id="startDate" />
              </mobiscroll.Form.Label>
              <mobiscroll.Form.Label>
                Event End
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
                onSet={(e,date) => this.validateTime(date.getVal())}/>
            </mobiscroll.FormGroup>
          </mobiscroll.Form>
        </ModalSection>
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()}>
            <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
          </NegativeButton>
          <PositiveButton onClick={() => this.saveDates()}>
            Save
          </PositiveButton>
        </ModalSection>
      </SidePanel>
    )
  }

  saveDates(){
    const data = {
      start_time: moment(this.state.start_time).format('YYYY-MM-DDTHH:mm:ss'),
      end_time: moment(this.state.end_time).format('YYYY-MM-DDTHH:mm:ss')
    }
    this.props.save(data)
  }

  validateTime(date) {
    const start_time = moment(date[0].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')
    const end_time = moment(date[1].toLocaleString(),'MM/DD/YYYY, hh:mm:ss A')

    if (start_time.isBefore(moment(Date.now())) || end_time.isBefore(moment(Date.now()))){
      this.props.error(constants.DATE_MUST_BE_IN_FUTURE)
    }else{
      this.updateState({
        date_range: [start_time, end_time],
        start_time: start_time,
        end_time: end_time
      })
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}