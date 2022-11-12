import { fromJS } from 'immutable'
import constants from './constants'
import moment from 'moment'


export const initialState = fromJS({
  venue: null,
  events: null,
  offerData: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.VENUE_LOADED:
      const events = action.venue && action.venue.events || []
      return state
        .set('venue', action.venue)
        .set('events', events)

    case constants.DOWNLOADING_OFFER:
      const offerData = action.offerData

      let offerCSV = ""
      const data = offerData.state
      const venue = offerData.venue
      const event = data && data.event || {}

      const age_limits = offerData.age_limits
      const performer_headers = offerData.performer_headers
      const expense_headers = offerData.expense_headers
      const ticket_headers = offerData.ticket_headers

      const payouts = offerData.performer_payouts
      const act_names       = payouts && payouts.act_names || []
      const act_guarantees  = payouts && payouts.act_guarantees || []
      const act_variables   = payouts && payouts.act_variables || []
      const act_percentages = payouts && payouts.act_percentages || []

      if(data){
        offerCSV += "Generated on "+moment(Date.now()).format('MM/DD/YYYY')+"\n\n"

        offerCSV += "Venue,"+venue.title+"\n"
        offerCSV += "Capacity,"+venue.capacity+"\n"
        offerCSV += "Age Limit,"+age_limits[data.age_limit]+"\n"
        offerCSV += "Date,"+moment(event.start_time).format('MMMM D, YYYY')+"\n"
        offerCSV += "Doors,"+moment(event.start_time).subtract(1,'hours').format('HH:MM A')+"\n"
        offerCSV += "Show,"+moment(event.start_time).format('HH:MM A') + ' - ' + moment(event.end_time).format('HH:MM A')+"\n\n"

        offerCSV += "Expenses\n"
        offerCSV += "Name,Rate Type,Amount\n"
        data.expense_text.forEach(expense => {
          const num_columns = expense.length
          expense.forEach((column,i) => {
            offerCSV += column
            offerCSV += ((i+1) == num_columns ? '\n' : ',')
          })
        })
        offerCSV += "\n"

        offerCSV += "Ticketing & Merchandise\n"
        offerCSV += "Ticket Type,Quantity,Price\n"
        data.ticket_text.forEach(ticket => {
          const num_columns = ticket.length
          ticket.forEach((column,i) => {
            offerCSV += column
            offerCSV += ((i+1) == num_columns ? '\n' : ',')
          })
        })
        offerCSV += "\n"

        offerCSV += "Summary\n"
        offerCSV += "Gross Sales,$"+offerData.gross_sales+"\n"        
        offerCSV += "Total Tax,13%\n"        
        offerCSV += "Net Sales,$"+offerData.net_sales+"\n"        
        offerCSV += "Total Expenses,$"+offerData.total_expenses+"\n"        
        offerCSV += "Net after Expenses,$"+offerData.net_after_expenses+"\n"        
        offerCSV += "Breakeven,$"+offerData.breakeven+"\n"        
        offerCSV += "Tickets sold for Breakeven,"+offerData.tickets_sold_for_breakeven+"\n"        
        offerCSV += "Promoter Profit,$"+offerData.promoter_profit+"\n"        
        offerCSV += "Promoter Potential,$"+offerData.promoter_potential+"\n"        
        offerCSV += "Split Point,$"+offerData.split_point+"\n"        
        offerCSV += "Amount to Split,$"+offerData.amount_to_split+"\n" 
        offerCSV += "\n"

        act_names.forEach((act,i) => {
          offerCSV += act+"\n"
          offerCSV += (act_guarantees[i] ? "Guarantee,$"+act_guarantees[i].toFixed(2)+"\n" : "")
          offerCSV += (act_variables[i] ? "Earnings,$"+act_variables[i].toFixed(2)+","+act_percentages[i]+"% of split\n" : "")
          offerCSV += "\n"
        })
      }
      return state
        .set('offerData', offerCSV)

    default:
      return state
  }
}

export default reducer