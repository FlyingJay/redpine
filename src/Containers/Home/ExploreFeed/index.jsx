import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import PackLayout from 'react-layout-pack'

import { paths, helpers } from 'globals'

import { RP_Venue, RP_User } from 'Models'

import { RP_RED, RP_BLACK, RP_PINK, RP_DARK_GREY, RP_GREY, Bottom } from 'Components' // GLOBALS
import { Slider, PrevArrow, NextArrow } from 'Components' // SLIDER
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Link } from 'Components' // LINK
import { CampaignBlock } from 'Components' // CAMPAIGNBLOCK
import { Feed } from 'Components' 


export class ExploreFeed extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      acts: [],
      venues: [],
      campaigns: []
    }
    this.mobile_view = null
  }

  render() {
    let viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let mobile_view = (viewport_width < 768)

    const _User = RP_User(this.props.user)

    const acts = this.props.acts || []
    const acts_count = acts.length

    const campaigns = this.props.campaigns || []
    const campaigns_count = campaigns.length
    const has_campaigns = (campaigns_count > 0)

    const venues = this.props.venues || []
    const venues_count = venues.length
    const has_venues = (venues_count > 0)

    const openings = this.props.openings || []
    const openings_count = openings.length
    const has_openings = (openings_count > 0)

    const act_rows = []
    const act_boxes = acts.map(act => <Link href={paths.acts(act.id)} key={'a_'+act.id}>
                                        <BandContainer image={act.picture}>
                                          <Overlay>
                                          <BandName>{act.name}</BandName>
                                          </Overlay>
                                        </BandContainer>
                                       </Link>)
    let a = true
    while(act_boxes.length > 0){
      act_rows.push(act_boxes.splice(0,(mobile_view?2:5)*(a?2:1)))
      a = !a
    }
    const campaign_boxes = campaigns.map(campaign => <CampaignBlock campaign={campaign}/>)

    const venue_rows = []
    const venue_boxes = venues.map((venue, index) => venue.city && venue.city.province
                                                      ? <Link key={'v_'+venue.id} href={paths.venues(venue.id)} style={{verticalAlign:'top'}}>
                                                          <VenuesContainer>
                                                            <VenuesImage image={venue.picture}/>
                                                            <Overlay>
                                                              <Titles>
                                                                <VenueName>{venue.title}</VenueName>
                                                                <VenueCity>
                                                                  { venue.city
                                                                    ? venue.city.name
                                                                    : ''}, 
                                                                  { venue.city.province
                                                                    ? venue.city.province.name
                                                                    : '' }
                                                                </VenueCity>
                                                              </Titles>
                                                            </Overlay>
                                                          </VenuesContainer>
                                                        </Link>
                                                      : null)
    while(venue_boxes.length > 0)
      venue_rows.push(venue_boxes.splice(0,(mobile_view?2:4)))

    const opening_rows = []
    const opening_boxes = openings.map((opening, index) => {
                            const _Venue = RP_Venue(opening.timeslot.venue)
                            const date   = moment(opening.timeslot.start_time).format('MMM Do')
                            return _User.is_artist
                                  ? <Link key={'o_'+opening.id} href={paths.showCreate()+'?opening='+opening.id} style={{verticalAlign:'top'}}>
                                      <Opening>
                                        <VenuesImage image={_Venue.picture}>
                                          <Overlay>
                                            <Tag>PLAY NOW</Tag>
                                            <Bottom>
                                              <BookDate>{date} - {opening.title}</BookDate>
                                              <VenueName>{_Venue.title}</VenueName>
                                              <VenueCity>{_Venue.city_name}, {_Venue.province_name}</VenueCity>
                                            </Bottom>
                                          </Overlay>
                                        </VenuesImage>
                                      </Opening>
                                     </Link>
                                  : null
                          })
    while(opening_boxes.length > 0)
      opening_rows.push(opening_boxes.splice(0,(mobile_view?1:4)))

    return <Feed infinite page_size={30} page={this.props.page} results_count={this.props.results_count} reload={(page) => this.props.getResults(page)}>
            <LoadingIndicator loading={this.props.loading} is_child_visible={this.props.results_count > 0} bottom>
              { act_rows.map((act_row, i) => {
                  return <div key={'r_'+i}>
                    <PackLayout className="packed-layout" itemMargin={1}>
                      { act_row }
                    </PackLayout>
                    { i === 0
                      ? <Link href={paths.search('acts')}>
                          <SearchMore>Browse all acts&nbsp;&nbsp;<i className="fa fa-arrow-right"/></SearchMore>
                        </Link>
                      : null }
                    { venue_rows[i] && venue_rows[i].length == (mobile_view?2:4)
                      ? <div>
                          <PackLayout className="packed-layout" itemMargin={1}>
                            { venue_rows[i] }
                          </PackLayout>    
                          { i === 0
                            ? <Link href={paths.search('venues')}>
                                <SearchMore>Browse all venues&nbsp;&nbsp;<i className="fa fa-arrow-right"/></SearchMore>
                              </Link>
                            : null }
                        </div>
                      : null }
                    { opening_rows[i] && (opening_rows[i].length == (mobile_view?1:4)) && _User.is_artist
                      ? <div>
                          <PackLayout className="packed-layout" itemMargin={1}>
                            { opening_rows[i] }
                          </PackLayout>    
                          { i === 0
                            ? <Link href={paths.search('opportunities')}>
                                <SearchMore>Browse paid gigs&nbsp;&nbsp;<i className="fa fa-arrow-right"/></SearchMore>
                              </Link>
                            : null }
                        </div>
                      : null }
                  </div>
                })}
            </LoadingIndicator>
           </Feed>
  }

  componentWillReceiveProps(props) {

  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}
