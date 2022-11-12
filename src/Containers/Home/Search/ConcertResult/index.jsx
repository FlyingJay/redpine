import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'
import { RP_Campaign } from 'Models'

import { ProgressBar, RP_RED, Clear } from 'Components' // GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, 
  SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Link } from 'Components'


export class ConcertResult extends React.PureComponent {

  render() {
    const campaign       = this.props.campaign

    const _Campaign      = RP_Campaign(campaign)
    const progress       = _Campaign.progress()
    const isTraditional  = _Campaign.isTraditional()
    const timeRemaining  = _Campaign.timeRemaining()
    const cheapestTicket = _Campaign.cheapestTicket()

    const isOver         = (timeRemaining === 'Completed')

    return (
      <Link href={paths.shows(campaign.id)}>
        <SearchResultsContainer>
          <SearchResultThumb image={_Campaign.picture} />
          <SearchResultInfo>
            <SearchResultHeading>{_Campaign.title}</SearchResultHeading>
            <SearchResultSubHeading>
              {/* TICKET PRICE AND TOTAL FANS */}
              <SearchResultStatFocus>${cheapestTicket}</SearchResultStatFocus>
              <SearchResultStatValue>per ticket</SearchResultStatValue>
              <Clear></Clear>
              {
                isTraditional
                ? ''
                : progress > 15 
                  ? [
                     <SearchResultStatFocus key={campaign.id+'c'}>{progress}%</SearchResultStatFocus>,
                     <SearchResultStatValue key={campaign.id+'p'}>Pledged</SearchResultStatValue>
                    ]
                  : ''
              }
              <Clear></Clear>
              <SearchResultStatFocus>{isOver ? 'Concert' : timeRemaining}</SearchResultStatFocus>
              <SearchResultStatValue>{isOver ? 'Completed' : 'Remaining'}</SearchResultStatValue>
              <Clear></Clear>
            </SearchResultSubHeading>
          </SearchResultInfo>
          {/*}
          <ProgressWrapper>
            <ProgressBar progress={progress} color={RP_RED} style={{borderRadius: '0 0 3px 3px'}}/>
          </ProgressWrapper>
          */}
        </SearchResultsContainer>
      </Link>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.campaign == null) return true
    if (nextProps.campaign != this.props.campaign) return true
    return false
  }
}

const ProgressWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.5vmin;
  left: 0;
  pointer-events: none;
`