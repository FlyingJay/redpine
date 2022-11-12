import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'
import { RP_Campaign, RP_Venue } from 'Models'

import { RP_SUPER_LIGHT, RP_BLACK, RP_DARKGREY, RP_RED, RP_GREY, RP_DARK_GREY, RP_BLUE, RP_GREEN, Bold, Clear } from 'Components' //GLOBALS
import { VenueImage } from 'Components' //IMAGE
import { Money } from 'Components' // MONEY
import { Link } from 'Components' //LINK


export class DetailSummary extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const campaign       = this.props.campaign
    const cheapestTicket = this.props.cheapestTicket
    const startDate      = this.props.startDate
    const timeRemaining  = this.props.timeRemaining
    const progress       = this.props.progress
    const isComplete     = this.props.isComplete
    const isTraditional  = this.props.isTraditional

    const _Campaign      = RP_Campaign(campaign)
    const isCrowdfunded  = _Campaign.isCrowdfunded()

    const timeslot       = _Campaign.timeslot
    const min_headcount  = timeslot && timeslot.min_headcount || 0

    const _Venue         = _Campaign._Venue
    const ticketCurrency = _Venue.currency || ''

    const only_tickets_picture = "/Assets/images/defaults/only-tickets-venue.png"

    return (
      this.props.mobile 
      ? <CampaignSecondaryInfoMobile>
          <CampaignPrimaryInfo style={{margin:'0 0 3vmin 3vmin',textAlign:'center'}}>
            <PrimaryContextSetter>
              { _Campaign.is_only_tickets
                ? <VenueTitle>
                    Hosted at&nbsp;
                    <span style={{fontWeight:'bold'}}>
                      {_Venue.title}
                    </span>
                    <Address>
                      {_Venue.address}
                    </Address>
                  </VenueTitle>
                : <VenueTitle>
                    Hosted at&nbsp;
                    <Link href={paths.venues(_Venue.id)} red bold>
                      {_Venue.title}
                    </Link>
                    <br/>
                    <OpenMaps data-test-key="open-map" onClick={this.props.showMap}>
                      View Map
                    </OpenMaps>
                  </VenueTitle> }
            </PrimaryContextSetter>
          </CampaignPrimaryInfo>
          <CampaignSecondaryInfoBlockMobile>
            <i className="fa fa-ticket" style={{color:RP_GREEN}}/>
            &nbsp;&nbsp;<Money amount={cheapestTicket} currency={ticketCurrency} end_string=" per ticket"/>
          </CampaignSecondaryInfoBlockMobile>
          <CampaignSecondaryInfoBlockMobile>
            <i className="fa fa-calendar" style={{color:RP_BLUE}}/>
            &nbsp;&nbsp;{moment(startDate).format("MMM")} {moment(startDate).format("Do")} <Bold>at</Bold> {moment(startDate).format("h:mm a")}
          </CampaignSecondaryInfoBlockMobile>

          {/* CAMPAIGN INFO */}
          { isCrowdfunded
            ? <CampaignInfoMobile>
                { progress > 10
                  ? <CampaignProgressMobile>
                      <CampaignHighlightMobile>{progress}%</CampaignHighlightMobile>
                      <br/>
                      <CampaignSubHighlightMobile>Completed</CampaignSubHighlightMobile>
                    </CampaignProgressMobile>
                  : <CampaignProgressMobile>
                      <CampaignHighlightMobile><i className="fa fa-flag"/></CampaignHighlightMobile>
                      <br/>
                      <CampaignSubHighlightMobile>Crowdfunded</CampaignSubHighlightMobile>
                    </CampaignProgressMobile> }
                <CampaignProgressMobile style={{verticalAlign:'top'}}>
                  <CampaignHighlightMobile>
                    <i className="fa fa-clock-o" style={{boxShadow:'none',fontSize:'6vmin',paddingBottom:'1vmin'}}/>
                  </CampaignHighlightMobile>
                  <br/>
                  <CampaignSubHighlightMobile>
                    { _Campaign.is_venue_approved 
                      ? isComplete 
                        ? 'This show has completed'
                        : timeRemaining + ' remaining'
                      : isComplete
                        ? 'Cannot be approved' 
                        : 'Awaiting Approval' }
                  </CampaignSubHighlightMobile>
                </CampaignProgressMobile>
              </CampaignInfoMobile>
            : null }
        </CampaignSecondaryInfoMobile>
      : <div>
          <CampaignPrimaryInfo key="primary_info">
            {
              isCrowdfunded && _Campaign.tickets_sold > 0 
              ? [<Progress key="1">{progress}%</Progress>,
                 <PrimaryContextSetter key="2">raised to date</PrimaryContextSetter>]
              : null
            }
            <CampaignTimeLeft>
              <PrimaryHighlight>
                {
                  _Campaign.is_venue_approved 
                  ? timeRemaining
                  : isComplete
                    ? 'Unapproved'
                    : 'Pending'
                }
              </PrimaryHighlight>
              <PrimaryContextSetter>
                {
                  _Campaign.is_venue_approved 
                  ? isComplete
                    ? isTraditional 
                      ? 'Ticket sales have ended' 
                      : 'This campaign has finished'
                    : 'remaining'
                  : isComplete
                    ? 'Show was not approved'
                    : 'Show awaiting approval'
                }
              </PrimaryContextSetter>
            </CampaignTimeLeft>
          </CampaignPrimaryInfo>
          <CampaignSecondaryInfo>
            <CampaignSecondaryInfoBlock>
              <i className="fa fa-ticket" style={{color:RP_GREEN}} />
              &nbsp;&nbsp;<Money amount={cheapestTicket} currency={ticketCurrency} end_string=" per ticket"/>
            </CampaignSecondaryInfoBlock>
            <CampaignSecondaryInfoBlock>
              <i className="fa fa-calendar" style={{color:RP_BLUE}} />
              &nbsp;&nbsp;{moment(startDate).format("MMM")} {moment(startDate).format("Do")} <Bold>at</Bold> {moment(startDate).format("h:mm a")}
            </CampaignSecondaryInfoBlock>
            <CampaignSecondaryTabletBlock>
              <i className="fa fa-map-marker" style={{color:RP_RED}} />
              &nbsp;{_Venue.title} - <OpenMaps data-test-key="open-map" onClick={this.props.showMap}>View Map</OpenMaps>
            </CampaignSecondaryTabletBlock>
          </CampaignSecondaryInfo>
          {
            _Campaign.is_only_tickets
            ? <CampaignPrimaryInfo>
                <VenueImageThumb image={only_tickets_picture} inline="inline-block" width="8vmin" height="8vmin"/>
                <VenueTitle style={{marginLeft: '2vmin'}}>
                  <PrimaryContextSetter>Hosted at</PrimaryContextSetter>
                  <PrimaryContextSetter style={{fontWeight:'bold'}}>
                    {_Venue.title}
                  </PrimaryContextSetter>
                  <Address>
                    {_Venue.address}
                  </Address>
                </VenueTitle>
              </CampaignPrimaryInfo>
            : <CampaignPrimaryInfo>
                <VenueImageThumb image={_Venue.picture} inline="inline-block" width="8vmin" height="8vmin"/>
                <VenueTitle style={{marginLeft: '2vmin'}}>
                  <PrimaryContextSetter>Hosted at</PrimaryContextSetter>
                  <PrimaryContextSetter>
                    <Link href={paths.venues(_Venue.id)} red bold>
                      {_Venue.title}
                    </Link>
                    &nbsp;-&nbsp;
                    <OpenMaps data-test-key="open-map" onClick={this.props.showMap}>View Map</OpenMaps>
                  </PrimaryContextSetter>
                </VenueTitle>
              </CampaignPrimaryInfo>
          }
        </div>
      )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.campaign == null) return true
    if (nextProps.campaign != this.props.campaign) return true
    return false
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const CampaignSecondaryInfoMobile = styled.div`
  display: none;
  padding: 5vmin 0;
  border-top: 1px solid ${RP_GREY};

  @media (max-width: 1024px) {
    display: block;
  }
`
const CampaignInfoMobile = styled.div`
  background: ${RP_SUPER_LIGHT};
  border-radius: 0.5vmin;
  margin-bottom: 1vmin;
  box-shadow: 1px 1px 1px rgba(0,0,0,.2);
`
const CampaignProgressMobile = styled.div`
  display: inline-block;
  text-align:center;
  width: 36vw;
  padding: 2vmin 2.5vw;
`
const CampaignHighlightMobile = styled.div`
  display: inline-block;
  vertical-align: top;
  height: 7vmin;
  color: ${RP_DARK_GREY};
  text-align: center;
  font-size: 6vmin;
  line-height: 7.5vmin;
`
const CampaignSubHighlightMobile = styled.div`
  display: inline-block;
  vertical-align: top;
  padding-left: 3vmin;
  color: ${RP_DARK_GREY};
  font-size: 2.5vmin;
`
const CampaignSecondaryInfoBlockMobile = styled.div`
  @media (max-width: 1024px) {
    display: inline-block;
    width: 50%;
    font-size: 3vmin;
    font-weight: normal;
    text-align: center;

    i {
      font-size: 4vmin;
      line-height: 7.5vmin;
    }
  } 
`
const CampaignPrimaryInfo = styled.div`
  display: block;
  position: relative;
  width: auto;
  margin-left: 0;
  padding: 0;
  padding: 0 0 0 5vmin;
  padding-bottom: 2vmin;

  @media (max-width: 1024px){ 
    display: none;
  }
`
const CampaignProgress = styled.div`
  color: ${RP_BLACK};
  font-size: 5vmin;
  font-weight: normal;

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {
    display: inline-block;
    vertical-align: top;
    width: 25vw;
    text-align: center;
  }
`
const PrimaryHighlight = styled.div`
  font-size: 3vmin;
`
const Progress = styled.div`
  font-size: 3vmin;
`
const PrimaryContextSetter = styled.div`
  color: ${RP_DARKGREY};
  font-size: 1.7vmin;

  @media (max-width: 1024px) { 
    display: inline-block;
    vertical-align: top;
    width:60vw;
    margin-left: 0vmin;
    font-size: 3vmin;
  }

  @media (min-width: 769px) and (max-width: 1024px){
    font-size: 1.3vmin;
  }
`
const CampaignTimeLeft = styled.div`
  color: ${RP_BLACK};
  font-size: 5vmin;
  font-weight: normal;

  display: inline-block;
  vertical-align: top;
  width: 26vw;

  @media (max-width: 1024px){ 
    display: none;
  }
`
const CampaignSecondaryInfo = styled.div`
  padding: 3vmin 0vmin 1vmin 5vmin;

  @media (max-width: 1024px){ 
    display: none;
  }
`
const CampaignSecondaryInfoBlock = styled.div`
  display: inline-block;
  padding: 0 4vmin 2vmin 0;
  font-size: 1.8vmin;
  font-weight: normal;

  &:last-child {
    padding-right: 0;
    margin-bottom: 0;
  }

  i {
    font-size: 2.5vmin;
  }

  @media (min-width: 769px) and (max-width: 1024px){ 
    display: inline-block;
    font-weight: normal;
    padding-right: 3vmin;
    text-align: center;

    i{
      font-size: 2.5vmin;
    }
  }
`
const CampaignSecondaryTabletBlock = styled.div`
  display: none;

  @media (min-width: 769px) and (max-width: 1024px){ 
    display: inline-block;
    font-weight: normal;
    text-align: center;

    i{
      font-size: 2.5vmin;
    }
  }
`
const VenueImageThumb = styled(VenueImage)`
  vertical-align: middle;
  background-size: cover;
`
const VenueTitle = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  margin-left: 0;
  margin-bottom: 0;

  @media (max-width: 1024px){ 
    display: block;
    position: relative;
    width: auto;
    font-size: 3vmin;
  }
`
const OpenMaps = styled.a`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  font-size: 2vmin;
  line-height: 3vmin;
  color: ${RP_RED};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1024px){ 
    font-size: 3vmin;
  }
`
const Address = styled.span`
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  font-size: 2vmin;
  line-height: 3vmin;
  color: ${RP_RED};
  text-decoration: none;

  @media (max-width: 1024px){ 
    font-size: 3vmin;
  }
`