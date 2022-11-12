import constants from './constants'

const actions = {
  loadTickets: (page=1) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadTicketsStart())
      api.ready.then(() => {
        if(api.user){
          api.tickets.query({
            pledge__user: api.user,
            expand: 'details,pledge.user,pledge.campaign.bands.band,pledge.campaign.timeslot.venue.city.province.country',
            page: page,
            page_size: 20
          }).then((res) => {
            dispatch(actions.loadTicketsSuccess(res.results,page,res.count))
          })
        }
      })
    }
  },  

  loadTicketsSuccess: (tickets,page,results_count) => {
    return {
      type: constants.LOAD_TICKETS_SUCCESS,
      tickets,
      page,
      results_count
    }
  },

  loadTicketsStart: () => {
    return {
      type: constants.LOAD_TICKETS_START
    }
  }
}

export default actions