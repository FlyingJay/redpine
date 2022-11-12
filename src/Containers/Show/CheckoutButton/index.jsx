import React from 'react'
import styled from 'styled-components'

import { RP_Campaign, RP_Venue } from 'Models'

import { RP_FONT, RP_PINK, RP_RED, RP_SUPER_LIGHT, RP_BLACK, RP_DDD, RP_DARK_GREY, Bold, Clear } from 'Components' //GLOBALS
import { Link } from 'Components' // LINK


export class CheckoutButton extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const _Campaign     = RP_Campaign(this.props.campaign)
    const progress      = this.props.progress
    const isComplete    = this.props.isComplete
    const isTraditional = this.props.isTraditional

    return (
      this.props.mobile 
      ? <MobilePledgeButtonWrap>
          { isComplete
            ? <PurchaseTicketsRightMobile>
                <PurchaseTicketButtonDisabledMobile>
                  <i className="fa fa-info" /> &nbsp;This show has passed
                </PurchaseTicketButtonDisabledMobile>
                <Clear></Clear>
              </PurchaseTicketsRightMobile>
            : !_Campaign.is_only_tickets && _Campaign.tickets_sold >= _Campaign._Venue.capacity
              ? <PurchaseTicketsRightMobile>
                  <PurchaseTicketButtonDisabledMobile>
                    This show has sold out
                  </PurchaseTicketButtonDisabledMobile>
                  <Clear></Clear>
                </PurchaseTicketsRightMobile>
              : !_Campaign.is_venue_approved 
                ? <PurchaseTicketButtonDisabledMobile style={{width: '35vmin'}}>
                    This show is awaiting approval
                   </PurchaseTicketButtonDisabledMobile>
                : <PurchaseTicketsRightMobile data-test-key="purchase-tickets">
                    <PurchaseTicketButtonMobile onClick={this.props.showCheckout}>
                      <i className="fa fa-usd" /> &nbsp;
                      {(progress >= 100 || isTraditional) ? "Buy Tickets" : "Make a Pledge"}
                    </PurchaseTicketButtonMobile>
                    { isTraditional
                      ? null
                      : <BeforeHeadingToCheckoutMobile><Bold>Note:</Bold> This concert will only happen if the Campaign reaches its goal. If it fails to do so, you will not be charged.</BeforeHeadingToCheckoutMobile> }
                  </PurchaseTicketsRightMobile> }
        </MobilePledgeButtonWrap>
      : isComplete
        ? <PurchaseTicketsRight>
            <PurchaseTicketButtonDisabled>This show has passed</PurchaseTicketButtonDisabled>
          </PurchaseTicketsRight>
        : !_Campaign.is_only_tickets && _Campaign.tickets_sold >= _Campaign._Venue.capacity
          ? <PurchaseTicketsRight>
              <PurchaseTicketButtonDisabled style={{borderRadius: '0.5vmin'}}>
                This show has sold out
              </PurchaseTicketButtonDisabled>
              <Clear></Clear>
            </PurchaseTicketsRight>
          : !_Campaign.is_venue_approved 
            ? <PurchaseTicketsRight>
                <PurchaseTicketButtonDisabled>This show is awaiting approval</PurchaseTicketButtonDisabled>
              </PurchaseTicketsRight>
            : <PurchaseTicketsRight data-test-key="purchase-tickets">
                <PurchaseTicketButton onClick={this.props.showCheckout}>
                  <i className="fa fa-usd" /> &nbsp;
                  {(progress >= 100 || isTraditional) ? "Buy Tickets" : "Make a Pledge"}
                </PurchaseTicketButton>
                { isTraditional
                  ? null
                  : <BeforeHeadingToCheckout><Bold>Note:</Bold> This concert will only happen if the show reaches its goal. If it fails to do so, you will not be charged.</BeforeHeadingToCheckout> }
                <Clear></Clear>
              </PurchaseTicketsRight>
    )
  }
}

const MobilePledgeButtonWrap = styled.div`
  display: none;

  @media (max-width: 1024px) { 
    display: block;
    textAlign: center;
  }
`
const PurchaseTicketButton = styled.button`
  cursor: pointer;
  outline: none;
  highlight: none;
  display: inline-block;
  position: relative;
  width: 100%;
  height: 5vmin;
  padding: 1vmin 1.5vmin;
  background-color: ${RP_PINK};
  border: 1px solid ${RP_PINK};
  color: #FFF;
  text-align: center;
  font-family: ${RP_FONT};
  font-size: 1.7vmin;
  transition: all 0.25s ease;
  -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  -moz-box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  box-shadow: 0px 1px 1px rgba(0,0,0,.1);

  &:hover {
    background: ${RP_RED};
    color: #FFF;
    border-color: ${RP_RED};
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.1);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,.1);
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
`
const PurchaseTicketsRightMobile = styled.div`
  padding: 2vmin 0;
`
const PurchaseTicketButtonMobile = styled.button`
  cursor: pointer;
  outline: none;
  highlight: none;
  display: block;
  position: relative;
  height: auto;
  width: 100%;
  padding: 2vmin 1.5vmin;
  background-color: ${RP_PINK};
  border: 1px solid ${RP_PINK};
  color: #FFF;
  text-align: center;
  font-family: ${RP_FONT};
  font-size: 3vmin;
  transition: all 0.25s ease;
  border-radius: 0 0.3vmin 0.3vmin 0;
  -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  -moz-box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  box-shadow: 0px 1px 1px rgba(0,0,0,.1);

  &:hover {
    background: ${RP_RED};
    color: #FFF;
    border-color: ${RP_RED};
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.1);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,.1);
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
`
const PurchaseTicketButtonDisabledMobile = styled(PurchaseTicketButtonMobile)`
  cursor: default;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_BLACK};
  borderColor: ${RP_DDD};
  border-radius: 0.5vmin;

  &:hover {
    background: ${RP_SUPER_LIGHT};
    color: ${RP_BLACK};
    borderColor: ${RP_DDD};
  }
`
const PurchaseTicketsRight = styled.div`
  display: none;

  @media (min-width: 1024px) { 
    display: block;
    padding: 1.5vmin 0 0 5vmin;
    text-align: left;
  }
`
const PurchaseTicketButtonDisabled = styled(PurchaseTicketButton)`
  cursor: default;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_BLACK};
  border-color: ${RP_DDD};
  border-radius: 0.5vmin !important;
  margin-bottom: 2vmin;
  width: 100%;
  height: 5vmin;

  &:hover {
    background: ${RP_SUPER_LIGHT};
    color: ${RP_BLACK};
    border-color: ${RP_DDD};
  }
`
const BeforeHeadingToCheckout = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin 0 1vmin 0;
  font-size: 1.6vmin;
  color: ${RP_DARK_GREY};
`
const BeforeHeadingToCheckoutMobile = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 2vmin 0;
  font-size: 2vmin;
  color: ${RP_DARK_GREY};
`