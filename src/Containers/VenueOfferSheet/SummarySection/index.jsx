import React from 'react'
import styled from 'styled-components'

import { Bold } from 'Components' //GLOBALS

export class SummarySection extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
  	const is_print									 = this.props.is_print
    const gross_sales                = this.props.gross_sales
    const net_sales                  = this.props.net_sales
    const total_expenses             = this.props.total_expenses
    const net_after_expenses         = this.props.net_after_expenses
    const breakeven                  = this.props.breakeven
    const tickets_sold_for_breakeven = this.props.tickets_sold_for_breakeven
    const promoter_profit            = this.props.promoter_profit
    const promoter_potential         = this.props.promoter_potential
    const split_point                = this.props.split_point
    const amount_to_split            = this.props.amount_to_split

    return <DetailsSection is_print={is_print}>
            <Row label="Gross Sales" value={'$'+gross_sales}/>
            <Row label="Total Tax" value="13%"/>
            <Row label="Net Sales" value={'$'+net_sales}/>
            <Row label="Total Expenses" value={'$'+total_expenses} note="Expenses, plus any flat-rate performers." is_print={is_print}/>
            <Row label="Net after Expenses" value={'$'+net_after_expenses}/>
            <br/>
            <Row label="Breakeven" value={'$'+breakeven} note="Same as total expenses." is_print={is_print}/>
            <Row label="Tickets sold for Breakeven" value={tickets_sold_for_breakeven} note="Based on first ticket type." is_print={is_print}/>
            <br/>
            <Row label="Promoter Profit" value={'$'+promoter_profit} note="Any expense names containing 'promoter'." is_print={is_print}/>
            <Row label="Promoter Potential" value={'$'+promoter_potential} note="Maximum promoter profit." is_print={is_print}/>
            <Row label="Split Point" value={'$'+split_point}/>
            <Row label="Amount to Split" value={'$'+amount_to_split}/>
           </DetailsSection>
	}
}

const Row = ({label,value,note,is_print}) => {
  return <div>
          <div style={{display:'inline-block',width:'50%'}}>{label}:</div>
          <Bold style={{display:'inline-block',width:'50%'}}>{value}</Bold>
          {
            note
            ? <div style={{fontSize:is_print ? '1.25vmin':'1.5vmin'}}>&nbsp;&nbsp;*{note}</div>
            : null
          }
         </div>
}

const DetailsSection = styled.div`
  width: ${props => props.is_print ? '75%' : '50%'};

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }
`