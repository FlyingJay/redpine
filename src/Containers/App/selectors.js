import constants from './constants'


const selectApp = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectAuthenticated(state, props) {
    return selectApp(state, props).get('authenticated')
  },
  selectUser(state, props) {
    return selectApp(state, props).get('user')
  },
  selectUserLoading(state, props) {
    return selectApp(state, props).get('user_loading')
  },
  selectSettings(state, props) {
    return selectApp(state, props).get('settings')
  },
  selectSpotify(state, props) {
    return selectApp(state, props).get('spotify')
  },
  selectRedirect(state, props) {
    return selectApp(state, props).get('redirect')
  },
  selectNoficationType(state, props) {
    return selectApp(state, props).get('notificationType')
  },
  selectNoficationIcon(state, props) {
    return selectApp(state, props).get('notificationIcon')
  },
  selectNoficationText(state, props) {
    return selectApp(state, props).get('notificationText')
  },
  selectNoficationVisible(state, props) {
    return selectApp(state, props).get('notificationVisible')
  },
  selectBodyClickHandlers(state, props) {
    return selectApp(state, props).get('bodyClickHandlers')
  },
  selectHelpTopic(state, props) {
    return selectApp(state, props).get('help_topic')
  },
  selectShowBuyRedPine(state, props) {
    return selectApp(state, props).get('show_buyRedPine')
  },
  selectShowNavJump(state, props) {
    return selectApp(state, props).get('show_navJump')
  },
  selectUsers(state, props) {
    return selectApp(state, props).get('all_users')
  },
  selectCities(state, props) {
    return selectApp(state, props).get('all_cities')
  },
  selectVenueCities(state, props) {
    return selectApp(state, props).get('venue_cities')
  },
  selectActCities(state, props) {
    return selectApp(state, props).get('act_cities')
  },
  selectProvinces(state, props) {
    return selectApp(state, props).get('all_provinces')
  },
  selectCountries(state, props) {
    return selectApp(state, props).get('all_countries')
  },
  selectGenres(state, props) {
    return selectApp(state, props).get('all_genres')
  }
}

export default selectors