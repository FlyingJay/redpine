import { fromJS } from 'immutable'
import constants from './constants'
import actions from './actions'

export const initialState = fromJS({
  authenticated: null,
  user: null,
  spotify: null,
  redirect: null,
  notificationType: null,
  notificationIcon: null,
  notificationText: null,
  notificationVisible: false,
  bodyClickHandlers: [],
  help_topic: null,
  show_buyRedPine: false,
  show_navJump: false,
  all_users: [],
  all_cities: [],
  venue_cities: [],
  all_provinces: [],
  all_countries: [],
  all_genres: [],
  load_cache: true
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case constants.SET_AUTH:
      return state
        .set('authenticated', action.authenticated)
        .set('user', action.authenticated ? state.user : null)

    case constants.SET_USER:
      return state
        .set('user', action.user)
        .set('user_loading', false)

    case constants.USER_LOADING:
      return state
        .set('user_loading', true)

    case constants.SET_SETTINGS:
      return state
        .set('settings', action.settings)

    case constants.SET_REDIRECT:
      return state
        .set('redirect', action.redirect)

    case constants.SEND_NOTIFICATION:
      return state
        .set('notificationType', action.notifType)
        .set('notificationIcon', action.notifIcon)
        .set('notificationText', action.notifText)
        .set('notificationVisible', true)

    case constants.CLEAR_NOTIFICATION:
      return state
        .set('notificationType', null)
        .set('notificationIcon', null)
        .set('notificationText', null)
        .set('notificationVisible', false)

    case constants.ADD_BODY_CLICK_HANDLER:
      return state
        .set('bodyClickHandlers', [...state.get('bodyClickHandlers'), action.handler])

    case constants.REMOVE_BODY_CLICK_HANDLER:
      const clickHandlers = state.get('bodyClickHandlers')
      const removeIndex = clickHandlers.indexOf(action.handler)
      const nextHandlers = [...clickHandlers.slice(0, removeIndex), ...clickHandlers.slice(removeIndex + 1)]
      return state
        .set('bodyClickHandlers', nextHandlers)

    case constants.HELP_TOPIC:
      return state
        .set('help_topic', action.topic)

    case constants.SHOW_BUY_REDPINE:
      return state
        .set('show_buyRedPine', true)

    case constants.HIDE_BUY_REDPINE:
      return state
        .set('show_buyRedPine', false)

    case constants.SHOW_NAVJUMP:
      return state
        .set('show_navJump', true)

    case constants.HIDE_NAVJUMP:
      return state
        .set('show_navJump', false)

    case constants.SET_SPOTIFY_CONNECTION:
      return state
        .set('spotify', action.spotify)

    case constants.USERS_LOADED:
      return state
        .set('all_users', action.users)
        
    case constants.CITIES_LOADED:
      return state
        .set('all_cities', action.cities)
        
    case constants.VENUE_CITIES_LOADED:
      return state
        .set('venue_cities', action.cities)
        
    case constants.ACT_CITIES_LOADED:
      return state
        .set('act_cities', action.cities)

    case constants.PROVINCES_LOADED:
      return state
        .set('all_provinces', action.provinces)

    case constants.COUNTRIES_LOADED:
      return state
        .set('all_countries', action.countries)

    case constants.GENRES_LOADED:
      return state
        .set('all_genres', action.genres)

    default:
      return state
  }
}

export default reducer