import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectUnread: (state, props) => {
    return c(state, props).get('unread')
  },
  selectConversation: (state, props) => {
    return c(state, props).get('conversation')
  },
  selectConversations: (state, props) => {
    return c(state, props).get('conversations')
  },
  selectDefaultUser: (state, props) => {
    return c(state, props).get('default_user')
  },
  selectUsers: (state, props) => {
    return c(state, props).get('users')
  },
  selectUsersLoading: (state, props) => {
    return c(state, props).get('users_loading')
  },
  selectUnreadLoading: (state, props) => {
    return c(state, props).get('unread_loading')
  },
  selectConversationLoading: (state, props) => {
    return c(state, props).get('conversation_loading')
  },
  selectConversationsLoading: (state, props) => {
    return c(state, props).get('conversations_loading')
  }
}

export default selectors