import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_RED, RP_BLACK, Bold } from 'Components'

export class EventDetails extends React.PureComponent {
  render() {
    const event 	 = this.props.event
    const is_print = this.props.is_print

    return <DetailsSection>
            <Row label="Date" value={moment(event.start_time).format('MMMM D, YYYY')}/>
            <Row label="Doors" value={moment(event.start_time).subtract(1,'hours').format('HH:MM A')}/>
            <Row label="Show" value={moment(event.start_time).format('HH:MM A') + ' - ' + moment(event.end_time).format('HH:MM A')}/>
            {
            	!is_print
            	? <ChangeEvent onClick={() => this.props.clear()}>
		              Change Event&nbsp;&nbsp;
		              <i className="fa fa-pencil"/>
		            </ChangeEvent>
		          : null
            }
           </DetailsSection>
  }
}

const Row = ({label,value}) => {
  return <div>
          <div style={{display:'inline-block',width:'30%'}}>{label}:</div>
          <Bold style={{display:'inline-block',width:'50%'}}>{value}</Bold>
         </div>
}

const DetailsSection = styled.div`
  width: 50%;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }
`
const ChangeEvent = styled.div`
  width: 80%;
  font-size: 2vmin;
  font-weight: bold;
  padding: 1vmin 0;
  color: ${RP_BLACK};
  text-align: right;

  &:hover {
    cursor: pointer;
    color: ${RP_RED};
  }
`