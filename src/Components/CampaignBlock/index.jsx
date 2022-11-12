import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign } from 'Models'

import { RP_FONT, RP_BLACK, RP_LIGHTGREY, RP_RED, RP_PINK, RP_BLUE, RP_GREEN, SPOTIFY_GREEN, RP_DDD, RP_PURPLE, TopRight, BottomRight, Bold } from 'Components' // GLOBALS
import { Link } from 'Components' // PANEL
import { CampaignImage, CampaignOverlay } from 'Components' // IMAGE
import { ProgressBar } from 'Components' // PROGRESS BAR
import { Money } from 'Components' 

import { ActLinks } from './ActLinks/index.jsx'

const CampaignHeaderWrap = styled.div`
  cursor: pointer;
  margin: 0 auto;
  width: 100%;
  height: 25vmin;
  background: ${RP_BLACK};
  border-radius: 3px 3px 0 0;
`
const Text = styled.div`
  position:relative;
  text-align: left;
  width: 90%;
  margin: 0 auto;
  padding-top: 0;
  font-size: 1.75vmin;
  font-family: ${RP_FONT};
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${RP_BLACK};
`
const Title = styled.div`
  padding-top: 2vmin;
  font-size: 1.8vmin;
  font-weight: bold;
  overflow: hidden;
`
const Detail = styled.div`
  width: 50%;
  display: inline-block;
  margin: 0;
  margin-right: ${props => props.rightMargin || '0' };
  padding: 2vmin 0 2vmin 0;
  font-size: 1.8vmin;
  font-family: ${RP_FONT};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${props => props.stopOverflow ? 'initial' : 'ellipsis' };
  text-align: center;
`
const BottomLeftText = styled.span`
  position: absolute;
  bottom: 3vmin;
  left: 3vmin;
  color: #FFF;
  font-size: 1.8vmin;
  font-family: ${RP_FONT};
`
const Panel = styled.div`
  height: auto;
  width: 40vmin;
  margin: 0 auto;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 0 2vmin 2vmin 0;
  border-radius: 3px;
  border: 1px solid ${RP_DDD};
  text-align: left;
  background: #FFF;
  white-space: normal;

  @media (max-width: 1600px) and (orientation: portrait) { 
    display: ${props => props.only_desktop ? 'none' : 'inline-block'};
  }
`
const Badge = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  font-size: .8em;
`

const CheckItOut = styled.div`
  background: ${RP_RED};
  color: #FFF;
  font-weight: bold;
  padding: 1vmin;
  border-radius: 3px;
  transform: rotate(-10deg);
`

export const Header = ({isFeatured, isTraditional, progress, image, noView, active, campaignLink, has_badge}) =>
(
  <Link href={campaignLink}>
    <CampaignHeaderWrap>
      <CampaignImage image={image} style={{borderRadius: '3px 3px 0 0'}}>
        <CampaignOverlay style={{borderRadius: '3px 3px 0 0'}}>
          <BottomLeftText>
            {
              (isTraditional || progress > 100) && active
              ? <span style={{fontWeight:600}}><i className="fa fa-ticket" style={{fontSize:'2.5vmin',color: SPOTIFY_GREEN}}/>&nbsp; Get Tickets</span>
              : progress > 15
                ? isTraditional 
                  ? ''
                  : <span style={{fontWeight:600}}><i className="fa fa-flag" style={{fontSize:'2.2vmin',color: RP_BLUE}}/>&nbsp; {progress}% Completed</span>
                : <span style={{fontWeight:600}}><i className="fa fa-flag" style={{fontSize:'2.2vmin',color: RP_BLUE}}/>&nbsp; NEW!</span>
            }
          </BottomLeftText>
          {
            has_badge
            ? <Badge>
                <CheckItOut>Check it out!</CheckItOut>
              </Badge>
              : null
          }
        </CampaignOverlay>
      </CampaignImage>
      <ProgressBar progress={progress} color={isTraditional ? SPOTIFY_GREEN : RP_RED}/>
    </CampaignHeaderWrap>
  </Link>
);


export class CampaignBlock extends React.PureComponent {
  render() {
    const _Campaign       = RP_Campaign(this.props.campaign)
    const isTraditional   = _Campaign.isTraditional()
    const is_selling      = _Campaign.isSelling()
    const headliner       = _Campaign.headliner()
    const supporting_acts = _Campaign.supportingActs()
    const date            = moment(_Campaign.event_start).format('MMM. D, YYYY')

    const progress        = isTraditional ? 100 : _Campaign.progress()

    return <Panel inline only_desktop={this.props.only_desktop}>
            <Header 
              isFeatured={_Campaign.is_featured} 
              isTraditional={isTraditional} 
              progress={progress} 
              image={_Campaign.picture} 
              campaignLink={paths.shows(_Campaign.id)} 
              active={is_selling}
              has_badge={this.props.has_badge}/>
            <Text>
              <Title>{_Campaign.title}</Title>
              <ActLinks 
                headliner={headliner} 
                supporting_acts={supporting_acts}/>
              <Detail>
                <i className="fa fa-ticket" style={{fontSize:'2.5vmin',color:SPOTIFY_GREEN}}/>
                &nbsp;&nbsp;<Money amount={_Campaign.cheapestTicket()} currency={_Campaign._Venue.currency}/>
              </Detail>
              <Detail>
                <i className="fa fa-calendar" style={{fontSize:'2.2vmin',color:RP_BLUE}}/>
                &nbsp;&nbsp;{date}
              </Detail>
            </Text>
           </Panel>
  }
}

export default CampaignBlock