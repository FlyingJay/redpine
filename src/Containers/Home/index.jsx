import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign } from 'Models'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'

import { RP_RED, RP_PINK, RP_BLACK, RP_WHITE, RP_DARKGREY, RP_FONT, RP_LOGOFONT, RP_DARK_GREY, RP_SUPER_LIGHT, Bold, Clear, RedWhiteLogo } from 'Components' // GLOBALS
import { PageSection as PageSectionOriginal } from 'Components' // PANEL
import { MajorCTA, SectionHeader, SectionSubHeader } from 'Components' // TITLE
import { FineAssCTAButton } from 'Components' // BUTTON
import { Image, Overlay } from 'Components' // IMAGE
import { CampaignBlock } from 'Components'
import { Link } from 'Components'

import { FeaturedArtists } from './FeaturedArtists/index.jsx'
import { FeaturedCampaigns } from './FeaturedCampaigns/index.jsx'
import { FeaturedVenues } from './FeaturedVenues/index.jsx'
import { LuckyGigs } from './LuckyGigs/index.jsx'
import { ExploreFeed } from './ExploreFeed/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class Home extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      results: []
    }
  }

  render() {
    const venue    = this.props.venue
    const campaign = this.props.campaign

    const _Campaign = RP_Campaign(campaign)

    const past_shows = this.props.previouslySuccessful 
                       ? this.props.previouslySuccessful.filter((campaign) => {
                           const start_time = moment(_Campaign.event_start)
                           return campaign.is_successful && (Date.now() > Date.parse(start_time.toDate())) 
                         })
                       : null

    const user      = this.props.user
    const profile   = user ? user.profile : null
    const is_artist = profile ? profile.is_artist : false
    const is_venue  = profile ? profile.is_venue : false

    const global_settings = this.props.global_settings
    const static_homepage_picture = global_settings ? global_settings.homepage_picture : false
    const homepage_picture = static_homepage_picture ? global_settings.homepage_picture : (venue ? venue.picture : null)

    const feed_loading = (this.props.openings_loading || this.props.featuredBands_loading || this.props.featuredVenues_loading)

    return (
      <App padding>
        <Body>
          <Image width="100%" height="auto" image={homepage_picture}>
            <TopBannerOverlay style={{height:"100%"}}>
              <TopBannerInnerWrapper>
                <TopBannerInnerContent>
                  { campaign
                    ? <CampaignBlock campaign={campaign} has_badge only_desktop/>
                    : null }
                  <WelcomeText>
                    <RedWhiteLogo inline/>
                    { is_artist
                      ? <SearchCaption>You're ready to play. We can help!</SearchCaption>
                      : is_venue
                        ? <SearchCaption>If you have any questions at all, we are happy to help!</SearchCaption>
                        : <SearchCaption>Find an awesome show! Search an act you know, or browse for one you don't!</SearchCaption> }
                  </WelcomeText>
                </TopBannerInnerContent>
              </TopBannerInnerWrapper>
              { venue && !static_homepage_picture
                ? <VenueInfo>
                    <VenueText>{venue.title}</VenueText>
                    { venue.city != null && venue.province != null
                      ? <VenueAddress address={venue.address} city={venue.city.name} province={venue.city.province.name}/> 
                      : null }
                  </VenueInfo>
                : null }
            </TopBannerOverlay>
          </Image>

          {/* FEATURED HOME PAGE CONTENT */}
          <MainHomeContent>
            {/* this.props.openings.length > 0 && is_artist
              ? <LuckyGigs 
                  openings={this.props.openings} 
                  loading={this.props.openings_loading} />
              : null */}

            <ExploreFeed
              user={this.props.user}
              acts={this.props.featuredBands} 
              campaigns={this.props.featuredCampaigns} 
              venues={this.props.featuredVenues} 
              openings={this.props.openings}
              loading={feed_loading}
              page={this.props.page}
              results_count={this.props.results_count}
              getResults={(page) => this.props.loadData(page)}/>

            {/*
            <Heading>Acts</Heading>
            <FeaturedArtists 
              bands={this.props.featuredBands} 
              loading={this.props.featuredBands_loading}/>

            <Heading>Venues</Heading>
            <FeaturedVenues 
              venues={this.props.featuredVenues} 
              loading={this.props.featuredVenues_loading} />

            { this.props.featuredCampaigns.length > 0
              ? <Heading key="1">Great Shows</Heading> 
              : null }
            { this.props.featuredCampaigns.length > 0
              ? <FeaturedCampaigns
                  campaigns={this.props.featuredCampaigns} 
                  loading={this.props.featuredCampaigns_loading} /> 
              : null */}

            {/* HIDDEN FOR A BIT
            <Heading>Past Shows</Heading>
            <FeaturedCampaigns 
              campaigns={past_shows} 
              loading={this.props.previouslySuccessful_loading} 
              type="previous"/> */}
          </MainHomeContent>

          {/* ALMOST FOOTER CONTENT WRAPPER - CALL TO ACTION (CTA) */}
          { this.props.user 
            ? !this.props.user.profile.is_artist
              ? <MajorCTA image={'/Assets/images/background/cta0.jpg'}>
                  <SectionHeader color={RP_WHITE} style={{padding:'0 0 1vmin 0', fontSize:'4vmin'}}>Play a show!</SectionHeader>
                  <SectionSubHeader color={RP_WHITE} style={{width:'50%', margin:'0 auto', whiteSpace:'normal'}}>
                    We've made it extremely easy for you to book a show! To get started, simply go to your <Bold>Account Settings</Bold> and <Bold>Enable features for Artists</Bold>.
                  </SectionSubHeader>
                  <Link href={paths.settings()}>
                    <FineAssCTAButton><i className="fa fa-info"/>&nbsp;&nbsp;&nbsp;Go to your settings</FineAssCTAButton>
                  </Link>
                </MajorCTA>
              : null
            : <PageSection>
                <SectionHeader color={RP_WHITE} style={{padding: '0 0 1vmin 0', fontSize: '4vmin'}}>Join RedPine Today!</SectionHeader>
                <SectionSubHeader color={RP_WHITE} style={{width: '50%', margin: '0 auto', whiteSpace: 'normal'}}>
                  Book a show, or check out some of the most talented artists around you. RedPine's community of musicians is growing, and we'd love for you to be a part of it!  
                  <br/>
                  <Bold>But we can only talk so much, you'll have to see it for yourself!</Bold>
                </SectionSubHeader>
                <Link href={paths.registerEmail()}>
                  <FineAssCTAButton><i className="fa fa-envelope"/>&nbsp;&nbsp;Register Now</FineAssCTAButton>
                </Link>
              </PageSection> }
        </Body>
      </App>
    )
  }

  componentDidMount() {
    this.props.loadData()
  }
}

