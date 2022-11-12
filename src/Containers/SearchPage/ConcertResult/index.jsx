import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign } from 'Models'
import { ProgressBar, RP_RED, Clear, TopRight, Bottom, RP_PINK, RP_DARK_GREY } from 'Components' // GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, 
  SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { ImageIcon } from 'Components' //IMAGE
import { Link } from 'Components'

import { ActLinks } from 'Components' //CAMPAIGNBLOCK/ACTLINKS

export class ConcertResult extends React.PureComponent {

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

    return <span onClick={() => this.props.onClick()}>
            <Container key="mobile_result">
              <ConcertImage image={_Campaign.picture}>
                <Overlay className="concertImageOverlay" />
              </ConcertImage>
              <TopRight style={{textAlign:'right'}}>
                <DateTime>
                  {start_time}
                </DateTime>
              </TopRight>
              <Titles>
                <Name>{_Campaign.title}</Name>
                <Acts>
                  <ActLinks headliner={headliner} supporting_acts={supporting_acts}/>
                </Acts>
              </Titles>
            </Container>

            <DesktopContainer key="desktop_result">
              <SearchResultThumb image={_Campaign.picture} fullSearch={true} />
              <SearchResultInfo fullSearch={true}>
                <SearchResultHeading>{campaign.title}</SearchResultHeading>
                <ThreeQuarters>
                  <ActLinks headliner={headliner} supporting_acts={supporting_acts}/>
                </ThreeQuarters>
                <SearchResultSubHeading style={{paddingTop: '1.5vmin'}}>

                  {/* TICKET PRICE AND TOTAL FANS */}
                  <SearchResultStatFocus>{isNaN(cheapest_ticket) ? cheapest_ticket : `$${cheapest_ticket}`}</SearchResultStatFocus>
                  <SearchResultStatValue>{isNaN(cheapest_ticket) ? '' : ` per ticket`}</SearchResultStatValue>
                  <Clear></Clear>
                  { isTraditional
                    ? ''
                    : (progress > 15
                      ? [<SearchResultStatFocus key={campaign.id+'p'}>{progress}%</SearchResultStatFocus>,
                         <SearchResultStatValue key={campaign.id+'pl'}>Pledged</SearchResultStatValue>]
                      : ''
                    )
                  }
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
            </DesktopContainer>
          </span>
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
const ThreeQuarters = styled.div`
  display: block;
  position: relative;
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DesktopContainer = styled(SearchResultsContainer)`
  @media (max-width: 1024px) and (orientation: portrait) {
    display: none;
  }
`
const Container = styled.div`
  display: none;
  cursor: pointer;
  position: relative;
  width: 40vmin;
  height: auto;
  margin-right: 2vmin;
  border: 1px solid #FFF;
  color: ${RP_DARK_GREY};

  &:hover {
    .venueImageOverlay {
      background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    }
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    display: inline-block;
    width: 100%;
  }
`
const ConcertImage = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 30vmin;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.image});
  border-radius: 3px;
`
const Overlay = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  border-radius: inherit;
`
const VenueInfoBasis = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 2vmin;
  font-weight: bold;
`
const DateTime = styled(VenueInfoBasis)`
  padding: 2vmin;
  white-space: nowrap;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 2.5vmin;
  color: #FFF;
`
const Name = styled(VenueInfoBasis)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 3vmin;
  font-weight: 600;
  padding: 0 1.5vmin;
  color: #FFF;
`
const Acts = styled.div`
  color: #FFF;
  font-size: 2.5vmin;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1vmin 1.5vmin;
`
const Titles = styled(Bottom)`
  width: 100%;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
`