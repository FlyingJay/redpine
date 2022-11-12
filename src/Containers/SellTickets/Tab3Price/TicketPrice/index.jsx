import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { RP_GREEN } from 'Components' // GLOBALS
import { ModalSection, ModalHeading, ModalSubheading } from 'Components' // MODALOTHERS
import { Input } from 'Components' 


export class TicketPrice extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const venue = this.props.venue || null
    const ticket_price = this.props.ticket_price
    const ticket_quantity = this.props.ticket_quantity

    return (
      <ModalSection style={{textAlign:'center'}}>
        { !this.props.doors
          ? <ModalHeading style={{textAlign:'center'}}>
              ..and how much for tickets?
            </ModalHeading>
          : null }
        { !this.props.doors
          ? <ModalSubheading style={{textAlign:'center', marginBottom:'3vmin'}}>
              Additional options (and merch) may be added later, using the Show Hub.
            </ModalSubheading>
          : null }
        <Input
          width="25vmin"
          placeholder={this.props.doors ? 'Door Price ($)' : 'Early Bird ($)'}
          value={ticket_price}
          validate={validators.POSITIVE_DOLLAR()}
          onValidate={(price) => this.props.changePrice(price)}
          image='usd'
          focusImage='usd-focus'
          maxLength="200"
          inline/>
          &nbsp;&nbsp;x&nbsp;&nbsp;
        <Input
          width="25vmin"
          placeholder="Quantity"
          value={ticket_quantity}
          validate={validators.POSITIVE_INTEGER()}
          onValidate={(quantity) => this.props.changeQuantity(quantity)}
          image='people'
          focusImage='people-focus'
          maxLength="10"
          inline/>
      </ModalSection>    
    )
  }
}
const Total = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding: 1.5vmin 0 3vmin 0;
`