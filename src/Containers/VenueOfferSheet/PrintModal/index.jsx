import React from 'react'
import styled from 'styled-components'

import { MyPageWrapper, Bold } from 'Components' //GLOBALS
import { Modal } from 'Components' //MODAL
import { SectionHeader } from 'Components' //TITLE

import { SectionSubHeader } from './../SectionSubHeader/index.jsx'
import { EventDetails } from './../EventDetails/index.jsx'
import { SummarySection } from './../SummarySection/index.jsx'
import { ActPotential } from './../ActPotential/index.jsx'

export class PrintModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.age_limits = ['All Ages','16+','18+','19+']
    this.performer_headers = ['Name','Rate Type','Amount']
    this.expense_headers = ['Name','Rate Type','Amount']
    this.ticket_headers = ['Ticket Type','Quantity','Price','Total']
  }

  render() {
    const state                      = this.props.data
    const venue                      = this.props.venue || {}
    const venue_title                = venue && venue.title || ''
    const venue_capacity             = venue && venue.capacity || '?'

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

    const payouts                    = this.props.payouts

    return <Modal show={this.props.is_printing} onClose={() => this.props.onClose()} printable>
            <PrintPageWrapper>
              <PrintHeader style={{textAlign: 'left'}}>Event Details</PrintHeader>
              <DetailsSection>
                <Row label="Venue" value={venue_title}/>
                <Row label="Capacity" value={venue_capacity}/>
                <Row label="Age Limit" value={this.age_limits[state.age_limit]}/>
              </DetailsSection>
              {
                state.event
                ? <EventDetails event={state.event} is_print/>
                : null
              }

              <PrintHeader style={{textAlign:'left'}}>Expenses</PrintHeader>
              <SectionSubHeader columns={this.expense_headers} bold/>
              {
                state.expense_text != [Array(this.expense_headers.length).fill('')]
                ? state.expense_text.map((columns,i) => <SectionSubHeader key={columns+i} columns={columns} is_row/>)
                : null
              }

              {
                state.expense_text.map((columns,i) => <SectionSubHeader key={columns+i} columns={columns} is_row/>)
              }
                
              <PrintHeader style={{textAlign:'left'}}>Ticketing & Merchandise</PrintHeader>
              <SectionSubHeader columns={this.ticket_headers} bold/>
              {
                state.ticket_text != [Array(this.ticket_headers.length).fill('')]
                ? state.ticket_text.map((columns,i) => {
                    const quantity_col = this.ticket_headers.indexOf('Quantity')
                    const price_col    = this.ticket_headers.indexOf('Price')
                    const total_col    = this.ticket_headers.indexOf('Total')
                    const quantity     = quantity_col != -1 ? columns[quantity_col] : 0
                    const price        = price_col != -1 ? columns[price_col] : 0
                    const row_total    = isNaN(price*quantity) ? '' : '$'+(price*quantity).toFixed(2)
                    columns[total_col] = row_total
                    return <SectionSubHeader key={columns+i} columns={columns} is_row/>
                  })
                : null
              }

              <PrintHeader style={{textAlign:'left'}}>Summary</PrintHeader>
              <SummarySection is_print
                gross_sales={gross_sales}
                net_sales={net_sales}
                total_expenses={total_expenses}
                net_after_expenses={net_after_expenses}
                breakeven={breakeven}
                tickets_sold_for_breakeven={tickets_sold_for_breakeven}
                promoter_profit={promoter_profit}
                promoter_potential={promoter_potential}
                split_point={split_point}
                amount_to_split={amount_to_split}/>
              
              <PrintHeader style={{textAlign:'left'}}>Act Potential</PrintHeader>
              <ActPotential payouts={payouts}/>

            </PrintPageWrapper>
           </Modal>
	}
}

const Row = ({label,value}) => {
  return <div>
          <div style={{display:'inline-block',width:'30%'}}>{label}:</div>
          <Bold style={{display:'inline-block',width:'50%'}}>{value}</Bold>
         </div>
}

const DetailsSection = styled.div`
  width: 50%;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }
`
const PrintHeader = styled(SectionHeader)`
  font-size: 2vmin;
  line-height: 4vmin;
`
const PrintPageWrapper = styled(MyPageWrapper)`
  font-size: 1.5vmin;
`