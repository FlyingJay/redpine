import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'
import { RP_DDD, RP_DARK_GREY, RP_SUPER_LIGHT, RP_RED } from 'Components'


export class ShareCampaign extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const campaign = this.props.campaign
    const venue = this.props.venue

    return (
      <CampaignShare>
        <CampaignShareHeading>Support this show by sharing it with your friends and family.</CampaignShareHeading>
        <ShareOption onClick={() => this.shareThisSexyThing('facebook', campaign.id, campaign.title, venue.title)}>
          <i className="fa fa-facebook" />
        </ShareOption>
        <ShareOption onClick={() => this.shareThisSexyThing('twitter', campaign.id, campaign.title, venue.title)}>
          <i className="fa fa-twitter" />
        </ShareOption>
      </CampaignShare>
    )
  }

  shareThisSexyThing(shareType, campaignId, campaignName, venueName) {
    const campaignShareLink = paths.showShareLink(campaignId)
    if (shareType === 'facebook'){
      const toOpenLink = (`https://www.facebook.com/sharer/sharer.php?u=${campaignShareLink}`)
      window.open(toOpenLink, 'popup', 'width=600,height=600,scrollbars=no,resizable=no');
      return false;

    } else if (shareType === 'twitter') {
      const toOpenLink = 'https://twitter.com/intent/tweet?text=Hey, come check out ' + campaignName + ' at ' + venueName + `! ${campaignShareLink}`
      window.open(toOpenLink, 'popup', 'width=600,height=600,scrollbars=no,resizable=no');
      return false;

    } else if (shareType === 'email') {
      const toOpenLink = 'mailto.html#mailto:hey@hey.com'
      window.open(toOpenLink, 'Mailer');
      return false;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
}


const Common = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`
const CampaignShare = styled(Common)`
  padding: 3vmin 5vmin 5vmin 5vmin;

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    padding: 3vmin 0;
    border-top: 1px solid ${RP_DDD};
    text-align: center;
  }
`
const CampaignShareHeading = styled(Common)`
  padding: 0 0 2vmin 0;
  color: ${RP_DARK_GREY};
  font-size: 2.1vmin;
  font-weight: bold;

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    font-size: 1.8vmin;
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
