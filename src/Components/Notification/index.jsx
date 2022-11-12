import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_DARKGREY, RP_DDD } from 'Components' // GLOBALS

// COLORS
const NOTIF_INEU = '#D9EDF7'
const NOTIF_IPOS = '#DFF0D8'
const NOTIF_INEG = '#F2DEDE'

const NOTIF_TNEU = '#3A87AD'
const NOTIF_TPOS = '#468847'
const NOTIF_TNEG = '#B94A48'

const NOTIF_BNEU = '#BCE8F1'
const NOTIF_BPOS = '#D6E9C6'
const NOTIF_BNEG = '#EED3D7'


export class Notification extends React.PureComponent {
  constructor(props) {
    super(props)
    this.timer = this.iniTimer.bind(this);
  }

  render() {
    return (
      this.props.sectional 
      ? (
        this.props.notifType == 'positive'
        ? this.buildPositiveNotice(this.props.notifIcon, this.props.notifText, (e) => this.props.clearNotification())
        :
          this.props.notifType == 'negative'
          ? this.buildNegativeNotice(this.props.notifIcon, this.props.notifText, (e) => this.props.clearNotification())
          : this.buildNeutralNotice(this.props.notifIcon, this.props.notifText, (e) => this.props.clearNotification())
      )
      : (
        <NotificationWrapper visible={this.props.visible} onClick={(e) => this.props.clearNotification()}>
          <i className="fa fa-minus-square"></i>
          {
            this.props.notifType == 'positive'
            ? this.buildPositiveNotif(this.props.notifIcon, this.props.notifText, (e) => this.props.clearNotification())
            :
              this.props.notifType == 'negative'
              ? this.buildNegativeNotif(this.props.notifIcon, this.props.notifText, (e) => this.props.clearNotification())
              : this.buildNeutralNotif(this.props.notifIcon, this.props.notifText, (e) => this.props.clearNotification())
          }
        </NotificationWrapper>
      )
    );
  }

  buildPositiveNotif(icon, text) {
    return (
      <GlobalPositiveNotification>
        <div className="internal">
          <i className={"fa fa-info"}/>
        </div>
        <span>{text}</span>
      </GlobalPositiveNotification>
    )
  }

  buildNegativeNotif(icon, text) {
    return (
      <GlobalNegativeNotification>
        <div className="internal">
          <i className={"fa fa-info"}/>
        </div>
        <span>{text}</span>
      </GlobalNegativeNotification>
    )
  }

  buildNeutralNotif(icon, text) {
    return (
      <GlobalNeutralNotification>
        <div className="internal">
          <i className={"fa fa-info"}/>
        </div>
        <span>{text}</span>
      </GlobalNeutralNotification>
    )
  }

  buildPositiveNotice(icon, text) {
    return (
      <SectionalPositiveNotice>
        <div className="internal">
          <i className={"fa fa-" + icon}/>
        </div>
        <span>{text}</span>
      </SectionalPositiveNotice>
    )
  }

  buildNegativeNotice(icon, text) {
    return (
      <SectionalNegativeNotice>
        <div className="internal">
          <i className={"fa fa-" + icon}/>
        </div>
        <span>{text}</span>
      </SectionalNegativeNotice>
    )
  }

  buildNeutralNotice(icon, text) {
    return (
      <SectionalNeutralNotice>
        <div className="internal">
          <i className={"fa fa-" + icon}/>
        </div>
        <span>{text}</span>
      </SectionalNeutralNotice>
    )
  }

