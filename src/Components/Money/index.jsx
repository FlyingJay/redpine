import React from 'react'
import styled from 'styled-components'

import { RP_RED } from 'Components' //GLOBALS


class Money extends React.PureComponent {
  render() {
    if (!this.props.amount || this.props.amount == 0) {
      return <span style={{fontWeight:'bold'}}>FREE</span>
    }

    const amount = this.format(this.props.amount)
    const amount_array = amount ? amount.split('.') : ['','']

    const dollars = amount_array[0]
    const cents = amount_array[1]

    switch (this.props.currency) {
      case "cad":
        return <span>${dollars}<Up>{cents}</Up> CAD {this.props.end_string}</span>
      case "usd":
        return <span>${dollars}<Up>{cents}</Up> USD {this.props.end_string}</span>
      default:
        return <span>${dollars}<Up>{cents}</Up> {this.props.currency} {this.props.end_string}</span>
    }
    return null
  }

  format(amount) {
    if (amount >= 0)
      return parseFloat(amount).toFixed(2)
    else
      return Math.abs(amount).toFixed(2)
  }
}

export default Money

const Up = styled.sup`
  font-size: 0.6em;
`