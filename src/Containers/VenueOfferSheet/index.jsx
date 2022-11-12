import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import ReactToPrint from 'react-to-print'

import { App } from 'Containers'

import { MyPageWrapper, Bold, RP_RED, RP_BLACK, RP_BLUE, RP_DARKBLUE } from 'Components' //GLOBALS
import { Title, SectionHeader } from 'Components' //TITLE
import { Select, FormButton } from 'Components' //INPUT

import { SectionSubHeader } from './SectionSubHeader/index.jsx'
import { InputSection } from './InputSection/index.jsx'
import { EventDetails } from './EventDetails/index.jsx'
import { ActPotential } from './ActPotential/index.jsx'
import { SummarySection } from './SummarySection/index.jsx'
import { PrintModal } from './PrintModal/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class VenueOfferSheet extends React.PureComponent {
  constructor(props) {
    super(props)
    this.age_limits = ['All Ages','16+','18+','19+']
    this.performer_headers = ['Name','Rate Type','Amount']
    this.expense_headers = ['Name','Rate Type','Amount']
    this.ticket_headers = ['Ticket Type','Quantity','Price','Total']
    this.state = {
      performer_rows: 1,
      expense_rows: 1,
      ticket_rows: 1,
      event: null,
      event_text: null,
      age_limit: 0,
      performer_text: [Array(this.performer_headers.length).fill('')],
      expense_text: [Array(this.expense_headers.length).fill('')],
      ticket_text: [Array(this.ticket_headers.length).fill('')]
    }

    this.loadData()
  }

  render() {
    const venue          = this.props.venue || {}
    const events         = this.props.events || []
    const venue_title    = venue && venue.title || ''
    const venue_capacity = venue && venue.capacity || '?'

    const gross_sales                = this.grossSales()
    const net_sales                  = this.netSales(gross_sales)
    const total_expenses             = this.totalExpenses(net_sales)
    const net_after_expenses         = this.netAfterExpenses(net_sales,total_expenses)
    const breakeven                  = total_expenses
    const tickets_sold_for_breakeven = this.ticketsSoldForBreakeven(breakeven)
    const promoter_profit            = this.promoterProfit(breakeven)
    const promoter_potential         = this.promoterPotential(net_sales)
    const split_point                = this.splitPoint(breakeven,promoter_profit)
    const amount_to_split            = this.amountToSplit(net_sales,promoter_profit,breakeven)

    return <App requireAuth>
            <MyPageWrapper>
              <Title title="Offer Sheet" summary="Create an offer sheet for an event in your calendar." />
              
              <FormHeader>Event Details</FormHeader>
              <DetailsSection>
                <Row label="Venue" value={venue_title}/>
                <Row label="Capacity" value={venue_capacity}/>
                <div style={{display:'inline-block',width:'30%',lineHeight:'8vmin'}}>Age Limit:</div>
                <div style={{display:'inline-block',verticalAlign:'middle',width:'50%'}}>
                  <SelectAge
                    options={
                      this.age_limits.map((text,index) => {
                        return {
                          value: index,
                          label: text
                        }
                      })
                    }
                    onChange={(e) => this.updateState({age_limit:e.value,age_text:e.label})}
                    placeholder={this.state.age_text} />
                </div>
              </DetailsSection>
              { this.state.event
                ? <EventDetails event={this.state.event} clear={() => this.updateState({event:null,event_text:null})}/>
                : <SelectEvent
                    options={
                      events.map(event => {
                        const label = event.title + ' - ' + moment(event.start_time).format('MMMM D')
                        return {
                          value: event,
                          label: label
                        }
                      })
                    }
                    onChange={(e) => this.updateState({event:e.value,event_text:e.label})}
                    placeholder={ this.state.event_text || 'Select an event..' } /> }

              <FormHeader>Performers</FormHeader>
              <SectionSubHeader columns={this.performer_headers} />
              { this.state.performer_text.map((_,row) => {
                  return <InputSection 
                          key={'performer_'+row}
                          placeholders={this.performer_headers}
                          values={this.state.performer_text[row]}
                          onUpdate={(text,column) => this.setPerformerText(text,row,column)}
                          add={() => this.addPerformerRow()}
                          last={row === (this.state.performer_rows-1)}/>
                }) }

              <FormHeader>Expenses</FormHeader>
              <SectionSubHeader columns={this.expense_headers} />
              { this.state.expense_text.map((_,row) => {
                  return <InputSection 
                          key={'expense_'+row}
                          placeholders={this.expense_headers}
                          values={this.state.expense_text[row]}
                          onUpdate={(text,column) => this.setExpenseText(text,row,column)}
                          add={() => this.addExpenseRow()}
                          last={row === (this.state.expense_rows-1)}/>
                }) }
                
              <FormHeader>Ticketing & Merchandise</FormHeader>
              <SectionSubHeader columns={this.ticket_headers} />
              { this.state.ticket_text.map((_,row) => {
                  return <InputSection 
                          key={'ticket_'+row}
                          placeholders={this.ticket_headers}
                          values={this.state.ticket_text[row]}
                          onUpdate={(text,column) => this.setTicketText(text,row,column)}
                          add={() => this.addTicketRow()}
                          last={row === (this.state.ticket_rows-1)}/>
                }) }

              <FormHeader>Summary</FormHeader>
              <SummarySection
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
              
              <FormHeader>Act Potential</FormHeader>
              <ActPotential payouts={this.performer_payouts(amount_to_split)}/>

              <PrintWrap onClick={() => this.updateState({is_printing:true})}>
                <ReactToPrint
                  trigger={() => <PrintButton>
                                  <i className="fa fa-file-pdf-o"/>
                                  &nbsp;&nbsp;Download PDF
                                 </PrintButton>}
                  content={() => this.componentRef}/>
              </PrintWrap>
              <PrintWrap>
                <PrintButton onClick={() => this.downloadCSV()}>
                  <i className="fa fa-file-excel-o"/>
                  &nbsp;&nbsp;Download CSV
                </PrintButton>
              </PrintWrap>
            </MyPageWrapper>

            <PrintModal 
              ref={el => (this.componentRef = el)}
              venue={venue}
              data={this.state}
              gross_sales={gross_sales}
              net_sales={net_sales}
              total_expenses={total_expenses}
              net_after_expenses={net_after_expenses}
              breakeven={breakeven}
              tickets_sold_for_breakeven={tickets_sold_for_breakeven}
              promoter_profit={promoter_profit}
              promoter_potential={promoter_potential}
              split_point={split_point}
              amount_to_split={amount_to_split}
              payouts={this.performer_payouts(amount_to_split)}
              is_printing={this.state.is_printing}
              onClose={() => this.updateState({is_printing:false})}/>
           </App>
  }

  /*************************
  ** DOWNLOAD OFFER SHEET **
  *************************/

  downloadCSV(){
    const gross_sales                = this.grossSales()
    const net_sales                  = this.netSales(gross_sales)
    const total_expenses             = this.totalExpenses(net_sales)
    const net_after_expenses         = this.netAfterExpenses(net_sales,total_expenses)
    const breakeven                  = total_expenses
    const tickets_sold_for_breakeven = this.ticketsSoldForBreakeven(breakeven)
    const promoter_profit            = this.promoterProfit(breakeven)
    const promoter_potential         = this.promoterPotential(net_sales)
    const split_point                = this.splitPoint(breakeven,promoter_profit)
    const amount_to_split            = this.amountToSplit(net_sales,promoter_profit,breakeven)

    const offerData = {
      state:this.state,
      venue: this.props.venue,

      age_limits: this.age_limits,
      performer_headers: this.performer_headers,
      expense_headers: this.expense_headers,
      ticket_headers: this.ticket_headers,

      gross_sales: gross_sales,
      net_sales: net_sales,
      total_expenses: total_expenses,
      net_after_expenses: net_after_expenses,
      breakeven: breakeven,
      tickets_sold_for_breakeven: tickets_sold_for_breakeven,
      promoter_profit: promoter_profit,
      promoter_potential: promoter_potential,
      split_point: split_point,
      amount_to_split: amount_to_split,

      performer_payouts: this.performer_payouts(amount_to_split)
    }

    this.updateState({downloadingOffer: true})
    this.props.downloadOffer(offerData)
  }

  downloadOffer(offerData){
    this.downloadAsCSV("offer-sheet.csv", offerData)
    this.updateState({downloadingOffer:false})
  }

  downloadAsCSV(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    }
    else{
      var elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }  

  performer_payouts(amount_to_split) {
    const rows       = this.state.performer_text || []
    const name_col   = this.performer_headers.indexOf('Name')
    const rate_col   = this.performer_headers.indexOf('Rate Type')
    const amount_col = this.performer_headers.indexOf('Amount')

    const act_names = []

    rows.map(row => {
      const name = name_col != -1 ? row[name_col] : null
      name && act_names.indexOf(name) == -1 ? act_names.push(name) : null
    })

    const act_guarantees = Array(act_names.length).fill(0)
    const act_variables = Array(act_names.length).fill(0)
    const act_percentages = Array(act_names.length).fill(0)

    rows.map(row => {
      const name   = name_col != -1 ? row[name_col] : '???'
      const rate   = rate_col != -1 ? row[rate_col] : '?'
      const amount = amount_col != -1 ? row[amount_col] : 0

      const i = act_names.indexOf(name)
      if(rate == 'Flat'){
        act_guarantees[i] += Number(amount)
      }
      else if(rate == 'Percentage'){
        act_variables[i] += Number(amount_to_split*(amount/100))
        act_percentages[i] += Number(amount)
      }
    })

    return {
      act_names:act_names,
      act_guarantees:act_guarantees,
      act_variables:act_variables,
      act_percentages:act_percentages
    }
  }

  grossSales() {
    let gross_sales    = 0.00
    const quantity_col = this.ticket_headers.indexOf('Quantity')
    const price_col    = this.ticket_headers.indexOf('Price')

    this.state.ticket_text.forEach(row => {
      const quantity     = quantity_col != -1 ? row[quantity_col] : 0
      const price        = price_col != -1 ? row[price_col] : 0
      const row_total    = price*quantity

      gross_sales += row_total
    })

    return gross_sales.toFixed(2)
  }

  netSales(gross_sales) {
    return (gross_sales*0.87).toFixed(2)
  }
  
  totalExpenses(net_sales) {
    let total_expenses = 0.00
    let name_col       = this.expense_headers.indexOf('Name')
    let rate_col       = this.expense_headers.indexOf('Rate Type')
    let amount_col     = this.expense_headers.indexOf('Amount')

    this.state.expense_text.forEach(row => {
      const name      = name_col != -1 ? row[name_col] : ''
      const rate      = rate_col != -1 ? row[rate_col] : 0
      const amount    = amount_col != -1 ? row[amount_col] : 0
      const row_total = Number(rate == 'Percentage' ? net_sales*(amount/100) : amount)

      if (name.toLowerCase().indexOf('promoter') === -1) {
        total_expenses += row_total
      }
    })

    rate_col   = this.performer_headers.indexOf('Rate Type')
    amount_col = this.performer_headers.indexOf('Amount')    

    this.state.performer_text.forEach(row => {
      const rate   = rate_col != -1 ? row[rate_col] : 0
      const amount = amount_col != -1 ? row[amount_col] : 0

      if (rate == 'Flat') {
        total_expenses += Number(amount)
      }
    })

    return total_expenses.toFixed(2)
  }
  
  netAfterExpenses(net_sales,total_expenses) {
    return (net_sales - total_expenses).toFixed(2)
  }

  ticketsSoldForBreakeven(breakeven) {
    const price_col     = this.ticket_headers.indexOf('Price')
    const default_price = this.state.ticket_text[0][price_col]
    const num_tickets   = isNaN(breakeven/default_price) ? 0 : (breakeven/default_price)

    return Math.ceil(num_tickets)
  }
  
  promoterProfit(breakeven) {
    let promoter_profit = 0.00
    let name_col        = this.expense_headers.indexOf('Name')
    let rate_col        = this.expense_headers.indexOf('Rate Type')
    let amount_col      = this.expense_headers.indexOf('Amount')

    this.state.expense_text.forEach(row => {
      const name      = name_col != -1 ? row[name_col] : ''
      const rate      = rate_col != -1 ? row[rate_col] : 0
      const amount    = amount_col != -1 ? row[amount_col] : 0
      const row_total = Number(rate == 'Percentage' ? breakeven*(amount/100) : amount)

      if (name.toLowerCase().indexOf('promoter') != -1) {
        promoter_profit += row_total
      }
    })

    return promoter_profit.toFixed(2)
  }
  
  promoterPotential(net_sales) {
    let promoter_profit = 0.00
    let name_col        = this.expense_headers.indexOf('Name')
    let rate_col        = this.expense_headers.indexOf('Rate Type')
    let amount_col      = this.expense_headers.indexOf('Amount')

    this.state.expense_text.forEach(row => {
      const name      = name_col != -1 ? row[name_col] : ''
      const rate      = rate_col != -1 ? row[rate_col] : 0
      const amount    = amount_col != -1 ? row[amount_col] : 0
      const row_total = Number(rate == 'Percentage' ? net_sales*(amount/100) : amount)

      if (name.toLowerCase().indexOf('promoter') != -1) {
        promoter_profit += row_total
      }
    })

    return promoter_profit.toFixed(2)
  }
  
  splitPoint(breakeven,promoter_profit) {
    return (Number(breakeven) + Number(promoter_profit)).toFixed(2)
  }
  
  amountToSplit(net_sales,promoter_profit,breakeven) {
    return (Number(net_sales) - Number(promoter_profit) - Number(breakeven)).toFixed(2)
  }

  setPerformerText(text, row, index) {
    let performer_text = this.state.performer_text
    performer_text[row][index] = text
    this.updateState({performer_text:performer_text})
  }

  setExpenseText(text, row, index) {
    let expense_text = this.state.expense_text
    expense_text[row][index] = text
    this.updateState({expense_text:expense_text})
  }

  setTicketText(text, row, index) {
    let ticket_text = this.state.ticket_text
    ticket_text[row][index] = text
    this.updateState({ticket_text:ticket_text})
  }

  addPerformerRow() {
    this.updateState({
      performer_rows:this.state.performer_rows + 1,
      performer_text:this.state.performer_text.concat([Array(this.performer_headers.length).fill('')])
    })
  }

  addExpenseRow() {
    this.updateState({
      expense_rows:this.state.expense_rows + 1,
      expense_text:this.state.expense_text.concat([Array(this.expense_headers.length).fill('')])
    })
  }

  addTicketRow() {
    this.updateState({
      ticket_rows:this.state.ticket_rows + 1,
      ticket_text:this.state.ticket_text.concat([Array(this.ticket_headers.length).fill('')])
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.offerData != null && this.state.downloadingOffer){
      this.downloadOffer(nextProps.offerData)
    }
    else if (this.state.downloadingOffer) {
      this.props.errorMessage("No data.")
      this.updateState({downloadingOffer:false})
    }    
  } 

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  loadData() {
    const venue_id = this.props.match.params.venueId
    this.props.loadData(venue_id)
  }
}

