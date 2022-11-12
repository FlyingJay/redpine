import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
	tickets_loading: false,
  show_tickets: null, //[[Show1_T1], [Show2_T1, Show2_T2, Show2_T3], [Show3_T1], ...]
  page: 1
})

export function reducer(state = initialState, action) {
  switch (action.type) {
  	case constants.LOAD_TICKETS_START:
  		return state
  			.set('tickets_loading', true)

    case constants.LOAD_TICKETS_SUCCESS:
      const tickets = action.tickets || []
      let show_tickets = []

      let i = -1
      let this_show = null
      let previous_show = null

      tickets.forEach(ticket => {
        this_show = ticket.pledge.campaign.id

        if(this_show === previous_show){
          show_tickets[i].push(ticket)
        }else{
          i++
          show_tickets.push([ticket])
        }
        previous_show = this_show
      })


      const all_tickets = action.page > 1 ? state.get('show_tickets').concat(show_tickets) : show_tickets

      return state
        .set('show_tickets', all_tickets)
        .set('tickets_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)
      
    default:
      return state
  }
}

export default reducer