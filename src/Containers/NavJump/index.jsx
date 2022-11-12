import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { RP_User } from 'Models'

import { paths } from 'globals'
import { RP_BLACK, RP_RED, RP_PINK, RP_GREEN, RP_BLUE, RP_DARKBLUE, RP_SUPER_LIGHT, SPOTIFY_GREEN, RP_ORANGE, RP_DARKORANGE, RP_SILVER, RP_GREY, RP_DARKGREY, RP_DARK_GREY, Bold } from 'Components'
import { Modal, SidePanel, ModalSection, ModalHeading, ModalSubheading } from 'Components' //MODAL
import { FormButton, ListTile } from 'Components' //BUTTON
import { LoadingIndicator } from 'Components'
import { TextBox } from 'Components'
import { FormSeparator } from 'Components'
import { Link } from 'Components'

import appActions from 'Containers/App/actions'

import selectors from './selectors'
import actions from './actions'


export class NavJump extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      deep_category: null,
      something_else: ''
    }
  }

  render() {
    const _User = RP_User(this.props.user)
    const is_organization = (_User.is_artist && _User.is_venue)
    const is_only_venue = (_User.is_venue && !_User.is_artist)

    return (
      <Modal show transparent onClose={(e) => this.props.hideNavJump()}>
        <SidePanel>
        {{[null]: <ModalSection top>
                    { _User.is_artist || !_User.profile
                      ? <ListTile thin left background={RP_RED} hoverBackground={RP_PINK} onClick={() => _User.is_venue ? this.updateState({deep_category:'ADD_SHOW'}) : this.props.playShow()}>
                          <i className="fa fa-calendar-plus-o"/>
                          <div>Book a Venue</div>
                          <br/>
                          <Subtitle>Find and book the perfect venue</Subtitle>
                        </ListTile>
                      : null }
                    { is_only_venue
                      ? <ListTile thin left background={RP_RED} hoverBackground={RP_PINK} onClick={() => this.updateState({deep_category:'ADD_SHOW'})}>
                          <i className="fa fa-ticket"/>
                          <div>Create Show</div>
                          <br/>
                          <Subtitle>Add a new or existing show</Subtitle>
                        </ListTile>
                      : null }
                    { _User.is_artist || !_User.profile
                      ? <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.sellTickets()}>
                          <i className="fa fa-ticket"/>
                          <div>Create Ticketing Page</div>
                          <br/>
                          <Subtitle>Create a ticketing page for your show</Subtitle>
                        </ListTile>
                      : null }
                    { _User.is_artist 
                      ? <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.myShows()}>
                          <i className="fa fa-calendar"/>
                          <div>My Shows</div>
                          <br/>
                          <Subtitle>Shows, pending bookings, and invitations</Subtitle>
                        </ListTile>
                      : null }
                    { is_only_venue
                      ? <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.myVenues()}>
                          <i className="fa fa-home"/>
                          <div>My Venues</div>
                          <br/>
                          <Subtitle>Edit details, manage your calendar, and respond to requests</Subtitle>
                        </ListTile>
                      : null }
                    {/* is_only_venue
                      ? <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.updateState({deep_category:'ADD_OPEN_MIC'})}>
                          <i className="fa fa-microphone"/>
                          <div>Create Open Mic</div>
                        </ListTile>
                      : null }
                    { _User.is_venue 
                      ? <ListTile thin left background={RP_ORANGE} hoverBackground={RP_DARKORANGE} onClick={() => this.updateState({deep_category:'ADD_GIG_OPPORTUNITY'})}>
                          <i className="fa fa-calendar"/>
                          <div>Create Paid Opportunity</div>
                        </ListTile>
                      : null */}

                    {/*
                    <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.updateState({deep_category:'PROMOTE'})}>
                      <i className="fa fa-star"/>
                      <div>Promote an Event</div>
                    </ListTile>
                    */}
                    {/*<ListTile thin left background={RP_SILVER} hoverBackground={RP_DARKGREY} onClick={() => this.updateState({deep_category:'SOMETHING_ELSE'})}>
                      <i className="fa fa-star"/>
                      <div>Something Else..</div>
                    </ListTile>*/}
                    {/*
                    <ListTile thin left background={RP_PINK} hoverBackground={RP_RED} onClick={() => this.props.search('shows')}>
                      <i className="fa fa-search"/>
                      <div>Shows</div>
                    </ListTile>
                    */}
                    <ListTile thin left background={RP_ORANGE} hoverBackground={RP_DARKORANGE} onClick={() => this.props.search('acts')}>
                      <i className="fa fa-search"/>
                      <div>Browse</div>
                      <br/>
                      <Subtitle>Find artists, venues, shows and open lineups</Subtitle>
                    </ListTile>
                    {/* !_User.is_venue || is_organization
                      ? <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.search('venues')}>
                          <i className="fa fa-search"/>
                          <div>Browse Venues</div>
                        </ListTile>
                      : null */}
                    {/*
                    <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.search('opportunities')}>
                      <i className="fa fa-search"/>
                      <div>Gig Opportunities</div>
                    </ListTile>
                    */}
                    {/* !_User.is_venue || is_organization
                      ? <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.search('open_shows')}>
                          <i className="fa fa-search"/>
                          <div>Browse Open Lineups</div>
                        </ListTile>
                      : null }
                    <ListTile thin left background={RP_ORANGE} hoverBackground={RP_DARKORANGE} onClick={() => this.props.search('shows')}>
                      <i className="fa fa-search"/>
                      <div>Browse Shows</div>
                    </ListTile>
                    {
                    <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.updateState({deep_category:'SUPPORTING_ACTS'})}>
                      <i className="fa fa-search"/>
                      <div>Supporting Acts</div>
                    </ListTile>
                    */}
                    <FormSeparator text="or"/>
                    <ListTile thin left background={RP_SILVER} hoverBackground={RP_DARKGREY} onClick={() => this.updateState({deep_category:'SOMETHING_ELSE'})}>
                      <i className="fa fa-star"/>
                      <div>Something Else..</div>
                    </ListTile>
                  </ModalSection>,
    ['ADD_SHOW']: <ModalSection top>
                    <ModalHeading>You may book a venue, or ticket your own event.</ModalHeading>
                    <ModalSubheading>&nbsp;</ModalSubheading>
                    <ListTile thin left background={RP_RED} hoverBackground={RP_PINK} onClick={() => this.props.playShow()}>
                      <i className="fa fa-home"/>
                      <div>Book a Venue</div>
                      <br/>
                      <Subtitle>Find and book the perfect venue</Subtitle>
                    </ListTile>
                    <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.sellTickets()}>
                      <i className="fa fa-ticket"/>
                      <div>Ticket an Event</div>
                      <br/>
                      <Subtitle>Create a ticketing page for your show</Subtitle>
                    </ListTile>
                    { _User.is_artist || _User.is_venue
                      ? <div>
                          <ModalSubheading>&nbsp;</ModalSubheading>
                          <ModalHeading>Acts, Organizations, and Venues may add shows from their calendars.</ModalHeading>            
                          <ModalSubheading>&nbsp;</ModalSubheading>
                        </div>
                        : null }
                    { _User.is_artist 
                      ? <ListTile thin left background={RP_RED} hoverBackground={RP_PINK} onClick={() => this.props.myActs()}>
                          <i className="fa fa-list"/>
                          <div>My Acts</div>
                        </ListTile>
                      : null }
                    { is_organization
                      ? <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.myOrganizations()}>
                          <i className="fa fa-list"/>
                          <div>My Organizations</div>
                        </ListTile>
                      : null }
                    { _User.is_venue 
                      ? <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.myVenues()}>
                          <i className="fa fa-list"/>
                          <div>My Venues</div>
                        </ListTile>
                      : null }
                  </ModalSection>, 
    ['ADD_OPEN_MIC']: <ModalSection top>
                    <ModalHeading>Venues may add Open Mic opportunities from their calendar.</ModalHeading>
                    <ModalSubheading>&nbsp;</ModalSubheading>
                    <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.myVenues()}>
                      <i className="fa fa-list"/>
                      <div>My Venues</div>
                    </ListTile>
                  </ModalSection>, 
