import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
	getUnread: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.unreadLoading())
      api.ready.then(() => {
        api.messages.unread().then((res) => {
          dispatch(actions.unreadLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
	},

  getConversation: (recipient) => {
    return (dispatch, getState, api) => {
      dispatch(actions.conversationLoading())
      api.ready.then(() => {
        api.messages.conversation(0,{'recipient':recipient,'mark_read':1}).then((res) => {
          dispatch(actions.conversationLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  getConversations: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.conversationsLoading())
      api.ready.then(() => {
        api.messages.conversations().then((res) => {
          dispatch(actions.conversationsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  sendMessage: (recipient,text) => {
    return (dispatch, getState, api) => {
      api.messages.send(0,{'recipient':recipient,'text':text}).then((res) => {
        dispatch(actions.getConversation(recipient))
      })
    }
  },

  readMessage: (message,category='unread') => {
    return (dispatch, getState, api) => {
      api.messages.read(message.id).then((res) => {
        if(category === 'unread'){
          dispatch(actions.getUnread())
        }else{
          dispatch(actions.getConversation(message.sender))
        }
      })
    }
  },

  searchUsers: (query) => {
    return (dispatch, getState, api) => {
      dispatch(actions.usersLoading())
      api.ready.then(() => {
        api.users.query({
          name:query,
          profile__is_artist:true,
          expand:'profile',
          ordering:'first_name,last_name'
        }).then((res) => {
          dispatch(actions.usersLoaded(res.results))
        })
      })
    }
  },

  getUser: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.users.get(id,{expand:'profile'}).then((user) => {
          dispatch(actions.userLoaded(user))
        })
      })
    }
  },

  /* Not today
  readAllMessages: () => {
    return (dispatch, getState, api) => {
      api.messages.read_all().then((res) => {
        dispatch(actions.getMessages())
      })
    }
  }, 

  deleteAllMessages: (id) => {
    return (dispatch, getState, api) => {
      api.messages.delete_all().then((res) => {
        dispatch(actions.getMessages())
      })
    }
  }, */

  userLoaded: (user) => {
    return {
      type: constants.USER_LOADED,
      user
    }
  },

  usersLoaded: (users) => {
    return {
      type: constants.USERS_LOADED,
      users
    }
  },

  usersLoading: () => {
    return {
      type: constants.USERS_LOADING
    }
  },

  unreadLoaded: (messages) => {
    return {
      type: constants.UNREAD_LOADED,
      messages
    }
  },

  conversationLoaded: (messages) => {
    return {
      type: constants.CONVERSATION_LOADED,
      messages
    }
  },

  conversationsLoaded: (users) => {
    return {
      type: constants.CONVERSATIONS_LOADED,
      users
    }
  },

  conversationsLoading: () => {
    return { type: constants.CONVERSATIONS_LOADING }
  },

  conversationLoading: () => {
    return { type: constants.CONVERSATION_LOADING }
  },

  unreadLoading: () => {
    return { type: constants.UNREAD_LOADING }
  }
}


export default actions