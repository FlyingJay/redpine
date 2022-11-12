import React from 'react'
import styled from 'styled-components'

import { RP_Campaign } from 'Models'

import { RP_GREEN, RP_BLUE, RP_RED, RP_DARK_GREY, RP_BLACK, RP_DDD, RP_GREY, RP_FONT, Bold, FormNotice } from 'Components'
import { Money } from 'Components'

export class PledgeOptions extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const _Campaign        = RP_Campaign(this.props.campaign)
    const venue_seats      = _Campaign.is_only_tickets ? Number.MAX_SAFE_INTEGER : (_Campaign._Venue.capacity - _Campaign.tickets_sold)

    const purchase_options = this.props.purchase_options || []
    
    const Wrap             = this.props.mobile ? MobileWrap : DesktopWrap

    return (
      this.props.isComplete 
      ? null
      : <Wrap>
          { purchase_options.length > 0
            ? purchase_options.map((item, i) => {
                return item.is_hidden ? null
                       : <PledgeOption
                          key={item.id}
                          index={i}
                          name={item.name}
                          description={item.description}
                          price={item.price}
                          currency={_Campaign._Venue.currency}
                          quantity={item.quantity}
                          is_ticket={item.is_ticket} 
                          venue_seats={venue_seats}
                          updateCart={this.props.updateCart} />
              })
            : <FormNotice style={{padding:0,lineHeight:'10vmin'}}> 
                Ticketing options have not yet been added.
              </FormNotice> }
        </Wrap>
    )
  }
}

const PledgeOption = ({index,name,description,price,currency,quantity,is_ticket,venue_seats,updateCart}) => (
  <PledgeOptionWrapper>
    <div style={{float:'right',display:(quantity < 1 ? 'none' : 'block')}}>
      <PledgeOptionPrice>
        <Money amount={price} currency={currency} />
      </PledgeOptionPrice>
      x
      <NumTickets style={{marginLeft:'1.5vmin'}} onChange={(e) => updateCart(index,e.target.value)}>
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            return (
              num <= quantity
              ? <option value={num} key={num}>{num}</option>
              : null
            )
          }) 
        }
      </NumTickets>
    </div>
    <PledgeOptionTitle>
      <i className={is_ticket ? "fa fa-ticket" : "fa fa-shopping-cart"} style={{color:(is_ticket ? RP_GREEN : RP_BLUE)}} />&nbsp;&nbsp;{name}
    </PledgeOptionTitle>
    <PledgeOptionDescription>
      { description
        ? description
        : ' ' }
    </PledgeOptionDescription>
    { is_ticket 
      ? ''
      : <NotTicketWarning>* This is not a ticket.</NotTicketWarning> }
    { quantity < 1 || venue_seats < 1
      ? <MaxQuantityWarning>
          <Bold>SOLD OUT</Bold>
        </MaxQuantityWarning>
      : quantity < 10
        ? <MaxQuantityWarning>
            Only {!is_ticket || quantity < venue_seats ? quantity : venue_seats} remaining!
          </MaxQuantityWarning>
        : null }
  </PledgeOptionWrapper>
);

const Base = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`
const PledgeOptionSmallDetail = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin-top: 1vmin;
  text-align: right;
`
const MaxQuantityWarning = styled(PledgeOptionSmallDetail)`
  color: ${RP_RED};
  font-size: 1.6vmin;
  margin-bottom: 1vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2.0vmin;
  }
`
const NotTicketWarning = styled(PledgeOptionSmallDetail)`
  color: ${RP_DARK_GREY};
  fontSize: 1.3vmin;
  font-size: 1.4vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 1.75vmin;
  }
`
const PledgeOptionPrice = styled.div`
  display: inline-block;
  position: relative;
  line-height: 5vmin;
  padding: 1vmin 1.5vmin;
  font-size: 2.0vmin;
  font-weight:bold;
  font-family: ${RP_FONT};
  color: ${RP_BLACK};

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
const PledgeOptionDescription = styled(Base)`
  color: ${RP_BLACK};
  font-size: 1.8vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2.5vmin;
  }
`
const PledgeOptionTitle = styled(Base)`
  padding: 0 0 1vmin 0;
  color: ${RP_DARK_GREY};
  font-size: 2.5vmin;
  font-weight: bold;

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    font-size: 3vmin;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
const PledgeOptionWrapper = styled(Base)`
  padding: 1.5vmin 1.5vmin 1vmin 1.5vmin;
  border-top: 1px solid ${RP_DDD};

  @media (max-width: 768px) and (orientation: portrait) { 
    padding: 3vmin;
  }
`
const DesktopWrap = styled(Base)`
  @media (min-width: 1024px) { 
    padding: 5vmin 0 0 5vmin;
    display: block;
  }

  display: none;
`
const MobileWrap = styled(Base)`
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`
const NumTickets = styled.select`
  cursor: pointer;
  outline: none;
  highlight: none;
  display: inline-block;
  position: relative;
  margin-right:-1px;
  padding: 1vmin;
  background-color: '#FFF';
  border: 1px solid ${RP_GREY};
  color: ${RP_BLACK};
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 2vmin;
  border-radius: 0.3vmin 0 0 0.3vmin;
  -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  z-index: 10;

  &:hover {
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    box-shadow: 0 1px 1px rgba(0,0,0,0.3);
  }

  @media (max-width: 768px) and (orientation: portrait) { 
    font-size: 3vmin;
    padding: 2vmin;
  }
`