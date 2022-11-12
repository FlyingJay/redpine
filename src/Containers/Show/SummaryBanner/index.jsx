import React from 'react'
import styled from 'styled-components'

import { RP_BLACK } from 'Components'


export class SummaryBanner extends React.PureComponent {
  constructor(props) {
    super(props) 
  }
  
  render() {
    return (
      !this.props.isTraditional
      ? <Wrap>
          <Heading>
            This is a Crowfunded Concert. Here's what this means:
          </Heading>
          <Details>
            <ul>
              <li>You will not be issued a ticket to the concert UNTIL this campaign reaches its goal.</li>
              <li>You will also not be charged until the goal has been reached. You will however see an authorization charge on your credit card, this will be converted to an actual charge when the concert reaches its goal.</li>
              <li>This concert has a first come first serve seating as all concert attendees are paying the same price per ticket.</li>
              <li>If you show up to the venue on the day of the concert without a ticket, the venue has the right to deny entry.</li>
            </ul>
          </Details>
        </Wrap>
      : null
    )
  }
}

const Wrap = styled.div`
  padding: 3vmin;
`
const Heading = styled.div`
  margin-bottom: 2vmin;
  font-size: 2vmin;
  font-weight: bold;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3.5vmin;
  }
`
const Details = styled.div`
  color: ${RP_BLACK};
  font-size: 1.8vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`