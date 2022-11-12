import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'
import { RP_Campaign } from 'Models'

import { TopRight } from 'Components' //GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, 
  SearchResultSubHeading, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { ImageIcon } from 'Components' //IMAGE
import { Link } from 'Components' //LINK


export class OpenMicResult extends React.PureComponent {
  render() {
    const _Campaign = RP_Campaign(this.props.campaign)
    const _Venue    = _Campaign._Venue

    const day        = moment(_Campaign.timeslot.start_time).format('MMMM Do')
    const start_time = moment(_Campaign.timeslot.start_time).format('h:mm A')
    const end_time   = moment(_Campaign.timeslot.end_time).format('h:mm A')

    return (
      <SearchResultsContainer onClick={() => this.props.onClick()}>
        <SearchResultThumb image={_Venue.picture} fullSearch={true} />
        <SearchResultInfo fullSearch={true}>
          <SearchResultHeading>{day}</SearchResultHeading>
          <SearchResultSubHeading>
            <SearchResultStatValue>{`${start_time} to ${end_time}`}</SearchResultStatValue>
          </SearchResultSubHeading>
          <TopRight>
            <Link href={paths.venues(_Campaign._Venue.id)} red bold>
            <ImageIcon src="\Assets\images\apps\venues.png"/>&nbsp;
            {_Campaign._Venue.title}
            </Link>
          </TopRight>
        </SearchResultInfo>
      </SearchResultsContainer>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.campaign == null) return true
    if (nextProps.campaign != this.props.campaign) return true
    return false
  }
}
