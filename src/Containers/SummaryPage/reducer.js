import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  campaigns: null,
  venue_campaigns: null,
  band_campaigns: null,
  timeslots: null,
  pledges: null,
  band_pledges: null,
  band: null,
  venue: null,
  related_bands: null,
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    case consts.CAMPAIGNS_LOADED:
      const c = action.campaigns
      const campaigns = {}
      const venue_campaigns = {}
      const band_campaigns = {}

      if(c.length > 0){
        for( var i = 0, max = c.length; i < max ; i++ ){
          // Campaign_Facts centered around campaigns
          if(campaigns[c[i].campaign] == undefined){
            campaigns[c[i].campaign] = []
          }
          campaigns[c[i].campaign].push(c[i])

          // Campaign_Facts centered around venues
          if(venue_campaigns[c[i].venue.id] == undefined){
            venue_campaigns[c[i].venue.id] = []
          }
          venue_campaigns[c[i].venue.id].push(c[i])

          // Campaign_Facts centered around bands
          if(band_campaigns[c[i].band.id] == undefined){
            band_campaigns[c[i].band.id] = []
          }
          band_campaigns[c[i].band.id].push(c[i])
        }
      }
      return state
        .set('campaigns', campaigns)
        .set('venue_campaigns', venue_campaigns)
        .set('band_campaigns', band_campaigns)

    case consts.TIMESLOTS_LOADED:
      return state
        .set('timeslots', action.timeslots)

    case consts.PLEDGES_LOADED:
      const p = action.pledges
      const band_pledges = {}

      if(p.length > 0){
        for( var i = 0, max = p.length; i < max ; i++ ){
          // Pledges centered around bands
          if(band_pledges[p[i].band] == undefined){
            band_pledges[p[i].band] = []
          }
          band_pledges[p[i].band].push(p[i])
        }
      }
      return state
        .set('pledges', action.pledges)
        .set('band_pledges', band_pledges)

    case consts.BAND_LOADED:
      return state
        .set('band', action.band)

    case consts.VENUE_LOADED:
      return state
        .set('venue', action.venue)

    case consts.RELATED_BANDS_LOADED:
      return state
        .set('related_bands', action.bands)

    default:
      return state
  }
}

export default reducer