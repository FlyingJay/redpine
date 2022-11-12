import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'

import { RP_Venue } from 'Models'

import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_ORANGE, RP_BLUE, RP_GREEN, RP_BLACK, RP_RED, RP_GREY, RP_DARK_GREY } from 'Components' // GLOBALS
import { ModalHeading, ModalSubheading } from 'Components' // MODALOTHERS
import { Link } from 'Components' // LINK


export class Stats extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {   
    const _Venue = RP_Venue(this.props.venue)

    const last_week         = _Venue.venue.stats && _Venue.venue.stats.historical_headcounts.last_week
    const last_week_change  = _Venue.venue.stats && _Venue.venue.stats.historical_headcounts.last_week_change
    const last_month        = _Venue.venue.stats && _Venue.venue.stats.historical_headcounts.last_month
    const last_month_change = _Venue.venue.stats && _Venue.venue.stats.historical_headcounts.last_month_change

    return <Wrapper>
            <MiniHeading first>Headcount Trends</MiniHeading>
            <Stat bold>Week</Stat>
            <Stat>{last_week}</Stat>
            <Stat change={last_week_change} bold>
              {
                last_week_change > 0 
                ? <i className="fa fa-arrow-up"/> 
                : last_week_change < 0 
                  ? <i className="fa fa-arrow-down"/>
                  : null
              }&nbsp;
              {last_week_change}
            </Stat>

            <Stat bold style={{borderLeft:'1px solid '+RP_GREY}}>Month</Stat>
            <Stat>{last_month}</Stat>
            <Stat change={last_month_change} bold>
              {
                last_month_change > 0 
                ? <i className="fa fa-arrow-up"/> 
                : last_month_change < 0 
                  ? <i className="fa fa-arrow-down"/>
                  : null
              }&nbsp;
              {last_month_change}
            </Stat>
           </Wrapper>
  }
}

export default Stats

const Wrapper = styled.div`
  display: block;
  position: relative;
  padding: 0 2vmin 2vmin 2vmin;
`
const Stat = styled.div`
  display: inline-block;
  position: relative;
  width: calc(calc(50% - 2vmin) / 6);
  margin-left: 1vmin;
  margin-bottom: 0;
  padding: 1vmin 2vmin;
  font-size: 2vmin;
  font-weight: ${props => props.bold ? 'bold' : 400};
  line-height: 3vmin;
  text-align: center;
  color: ${props => props.change > 0 ? RP_GREEN : (props.change < 0 ? RP_RED : RP_DARK_GREY)};
  white-space: nowrap;
`
const Subtitle = styled.div`
  position: absolute;
  top: -3vmin;
  left: -1vmin;
  text-align: center;
  width: calc(100% + 2vmin);
  color: ${RP_DARK_GREY};
  font-size: 1.2vmin;
`
const MiniHeading = styled.div`
  font-size: 1.75vmin;
  font-weight: bold;
  padding: 1vmin;
  padding-bottom: 0.5vmin;
  color: ${RP_DARK_GREY};

  border-bottom: 1px solid ${RP_GREY};
`