const mapStateToProps = (state, props) => {
  return {
    //Page data
    openings: selectors.selectOpenings(state),
    featuredBands: selectors.selectFeaturedBands(state),
    featuredCampaigns: selectors.selectFeaturedCampaigns(state),
    featuredVenues: selectors.selectFeaturedVenues(state),
    previouslySuccessful: selectors.selectPreviouslySuccessful(state),

    page: selectors.selectPage(state),
    results_count: selectors.selectResultsCount(state),

    //Other
    global_settings: appSelectors.selectSettings(state, props),
    campaign: selectors.selectCampaign(state),
    venue: selectors.selectVenue(state),
    user: appSelectors.selectUser(state),
    //Loading statuses
    openings_loading: selectors.selectOpeningsLoading(state),
    featuredBands_loading: selectors.selectFeaturedBandsLoading(state),
    featuredVenues_loading: selectors.selectFeaturedVenuesLoading(state),
    featuredCampaigns_loading: selectors.selectFeaturedCampaignsLoading(state),
    previouslySuccessful_loading: selectors.selectPreviouslySuccessfulLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (page=1) => {
      dispatch(actions.loadData(page))
    },
    searchShows: () => {
      dispatch(push(paths.search('shows', '')))
    },
    searchActs: () => {
      dispatch(push(paths.search('acts', '')))
    },
    searchVenues: () => {
      dispatch(push(paths.search('venues', '')))
    },
    searchOpportunities: () => {
      dispatch(push(paths.search('opportunities', '')))
    },
    searchOpenShows: () => {
      dispatch(push(paths.search('open_shows', '')))
    },
    searchOpenMics: () => {
      dispatch(push(paths.search('open_mics', '')))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


const VenueAddress = ({address,city,province}) => 
(
  <AddressWrapper>
    <i className="fa fa-map-marker" />&nbsp;
    {address}
    <br/>
    {city}, {province}
  </AddressWrapper>
);


const WelcomeText = styled.div`
  display: inline-block;
  vertical-align: top;
  padding-left: 3vmin;

  font-family: ${RP_LOGOFONT};
  font-size: 5vmin;
  color: ${RP_WHITE};
  font-weight: 200;
`
const Heading = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  color: ${RP_BLACK};
  text-align: left;
  font-weight: bold;
  font-family: ${RP_FONT};
  font-size: 3vmin;
  line-height: 10vmin;
  white-space: normal;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 4vmin;
    text-align: left;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    text-align: left;
  }
`
const SearchCaption = styled.div`
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 2.25vmin;
  line-height: 3vmin;
  color: #FFF;
  font-weight: bold;
`
const TopBannerOverlay = styled(Overlay)`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(22, 23, 26, .45) 75%, rgba(22, 23, 26, 0.55) 100%);
`
const TopBannerInnerWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 7.5vmin 0 7.5vmin 0;
`
const TopBannerInnerContent = styled.div`
  display: block;
  position: relative;
  width: 80vw;
  height: auto;
  margin: 0 auto;
`
const VenueInfo = styled.div`
  display: block;
  position: absolute;
  width: auto;
  height: auto;
  right: 5vmin;
  bottom: 2vmin;

  @media (max-width: 767px) and (orientation: portrait) { 
    display: none;
  }
`
const VenueText = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  color: ${RP_DARKGREY};
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 2.25vmin;
  font-weight: 600;
`
const AddressWrapper = styled(VenueText)`
  font-size: 1.6vmin;
  font-style: italic;
  font-weight: 300;
`
const MainHomeContent = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 2vmin 0 5vmin 0;
  width: 90vw;

  @media(max-width:768px){
    width: 100%;
  }
`
const PageSection = styled(PageSectionOriginal)`
  width: 80%;
  padding: 10vmin 0;
  margin-top: 0;
  margin-bottom: 3vmin;
  background: url(/Assets/images/background/cta1.jpg);
  overflow: hidden;
  border-radius: 3px;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    margin-bottom: 0vmin;
    border-radius: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 100%;
    margin-bottom: 0vmin;
    border-radius: 0;
  }
`
const Body = styled.div`
  z-index: 20;
`
const ExploreButton = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: auto;
  margin-right: 2vmin;
  padding: 2vmin;
  height: auto;
  text-transform: uppercase;
  font-family: 'Open Sans',Helvetica,Arial;
  text-align: center;
  font-size: 1.7vmin;
  line-height: 3vmin;
  color: ${RP_DARK_GREY};
  border-radius: 0.3vmin;
  border: ${(props) => props.enabled ? '1px solid '+RP_DARK_GREY : 'none'};
  background: ${(props) => props.enabled ? RP_SUPER_LIGHT : '#FFF'};
  font-weight: bold;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.2);

  &:hover {
    background: ${RP_SUPER_LIGHT};
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    display: inline-block;
    width: auto;
    margin-right: 1vmin;
  }
`
const ExploreIcon = styled.img`
  display: inline-block;
  position: relative; 
  width: 3.5vmin;
  height: 3.5vmin;
  vertical-align: middle;
  margin-right: 1vmin;

  border-radius: 0.5vmin;
`