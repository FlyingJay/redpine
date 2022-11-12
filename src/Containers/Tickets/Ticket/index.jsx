import React from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import moment from 'moment'

import { RP_Campaign, RP_Venue, RP_User } from 'Models'
import { RP_RED, RP_BLACK, RP_WHITE, RP_SUPER_LIGHT, RP_DARK_GREY, Clear } from 'Components'

import { ActLinks } from 'Components' //CAMPAIGNBLOCK/ACTLINKS


const ticketHeight = '630px';

export class Ticket extends React.PureComponent {
  render() {
    const ticket      = this.props.ticket 
    const code        = ticket ? ticket.code : ''
    const pledge      = ticket ? ticket.pledge : null
    const type        = ticket ? ticket.details.name : ''
    const description = ticket ? ticket.details.Description : ''

    const campaign    = pledge ? pledge.campaign : null
    const timeslot    = campaign && campaign.timeslot || null
    const venue       = timeslot && timeslot.venue || null

    const _Campaign      = RP_Campaign(campaign)
    const headliner      = _Campaign.headliner() || null
    const headliner_name = headliner ? headliner.name : ''

    const _Venue   = RP_Venue(venue)
    const showtime = moment(timeslot ? timeslot.start_time : null).format('MMM D, YYYY @ h:mm A')

    return (
      <Wrapper multi={this.props.multi}>
        <InnerWrapper>
          <LogoWrapper>
              <img src="/Assets/images/logo/sq1.png" />
              <LogoText>RedPine</LogoText>
          </LogoWrapper>
          <TotalQRWrapper>
            <div style={{display:'block',textAlign:'right'}}>
              <TicketType>{type}</TicketType>
            </div>
            <QRCodeWrapper>
              <QRCode value={code} renderAs="svg" level="H"/>
            </QRCodeWrapper>
            <QRCodeRules>
              <span>{ RP_User(ticket.pledge.user).full_name }</span>
              <br/><br/>
              If you show up to the venue on the day of the concert without a ticket, the venue has the right to deny entry.
            </QRCodeRules>
          </TotalQRWrapper>
          <Description>
            {description}
          </Description>
          <Attending>
            <Heading>Attending</Heading>
            <Value>
              {
                _Campaign.title.length > 50 
                ? _Campaign.title.substring(0,50) + '...' 
                : _Campaign.title
              }
            </Value>
            <FootNote>
              <ActLinks headliner={_Campaign.headliner()} supporting_acts={_Campaign.supportingActs()}/>
            </FootNote>
          </Attending>
          <Starts>
            <Heading>Starts</Heading>
            <Value>{showtime}</Value>
            <FootNote>
              Please bring your ID with you... As it may be required to enter the venue.
            </FootNote>
          </Starts>
          <Location>
            <Heading>Location</Heading>
            <Value>{_Venue.title}</Value>
            <FootNote>
              {_Campaign.is_only_tickets ? _Venue.address : _Venue.address_string}
            </FootNote>
          </Location>
        </InnerWrapper>
        <Clear></Clear>
      </Wrapper>
    )
  }
}

/*** TOTAL TICKET WRAPPER ***/
const Wrapper = styled.div`
  display: block;
  position: relative;
  height: ${ticketHeight};
  width: 400px;
  text-align: center;
  top: 50%;
  margin: auto;
  margin-bottom: ${props => props.multi ? '10vh' : '0'};
  transform: translateY(-50%);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);


  @media (max-width: 767px) and (orientation: portrait) { 
    width: 80vw;
    height: 90vh;
    box-shadow: none;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80vw;
  }
`
const InnerWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: CALC(100% - 50px);
  height: CALC(${ticketHeight} - 40px);
  padding: 20px;
  padding-left: 30px;
  border-right: 0px solid ${RP_SUPER_LIGHT};
  font-size: 12px;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) { 
    padding: 20px !important;
    width: CALC(100% - 40px);
  }
`
/* LOGO */
const LogoWrapper = styled.div`
  z-index: 2;
  display: block;
  vertical-align: middle;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 0 10px 0;

  div {
    display: inline-block;
    vertical-align: top;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 32px;
    height: 32px;
    margin-right: 13px;
    background: url('/Assets/images/logo/sq1.png');
    background-size: 32px;
    background-position: cneter;
    border-radius: 3px;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    text-align: center;
  }
`
const LogoText = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: auto;
  height: 32px;
  color: ${RP_BLACK};
  font-size: 23px;
  font-weight: 100;
  line-height: 32px;
  text-align: left;
`
const Red = styled.div`
  color: ${RP_BLACK};
  font-family: Pacifico !important;
`
const Pine = styled.div`
  color: ${RP_RED};
  font-family: Pacifico !important;
`
const TicketType = styled.div`
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  padding: 5px 9px;
  margin-bottom: 10px;
  background: ${RP_RED};
  color: ${RP_WHITE};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 3px;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 9px;
    text-align: center;
  }
`
/* QR CODE */
const TotalQRWrapper = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding-top: 10px;
  margin-bottom: 10px;
  border-top: 1px solid ${RP_SUPER_LIGHT};
  text-align: left;
`
const QRCodeWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 128px;
  height: 128px;
  margin-right: 11px;

  @media (max-width: 767px) and (orientation: portrait) { 
    display: block;
    margin: 0 auto;
  }
`
const QRCodeRules = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: CALC(100% - 139px);
  height: auto;
  font-size: 12px;

  span {
    font-size: 3vmin;
  }

  @media (max-width: 767px) and (orientation: portrait) { 
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 11px;
  }
`
/* LEFT COLUMN SUB SECTIONS */
const Attending = styled.div`
  @media (max-width: 767px) and (orientation: portrait) { 
    text-align: center;
  }
`
const Starts = styled.div`
  @media (max-width: 767px) and (orientation: portrait) { 
    text-align: center;
  }
`
const Location = styled.div`
  @media (max-width: 767px) and (orientation: portrait) { 
    text-align: center;
  }
`
const Heading = styled.div`
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  padding: 5px 9px;
  margin-bottom: 10px;
  background: ${RP_RED};
  color: ${RP_WHITE};
  font-size: 11px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 3px;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 9px;
    text-align: center;
  }
`
const Value = styled.div`
  margin-bottom: 10px;
  font-size: 25px;
  line-height: 23px;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 17px;
    text-align: center;
  }
`
const FootNote = styled.div`
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 11px;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 9px;
    text-align: center;
  }
`
const Description = styled.div`
  display: block;
  text-align: left;
  margin-bottom: 10px;
  font-style: italic;

  @media (max-width: 767px) and (orientation: portrait) { 
    text-align: center;
  }
`