import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign } from 'Models'

import { ProgressBar, RP_RED, TopRight, Clear } from 'Components' // GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, 
  SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { ImageIcon } from 'Components' //IMAGE
import { Link } from 'Components' //LINK

import { ActLinks } from 'Components' //CAMPAIGNBLOCK/ACTLINKS

export class OpenShowResult extends React.PureComponent {

  render() {
    const campaign        = this.props.campaign

    const _Campaign       = RP_Campaign(campaign)
    const cheapest_ticket = _Campaign.cheapestTicket()
    const progress        = _Campaign.progress()
    const isTraditional   = _Campaign.isTraditional()
    const timeleft        = _Campaign.timeRemaining()
    const headliner       = _Campaign.headliner()
    const supporting_acts = _Campaign.supportingActs()

    const start_time = moment(_Campaign.timeslot.start_time).format('MMM DD, h:mm A')
    const end_time   = moment(_Campaign.timeslot.end_time).format('h:mm A')

    return (
      <SearchResultsContainer onClick={() => this.props.onClick()}>
        <SearchResultThumb image={_Campaign.picture} fullSearch={true} />
        <SearchResultInfo fullSearch={true}>
          <Link href={paths.shows(_Campaign.id)}>
            <SearchResultHeading>{campaign.title}</SearchResultHeading>
          </Link>
          <ThreeQuarters>
            <ActLinks headliner={headliner} supporting_acts={supporting_acts}/>
          </ThreeQuarters>
          <SearchResultSubHeading>
            <SearchResultStatValue>{_Campaign.description}</SearchResultStatValue>
          </SearchResultSubHeading>
          <TopRight style={{textAlign:'right'}}>
            <Link href={paths.venues(_Campaign._Venue.id)} red bold>
              <ImageIcon src="\Assets\images\apps\venues.png"/>&nbsp;
              {_Campaign._Venue.title}
            </Link>
            <div>
              {`${start_time} - ${end_time}`}
            </div>
          </TopRight>
        </SearchResultInfo>
      </SearchResultsContainer>
    )
  }
}

const ThreeQuarters = styled.div`
  display: block;
  position: relative;
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`