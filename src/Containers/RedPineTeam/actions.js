import constants from './constants'

const actions = {
  loadTickets: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadTicketsStart())
      api.ready.then(() => {
        api.tickets.query({
          expand: 'details,pledge,pledge.campaign,pledge.campaign.bands,pledge.campaign.bands.band,pledge.campaign.timeslot,pledge.campaign.timeslot.venue,pledge.campaign.timeslot.venue.city,pledge.campaign.timeslot.venue.city.province,pledge.campaign.timeslot.venue.city.province.country'
        }).then((res) => {
          dispatch(actions.loadTicketsSuccess(res.results))
        })
      })
    }
  },  

  loadTicketsSuccess: (tickets) => {
    return {
      type: constants.LOAD_TICKETS_SUCCESS,
      tickets
    }
  },

  loadTicketsStart: () => {
    return {
      type: constants.LOAD_TICKETS_START
    }
  }
}

export default actions