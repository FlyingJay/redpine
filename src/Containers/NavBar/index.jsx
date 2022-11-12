import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'
import { HELP_TOPIC } from 'enums'

import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { HelpLink } from 'Containers'

import { RP_FONT, RP_GREEN, RP_BLACK, RP_WHITE, RP_SUPER_LIGHT, RP_RED, RP_GREY, RP_DARK_GREY, RP_PINK, CleanLink, LogoRed, LogoWhite } from 'Components' // GLOBALS
import { SexyButton, NavBarUserButton, BaseButton, FormButton } from 'Components' // BUTTON
import { LoadingIndicator } from 'Components'
import { NavBarUserPic } from 'Components' // IMAGE
import { Link } from 'Components' // LINK
import { Badge } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class NavBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showRightBarMenu: false,
      logoHover: false,
      showDropdown: false
    }
    this.closeHandler = this.closeDropdown.bind(this)
  }

  render() {    
    return (
      <BaseNavigation>
        <InternalWrapper>
          <LogoWrapper href={paths.home()}>
            <NavBarLogo />
          </LogoWrapper>
          { this.props.user 
            ? this.buildLoggedInHeader() 
            : this.buildLoggedOutHeader() }
        </InternalWrapper>
      </BaseNavigation>
    )
  }
  
  buildLoggedInHeader() {
    const profile = this.props.user.profile || {}
    const account_balance = profile && parseFloat(profile.account_balance).toFixed(2) || '0.00'

    return (
      [
        <NavDesktopWrapper data-test-key="logged-in-nav" key="desktop-navbarwrap-in">
          <LoadingIndicator loading={this.props.user_loading} height="5vmin">
            <SpecialAction hover={RP_GREEN} data-test-key="addvenue-btn-desktop" href={paths.info()}>
              How does it work?
            </SpecialAction>
            {/* profile.is_venue
              ? <HelpLink topic={HELP_TOPIC.CREATE_VENUE} inline>
                  <SpecialAction hover={RP_GREEN} data-test-key="addvenue-btn-desktop" href={paths.venueCreate()}>
                    <i className="fa fa-home"></i>&nbsp;&nbsp;
                    List a Venue
                  </SpecialAction>
                </HelpLink>
              : null }
            { profile.is_artist
              ? <HelpLink topic={HELP_TOPIC.PLAY_SHOW} inline>
                  <SpecialAction hover={RP_GREEN} data-test-key="addcampaign-btn-desktop" href={paths.showCreate()}>
                    <i className="fa fa-flag"></i>&nbsp;&nbsp;
                    Book A Venue
                  </SpecialAction>
                </HelpLink>
              : null }
            { profile.is_artist
              ? <HelpLink topic={HELP_TOPIC.SELL_TICKETS} inline>
                  <SpecialAction hover={RP_GREEN} href={paths.sellTickets()}>
                    <i className="fa fa-ticket"></i>&nbsp;&nbsp;
                    Sell Tickets
                  </SpecialAction>
                </HelpLink>
              : null */}
            <FormButton style={{boxShadow:'0 2px 6px 0 rgba(0,0,0,0.17)',fontWeight:'bold'}}
              background={RP_RED} hoverBackground={RP_GREEN} onClick={() => this.props.showNavJump()}>START&nbsp;&nbsp;<i className="fa fa-plane"/></FormButton>
            <SpecialAction href={paths.notifications()} style={{fontSize:'2.5vmin'}}>
              <Badge 
                count={this.props.unread_notifications_count}
                fontSize="1.5vmin"
                shift={{top:'5px',right:'15px'}}/>
              <i className="fa fa-bell-o"></i>
            </SpecialAction>
            <SpecialAction href={paths.messages()} style={{fontSize:'2.5vmin'}}>
              <Badge 
                count={this.props.unread_messages_count}
                fontSize="1.5vmin"
                shift={{top:'5px',right:'15px'}}/>
              <i className="fa fa-envelope-o"></i>
            </SpecialAction>
            {/*USE BARS INSTEAD OF IMAGE 
            <NavBarUserPic 
              height="5vmin" 
              width="5vmin" 
              style={{cursor: 'pointer', marginLeft: '2vmin'}}
              pic={this.props.user.profile ? this.props.user.profile.picture : ""}
              onClick={() => this.toggleDropdown()} />
            */}
            <SpecialAction onClick={() => this.toggleDropdown()} style={{fontSize:'2.5vmin'}}>
            { this.state.showDropdown
              ? <i className="fa fa-bars" style={{color:RP_RED}}/>
              : <i className="fa fa-bars"/>}
            </SpecialAction>
          </LoadingIndicator>

          {/* NAVIGATION DROP DOWN MENU */}
          <NavBarDropdown show={this.state.showDropdown}>
              
            <NavHowToCloseDropDown style={{cursor: 'default', background: RP_SUPER_LIGHT, borderBottom: '1px solid #DDD', borderRadius: '0.75vmin 0.75vmin 0 0'}}>
              <NavBarUserPic height="7vmin" width="7vmin" pic={this.props.user.profile ? this.props.user.profile.picture : ""} radius="0.75vmin" style={{marginLeft: '0'}}/>
              <NavUserInfo style={{width: '20vmin', paddingLeft: '1vmin'}}>
                <NavUserNameName style={{display: 'block', width: 'auto', fontSize: '2.2vmin', fontWeight: '500'}}>{this.props.user.first_name}</NavUserNameName>
                <NavUserName style={{display: 'block', width: 'auto', fontSize: '2vmin', fontWeight: '100'}}>
                  { (profile.is_artist && profile.is_venue)
                    ? "Artist & Venue"
                    : profile.is_artist
                      ? "Artist"
                      : profile.is_venue
                        ? "Venue"
                        : "Fan" }
                </NavUserName>
                <HelpLink topic={HELP_TOPIC.REQUEST_PAYOUT} shift={{top:-17,right:-13}} fontSize="2vmin">
                  <Link href={paths.settings()}>
                    <NavAccountBalance>${account_balance}</NavAccountBalance>
                  </Link>
                </HelpLink>
              </NavUserInfo>
            </NavHowToCloseDropDown>
            { profile.is_artist && profile.is_venue
              ? <NavBarDropdownItem image="/Assets/images/apps/organizations.png" title="Organizations" href={paths.myOrganizations()} main bottomBorder/> 
              : null }
            { profile.is_venue
              ? <NavBarDropdownItem data-test-key="venues-btn-desktop" image="/Assets/images/apps/venues.png" title="My Venues" href={paths.myVenues()} main bottomBorder/> 
              : null }
            { profile.is_artist
              ? <NavBarDropdownItem data-test-key="bands-btn-desktop" image="/Assets/images/apps/acts.png" title="My Acts" href={paths.myActs()} main/>
              : null }
            { profile.is_artist
              ? <NavBarDropdownItem data-test-key="shows-btn-desktop" image="/Assets/images/apps/shows.png" title="My Shows" href={paths.myShows()} main bottomBorder/>
              : null }
            <NavBarDropdownItem image="/Assets/images/apps/promotion.png" title="Promotion" href={paths.promotion()} main/> 
            <NavBarDropdownItem data-test-key="tickets-btn-desktop" image="/Assets/images/apps/tickets.png" title="Tickets" href={paths.tickets()} main bottomBorder/>
            { profile.is_artist || profile.is_venue
              ? <NavBarDropdownItem image="/Assets/images/apps/reviews.png" title="Reviews" href={paths.reviews()} help_topic={HELP_TOPIC.REVIEWS} main bottomBorder/> 
              : null }
            {/*REMOVED WITH CROWDFUNDING
              <NavBarDropdownItem data-test-key="pledges-btn-desktop" image="/Assets/images/apps/pledges.png" title="Pledges" href={paths.pledges()} main/>
            */}
            {/*FAQ HIDDEN
              <NavBarDropdownItem data-test-key="faq-btn-desktop-in" image="/Assets/images/apps/help.png" title="Help" href={paths.help()} main/>  
            */}
            <NavBarDropdownItem data-test-key="settings-btn-desktop" image="/Assets/images/apps/settings.png" title="Settings" href={paths.settings()} main/>
            <NavBarDropdownItem data-test-key="logout-btn-desktop" iconClass="fa fa-power-off" title="Logout" onClick={() => this.props.logout()} main/>
          </NavBarDropdown>
        </NavDesktopWrapper>
        ,
        <NavMoboWrapper key="mobile-navbarwrap-in">
          <LoadingIndicator loading={this.props.user_loading} height="15vmin">
            {/* NAVIGATION RIGHT BAR BUTTON */ }
            <NotificationsMobile href={paths.notifications()}>
              <Badge 
                count={this.props.unread_notifications_count}
                fontSize="3vmin"
                shift={{top:'10px',right:'24vmin'}}/>
              <i className="fa fa-bell-o"></i>
            </NotificationsMobile>

            <NotificationsMobile href={paths.messages()}>
              <Badge 
                count={this.props.unread_messages_count}
                fontSize="3vmin"
                shift={{top:'10px',right:'12vmin'}}/>
              <i className="fa fa-envelope-o"></i>
            </NotificationsMobile>

            <NavBarUserButtonMobile onClick={() => this.updateState({showRightBarMenu: true})}>
              <i className="fa fa-bars" style={{color: RP_BLACK,fontSize:'8vmin',paddingTop:'2vmin'}}/>
            </NavBarUserButtonMobile>
          </LoadingIndicator>

          {/* NAVIGATION RIGHT BAR MENU */}
          <NavRightBarModal show={this.state.showRightBarMenu} onClick={() => this.updateState({showRightBarMenu: false})}>
            <NavRightBarMenu>
              <NavHowToCloseDropDown>
                <NavBarUserPic height="9vmin" width="9vmin" pic={this.props.user.profile ? this.props.user.profile.picture : ""} radius="0.75vmin"/>
                <NavUserInfo>
                  <NavUserNameName>{this.props.user.first_name}</NavUserNameName>
                  <NavUserName>
                    { (profile.is_artist && profile.is_venue)
                      ? "Artist & Venue"
                      : profile.is_artist
                        ? "Artist"
                        : profile.is_venue
                          ? "Venue"
                          : "Fan" }
                  </NavUserName>
                  <HelpLink topic={HELP_TOPIC.REQUEST_PAYOUT} shift={{top:-20,right:-10}} fontSize="2.5vmin">
                    <Link href={paths.settings()}>
                      <NavAccountBalance style={{fontSize:'2.5vmin'}}>${account_balance}</NavAccountBalance>
                    </Link>
                  </HelpLink>
                </NavUserInfo>
              </NavHowToCloseDropDown>
              <Start onClick={() => this.props.showNavJump()}>START&nbsp;&nbsp;<i className="fa fa-plane"/></Start>
              { profile.is_artist
                ? <NavBarDropdownItem mobile title="My Acts" image="/Assets/images/apps/acts.png" data-test-key="bands-btn-mobile" href={paths.myActs()}/>
                : null }
              { profile.is_artist
                ? <NavBarDropdownItem mobile title="My Shows" image="/Assets/images/apps/shows.png" data-test-key="shows-btn-mobile" href={paths.myShows()} bottomBorder/>
                : null }
              { profile.is_artist && profile.is_venue
                ? <NavBarDropdownItem mobile title="Organizations" image="/Assets/images/apps/organizations.png" href={paths.myOrganizations()} main bottomBorder/> 
                : null }
              { profile.is_venue
                ? <NavBarDropdownItem mobile title="My Venues" image="/Assets/images/apps/venues.png" data-test-key="venues-btn-mobile" href={paths.myVenues()} bottomBorder={profile.is_artist}/>
                : null }
              <NavBarDropdownItem mobile title="Promotion" image="/Assets/images/apps/promotion.png" href={paths.promotion()} main/> 
              <NavBarDropdownItem mobile title="Tickets" image="/Assets/images/apps/tickets.png" data-test-key="tickets-btn-mobile" href={paths.tickets()} bottomBorder/>
              { profile.is_artist || profile.is_venue
                ? <NavBarDropdownItem mobile title="Reviews" image="/Assets/images/apps/reviews.png" href={paths.reviews()} help_topic={HELP_TOPIC.REVIEWS} bottomBorder/> 
                : null }
              {/*REMOVED WITH CROWDFUNDING
                <NavBarDropdownItem mobile title="Pledges" image="/Assets/images/apps/pledges.png" data-test-key="pledges-btn-mobile" href={paths.pledges()}/>
              */}
              {/*FAQ HIDDEN
                <NavBarDropdownItem mobile title="Help" image="/Assets/images/apps/help.png" data-test-key="faq-btn-desktop-in" href={paths.help()}/>                
              */}
              <NavBarDropdownItem mobile title="Settings" image="/Assets/images/apps/settings.png" data-test-key="settings-btn-mobile" href={paths.settings()} />
              <NavBarDropdownItem mobile title="Logout" data-test-key="logout-btn-mobile" iconClass="fa fa-power-off" onClick={() => this.props.logout()} radius="0 0 0.75vmin 0.75vmin;"/>
            </NavRightBarMenu>
          </NavRightBarModal>
        </NavMoboWrapper>
      ]
    )
  }

  buildLoggedOutHeader() {
    return (
      [ <NavDesktopWrapper data-test-key="logged-out-nav" key="desktop-navbarwrap-out">
          <SpecialAction hover={RP_GREEN} data-test-key="addvenue-btn-desktop" href={paths.info()}>
            How does it work?
          </SpecialAction>
          <FormButton style={{boxShadow:'0 2px 6px 0 rgba(0,0,0,0.17)',fontWeight:'bold'}}
            onClick={() => this.props.showNavJump()} background={RP_RED} hoverBackground={RP_GREEN}>START&nbsp;&nbsp;<i className="fa fa-plane"/></FormButton>
          <NormalNavOpt href={paths.register()} data-test-key="signup-btn-desktop">Signup</NormalNavOpt>
          <NormalNavOpt href={paths.login()} data-test-key="login-btn-desktop">Login</NormalNavOpt>
        </NavDesktopWrapper>,
        <NavMoboWrapper key="mobile-navbarwrap-out">
          <NavBarUserButtonMobile onClick={() => this.updateState({showRightBarMenu: true})}>
            <NavBarUsername>
              <i className="fa fa-bars" style={{color: RP_BLACK,fontSize:'8vmin',paddingTop:'2vmin'}}/>
            </NavBarUsername>
          </NavBarUserButtonMobile>
          {/* NAVIGATION RIGHT BAR MENU */}
          <NavRightBarModal show={this.state.showRightBarMenu} onClick={() => this.updateState({showRightBarMenu: false})}>
            <NavRightBarMenu>
              <NavHowToCloseDropDown>&nbsp;</NavHowToCloseDropDown>
              <Start onClick={() => this.props.showNavJump()}>START&nbsp;&nbsp;<i className="fa fa-plane"/></Start>
              <NavBarDropdownItem mobile data-test-key="login-btn-mobile" title="Login" href={paths.login()}/>
              <NavBarDropdownItem mobile data-test-key="signup-btn-mobile" title="Signup" href={paths.register()} />
              <NavBarDropdownItem mobile data-test-key="privacy-btn-mobile" title="Privacy Policy" href={paths.privacyPolicy()} />
              <NavBarDropdownItem mobile data-test-key="terms-btn-mobile" title="Terms of Use" href={paths.termsOfUse()} />
            </NavRightBarMenu>
          </NavRightBarModal>
        </NavMoboWrapper>
      ]
    )
  }

  openDropdown() {
    this.updateState({showDropdown: true})
    this.props.addBodyClickHandler(this.closeHandler)
  }

  closeDropdown() {
    this.updateState({showDropdown: false})
    this.props.removeBodyClickHandler(this.closeHandler)
  }

  toggleDropdown() {
    if (this.state.showDropdown) {
      this.closeDropdown()
    } else {
      this.openDropdown()
    }
  }

  componentDidMount() {
    this.props.getNotificationsCount()
    this.props.getMessagesCount()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    unread_notifications_count: selectors.selectUnreadNotificationsCount(state),
    unread_messages_count: selectors.selectUnreadMessagesCount(state),
    loggedIn: appSelectors.selectAuthenticated(state),
    user: appSelectors.selectUser(state),
    user_loading: appSelectors.selectUserLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationsCount: () => {
      dispatch(actions.getNotificationsCount())
    },
    getMessagesCount: () => {
      dispatch(actions.getMessagesCount())
    },
    logout: () => {
      dispatch(appActions.logout())
    },
    showNavJump: () => {
      dispatch(appActions.showNavJump())
    },
    addBodyClickHandler: (handler) => {
      dispatch(appActions.addBodyClickHandler(handler))
    },
    removeBodyClickHandler: (handler) => {
      dispatch(appActions.removeBodyClickHandler(handler))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

class NavBarDropdownItem extends React.PureComponent {
  render() {
    const inner = (
      <NavBarDropdownLI radius={this.props.radius} bottomBorder={this.props.bottomBorder} main={this.props.main}>
        { this.props.iconClass 
          ? <i className={this.props.iconClass} style={{marginLeft:'0.75vmin'}} /> 
          : this.props.image
            ? <ImageIcon src={this.props.image} logo={this.props.logo}/>
            : null }
        { this.props.title }
      </NavBarDropdownLI>
    )

    const has_help_link = (this.props.help_topic != null)
    const shift = {right:20,top: this.props.mobile ? -15 : 5}

    return this.props.href
           ? has_help_link
             ? <HelpLink topic={this.props.help_topic} shift={shift} block>
                 <Link data-test-key={this.props['data-test-key']} href={this.props.href}>{inner}</Link>
               </HelpLink>
             : <Link data-test-key={this.props['data-test-key']} href={this.props.href}>{inner}</Link>
           : has_help_link
             ? <HelpLink topic={this.props.help_topic} shift={shift} block>
                 <div data-test-key={this.props['data-test-key']} onClick={() => this.props.onClick()}>{inner}</div>
               </HelpLink>
             : <div data-test-key={this.props['data-test-key']} onClick={() => this.props.onClick()}>{inner}</div>
  }
}
const BaseNavigation = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100vw;
  height: auto;
  background: #FFF;
  font-family: ${RP_FONT};
  text-align: right;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.17);
`
const InternalWrapper = styled.div`
  display: block;
  position: relative;
  width: 80vw;
  margin: 0 calc(10vw - 2vmin) 0 10vw;
`
const NavBarLogo = styled.div`
  display: block;
  vertical-align: top;
  position: relative;
  width: 4vmin;
  height: 4vmin;
  background: url('/Assets/images/logo/sq1.png');
  background-size: 4vmin;
  border-radius: 0.5vmin;
  transition: all 0.13s ease;

  @media (max-width: 768px) and (orientation: portrait) { 
    width: 8vmin;
    height: 8vmin;
    background-size: 8vmin;
    margin-top: 1vmin;
  }
`
const NavBarUsername = styled.span`
  line-height: normal;
  outline: none;
`
const NavBarDropdown = styled.ul`
  display: ${(props) => props.show ? 'block' : 'none'};
  position: absolute;
  top: 7vmin;
  right: 0;
  padding: 0;
  margin: 0;
  list-style: none;

  border: 1px solid #f1f1f1;
  background-color: rgb(255, 255, 255);
  transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 0.75vmin;
`
const NavRightBarModal = styled.div`
  display: ${(props) => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: rgba(0,0,0,0.4);
`
const NavRightBarMenu = styled.ul`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 0;
  margin: 0;
  background: #FFF;
  border-left: 1px solid rgb(233,233,233);
  box-shadow: -3px 0px 50px -2px rgba(0,0,0,0.14);
  list-style: none;
`
const NavHowToCloseDropDown = styled.li`
  display: block;
  position: relative;
  width: auto;
  cursor: pointer;
  text-align: right;
  margin: 0;
  padding: 1vmin 3vmin 1vmin 1vmin;
  background: #FFF;
  color: ${RP_DARK_GREY};
  font-size: 2vmin;
  vertical-align: top;
  line-height: normal;

  @media (max-width: 768px) and (orientation: portrait) { 
    width: 100%;
    padding: 5vmin 3vmin 3vmin 3vmin;
    background: ${RP_SUPER_LIGHT};
    color: ${RP_BLACK};
    text-align: left;
  }  
`
const NavUserInfo = styled.div`
  display: inline-block;
  position: relative;
  width: 30vmin;
  text-align: left;
  margin: 0;
  padding: 0 0 0 3vmin;
  font-size: 3vmin;
  vertical-align: top;
  line-height: normal;
`
const NavUserNameName = styled.div`
  display: inline-block;
  position: relative;
  width: 30vmin;
  text-align: left;
  margin: 0;
  font-size: 3vmin;
  vertical-align: middle;
  line-height: normal;
`
const NavUserName = styled.div`
  display: inline-block;
  position: relative;
  width: 30vmin;
  text-align: left;
  margin: 0;
  font-size: 3vmin;
  vertical-align: top;
  line-height: normal;
`
const NavAccountBalance = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2vmin;
`
const NavBarDropdownLI = styled.li`
  cursor: pointer;
  margin: 0;
  width: auto;
  min-width: 25vmin;
  padding: 1vmin 2vmin !important;
  background: #FFF;
  color: ${RP_DARK_GREY};
  font-family: ${RP_FONT};
  font-size: 2.25vmin;
  font-weight: normal;
  text-align: left;
  line-height:  ${props => props.main ? '5vmin' : '3vmin'};
  border-bottom: ${(props) => props.bottomBorder ? '1px solid #DDD' : 'none'};

  i {
    padding-right: 2vmin;
  }

  &:hover{
    background: ${RP_SUPER_LIGHT};
    color: ${RP_RED};
  }

  @media (max-width: 768px) and (orientation: portrait) { 
    padding: 2vmin 4vmin !important;
    background: #FFF;
    color: ${RP_BLACK};
    font-size: 3vmin;
    line-height: 5vmin;

    i {
      width: 3vmin;
      padding-right: 3vmin;
    }
  }
`
const NormalNavOpt = styled(Link)`
  vertical-align: top;
  background: inherit;
  color: ${RP_DARK_GREY};
  line-height: 5vmin;
  padding: 1.5vmin 3vmin;
  font-size: 2vmin;
  
  &:hover {
    background: ${RP_WHITE};
    color: ${props => props.hover || RP_RED};
  }

  @media (max-width: 768px) and (orientation: portrait) { 
    color: ${RP_DARK_GREY};
  }

  @media (min-width: 769px) and (max-width: 1024px) { 
    color: ${RP_DARK_GREY};
  }
`
const SexyNavOpt = styled(Link)`
  vertical-align: top;
  background: inherit;
  color: ${RP_DARK_GREY};
  line-height: 5vmin;
  padding: 1.5vmin 3vmin;
  font-size: 1.6vmin;
  
  &:hover{
    background: ${RP_WHITE};
    color: ${RP_RED};
  }

  @media (max-width: 768px) and (orientation: portrait) { 
    color: ${RP_WHITE};
  }

  @media (min-width: 769px) and (max-width: 1024px) { 
    color: ${RP_WHITE};
  }
`
const SpecialAction = styled(Link)`
  position: relative;
  vertical-align: top;
  background: inherit;
  color: ${RP_DARK_GREY};
  line-height: normal;
  border-radius: 0.25vmin;
  line-height: 5vmin;
  padding: 1.5vmin 3vmin;
  font-size: 2vmin;
  
  &:hover {
    background: #FFF;
    color: ${props => props.hover || RP_RED};
  }

  @media (max-width: 768px) and (orientation: portrait) { 
    color: ${RP_DARK_GREY};
  }

  @media (min-width: 769px) and (max-width: 1024px) { 
    color: ${RP_DARK_GREY};
  }
`
const StylelessLink = styled.a`
  text-decoration: none;
`
const LogoWrapper = styled(Link)`
  cursor: pointer;
  display: block;
  position: absolute;
  left: 0;
  top: 2vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
    top: 2vmin;
  }
`
const NavDesktopWrapper = styled.div`
  padding: 1.5vmin 0;
  line-height: 4.9vmin;
  display: inline-block;
  margin-left: 4.9vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
    display: none;
  }
`
const NavMoboWrapper = styled.div`
  display: none;
  line-height: 15vmin;
  text-align: left;
  margin-left: 5vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
    display: inline-block;
  }
`
const NavBarUserButtonMobile = styled(BaseButton)`
  vertical-align: top;
  background: ${props => props.background || 'transparent' };
  color: ${RP_GREY};
  font-size: 1.6vmin;
  transition: 0.5s ease;
  highlight: none;

  padding: 0.75vmin 1vmin;
  line-height: 11vmin;
`
const NotificationsMobile = styled(Link)`
  display: inline-block;
  vertical-align: top;
  background: transparent;
  color: ${RP_GREY};
  font-size: 6vmin;
  transition: 0.5s ease;
  highlight: none;

  padding: 1.25vmin 4vmin;
  line-height: 11vmin;
`
const HoverRed = styled.i`
  color: ${RP_PINK};

  &:hover {
    color: ${RP_RED};
  }
`
const ImageIcon = styled.img`
  display: inline-block;
  position: relative; 
  width: 4vmin;
  height: 4vmin;
  vertical-align: middle;
  margin-right: 2vmin;

  border-radius: ${props => props.logo ? '0.5vmin' : '0'};
`
const Start = styled.div`
  width: 100%;
  background: ${props => props.color || RP_RED};
  color: #FFF;
  padding: 0.25vmin 0;
  text-align: center;
  font-size: 3vmin;
  font-weight: bold;
  transition: 0.25s all ease;
  line-height: 8vmin;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.17);

  &:hover {
    background: ${RP_GREEN};
    cursor: pointer;
  }
`