const mapStateToProps = (state, props) => {
  return {
    venue: selectors.selectVenue(state, props),
    events: selectors.selectEvents(state, props),
    offerData: selectors.selectOfferData(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (venue_id) => {
      dispatch(actions.loadData(venue_id))
    },

    downloadOffer: (offerData) => {
      dispatch(actions.downloadOffer(offerData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueOfferSheet)

const DetailsSection = styled.div`
  width: 50%;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }
`
const FormHeader = styled(SectionHeader)`
  line-height: 4vmin;
  text-align: left;
  margin: 2vmin 0 1vmin 0;
`
const Row = ({label,value,summary,note}) => {
  return <div>
          <div style={{display:'inline-block',width:summary ? '50%':'30%'}}>{label}:</div>
          <Bold style={{display:'inline-block',width:'50%'}}>{value}</Bold>
          {
            note
            ? <div style={{fontSize:'1.5vmin'}}>&nbsp;&nbsp;*{note}</div>
            : null
          }
         </div>
}

const SelectAge = styled(Select)`
  display: block;
`
const SelectEvent = styled(Select)`
  width: 30%;
  margin: 1vmin 0;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 80%;
  }
`
const PrintWrap = styled.div`
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  width: 50%;
  margin-top: 5vmin;
`
const PrintButton = styled(FormButton)`
  display: inline-block;
  background: ${RP_BLUE};
  margin: 0px auto;
  color: #FFF;
  font-size: 2.5vmin;

  &:hover {
    background: ${RP_DARKBLUE};
  }
`