['ADD_GIG_OPPORTUNITY']: <ModalSection top>
                    <ModalHeading>{_User.is_artist && _User.is_venue ? 'Organizations and ':''}Venues may post a Paid Opportunity from their calendar{_User.is_artist && _User.is_venue ? 's':''}.</ModalHeading>
                    <ModalSubheading>&nbsp;</ModalSubheading>
                    { is_organization
                      ? <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.myOrganizations()}>
                          <i className="fa fa-list"/>
                          <div>My Organizations</div>
                        </ListTile>
                      : null }
                    { _User.is_venue 
                      ? <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.myVenues()}>
                          <i className="fa fa-list"/>
                          <div>My Venues</div>
                        </ListTile>
                      : null }
                  </ModalSection>, 
['SUPPORTING_ACTS']: <ModalSection top>
                    <ModalHeading>You may add a show and open it to applicants, or search acts and message them yourself.</ModalHeading>
                    <ModalSubheading>&nbsp;</ModalSubheading>
                    <ListTile thin left background={RP_RED} hoverBackground={RP_PINK} onClick={() => this.updateState({deep_category:'ADD_SHOW'})}>
                      <i className="fa fa-plus"/>
                      <div>Add a Show</div>
                    </ListTile>
                    <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.search('acts')}>
                      <i className="fa fa-search"/>
                      <div>Search Acts</div>
                    </ListTile>
                  </ModalSection>,
     ['PROMOTE']: <ModalSection top>
                    <ModalHeading>Promote by offering a couple dollars per ticket to anyone who can sell. We'll post your offer.</ModalHeading>
                    <ModalSubheading>RedPine is not a promotion company, we provide tools.</ModalSubheading>
                    <ListTile thin left background={RP_RED} hoverBackground={RP_PINK} onClick={() => this.updateState({deep_category:'ADD_SHOW'})}>
                      <i className="fa fa-plus"/>
                      <div>Add a Show</div>
                    </ListTile>
                    <ListTile thin left background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.myShows()}>
                      <i className="fa fa-list"/>
                      <div>My Shows</div>
                    </ListTile>
                    <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.props.promotion()}>
                      <i className="fa fa-search"/>
                      <div>Search Offers</div>
                    </ListTile>
                  </ModalSection>,
