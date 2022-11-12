import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import { RP_DARKGREY, RP_DDD, RP_BLACK } from 'Components' // GLOBALS

import { Link } from 'Components' // LINK
import { Select } from 'Components' // INPUT
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton } from 'Components' //MODAL & MODALOTHERS

import constants from './constants.js'

BigCalendar.momentLocalizer(moment)


export class Tab1Day extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      date: this.props.date,
      showCalendar: (this.props.date == null)
    }
  }

  render() {
    const is_opening    = this.props.is_opening

    const showCalendar  = this.state.showCalendar
    const showNext      = !showCalendar

    const can_edit_date = !is_opening

    return (
      <SidePanel>
        <CalendarContainerizer>
          <Heading>
            {
              this.state.date
              ? moment(this.state.date).format('MMM Do, YYYY')
              : 'When is your show?'
            }
            {
              can_edit_date
              ? <Change show={() => this.updateState({date:null,showCalendar:true})} hidden={showCalendar}/>
              : null
            }
            
          </Heading>
          {
            this.state.showCalendar
            ? <BigCalendar 
                selectable
                events={[]}
                startAccessor='startDate'
                endAccessor='endDate'
                titleAccessor='title'
                views={['month']}
                onSelectSlot={date => this.dateSelected(date)}
                components={{
                  month: { dateHeader: (props) => {
                      return <CalendarDay 
                                day={props.label}
                                passed={moment(props.date) < moment()}/>
                    }
                  }
                }}/>
            : null
          }
        </CalendarContainerizer>       
        <ModalSection style={{textAlign:'right',marginTop:'5vmin'}}>
          {
            showNext 
            ? <PositiveButton onClick={() => this.props.next(this.state.date)}>
                Next&nbsp;&nbsp;
                <i className="fa fa-arrow-right"/>
              </PositiveButton>
            : null
          }
        </ModalSection>
      </SidePanel>
    )
  }

  bookingAdvance(day){
    const weekday = day.weekday()
    if(weekday == 4 || weekday == 5 || weekday == 6){
      return 4
    }
    return 2
  }

  dateSelected(date) {
    const day = moment(date.start)
    if(day < moment()){
      this.props.error(constants.DATE_ERROR_CANT_BE_PAST)
    }
    else{
      this.updateState({date:date.start,showCalendar:false})
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Change = ({show,hidden}) => (
  <ChangeButton onClick={() => show()} hidden={hidden}>
    Edit&nbsp;&nbsp;
    <i className="fa fa-arrow-right"/>
  </ChangeButton>
)

const CalendarDay = ({day,passed}) => (
  passed
  ? <DayWrap>Passed</DayWrap>
  : <DayWrap number>{day}</DayWrap>
)
const DayWrap = styled.div`
  text-align: center;
  padding-left: 5px;
  colour: ${props => props.number ? RP_BLACK : RP_DDD};
  font-size: ${props => props.number ? '3vmin' : '2vmin'};
  cursor: ${props => props.number ? 'pointer' : 'defailt'};
  
  @media (max-width: 500px) and (orientation: portrait) {
    font-size: ${props => props.number ? '3.5vmin' : '2vmin'};
  }
`
const CalendarContainerizer = styled(ModalSection)`
  height: 40vh;
  margin-top: 12vmin;

  @media (max-width: 767px) and (orientation: portrait) {
    height: 50vh;
    font-size: 2.5vmin;
  }

  @media (max-width: 500px) and (orientation: portrait) {
    height: 60vh;
  }
`
const Heading = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`
const ChangeButton = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: 2vmin;
  color: ${RP_DARKGREY};
  cursor: pointer;
`