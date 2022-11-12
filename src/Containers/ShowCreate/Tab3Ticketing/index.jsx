import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'
import { PAYOUT_TYPES } from 'enums' 

import { RP_DARKGREY, RP_DARK_GREY, RP_GREY, RP_BLACK, RP_FONT, RP_BLUE, RP_DARKBLUE, RP_DDD, Bold, Clear } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton } from 'Components' //MODAL & MODALOTHERS
import { ImageLink } from 'Components'
 
import { TicketPrice } from './TicketPrice/index.jsx'


export class Tab3Ticketing extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      doors_price: this.props.doors_price,
      ticket_price: this.props.ticket_price,
      payout_type: this.props.payout_type
    }
  }

  render() {
    return (
      <SidePanel>
        <ModalSection style={{marginTop:'12vmin'}}>
          <ModalHeading>Ticketing & Payouts</ModalHeading>
          <ModalSubheading>
            We automatically make a ticketing page for you when the venue confirms the show. 
          </ModalSubheading>
          { this.state.ticket_price
            ? <TicketPrice 
                ticket_price={this.state.ticket_price}
                changePrice={(price) => this.updateState({ticket_price:price})}/>
            : this.state.ticket_price === 0.00
              ? <CheckboxValue style={{marginBottom:'4vmin'}}>
                  RSVPs for this event will be <Bold>FREE</Bold>.
                  <br/>
                  You may add ticketing or merch options at any time.
                </CheckboxValue>
              : <div>
                  <ImageLink text="Ticketed Event" icon="fa fa-ticket" action_text="Set a ticket price" onClick={() => this.updateState({ticket_price:10.00,doors_price:20.00})}/>
                  <ImageLink text="Free/PWYC Event" icon="fa fa-users" action_text="Create a free event" onClick={() => this.updateState({ticket_price:0.00,doors_price:0.00,payout_type:PAYOUT_TYPES.SPLIT_BY_ACT_SALES})}/>
                </div> }
          { this.state.doors_price
            ? <TicketPrice doors
                ticket_price={this.state.doors_price}
                changePrice={(price) => this.updateState({doors_price:price})}/>
            : null }
          { this.state.ticket_price || this.state.ticket_price === 0.00
            ? <ChangeButton onClick={() => this.updateState({ticket_price:null,doors_price:null})}>
                Edit&nbsp;&nbsp;
                <i className="fa fa-arrow-right"/>
              </ChangeButton>
            : null }
        </ModalSection>
        { this.state.ticket_price > 0 || this.state.doors_price > 0
          ? <CheckContainerizer>
              <ModalSubheading style={{textAlign:'center'}}>
                By default, each act is paid for the tickets they sold.  
                <br/>
                { this.props.organization
                  ? 'Check this box to have your organization collect all proceeds instead.'
                  : '' }
              </ModalSubheading>
              <Clear/>
              <Checkbox type="checkbox" 
                onChange={(e) => this.updateState({payout_type: this.state.payout_type === PAYOUT_TYPES.SPLIT_BY_ACT_SALES 
                                                                ? this.props.organization
                                                                  ? PAYOUT_TYPES.ALL_TO_ORGANIZATION
                                                                  : PAYOUT_TYPES.ALL_TO_ORGANIZER 
                                                                : PAYOUT_TYPES.SPLIT_BY_ACT_SALES})} 
                checked={this.state.payout_type === PAYOUT_TYPES.ALL_TO_ORGANIZER || this.state.payout_type === PAYOUT_TYPES.ALL_TO_ORGANIZATION} />
              <CheckboxValue>&nbsp;&nbsp;Alternatively, check this box to have all sales sent to you.</CheckboxValue>
            </CheckContainerizer>
          : null }
        <ModalSection style={{textAlign:'right',marginBottom:'12vmin'}}>
          <NegativeButton onClick={() => this.props.back(this.state.payout_type,this.state.ticket_price,this.state.doors_price)} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton> 
          <PositiveButton onClick={() => this.props.next(this.state.payout_type,this.state.ticket_price,this.state.doors_price)}>
          { (this.state.ticket_price || this.state.ticket_price === 0.00) && (this.state.doors_price || this.state.doors_price === 0.00)
            ? 'Next  ' : 'Skip for now ' }
          <i className="fa fa-arrow-right"/>
        </PositiveButton>
        </ModalSection>
      </SidePanel>
    )
  }

  chooseVenue(venue) {
    const default_price = 1.00
    this.updateState({venue:venue,default_price:default_price})
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const CheckContainerizer = styled(ModalSection)`
  border-top: 1px solid ${RP_DDD};
  margin: 2vmin 0 2vmin 0;
  padding-top: 2vmin;
  text-align: center;
`
const Checkbox = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 3vmin;
  height: 3vmin;
  margin-bottom: 0;

  @media (max-width: 768px) { 
    width: 4vmin;
    height: 4vmin;
  }
`
const CheckboxValue = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: auto;
  font-size: 2vmin;
  color: ${RP_BLACK};

  @media (max-width: 768px) { 
    font-size: 3vmin;
  }
`
const ChangeButton = styled.div`
  display: block;
  text-align: right;
  font-size: 2.5vmin;
  color: ${RP_DARKGREY};
  padding: 2vmin; 0 0 0;

  &:hover {
    color: ${RP_BLACK};
    cursor: pointer;
  }
`