  iniTimer() {
    if (this.props.visible) {
      this.props.clearNotification();
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(this.timer, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notifIcon !== nextProps.notifIcon) {
      clearTimeout(this.timeout);
      if (nextProps.notifType == 'negative'){
        this.timeout = setTimeout(this.timer, 8000);
      }else{
        this.timeout = setTimeout(this.timer, 4000);
      }
    }
    return true;
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

export default Notification


const NotificationWrapper = styled.div`
  z-index: 99999999999;
  cursor: pointer;
  display: ${props => props.visible ? 'block' : 'none'};
  position: fixed;
  width: auto;
  height: auto;
  top: 20vmin;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.5vmin;

  .fa-minus-square {
    z-index: 99999999999;
    display: block;
    position: absolute;
    width: 2vmin;
    height: 2vmin;
    top: 1vmin;
    right: 1vmin;
    color: ${RP_DDD};
    font-size: 2vmin;
    transition: all 0.25s ease;

    &:hover {
      color: ${RP_BLACK};
    }
  }

  &:hover {
    .fa-minus-square {
      color: ${RP_DARKGREY};
    }

    b {
      text-decoration: underline;
    }
  }
`
const GlobalNotification = styled.div`
  display: block;
  position: relative;
  width: 60vmin;
  height: auto;
  background: ${RP_WHITE};
  font-size: 2vmin;
  border-radius: 3px;

  .internal {
    display: inline-block;
    position: absolute;
    width: 6vmin;
    height: auto;
    padding: 2vmin;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 8vmin;
    font-size: 3vmin;
    border-radius: 3px 0 0 3px;

    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
      top: 0px;
      bottom: 0px;
    }
  }

  i {
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 2vmin;
    height: 2vmin;
    padding: 0;
    margin: auto;
    color: inherit;
    font-size: 3vmin;
    line-height: 2vmin;
  }

  span {
    display: inline-block;
    position: relative;
    width: CALC(60vmin - 14vmin);
    padding: 2vmin;
    left: 10vmin;
    font-size: 1.8vmin;
    border-radius: 0;
  }

  b {
    display: inline-block;
    position: relative;
    width: 46vmin;
    padding: 0 2vmin 1vmin 2vmin;
    left: 10vmin;
    font-size: 1.7vmin;
    font-weight: bold;
    border-radius: 0;
    text-align: left;
  }
`
const GlobalPositiveNotification = styled(GlobalNotification)`
  border: 1px solid ${NOTIF_BPOS};
  .internal {
    background: ${NOTIF_IPOS};
    color: ${NOTIF_TPOS};
  }

  b {
    color: ${NOTIF_TPOS};
  }
`
const GlobalNegativeNotification = styled(GlobalNotification)`
  border: 1px solid ${NOTIF_BNEG};
  .internal {
    background: ${NOTIF_INEG};
    color: ${NOTIF_TNEG};
  }

  b {
    color: ${NOTIF_TNEG};
  }
`
const GlobalNeutralNotification = styled(GlobalNotification)`
  border: 1px solid ${NOTIF_BNEU};

  .internal {
    background: ${NOTIF_INEU};
    color: ${NOTIF_TNEU};
  }

  b {
    color: ${NOTIF_TNEU};
  }
`
const SectionalNotice = styled.div`
  display: block;
  position: relative;
  width: auto%;
  height: auto;
  background: ${RP_WHITE};
  margin-bottom: 3vmin;
  font-size: 2vmin;
  border-radius: 3px;

  .internal {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: 6vmin;
    height: auto;
    padding: 2vmin;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 8vmin;
    font-size: 3vmin;
    border-radius: 3px 0 0 3px;

    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
      top: 0px;
      bottom: 0px;
    }
  }

  i {
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 2vmin;
    height: 2vmin;
    padding: 0;
    margin: auto;
    color: inherit;
    font-size: 3vmin;
    line-height: 2vmin;
  }

  span {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: CALC(100% - 14vmin);
    padding: 2vmin;
    color: ${RP_BLACK};
    font-size: 1.8vmin;
    text-align: left;
    border-radius: 0;
  }

  b {
    display: inline-block;
    position: relative;
    width: 46vmin;
    padding: 0 2vmin 1vmin 2vmin;
    left: 10vmin;
    font-size: 1.7vmin;
    font-weight: bold;
    border-radius: 0;
    text-align: left;
  }
`
const SectionalPositiveNotice = styled(SectionalNotice)`
  background: ${NOTIF_IPOS};
  border: 1px solid ${NOTIF_BPOS};

  .internal {
    background: ${RP_WHITE};
    color: ${NOTIF_TPOS};
  }

  span {
    color: ${NOTIF_TPOS};
    font-weight: bold;
  }

  b {
    color: ${NOTIF_TPOS};
  }
`
const SectionalNegativeNotice = styled(SectionalNotice)`
  background: ${NOTIF_INEG};
  border: 1px solid ${NOTIF_BNEG};

  .internal {
    background: ${RP_WHITE};
    color: ${NOTIF_TNEG};
  }

  span {
    color: ${NOTIF_TNEG};
    font-weight: bold;
  }

  b {
    color: ${NOTIF_TNEG};
  }

`
const SectionalNeutralNotice = styled(SectionalNotice)`
  background: ${NOTIF_INEU};
  border: 1px solid ${NOTIF_BNEU};

  .internal {
    background: ${RP_WHITE};
    color: ${NOTIF_TNEU};
  }

  span {
    color: ${NOTIF_TNEU};
    font-weight: bold;
  }

  b {
    color: ${NOTIF_TNEU};
  }
`