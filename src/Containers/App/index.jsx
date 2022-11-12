import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { NavBar, NavJump, Tutorial, Help, BuyRedPine } from 'Containers'
import { Footer, Notification, Button } from 'Components' // BUTTON, FOOTER, NOTIFICATION

import { LockOrientation } from './LockOrientation/index.jsx'

import actions from './actions'
import selectors from './selectors'


class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tutorial_hidden: true
    }

    this.props.init()
    window.addEventListener('error', this.handleError.bind(this))
  }

  render() {
    return (
      this.props.no_ui
      ? <div style={{display:'relative',position:'absolute',top:0,left:0,width:'100%'}} onClick={(event) => this.handleClick(event)}>
          {this.props.children}
          <Notification
            notifType={this.props.notifType}
            notifIcon={this.props.notifIcon}
            notifText={this.props.notifText}
            visible={this.props.notifVisible}
            clearNotification={this.props.clearNotification}/>
        </div>
      : <div style={{display:'relative',position:'absolute',top:0,left:0,width:'100%'}} onClick={(event) => this.handleClick(event)}>
          <LockOrientation {...this.props}>
            <div>
              <Top>
                <NavBar/>
                { this.props.show_navJump 
                  ? <NavJump user={this.props.user}/>
                  : null }
                <Tutorial is_hidden={this.state.tutorial_hidden} toggle={(is_hidden) => this.updateState({tutorial_hidden:is_hidden})}/>
              </Top>
              <Main>
                <Help topic={this.props.help_topic}/>

                <Notification
                  notifType={this.props.notifType}
                  notifIcon={this.props.notifIcon}
                  notifText={this.props.notifText}
                  visible={this.props.notifVisible}
                  clearNotification={this.props.clearNotification}/>

                { this.props.show_buyRedPine
                  ? <BuyRedPine user={this.props.user} is_modal/>
                  : null }

                {this.props.children}
              </Main>
              <Footer authenticated={this.props.authenticated}/>
            </div>
          </LockOrientation>
        </div>
    )
  }

  handleClick(event) {
    this.props.bodyClickHandlers.forEach((handler, i) => handler(event))
  }

  handleError(message, file, line, column, errorObject) {
    this.props.onError()
    return false
  }

  requireAuth(props) {
    if (props.authenticated === false) {
      props.redirectToLogin()
    }
  }

  forbidAuth(props) {
    if (props.authenticated === true) {
      props.enforceForbidAuth(props.redirect)
    }
  }

  artistPage(props) {
    const user = props.user
    const profile = user && user.profile || null
    if (user){
      if (profile){
        if (!profile.is_artist){
          props.redirectToSettings()
        }
      }
    }
  }

  venuePage(props){
    const user = props.user
    const profile = user && user.profile || null
    if (user){
      if (profile){
        if (!profile.is_venue){
          props.redirectToSettings()
        }
      }
    }
  }

  checkAuth(nextProps) {
    if (nextProps.requireAuth !== undefined) {this.requireAuth(nextProps)}
    if (nextProps.forbidAuth !== undefined) {this.forbidAuth(nextProps)}
    if (nextProps.artistPage !== undefined) {this.artistPage(nextProps)}
    if (nextProps.venuePage !== undefined) {this.venuePage(nextProps)}
  }

  componentDidMount() {
    this.checkAuth(this.props)
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    authenticated: selectors.selectAuthenticated(state, props),
    user: selectors.selectUser(state, props),
    redirect: selectors.selectRedirect(state, props),
    notifType: selectors.selectNoficationType(state,props),
    notifIcon: selectors.selectNoficationIcon(state,props),
    notifText: selectors.selectNoficationText(state,props),
    notifVisible: selectors.selectNoficationVisible(state,props),
    bodyClickHandlers: selectors.selectBodyClickHandlers(state, props),
    help_topic: selectors.selectHelpTopic(state, props),
    show_navJump: selectors.selectShowNavJump(state, props),
    show_buyRedPine: selectors.selectShowBuyRedPine(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout(redirect=true) {
      return dispatch(actions.logout(redirect))
    },
    redirectToLogin() {
      return dispatch(actions.redirectToLogin())
    },
    redirectToSettings() {
     dispatch(actions.sendNotification('negative','','Oops… you were trying to access a page for a different account type. If needed you can change your account type below.'))
     return dispatch(actions.redirectToSettings())
   },
    enforceForbidAuth(redirect) {
      return dispatch(actions.forbidAuth(redirect))
    },
    init() {
      return dispatch(actions.init())
    },
    onError() {
      return dispatch(actions.sendNotification('negative', 'times', 'Woops, something went wrong!  We\'ve notified our developers.  If you continue to have trouble, please get in touch with us!'))
    },
    clearNotification() {
      dispatch(actions.clearNotification())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

const Top = styled.div`
  position: relative;
`
const Main = styled.div`
  height: auto;
  width: 100%;
  padding-top: 8vmin;

  @media (max-width: 767px) and (orientation: portrait) {
    padding-top: 15vmin;
  }
`