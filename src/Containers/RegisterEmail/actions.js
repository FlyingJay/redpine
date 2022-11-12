import { replace, push } from 'react-router-redux'
import { paths, analytics } from 'globals'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
  submitRegistration: (params,redirect) => {
    return (dispatch, getState, api) => {
      const is_act_show_invite = params.token || false
      api.register.create(params).then((res) => {
        dispatch(actions.registrationSuccess())

        analytics.userSignup()

        api.logIn(params.email, params.password).then((res) => {
          dispatch(appActions.setAuth(true))

          //CREATE AN ACT IF THE USER ENTERED A NAME
          if(params.act){
            const band = {
              name: params.act,
              short_bio: params.act + ' hasn\'t added a bio yet.',
              genres: (params.genres || []).map(genre => genre.id),
              hometown: params.hometown,
              is_redpine: true,
              owner: api.user
            }
            Object.assign(band, params.facebook && { facebook: params.facebook },
                                 params.twitter && { twitter: params.twitter },
                               params.instagram && { instagram: params.instagram },
                                 params.youtube && { youtube: params.youtube },
                                 params.spotify && { spotify: params.spotify },
                              params.soundcloud && { soundcloud: params.soundcloud },
                                params.bandcamp && { bandcamp: params.bandcamp },
                                 params.website && { website: params.website }
            )

            api.bands.create(band).then(band => {
              actions.redirect(dispatch,redirect,params.is_artist,params.is_venue,is_act_show_invite)
            }).catch((err) => {
              dispatch(errorMessage(err))
            })
          }else{
            actions.redirect(dispatch,redirect,params.is_artist,params.is_venue,is_act_show_invite)
          }
        }).catch((err) => {
          dispatch(push(paths.login()))
        })
      }).catch((err) => {
        dispatch(actions.registrationFailure(err))
      })
    }
  },

  redirect: (dispatch,redirect,is_artist,is_venue,is_act_show_invite) => {
    //REDIRECT, BASED ON ACCOUNT TYPE
    if (redirect) {
      dispatch(push(redirect))
    }
    else if (is_act_show_invite) {
      dispatch(push(paths.myShows()))
    }
    else if (is_artist) {
      dispatch(push(paths.infoBooking()))
    }
    else if (is_venue) {
      dispatch(push(paths.venueCreate()))
    }
    else {
      dispatch(push(paths.home()))
    }
  },

  registrationSuccess: () => {
    return {
      type: constants.REGISTRATION_SUCCESS
    }
  },

  registrationFailure: (error) => {
    return {
      type: constants.REGISTRATION_FAILURE,
      error
    }
  }
}

export default actions