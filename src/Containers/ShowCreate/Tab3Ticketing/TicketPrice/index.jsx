import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { Input } from 'Components' // INPUT
import { ModalSection, ModalHeading } from 'Components' // MODALOTHERS


export class TicketPrice extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const venue = this.props.venue || null
    const ticket_price = this.props.ticket_price

    return (
      <ModalSection style={{textAlign:'center'}}>
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
      </ModalSection>
    )
  }
}
const Text = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`