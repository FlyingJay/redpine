import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_User, RP_Act, RP_Campaign } from 'Models'
import { ProgressBar, RP_RED, SPOTIFY_GREEN, RP_SUPER_LIGHT, RP_DARK_GREY, RP_DDD, Clear, TopRight } from 'Components' // GLOBALS
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

    const promotion_link = paths.baseURL() + paths.showPromoter(_Campaign.id,RP_User(this.props.user).id)

    return (
      <SearchResultsContainer onClick={() => this.copyToClipboard(promotion_link)} nohover>
        <SearchResultThumb image={_Campaign.picture} fullSearch={true} />
        <SearchResultInfo fullSearch={true}>
          <SearchResultHeading>{campaign.title}</SearchResultHeading>
          <ThreeQuarters>
            <ActLinks headliner={headliner} supporting_acts={supporting_acts}/>
          </ThreeQuarters>
          <SearchResultSubHeading>
            <SearchResultStatFocus>{timeleft === 'Completed' ? 'Concert' : timeleft}</SearchResultStatFocus>
            <SearchResultStatValue>{timeleft === 'Completed' ? 'Completed' : 'Remaining'}</SearchResultStatValue>
            <Clear></Clear>
            
            <LinkBox>
              {promotion_link}
            </LinkBox>

          </SearchResultSubHeading>
          <TopRight style={{textAlign:'right'}}>
            <Link href={paths.venues(_Campaign._Venue.id)} red bold>
              <ImageIcon src="\Assets\images\apps\venues.png"/>&nbsp;
              {_Campaign._Venue.title}
            </Link>
            <div>
              <SearchResultStatValue>You get</SearchResultStatValue>
              <SearchResultStatFocus style={{color:SPOTIFY_GREEN,fontWeight:'bold'}}>&nbsp;{`$${_Campaign.promoter_cut} `}</SearchResultStatFocus>
              <SearchResultStatValue>per ticket sold</SearchResultStatValue>
            </div>
          </TopRight>
        </SearchResultInfo>
      </SearchResultsContainer>
    )
  }

  copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }

  share(shareType, campaignId, campaignName, headliner) {
    const campaignShareLink = paths.showShareLink(campaignId,RP_User(this.props.user).id)
    if (shareType === 'facebook'){
      const toOpenLink = (`https://www.facebook.com/sharer/sharer.php?u=${campaignShareLink}`)
      window.open(toOpenLink, 'popup', 'width=600,height=600,scrollbars=no,resizable=no');
      return false;

    } else if (shareType === 'twitter') {
      const toOpenLink = 'https://twitter.com/intent/tweet?text=Hey, come check out ' + campaignName + ' with ' + headliner + `! ${campaignShareLink}`
      window.open(toOpenLink, 'popup', 'width=600,height=600,scrollbars=no,resizable=no');
      return false;
    }
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
const LinkBox = styled.div`
  display: block;
  margin: 1vmin;
  padding: 1vmin;
  background: ${RP_SUPER_LIGHT};
  border-radius: 0.5vmin;
`
const Common = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`
const CampaignShare = styled(Common)`
  text-align: right;
  padding: 2vmin;

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    padding: 3vmin 0;
    border-top: 1px solid ${RP_DDD};
  }
`
const ShareOption = styled(Common)`
  cursor: pointer;
  display: inline-block;
  color: ${RP_DARK_GREY};
  font-size: 2.3vmin;
  margin-right: 2vmin;

  &:last-child {
    margin-right: 0;
  }

  i {
    transition: all 0.25s ease;
    width: 2vmin;
    height: 2vmin;
    padding: 0.75vmin;
    border-radius: 100%;
    background: ${RP_SUPER_LIGHT};
    color: ${RP_DARK_GREY};
    text-align: center;
    font-size: 1.7vmin;
    line-height: 2vmin;

  }

  &:hover i {
    background: ${RP_RED};
    color: #FFF;
  }
`