const SearchMore = styled.div`
  text-align: right;
  font-size: 3.5vmin;
  font-weight: 200;
  padding-right: 6vw;

  @media(max-width:768px){
    font-size: 3vmin;
  }
`
const BandContainer = styled.div`
  display: inline-block;
  position: relative;
  width: CALC(19% - 2vmin);
  height: 20vmin;
  background-size: cover;
  background-position: center center; 
  background-image: url(${props => props.image});
  vertical-align: top;
  margin: 2vmin 2vmin 0 0;

  box-shadow: 3px 3px 5px ${RP_GREY};
  
  @media(max-width:768px){
    width: CALC(50% - 5vmin);
    height: 30vmin;
  }
`
const BandName = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 0 1vmin 1.5vmin;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: #FFF;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 3vmin;
  font-weight: bold;


  @media(max-width:768px){
    font-size: 3.5vmin;
  }
`
const Overlay = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  border-radius: inherit;

  &:hover {
    background: -webkit-linear-gradient(transparent 0%, rgba(255,18,19, 0.85) 100%) !important;
    background: -moz-linear-gradient(transparent 0%, rgba(255,18,19, 0.85) 100%) !important;
    background: linear-gradient(transparent 0%, rgba(255,18,19, 0.85) 100%) !important;
  }
`
const VenuesContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 23%;
  height: 40vmin;
  color: ${RP_DARK_GREY};
  box-shadow: 3px 3px 5px ${RP_GREY};
  margin-right: 1vmin;

  &:hover {
    .venueImageOverlay {
      background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    }
  }

  @media(max-width:768px){
    width: 45%;
    margin-right: 2vmin;
  }
`
const VenuesImage = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 40vmin;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.image});
`
const VenueInfo = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`
const VenueInfoBasis = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 2.25vmin;
  font-weight: bold;
`
const NoVenues = styled.div`
  padding-left: 5vmin;
`
const VenueName = styled(VenueInfoBasis)`
  font-size: 2.3vmin;
  font-weight: 600;
  padding: 0 1.5vmin;
  color: #FFF;

  @media(max-width:768px){
    font-size: 3vmin;
  }
`
const VenueCity = styled(VenueInfoBasis)`
  color: ${RP_PINK};
  font-size: 2.5vmin;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5vmin 1.5vmin 1vmin 1.5vmin;

  @media(max-width:768px){
    font-size: 3vmin;
  }
`
const Titles = styled(Bottom)`
  width: 100%;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
`
const NoFeatured = styled.div`
  padding-left: 5vmin;
`
const Tag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  margin: 1vmin;
  padding: 0.5vmin 1vmin;
  color: #FFF;
  font-weight: bold;
  background: ${RP_RED};
  line-height: 3vmin;
  border-radius: 0.25vmin;

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2vmin;
  }
`
const BookDate = styled.div`
  display: block;
  width: 40vmin;
  height: auto;
  margin: 0 auto;
  padding: 0.5vmin 1.5vmin;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: #FFF;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 2.25vmin;
  font-weight: bold;
`
const Opening = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 23%;
  height: 40vmin;
  color: ${RP_DARK_GREY};
  box-shadow: 3px 3px 5px ${RP_GREY};
  margin-right: 1vmin;

  &:hover {
    .venueImageOverlay {
      background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    }
  }

  @media(max-width:768px){
    width: 92%;
    margin-right: 0;
  }
`