['SOMETHING_ELSE']: <ModalSection top>
                    <ModalHeading>Couldn't find what you want?</ModalHeading>
                    <ModalSubheading>
                      Let us know what you were trying to add, find, or do, and we'll see how we can help!
                      <br/>
                      { !_User.user
                        ? <span>If you would like a response, you will need to <Link onClick={() => this.props.login()}>LOG IN</Link></span>
                        : null }
                    </ModalSubheading>
                    <TextBox value={this.state.something_else} onChange={(e) => this.updateState({something_else:e.target.value})} style={{resize:'vertical'}}/>
                    <div style={{textAlign:'right'}}>
                      <FormButton onClick={() => this.props.submitSomethingElse('none',this.state.something_else)} color="#FFF" background={RP_BLUE} hoverBackground={RP_DARKBLUE} bold>
                        <Bold>SUBMIT&nbsp;&nbsp;<i className="fa fa-envelope"/></Bold>
                      </FormButton>
                    </div>
                  </ModalSection>
          }[this.state.deep_category]}          

          { this.state.deep_category !== null
            ? <ModalSection style={{textAlign:'left'}}>
                <FormButton onClick={() => this.state.deep_category ? this.updateState({deep_category:null}) : this.updateState({category:null})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT} bold>
                  <Bold><i className="fa fa-arrow-left"/>&nbsp;&nbsp;BACK</Bold>
                </FormButton>
              </ModalSection>
            : null }
        </SidePanel>
      </Modal>
    )
  }

  componentDidMount(){
    //this.props.loadData()
  }

  componentWillReceiveProps(nextProps) {
    
  }

  componentWillUnmount() {
    
  }  

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(push(paths.login()))
      dispatch(appActions.hideNavJump())
    },
    myActs: () => {
      dispatch(push(paths.myActs()))
      dispatch(appActions.hideNavJump())
    },
    myOrganizations: () => {
      dispatch(push(paths.myOrganizations()))
      dispatch(appActions.hideNavJump())
    },
    myVenues: () => {
      dispatch(push(paths.myVenues()))
      dispatch(appActions.hideNavJump())
    },
    myShows: () => {
      dispatch(push(paths.myShows()))
      dispatch(appActions.hideNavJump())
    },
    venueCreate: () => {
      dispatch(push(paths.venueCreate()))
      dispatch(appActions.hideNavJump())
    },
    playShow: () => {
      dispatch(push(paths.infoBooking()))
      dispatch(appActions.hideNavJump())
    },
    sellTickets: () => {
      dispatch(push(paths.sellTickets()))
      dispatch(appActions.hideNavJump())
    },
    promotion: () => {
      dispatch(push(paths.promotion()))
      dispatch(appActions.hideNavJump())
    },
    search: (category) => {
      dispatch(push(paths.search(category, '')))
      dispatch(appActions.hideNavJump())
    },
    submitSomethingElse: (category,text) => {
      dispatch(actions.navigationFeedbackCreate(category,text))
    },
    hideNavJump: () => {
      dispatch(appActions.hideNavJump())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavJump)

const Subtitle = styled.div`
  margin-left: 5vmin;
  font-size: 2.25vmin!important;
  line-height: 1.5vmin;
`