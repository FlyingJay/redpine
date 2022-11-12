import SpotifyWebApi from 'spotify-web-api-node'
import { replace, push } from 'react-router-redux'

import constants from './constants'
import { paths, tawk } from 'globals'
import { errorMessage } from 'Components/errors'

const actions = {
  setUser(user) {
    if(user){
      if (window.Raven) Raven.setUserContext({
        id: user.id,
        email: user.email,
        username: user.username
      })
    }

    return {
      type: constants.SET_USER,
      user
    }
  },

  logout(redirect=true) {
    return (dispatch, getState, api) => {
      const done = () => {
        if (window.Raven) Raven.setUserContext()
          if (redirect){
            dispatch(push(paths.login()))
          }
      }
      dispatch(actions.setAuth(false))
      dispatch(actions.setUser(null))
      api.logOut().then(done, done)
    }
  },  

  sessionExpired() {
    return (dispatch, getState, api) => {
      dispatch(actions.setAuth(false))
      dispatch(actions.setUser(null))
      dispatch(push(paths.login()))
    }
  },

  redirectToLogin() {
    return (dispatch, getState, api) => {
      const link = window.location.pathname + window.location.search
      dispatch(actions.setRedirect(link))
      dispatch(replace(paths.login()))
    }
  },

  redirectToSettings(){
    return (dispatch, getState, api) => {
      const link = window.location.pathname + window.location.search
      dispatch(actions.setRedirect(link))
      dispatch(replace(paths.settings()))
    }
  },

  forbidAuth(redirect) {
    return (dispatch, getState, api) => {
      if (redirect) {
        dispatch(replace(redirect))
      } else {
        dispatch(replace(paths.home()))
      }
    }
  },

  refreshCache: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadUsers())
      dispatch(actions.loadCities())
      dispatch(actions.loadProvinces())
      dispatch(actions.loadCountries())
      dispatch(actions.loadGenres())
    }
  },

  loadUsers: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.users.query({
          expand:'profile',
          ordering:'first_name,last_name',
          page_size: 10000
        }).then((res) => {
          dispatch(actions.usersLoaded(res.results))
        })
      })
    }
  },

  loadCities: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.cities.query({
          province__country: 0,
          ordering: 'name',
          expand: 'province,province.country'
        }).then((res) => {
          dispatch(actions.citiesLoaded(res.results))
        })
        api.cities.with_venues({
          ordering: 'name',
          expand: 'province,province.country'
        }).then((res) => {
          dispatch(actions.venueCitiesLoaded(res.results))
        })
        api.cities.with_bands({
          ordering: 'name',
          expand: 'province,province.country'
        }).then((res) => {
          dispatch(actions.actCitiesLoaded(res.results))
        })
      })
    }
  },

  loadProvinces: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.provinces.query({
          country: 0, 
          ordering: 'name',
          expand: 'country'
        }).then((res) => {
          dispatch(actions.provincesLoaded(res.results))
        })
      })
    }
  },
        
  loadCountries: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.countries.query({ordering: 'name'}).then((res) => {
          dispatch(actions.countriesLoaded(res.results))
        })
      })
    }
  },

  loadGenres: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.genres.query({ordering: 'name'}).then((res) => {
          dispatch(actions.genresLoaded(res.results))
        })
      })
    }
  },
        
  usersLoaded(users) {
    return {
      type: constants.USERS_LOADED,
      users
    }
  },     
        
  citiesLoaded(cities) {
    return {
      type: constants.CITIES_LOADED,
      cities
    }
  },   
        
  venueCitiesLoaded(cities) {
    return {
      type: constants.VENUE_CITIES_LOADED,
      cities
    }
  },     
        
  actCitiesLoaded(cities) {
    return {
      type: constants.ACT_CITIES_LOADED,
      cities
    }
  },     
        
  provincesLoaded(provinces) {
    return {
      type: constants.PROVINCES_LOADED,
      provinces
    }
  },          

  countriesLoaded(countries) {
    return {
      type: constants.COUNTRIES_LOADED,
      countries
    }
  },        

  genresLoaded(genres) {
    return {
      type: constants.GENRES_LOADED,
      genres
    }
  },

  getUser() {
    return (dispatch, getState, api) => {
      dispatch(actions.userLoading())
      api.me.query({
        expand:'profile'
      }).then((user) => {
        if(user.profile || window.location.pathname == '/venue-listings'){
          dispatch(actions.setUser(user))
        }else{
          dispatch(actions.logout())
        }
      })
    }
  },
        
  userLoading() {
    return {
      type: constants.USER_LOADING
    }
  }, 

  setSettings(settings) {
    return {
      type: constants.SET_SETTINGS,
      settings
    }
  },

  init() {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        if (api.token) {
          dispatch(actions.getUser())
        }
      })
      api.globalSettings.query().then(res => {
        dispatch(actions.setSettings(res.results ? res.results[0] : null))
      })
    }
  },

  success_message(text) {
    return actions.sendNotification('positive','check',text)
  },

  error_message(text) {
    return actions.sendNotification('negative','times',text)
  },

  sendNotification(notifType,notifIcon,notifText) {
    return {
      type: constants.SEND_NOTIFICATION,
      notifType, // "positive" or "negative"
      notifIcon, // any font-awesome icon slug (without the 'fa-' prefix)
      notifText  // text to be displayed
    }
  },

  setAuth(authenticated) {
    return {
      type: constants.SET_AUTH,
      authenticated
    }
  },

  setRedirect(redirect) {
    return {
      type: constants.SET_REDIRECT,
      redirect
    }
  },

  clearNotification() {
    return {
      type: constants.CLEAR_NOTIFICATION
    }
  },

  addBodyClickHandler(handler) {
    return {
      type: constants.ADD_BODY_CLICK_HANDLER,
      handler
    }
  },

  removeBodyClickHandler(handler) {
    return {
      type: constants.REMOVE_BODY_CLICK_HANDLER,
      handler
    }
  },

  showHelp(topic) {
    return {
      type: constants.HELP_TOPIC,
      topic
    }
  },

  showBuyRedPine() {
    return {
      type: constants.SHOW_BUY_REDPINE
    }
  },

  hideBuyRedPine() {
    return {
      type: constants.HIDE_BUY_REDPINE
    }
  },

  showNavJump() {
    return {
      type: constants.SHOW_NAVJUMP
    }
  },

  hideNavJump() {
    return {
      type: constants.HIDE_NAVJUMP
    }
  },

  loadSpotify: () => {
    const code = (new URL(window.location.href)).searchParams.get("code")
    const data = { 
      code: code,
      redirect_uri: paths.baseURL() + paths.myActs() 
    }
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.spotifyConnection.create(data).then((connection) => {

          const spotifyApi = new SpotifyWebApi()
          spotifyApi.setAccessToken(connection.access_token)

          if (connection.client_id) { 
            spotifyApi.setClientId(connection.client_id) 
          } 
          else {
            spotifyApi.getMe().then(data => {
              dispatch(actions.updateSpotify(connection.id,{client_id:data.body.id}))
            }).catch(err => {
              dispatch(errorMessage(err))
            })
          }
          dispatch(actions.setSpotifyConnection(spotifyApi))

        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  updateSpotify: (id,data) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.spotifyConnection.update(id,data).then((connection) => {
          const spotifyApi = new SpotifyWebApi()
          spotifyApi.setAccessToken(connection.access_token)
          spotifyApi.setClientId(connection.client_id) 
          dispatch(actions.setSpotifyConnection(spotifyApi))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  setSpotifyConnection(spotify) {
    return {
      type: constants.SET_SPOTIFY_CONNECTION,
      spotify
    }
  },

  tutorialEventCompleted: (user, events) => {
    const profile = Object.assign({}, user ? user.profile : {}, events, {picture:undefined,birthdate:undefined})
    const updated_user = Object.assign({}, user, {profile})

    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.me.create(updated_user).then((user) => {
          dispatch(actions.setUser(user))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  setSpotifyConnection(spotify) {
    return {
      type: constants.SET_SPOTIFY_CONNECTION,
      spotify
    }
  },
}

export default actions
