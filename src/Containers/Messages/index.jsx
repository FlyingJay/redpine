import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import { path, getQueryParams } from 'globals'
import { NOTIFICATION_TYPE } from 'enums' 

import { RP_User } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { Bold, RP_FONT, RP_PINK, RP_RED, RP_BLUE, RP_GREEN, RP_BLACK, RP_SUPER_LIGHT, RP_DARKGREY, RP_DARK_GREY, FormNotice } from 'Components' // GLOBALS
import { Modal, SearchModal, ModalHeading, ModalSubheading } from 'Components' // MODAL & MODALOTHERS
import { LoadingIndicator } from 'Components' 
import { Badge } from 'Components' 
import { Link } from 'Components' 

import { CommentBox } from './CommentBox/index.jsx'
import { UserResult } from './UserResult/index.jsx'

import actions from './actions'
import selectors from './selectors'


export class Messages extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      category: 'unread',
      showSearchModal: false,
      title: 'Unread Messages',
      query: '',

      recipient: null
    }

    this.loadData()
  }

  render() {
    const user = this.props.user
    const _User = RP_User(user)

    const users = this.props.users || []

    const unread = this.props.unread
    const unread_loading = this.props.unread_loading
    const unread_count = unread.length
    const has_unread = unread_count > 0

    const conversations = this.props.conversations
    const conversations_loading = this.props.conversations_loading
    const has_conversations = conversations.length > 0

    const conversation = this.props.conversation
    const conversation_loading = this.props.conversation_loading
    const has_conversation = conversation.length > 0

    const recipient = conversation[0] && (conversation[0].sender === _User.id 
                                          ? conversation[0].recipient 
                                          : conversation[0].sender)

    const title = this.state.title 
                  ? this.state.title 
                  : this.state.category === "conversation" && conversation[0] 
                    ? this.getUser(conversation[0].sender).full_name 
                    : 'Messages'


    return <App requireAuth>
            <Modal show onClose={() => this.props.history.goBack()}>
              <Heading>{this.state.title}</Heading>
              <Actions>
                <div>
                  <Link onClick={() => this.switchToCompose()} style={{marginRight:'2vmin'}}><i className="fa fa-pencil"/>&nbsp;Compose</Link>
                  <Link onClick={() => this.switchToConversations()} style={{marginRight:'2vmin'}}><i className="fa fa-users"/>&nbsp;Conversations</Link>
                  <Link onClick={() => this.switchToUnread()} style={{marginRight:'2vmin'}}>
                    <i className="fa fa-envelope-o"/>&nbsp;Unread
                    <Badge count={unread_count} fontSize="1.75vmin"/>
                  </Link>
                </div>
              </Actions>

              { this.state.category === "compose"
                ? <TextboxWrap style={{paddingTop:'2vmin'}}>
                    <ModalHeading>
                      To:&nbsp;
                      { this.state.recipient ? RP_User(this.state.recipient).full_name : '' }
                    </ModalHeading>
                    { this.state.recipient 
                      ? <Link onClick={() => this.updateState({recipient:null})}><i className="fa fa-undo"/>&nbsp;&nbsp;Clear</Link>
                      : <form onSubmit={(e) => {
                          e.preventDefault()
                          this.showSearch()
                        }}>
                          <UserSearch 
                            onChange={(e) => this.updateState({query: e.target.value})}
                            placeholder="Search RedPine users.." />
                          <SearchButton onClick={() => this.showSearch()}><i className="fa fa-search"/></SearchButton>
                          <SearchModal show={this.state.showSearchModal} onClose={() => this.updateState({showSearchModal: false})} ESCLettering="NONE">
                            <Results>
                              <LoadingIndicator loading={this.props.users_loading}>
                                { users.length > 0
                                  ? users.map((user) => <UserResult key={user.id} user={user} onSelectUser={(user) => this.updateState({recipient:user,title:RP_User(user).full_name})}/> )
                                  : <NoResults>No users were found. Try a different phrase...</NoResults> }
                              </LoadingIndicator>
                            </Results>
                          </SearchModal>
                        </form> }
                  </TextboxWrap>
                : null }

              <Scroll visible={this.state.category == "unread"}>
                <LoadingIndicator loading={unread_loading}>
                  { has_unread
                    ? unread.map((message,i) => {
                        return <MessageWrap onClick={() => this.getConversation(message.sender)} key={message.id} is_read={!message.unread} right_align={_User.id == message.sender}>
                                { message.unread
                                  ? <span>{this.getUser(message.sender).full_name} - <Bold>{message.content}</Bold></span>
                                  : message.content }
                                <Timestamp>{moment.utc(message.sent_at).local().format('MMM DD h:mm A')}</Timestamp>
                               </MessageWrap>
                        })
                    : <NoMessages>
                        You don't have any unread messages.
                      </NoMessages> }
                </LoadingIndicator>
              </Scroll>

              <Scroll visible={this.state.category == "conversations"}>
                <LoadingIndicator loading={conversations_loading}>
                  { has_conversations
                    ? conversations.map((user,i) => <MessageWrap key={user.id} i={i} onClick={() => this.getConversation(user.id)}>{`${user.first_name} ${user.last_name}`}</MessageWrap>)
                    : <NoMessages>
                        You don't have any conversations. Send a message!
                      </NoMessages> }
                </LoadingIndicator>
              </Scroll>

              <Scroll visible={this.state.category == "conversation"} comment_box>
                <LoadingIndicator loading={conversation_loading}>
                  { has_conversation
                    ? conversation.map((message,i) => {
                        return <MessageWrap onClick={() => message.unread ? this.props.read(message,this.state.category) : null} key={message.id} is_read={!message.unread} right_align={_User.id == message.sender}>
                                { message.content }
                                <Timestamp>{moment.utc(message.sent_at).local().format('MMM DD h:mm A')}</Timestamp>
                               </MessageWrap> 
                        })
                    : <NoMessages>
                        You haven't sent any messages. Send one!
                      </NoMessages> }
                </LoadingIndicator>
              </Scroll>
              { this.state.category === "conversation"
                ? <TextboxWrap><CommentBox sendMessage={(text) => this.props.send(recipient,text)} error={this.props.error}/></TextboxWrap>
                : null }
              { this.state.category === "compose"
                ? <TextboxWrap><CommentBox sendMessage={(text) => this.sendNew(text)} error={this.props.error}/></TextboxWrap>
                : null }
            </Modal>
           </App>
  }

  sendNew(text){
    const _User = RP_User(this.state.recipient)
    this.props.send(_User.id,text)
    this.props.getConversations()
    this.updateState({category:"conversation",recipient:null,showSearchModal:false})
  }

  showSearch() {
    if (this.state.act_query === '') return

    this.updateState({showSearchModal: true})
    this.props.searchUsers(this.state.query)
  }

  getUser(user){
    const convo_users = this.props.conversations
    if(!convo_users) return RP_User()
    if(convo_users.length == 0) return RP_User()

    return RP_User(convo_users.find(convo_user => convo_user.id === user))
  }

  loadData(){
    this.props.getConversations()
    this.props.getUnread()
    this.props.searchUsers('')
  }

  switchToCompose(){
    this.updateState({category:'compose',title:'Compose'})
  }

  switchToUnread(){
    this.props.getUnread()
    this.updateState({category:'unread',title:'Unread Messages'})
  }

  switchToConversations(){
    this.props.getConversations()
    this.updateState({category:'conversations',title:'Conversations'})
  }

  getConversation(user){
    this.props.getConversation(user)
    this.updateState({category:'conversation',title:this.getUser(user).full_name})
  }

  componentDidMount() {
    const params = getQueryParams()
    let recipient = params.recipient ? params.recipient : null
    if(recipient){
      this.props.getUser(recipient)
    }
    let conversation_user = params.chat ? params.chat : null
    if(conversation_user){
      this.updateState({category:'conversation'})
      this.props.getUser(conversation_user)
    }
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.default_user && !this.props.default_user) || (nextProps.default_user !== this.props.default_user)){
      const _User = RP_User(nextProps.default_user)

      if(this.state.category == 'conversation'){
        this.props.getConversation(_User.id)
        this.updateState({title:_User.full_name})
      }else{
        this.updateState({
          category:'compose',
          recipient:nextProps.default_user,
          title:_User.full_name
        })
      }
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state,props),
    users: selectors.selectUsers(state,props),
    unread: selectors.selectUnread(state,props),
    conversation: selectors.selectConversation(state,props),
    conversations: selectors.selectConversations(state,props),
    default_user: selectors.selectDefaultUser(state,props),
    users_loading: selectors.selectUsersLoading(state,props),
    unread_loading: selectors.selectUnreadLoading(state,props),
    conversation_loading: selectors.selectConversationLoading(state,props),
    conversations_loading: selectors.selectConversationsLoading(state,props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(actions.getUser(id))
    },
    searchUsers: (query) => {
      dispatch(actions.searchUsers(query))
    },
    getUnread: () => {
      dispatch(actions.getUnread())
    },
    read: (message,category) => {
      dispatch(actions.readMessage(message,category))
    },
    getConversations: () => {
      dispatch(actions.getConversations())
    },
    getConversation: (recipient) => {
      dispatch(actions.getConversation(recipient))
    },
    send: (recipient,text) => {
      dispatch(actions.sendMessage(recipient,text))
    },
    error: (text) => {
      dispatch(appActions.success_message(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)


const Scroll = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  position: relative;
  overflow-y: auto;
  width: 40vw;
  margin: 0 auto;
  margin-top: 4vmin;
  height: ${props => props.comment_box ? '40%' : '70%'};

  @media (max-width: 768px) { 
    width: 90vw;
  }

  @media (min-width: 768px) and (max-width: 1366px) { 
    width: 70vw;
  }

  &::-webkit-scrollbar {
    cursor: pointer;
    width: 1.5vmin;
  }

  &::-webkit-scrollbar-track {
    background: ${RP_SUPER_LIGHT};
    border-radius:5vmin;
  }

  &::-webkit-scrollbar-thumb {
    background: ${RP_DARKGREY};
    border-radius:5vmin;
  }

  &::-webkit-scrollbar-thumb:hover {}
`
const TextboxWrap = styled.div`
  width: 40vw;
  margin: 0 auto;

  @media (max-width: 768px) { 
    width: 90vw;
  }

  @media (min-width: 768px) and (max-width: 1366px) { 
    width: 70vw;
  }
`
const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: lighter;
  padding: 50px 0 5vmin 0;
`
const MessageWrap = styled.div`
  display: block;
  margin: 0 auto;
  padding: 1vmin 2vmin;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
  text-align: ${props => props.right_align ? 'right' : 'left'};
  font-weight: ${props => props.is_read ? 'normal' : 'bold'};

  &:hover {
    cursor: pointer;
    background: ${RP_SUPER_LIGHT};
  }

  @media (max-width: 768px) { 
    font-size: 2.5vmin;
  }

  @media (min-width: 768px) and (max-width: 1366px) { 
    font-size: 2.5vmin;
  }
`
const Text = styled.div`
  font-size: 2vmin;
  line-height: 3vmin;
  color: ${RP_BLACK};
  font-weight: ${props => props.is_read ? 'normal' : 'bold'};
`
const Icon = styled.i`
  font-size: 3vmin;
  color: ${props => props.color || RP_BLUE};
  padding: ${props => props.thin ? '0 8px 0 8px' : '0'};
`
const Timestamp = styled.div`
  font-size: 1.5vmin;
  padding-top: 1vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
    font-size: 2vmin;
  }

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    font-size: 2vmin;
  }

  @media (min-width: 769px) and (max-width: 1366px) and (orientation: landscape) { 
    font-size: 2vmin;
  }
`
const NoMessages = styled.div`
  text-align: center;
  font-size: 2vmin;
`
const Actions = styled.div`
  display: block;
  position: relative;
  text-align: right;
  margin: 0 auto;
  margin-bottom: 1vmin;
  margin-right: 28vw;
  padding: 0 0.5vmin 2vmin 0;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
`
const Results = styled.div`
  padding: 0 3vmin 0 3vmin;
  margin: 0 -3vmin;

  width: CALC(33vw - 6vmin);
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {cursor: pointer;width: 1vmin;}
  &::-webkit-scrollbar-track {background: ${RP_SUPER_LIGHT};border-radius:3px;}
  &::-webkit-scrollbar-thumb {background: ${RP_DARKGREY};border-radius:3px;}
  &::-webkit-scrollbar-thumb:hover {}

  @media (max-width: 767px) and (orientation: portrait) { 
    width: CALC(50vw - 6vmin + 11vmin + 17vmin + 2px);
    max-height: 500px;
    max-width: 500px;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: CALC(40vw - 6.2vmin + 11vmin + 17vmin + 2px);
    max-height: 600px;
    max-width: 600px;
  }
`
const NoResults = styled(FormNotice)`
  display: block;
  padding: 1vmin;
  margin-bottom: 1vmin;
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 400;
`
const UserSearch = styled.input`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: calc(80% - 11vmin);
  max-width: 700px;
  padding: 2vmin 5vmin 2vmin 6vmin;
  border-radius: 0.3vmin;
  background: #FFF url(/Assets/images/image-input/search.png) no-repeat;
  background-position: 2vmin center;
  background-size: 3vmin;
  margin: 0 auto;
  border: none;
  outline: none;
  color: ${RP_BLACK};
  transition: all 0.25s ease;
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 1.8vmin;
  font-weight: 400;
  outline: none;

  &:hover {
    color: ${RP_BLACK};
    border-color: #FFF;
  }

  &:focus {
    color: ${RP_BLACK};
    border-color: #FFF;
    background: #FFF url(/Assets/images/image-input/search-focus.png) no-repeat;
    background-position: 2vmin center;
    background-size: 3vmin;
  }
`
const SearchButton = styled.div`
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: calc(20% - 4vmin);
  padding: 2vmin 2vmin;
  margin: 0 auto;
  border-radius: 0 0.5vmin 0.5vmin 0;
  background: ${RP_RED};
  color: #FFF;
  text-align: center;
  transition: all 0.25s ease;
  font-size: 1.8vmin;
  font-weight: 400;

  &:hover {
    background: ${RP_PINK};
  }
`