import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { RP_DARK_GREY, RP_GREY, RP_BLACK, RP_FONT, RP_BLUE, RP_DARKBLUE } from 'Components' // GLOBALS
import { Button } from 'Components' // BUTTON
import { Input } from 'Components' // INPUT
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton } from 'Components' //MODAL & MODALOTHERS

import { TicketPrice } from './TicketPrice/index.jsx'

export class Tab3Price extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title || '',
      venue_name: this.props.venue_name || '',
      venue_address: this.props.venue_address || '',
      ticket_price: this.props.ticket_price || 10.00,
      ticket_quantity: this.props.ticket_quantity || 50,
      doors_price: this.props.doors_price || 20.00,
      doors_quantity: this.props.doors_quantity || 100
    }
  }

  render() {
    const showNext = (this.state.title) && (this.state.venue_name) && (this.state.venue_address) && (this.state.ticket_price) && (this.state.ticket_quantity)

    return (
      <SidePanel>
        <ModalSection style={{marginTop:'12vmin'}}>
          <Heading>
            Just some final info..
          </Heading>
        </ModalSection>
        <ModalSection>
          <Input
            style={{marginBottom:'2vmin'}}
            placeholder="Name your show!"
            value={this.state.title}
            validate={validators.ALL_THE_SHIT()}
            onValidate={(title) => this.updateState({title:title})}
            image='pencil'
            focusImage='pencil-focus'
            maxLength="200"/>
          <Input
            placeholder="Where will the event take place?"
            value={this.state.venue_name}
            validate={validators.ALL_THE_SHIT()}
            onValidate={(venue_name) => this.updateState({venue_name:venue_name})}
            image='people'
            focusImage='people-focus'
            maxLength="200"/>
          <Input
            placeholder="What is the address?"
            value={this.state.venue_address}
            validate={validators.ALL_THE_SHIT()}
            onValidate={(venue_address) => this.updateState({venue_address:venue_address})}
            image='location'
            focusImage='location-focus'
            maxLength="200"/>
        </ModalSection>
        <TicketPrice 
          ticket_price={this.state.ticket_price}
          ticket_quantity={this.state.ticket_quantity}
          changePrice={(price) => this.updateState({ticket_price:price})}
          changeQuantity={(quantity) => this.updateState({ticket_quantity:quantity})}/>
        { this.state.doors_price
          ? <TicketPrice doors
              ticket_price={this.state.doors_price}
              ticket_quantity={this.state.doors_quantity}
              changePrice={(price) => this.updateState({doors_price:price})}
              changeQuantity={(quantity) => this.updateState({doors_quantity:quantity})}/>
          : null }
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back(this.state.title,this.state.venue_name,this.state.venue_address,this.state.ticket_price,this.state.ticket_quantity,this.state.doors_price,this.state.doors_quantity)} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton>
          { showNext
            ? <PositiveButton onClick={() => this.props.next(this.state.title,this.state.venue_name,this.state.venue_address,this.state.ticket_price,this.state.ticket_quantity,this.state.doors_price,this.state.doors_quantity)}>
                Next&nbsp;&nbsp;
                <i className="fa fa-arrow-right"/>
              </PositiveButton>
            : null }
        </ModalSection>
      </SidePanel>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Heading = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`