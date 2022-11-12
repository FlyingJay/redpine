import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'

import { paths } from 'globals'
import { RP_User, RP_Venue } from 'Models'

import { App, ConcertsPanel } from 'Containers'
import appSelectors from 'Containers/App/selectors'

import { RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_DARKGREY, RP_BLACK } from 'Components' // GLOBALS 
import { ProfilePageWrapper, UpperHeader, UpperHeaderOverlay, HeaderInner, BorderThisPicture, BorderedPicture, ProfileName, ProfileBio, 
          ProfileStats, StatsItem, MiddleSection, MajoritySub, MinoritySub, SexiestPanelEver, PanelHeading, PanelContent } from 'Components' // PROFILE
import { VenueBookingCalendar } from 'Components' //VENUEBOOKINGCALENDAR
import { LoadingIndicator } from 'Components' 
import { Markdown } from 'Components'
import { Tooltip } from 'Components'
import { Badge } from 'Components'
import { Link } from 'Components'

import { ActsPanel } from 'Components' // PROFILE/ACTSPANEL
import { MapPanel } from 'Components' // PROFILE/MAPPANEL
import { ReviewsPanel } from 'Components' // PROFILE/REVIEWSPANEL
import { SocialMediaPanel } from 'Components' // PROFILE/SOACIALMEDIAPANEL

import { AmenitiesPanel } from './AmenitiesPanel/index.jsx'

import actions from './actions'
import selectors from './selectors'


const max_display_count = 6;

