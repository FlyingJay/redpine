import { fromJS } from 'immutable'
import { helpers } from 'globals'
import constants from './constants'
import { RP_User } from 'Models'

export const initialState = fromJS({
	users: [],
	unread: [],
	conversation: [],
	conversations: [],
	default_user: null,

	users_loading: false,
	unread_loading: false,
	conversation_loading: false,
	conversations_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  	case constants.USERS_LOADING:
      return state
        .set('users_loading', true)

  	case constants.UNREAD_LOADING:
      return state
        .set('unread_loading', true)
  	
  	case constants.CONVERSATION_LOADING:
      return state
        .set('conversation_loading', true)
  	
  	case constants.CONVERSATIONS_LOADING:
      return state
        .set('conversations_loading', true)

  	case constants.USERS_LOADED:
  		const _Users = (action.users || []).map(user => RP_User(user))
      return state
        .set('users', helpers.pictures_first(_Users))
        .set('users_loading', false)

  	case constants.USER_LOADED:
      return state
        .set('default_user', action.user)

  	case constants.UNREAD_LOADED:
      return state
        .set('unread', action.messages)
        .set('unread_loading', false)

  	case constants.CONVERSATION_LOADED:
      return state
        .set('conversation', action.messages)
        .set('conversation_loading', false)

  	case constants.CONVERSATIONS_LOADED:
      return state
        .set('conversations', action.users)
        .set('conversations_loading', false)
    default:
      return state
  }
}

export default reducer