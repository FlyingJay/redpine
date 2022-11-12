import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import { path } from 'globals'
import { NOTIFICATION_TYPE } from 'enums' 

import { App } from 'Containers'

import { RP_RED, RP_BLUE, RP_GREEN, RP_BLACK, RP_SUPER_LIGHT, RP_DARKGREY } from 'Components' // GLOBALS
import { Modal } from 'Components' // MODAL & MODALOTHERS
import { Link } from 'Components' // LINK

import actions from './actions'
import selectors from './selectors'


export class Notifications extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      date: null
    }

    this.loadData()
  }

  render() {
    const notifications = this.props.notifications || []
    const has_notifications = notifications.length > 0

    return <App requireAuth>
            <Modal show onClose={() => this.props.history.goBack()}>
              <Heading>Notifications</Heading>
              <Actions>
                <Link onClick={() => this.props.readAll()} style={{marginRight:'2vmin'}}><i className="fa fa-envelope-open-o"/>&nbsp;Read All</Link>
                <Link onClick={() => this.props.deleteAll()} style={{marginRight:'2vmin'}}><i className="fa fa-times"/>&nbsp;Delete All</Link>
              </Actions>
              <Scroll>
                { has_notifications
                  ? notifications.map(notification => {
                      return <NotificationWrap key={notification.id} onClick={() => notification.is_read ? null : this.props.read(notification)}>
                              { notification.link
                                ? <Link href={notification.link}>
                                    {{ 0: <Notification icon="fa-info" color={RP_BLUE} text={notification.text} is_read={notification.is_read} thin/>,
                                       1: <Notification icon="fa-flag" color={RP_RED} text={notification.text} is_read={notification.is_read}/>,
                                       2: <Notification icon="fa-home" color={RP_GREEN} text={notification.text} is_read={notification.is_read}/>,
                                       3: <Notification icon="fa-play" color={RP_GREEN} text={notification.text} is_read={notification.is_read}/>,
                                       4: <Notification icon="fa-ticket" color={RP_GREEN} text={notification.text} is_read={notification.is_read}/>
                                    }[notification.subject_type]}
                                    <Timestamp>{moment.utc(notification.created_date).local().format('MMMM DD h:mm A')}</Timestamp>
                                  </Link>
                                : <div>
                                    {{ 0: <Notification icon="fa-info" color={RP_BLUE} text={notification.text} is_read={notification.is_read} thin/>,
                                       1: <Notification icon="fa-flag" color={RP_RED} text={notification.text} is_read={notification.is_read}/>,
                                       2: <Notification icon="fa-home" color={RP_GREEN} text={notification.text} is_read={notification.is_read}/>,
                                       3: <Notification icon="fa-play" color={RP_GREEN} text={notification.text} is_read={notification.is_read}/>,
                                       4: <Notification icon="fa-ticket" color={RP_GREEN} text={notification.text} is_read={notification.is_read}/>
                                    }[notification.subject_type]}
                                    <Timestamp>{moment.utc(notification.created_date).local().format('MMMM DD h:mm A')}</Timestamp>
                                  </div> }
                             </NotificationWrap>
                    })
                  : <NoNotifications>
                      You don't have any notifications.
                    </NoNotifications> }
              </Scroll>
            </Modal>
           </App>
  }

  loadData(){
    this.props.getNotifications()
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    notifications: selectors.selectNotifications(state,props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => {
      dispatch(actions.getNotifications())
    },
    read: (notification) => {
      dispatch(actions.readNotification(notification.id))
    },
    readAll: () => {
      dispatch(actions.readAllNotifications())
    },
    deleteAll: () => {
      dispatch(actions.deleteAllNotifications())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

const Notification = ({icon,color,text,thin,is_read}) => (
  <Text is_read={is_read}>
    <Icon className={`fa ${icon}`} color={color} thin={thin}/>
    &nbsp;&nbsp;&nbsp;{text}
  </Text>
)
const Scroll = styled.div`
  display: block;
  position: relative;
  overflow-y: auto;
  width: 40vw;
  margin: 0 auto;
  height: 70%;

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
const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: lighter;
  padding: 50px 0 5vmin 0;
`
const NotificationWrap = styled.div`
  display: block;
  margin: 0 auto;
  padding: 1vmin 2vmin;

  &:hover {
    cursor: pointer;
    border-top: 1px solid ${RP_SUPER_LIGHT};
    border-bottom: 1px solid ${RP_SUPER_LIGHT};
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
  text-align: right;
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
const NoNotifications = styled.div`
  text-align: center;
  font-size: 2vmin;
`
const Actions = styled.div`
  display: block;
  text-align: right;
  margin: 0 auto;
  margin-bottom: 1vmin;
  padding: 0 30vw 2vmin 0;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
`