export class Venue extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreConcerts: false,
      showMoreArtists: false
    }
  }

  render() {
    const _User = RP_User(this.props.user)

    const venue   = this.props.venue
    const _Venue  = RP_Venue(venue)
    
    const user        = this.props.user
    const profile     = user && this.props.user.profile || null
    const is_artist   = profile && profile.is_artist || false

    const events      = this.props.events
    const openings    = this.props.openings
    const bookedShows = this.props.bookedShows

    const campaigns       = this.props.campaigns 
    const campaigns_count = campaigns && campaigns.length
    const venue_has_shows = (campaigns_count > 0)

    const acts              = this.props.acts
    const acts_count        = acts && acts.length || 0
    const act_has_performed = (acts_count > 0)

    return (
      <App>
        <ProfilePageWrapper>
          { venue
            ? <UpperHeader background={_Venue.picture}>
                <UpperHeaderOverlay>
                  <HeaderInner>
                    <BorderThisPicture>
                      <BorderedPicture pic={_Venue.picture} />
                    </BorderThisPicture>
                    <ProfileName>
                      <span>{_Venue.title}</span>
                      { _Venue.has_fast_reply
                        ? <Tooltip place="right" tip="RedPine Verified!">
                            <i className="fa fa-check-circle" style={{color:RP_BLUE}}/>
                          </Tooltip>  
                        : null }
                    </ProfileName>
                    <ProfileBio>
                      <i className="fa fa-map-marker" />&nbsp;&nbsp;
                      {_Venue.address_string}
                    </ProfileBio>
                    <ProfileBio style={{fontWeight:'bold'}}>
                      <i className="fa fa-music" />&nbsp;&nbsp;{_Venue.genre_string}
                    </ProfileBio>
                    <ProfileBio style={{fontWeight:'bold',marginTop:'5vmin'}}>
                      <i className="fa fa-users" />&nbsp;&nbsp;{`${_Venue.capacity} Max Capacity`}
                    </ProfileBio>
                  </HeaderInner>
                </UpperHeaderOverlay>
              </UpperHeader>
            : null }
          { venue
            ? <MiddleSection>
                <MajoritySub>
                  {/* BOOK THIS VENUE */}
                  <BookingPositionMobile>
                    <BookNowButton venue={_Venue.id} only_direct_ticketing={_Venue.is_non_redpine_default}/> 
                    <SendMessageButton manager={_Venue._Manager.id}/> 

                    { _Venue.is_promotion
                      ? <Tooltip place="top" tip="Message RedPine for more info!">
                          <Badge text="+ Social Media Promo" fontSize="2vmin" shift={{top:'-10px',right:'-10px'}} background={RP_BLUE}/>
                        </Tooltip> 
                      : null }
                  </BookingPositionMobile>

                  {/* VENUES FULL BIO */}
                  <SexiestPanelEver>
                    <PanelHeading color={RP_GREEN}>
                      <i className="fa fa-newspaper-o" />
                      <span>Full bio</span>
                    </PanelHeading>
                    <PanelContent>
                      <Markdown text={_Venue.description || (_Venue.title + " has not yet uploaded a bio.") }/>
                    </PanelContent>            
                  </SexiestPanelEver>

                  {/* BOOKING CALENDAR */}
                  <SexiestPanelEver>
                    <PanelHeading color={RP_BLUE}>
                      <i className="fa fa-flag" />
                      <span>Booking & Opportunities</span>
                    </PanelHeading>
                    <PanelContent>
                      <VenueBookingCalendar 
                        venue={venue}
                        bookedShows={bookedShows}
                        openings={openings}
                        events={events}
                        loadDates={(date,view) => this.props.loadVenue(_Venue.id,date)}/>
                      <PickDate>
                        <LoadingIndicator loading={this.props.dates_loading}>
                          <span>Pick a date to play!</span>
                          <br/>
                          <br/>
                          <i className="fa fa-circle" style={{color:RP_RED}}/>&nbsp;Booked Show
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-circle" style={{color:RP_GREEN}}/>&nbsp;Paid Gig
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-circle" style={{color:RP_ORANGE}}/>&nbsp;Open Mic
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-circle" style={{color:RP_DARKGREY}}/>&nbsp;Private Event
                        </LoadingIndicator>
                      </PickDate>
                    </PanelContent>            
                  </SexiestPanelEver>

                  {/* AMENITIES AT THIS VENUE */}
                  <AmenitiesPanel venue={venue}/>

                  {/* REVIEWS */}
                  <ReviewsPanel
                    name={_Venue.title}
                    reviews={_Venue.reviews_by_bands}
                    has_reviews={_Venue.hasReviews()}
                    is_visible={_Venue.hasReviews() && is_artist}
                    null_message={`${_Venue.title} has not been reviewed.`}/>

                </MajoritySub>
                <MinoritySub>
                  {/* BOOK THIS VENUE */}
                  <div>
                    <BookNowButton venue={_Venue.id} only_direct_ticketing={_Venue.is_non_redpine_default}/> 
                    { _Venue.is_promotion
                      ? <Tooltip place="top" tip="Message RedPine for more info!">
                          <Badge text="+ Social Media Promo" fontSize="2vmin" shift={{top:'-10px',right:'-10px'}} background={RP_BLUE}/>
                        </Tooltip> 
                      : null }
                  </div>
                  <SendMessageButton manager={_Venue._Manager.id}/> 

                  {/* GOOGLE MAPS */}
                  <MapPanel address_string={_Venue.address_string} location={_Venue.location} />

                  {/* CONCERTS AT THIS VENUE */}
                  <ConcertsPanel is_venue
                    title={`Shows at ${_Venue.title}`}
                    entity={venue}
                    entity_has_shows={venue_has_shows}
                    campaigns={campaigns}
                    campaigns_count={campaigns_count}
                    max_display_count={max_display_count}
                    is_expanded={this.state.showMoreConcerts}
                    onClickExpand={() => this.updateState({showMoreConcerts: true})}/>

                  {/* ACTS PERFORMED AT THIS VENUE */}
                  <ActsPanel 
                    title={`Upcoming Performers`}
                    null_message={`No upcoming shows at ${_Venue.title}`}
                    acts={acts} 
                    acts_count={acts_count}
                    act_has_performed={act_has_performed}
                    is_expanded={this.state.showMoreArtists} 
                    onClickExpand={() => this.updateState({showMoreArtists: true})} />

                  {/* VENUE'S SOCIALS */}
                  <SocialMediaPanel entity={venue}/>
                </MinoritySub>
              </MiddleSection>
            : null } 
        </ProfilePageWrapper>
      </App>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  loadData() {
    const id = this.props.match.params.venueId
    this.props.loadVenue(id,moment())
    this.props.loadCampaigns(id)    
  }

  componentDidMount() {
    this.loadData()
  }
}

const mapStateToProps = (state, props) => {
  return {
    venue: selectors.selectVenue(state, props),
    acts: selectors.selectBands(state, props),
    campaigns: selectors.selectCampaigns(state, props),
    openings: selectors.selectOpenings(state, props),
    events: selectors.selectEvents(state, props),
    bookedShows: selectors.selectBookedShows(state, props),
    dates_loading: selectors.selectDatesLoading(state, props),
    user: appSelectors.selectUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadVenue: (id,date) => {
      dispatch(actions.loadVenue(id,date))
    },
    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Venue)

const BookNowButton = ({venue,only_direct_ticketing}) => (
  <Link href={`${only_direct_ticketing ? paths.sellTickets() : paths.showCreate()}?venue=${venue}`}>
    <BookNow>
      { only_direct_ticketing ? <i className="fa fa-ticket"/> : null }
      { only_direct_ticketing ? null : <i className="fa fa-flag"/> }&nbsp;&nbsp;
      { only_direct_ticketing ? 'TICKET YOUR EVENT!' : 'BOOK NOW!' }
    </BookNow>
  </Link> 
)
const SendMessageButton = ({}) => (
  <Link href={`${paths.messageRedPine()}`}>
    <BookNow color={RP_BLUE}>
      <i className="fa fa-envelope"/>&nbsp;&nbsp;
      SEND MESSAGE
    </BookNow>
  </Link> 
)

const BookNow = styled.div`
  width: 100%;
  background: ${props => props.color || RP_RED};
  color: #FFF;
  padding: 2vmin 0;
  margin: 0 0 2vmin 0;
  text-align: center;
  font-size: 2vmin;
  font-weight: bold;
  transition: 0.25s all ease;

  &:hover {
    background: ${RP_GREEN};
    cursor: pointer;
  }
`
const BookingPositionMobile = styled.div`
  display: none;
  vertical-align: top;
  position: relative;
  width: 30%;
  height: auto;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    display: inline-block;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) {
    width: 100%;
    display: inline-block;
  }
`
const PickDate = styled.div`
  text-align: center;
  padding-top: 7.5vmin;

  span {
    font-weight: bold;
  }

  @media (max-width: 767px) and (orientation: portrait) { 
    padding-top: 10vmin;
  }
`