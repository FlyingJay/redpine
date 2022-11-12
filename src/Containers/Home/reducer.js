import { fromJS } from 'immutable'
import { helpers } from 'globals'
import constants from './constants'

export const initialState = fromJS({
  openings_loading: false,
  featuredBands_loading: false,
  featuredVenues_loading: false,
  featuredCampaigns_loading: false,
  previouslySuccessful_loading: false,
  openings: [],
  featuredBands: null,
  featuredCampaigns: [],
  featuredVenues: null,
  previouslySuccessful: null,
  venue: null,
  campaign: null,
  page: 1
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_DATA_START:
      return state
        .set('featuredBands_loading', true)
        .set('featuredVenues_loading', true)
        .set('featuredCampaigns_loading', true)
        .set('previouslySuccessful_loading', true)

    case constants.FEATURED_BANDS_LOADED:
      const random_bands = helpers.shuffle(action.bands)
      const bandResults = action.page > 1 ? state.get('featuredBands').concat(random_bands) : random_bands
      return state
        .set('featuredBands', helpers.pictures_first(bandResults))
        .set('featuredBands_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.OPENINGS_LOADED:
      const random_openings = helpers.shuffle(action.openings)
      const openingResults = action.page > 1 ? state.get('openings').concat(random_openings) : random_openings
      return state
        .set('openings', openingResults)
        .set('openings_loading', false)

    case constants.FEATURED_VENUES_LOADED:
      const random_venues = helpers.shuffle(action.venues)
      const venueResults = action.page > 1 ? state.get('featuredVenues').concat(random_venues) : random_venues
      return state
        .set('featuredVenues', helpers.pictures_first(venueResults))
        .set('featuredVenues_loading', false)


    case constants.FEATURED_CAMPAIGNS_LOADED:
      const campaignResults = action.page > 1 ? state.get('featuredCampaigns').concat(action.campaigns) : action.campaigns
      return state
        .set('featuredCampaigns', helpers.pictures_first(campaignResults))
        .set('featuredCampaigns_loading', false)

    case constants.PREVIOUSLY_SUCCESSFUL_LOADED:
      return state
        .set('previouslySuccessful', helpers.pictures_first(action.campaigns))
        .set('previouslySuccessful_loading', false)
        
    case constants.VENUE_LOADED:
      return state
        .set('venue', action.venue)
        
    case constants.CAMPAIGN_LOADED:
      return state
        .set('campaign', action.campaign)

    default:
      return state
  }
}

export default reducer