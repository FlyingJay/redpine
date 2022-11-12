import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router'

import { paths, validators } from 'globals'
import { RP_Campaign, RP_Venue } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { RP_RED, RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_DDD, RP_DARKGREY, RP_SUPER_LIGHT, RP_LIGHTGREY,
          RP_PINK, RP_BLUE, RP_DARKBLUE, RP_GREEN, RP_FONT, Clear, Bold, MyPageWrapper } from 'Components' // GLOBALS
import { Modal, SidePanel, ModalSection, ModalHeading, ModalSubheading, ImagePanel, ImagePanelOverlay, 
          Description, DescriptionTextBox, ModalButtons, EditButton, PositiveButton, NegativeButton, TabbedData } from 'Components'  // MODAL & MODALOTHER
import { Input, FormInput, TextBox, Select } from 'Components' // INPUT
import { SpecialRedPineHeading, NoDataFound } from 'Components' // MY
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { SelectGenres } from 'Components' 
import { PageSection } from 'Components' // PANEL
import { UploadImage } from 'Components' // UPLOADIMAGE
import { ShowResult } from 'Components' // SHOWRESULT
import { Image } from 'Components' // IMAGE
import { Link } from 'Components' // LINK
import { Title } from 'Components' // TITLE

import { Stats } from './Stats/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class Venues extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      canModify: true,
      editTitle: false,
      editDescription: false,
      title: "",
      description: "",
      country: "",
      province: "",
      city: "",
      address: "",
      postal_code: "",
      capacity: "",
      selectedGenres: [],
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      website: '',
      picture: null,
      pictureData: null,
      activeIndex: null
    }
  }

  render() {
    const venues            = this.props.venues || []
    const pending_campaigns = (this.props.pendingCampaigns || []).filter(campaign => ((Date.parse(campaign.funding_end) - Date.now()) > 0 ))
    const activeCampaigns   = (this.props.activeCampaigns || []).filter(campaign => campaign.is_venue_approved)

    function getTitle(index){
      return index != null ? venues[index].title : ""
    }

    function getDescription(index){
      return index != null ? venues[index].description : ""
    }

    if (!this.props.venues_loading && venues.length == 0)
      return <Redirect to={paths.venueCreate()}/>

    return (
      <App requireAuth venuePage>
        <MyPageWrapper>
          <Title title='My Venues' summary='All your listed stages!' />
          <LoadingIndicator loading={this.props.venues_loading} is_child_visible={venues.length > 0}>
            { venues.length == 0
              ? <Link href={paths.venueCreate()}>
                  <NoDataFound>
                    You haven't added any venues yet. Click here to add one!
                  </NoDataFound>
                </Link>
              : venues.map((venue, index) => {
                  const _Venue        = RP_Venue(venue)
                  const city          = venue.city
                  const province      = city && city.province || null
                  const country       = province && province.country || null
                  
                  const city_name     = city && city.name || null
                  const province_name = province && province.name || null
                  const country_name  = country && country.name || null

                  return <DataInfoWrapper key={venue.id}>
                          {/* VENUE IMAGE */}
                          <Link href={paths.venues(venue.id)}>
                            <DataBoxedImage height="25vmin" width="25vmin" image={_Venue.picture} inline> 
                              <DataBoxedImageOverlay />
                            </DataBoxedImage>
                          </Link>

                          {/* VENUE INFORMATION */}
                          <VenueActions>
                            <DataHeading>{venue.title}</DataHeading>

                            <ActionWrapper>
                              <ActionButton alternateColor={true}
                                onClick={() => this.updateState({
                                  showVenuePanel:true,
                                  canModify:true,
                                  title:venue.title,
                                  description:venue.description,
                                  picture:_Venue.picture,
                                  pictureData: null,
                                  country:country_name,
                                  province:province_name,
                                  city:city_name,
                                  postal_code: venue.postal_code,
                                  address:venue.address,
                                  capacity:venue.capacity,
                                  facebook: venue.facebook,
                                  twitter: venue.twitter,
                                  instagram: venue.instagram,
                                  youtube: venue.youtube,
                                  website: venue.website,
                                  selectedGenres:_Venue.genres,
                                  activeIndex:index
                                })}>
                                <i className="fa fa-pencil" />&nbsp;&nbsp;Edit Details
                              </ActionButton>
                              <Link href={paths.venueCalendar(venue.id)}>
                                <ActionButton alternateColor>
                                  <i className="fa fa-calendar" />&nbsp;&nbsp;Booking Calendar
                                </ActionButton>
                              </Link>
                              <ActionButton alternateColor onClick={() => this.props.searchActs(_Venue.genre)}>
                                <i className="fa fa-search" />&nbsp;&nbsp;Relevant Acts
                              </ActionButton>
                              <Link href={paths.offerSheet(venue.id)}>
                                <ActionButton alternateColor>
                                  <i className="fa fa-users" />&nbsp;&nbsp;Offer Sheet
                                </ActionButton>
                              </Link>
                              {/* HIDING THE DEDICATED STATS PAGE SINCE WE HAVE FEW METRICS, WHEN THERE ARE MORE WE CAN RE-ADD.
                              <Link href={paths.venueStats(venue.id)}>
                                <ActionButton alternateColor>
                                  <i className="fa fa-bar-chart" />&nbsp;&nbsp;Extra Statistics
                                </ActionButton>
                              </Link>
                              */}
                            </ActionWrapper>
                          </VenueActions>
                          <Stats venue={venue}/>
                        </DataInfoWrapper>
                })}
          </LoadingIndicator>

          <SpecialRedPineHeading>Requests</SpecialRedPineHeading>
          <LoadingIndicator loading={this.props.pendingCampaigns_loading}>
            { pending_campaigns.length > 0
              ? pending_campaigns.map(campaign => <ShowResult key={campaign.id} campaign={campaign} show_venue_name/>)
              : <NoDataFound>
                  You have no pending requests.
                </NoDataFound> }
          </LoadingIndicator>

          <SpecialRedPineHeading>Active Shows</SpecialRedPineHeading>
          <LoadingIndicator loading={this.props.activeCampaigns_loading}>
            { activeCampaigns.length > 0
              ? activeCampaigns.map(campaign => <ShowResult key={campaign.id} campaign={campaign} show_venue_name/>)
              : <NoDataFound>
                  You have no active shows.
                </NoDataFound> }
          </LoadingIndicator>
        </MyPageWrapper>

        <Modal show={this.state.showVenuePanel} transparent={true} onClose={(e) => this.updateState({showVenuePanel: false})}>
          <SidePanel>

            {/* VENUE PICTURE */}
            <ModalSection top>
              <ModalHeading>Venue Info</ModalHeading>
              <ModalSubheading>
                { this.state.canModify
                  ? 'Contact RedPine to add any information not included here, such as amenities.'
                  : 'View your venue details' }
              </ModalSubheading>
              { this.state.canModify 
                ? <UploadImage
                    default_image={this.state.picture}
                    onChange={(data) => this.updateState({ picture: data, pictureData: data })}
                    text="Update venue photo"
                    height="26vmin"
                    disablePictureRemove/>
                : <ImagePanel background={this.state.picture || '/Assets/images/defaults/defaultVenue.png'} backgroundSize="64px">
                    <ImagePanelOverlay />
                  </ImagePanel> }
            </ModalSection>

            {/* VENUE NAME AND DESCRIPTION */}
            <ModalSection>
              { this.state.editTitle
                ? <div style={{textAlign: 'right'}}>
                    <Input
                      value={this.state.title}
                      validate={validators.STANDARD_CHARACTERS()}
                      onValidate={(text) => this.updateState({title: text})}
                      placeholder="Venue Title"
                      maxLength="200"/>
                  </div>
                : <VenueTitle>
                    { this.state.title }
                    { this.state.canModify
                      ? <EditButton onClick={() => this.updateState({editTitle:true,title:this.state.title})}>
                          <i className="fa fa-circle" style={{verticalAlign: 'middle', padding: '0 2vmin', fontSize: '1vmin'}}></i>
                          <span>Edit</span>
                        </EditButton>
                      : null }
                  </VenueTitle> }
              { this.state.editDescription
                ? <div style={{textAlign: 'right'}}>
                    <DescriptionTextBox value={this.state.description} onChange={(e) => this.updateState({description: e.target.value})} placeholder="Venue Description" maxLength="5000"></DescriptionTextBox>
                  </div>
                : <Description>
                    { this.state.description }
                    { this.state.canModify 
                      ? <EditButton onClick={() => this.updateState({editDescription:true,description:this.state.description})}>
                          <i className="fa fa-circle" style={{verticalAlign: 'middle', padding: '0 2vmin', fontSize: '1vmin'}}></i>
                          <span>Edit</span>
                        </EditButton> 
                      : null }
                  </Description> }
            </ModalSection>

            {/* VENUE LOCATION AND CAPACITY */}
            <ModalSection>
              <ModalHeading>Venue Information</ModalHeading>
              <ModalSubheading>Your location and venue capacity</ModalSubheading>

              {/* STREET ADDRESS */}
              <Input 
                value={this.state.address} 
                validate={validators.STANDARD_CHARACTERS()}
                onValidate={(text) => this.updateState({address: text})}
                image="location" 
                focusImage="location-focus"
                placeholder="Street Address" 
                maxLength="200"/>

              {/* CITY/TOWN */}
              <Input disabled 
                value={this.state.city}
                onChange={(e) => this.updateState({city: e.target.value})}
                style={{marginRight:'2vmin'}}
                image="dot" 
                focusImage="dot-focus"
                placeholder="City / Town" 
                maxLength="100"
                inline/>

              {/* PROVINCE/STATE */}
              <Input disabled 
                value={this.state.province}
                onChange={(e) => this.updateState({province: e.target.value})}
                image="dot" 
                focusImage="dot-focus"
                placeholder="Province / State" 
                maxLength="100"
                inline/>

              {/* COUNTRY */}
              <Input disabled 
                value={this.state.country}
                onChange={(e) => this.updateState({country: e.target.value})}
                image="dot" 
                focusImage="dot-focus"
                placeholder="Country" 
                maxLength="100"/>

              {/* POSTAL CODE */}
              <Input 
                value={this.state.postal_code}
                validate={validators.LETTERS_NUMBERS()}
                onValidate={(text) => this.updateState({postal_code: text})}
                image="dot" 
                focusImage="dot-focus"
                placeholder="Postal / ZIP" 
                maxLength="7"/>

              {/* VENUE CAPACITY */}
              <SubInfoContainer>
                <FormInputLabel>
                  Maximum Capacity:
                </FormInputLabel>
                <Input
                  value={this.state.capacity}
                  validate={validators.POSITIVE_INTEGER()}
                  onValidate={(text) => this.updateState({capacity: text})}
                  image="capacity"
                  focusImage="capacity-focus"
                  placeholder="Capacity" 
                  inline/>
              </SubInfoContainer>
            </ModalSection>

            {/* GENRE */}
            <ModalSection>
              <ModalHeading>Genres</ModalHeading>
              <ModalSubheading>What kind of shows do you host?</ModalSubheading>
              <SelectGenres
                genres={this.props.genres}
                selectedGenres={this.state.selectedGenres}
                disabled={!this.state.canModify}
                onChange={(selectedGenres) => this.updateState({selectedGenres:selectedGenres})}/>
            </ModalSection>

            {/* SOCIAL MEDIA */}
            <ModalSection>
              <ModalHeading>Social Media</ModalHeading>
              <ModalSubheading>Give your patrons a way to connect with you</ModalSubheading>
              <Input
                value={(this.state.facebook || '')}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({facebook: text})}
                placeholder='Facebook'
                image='facebook'
                focusImage='facebook-focus'
                maxLength='200'
                disabled={!this.state.canModify}/>
              <Input
                value={(this.state.twitter || '')}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({twitter: text})}
                placeholder='Twitter'
                image='twitter'
                focusImage='twitter-focus'
                maxLength='200'
                disabled={!this.state.canModify}/>
              <Input
                value={(this.state.instagram || '')}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({instagram: text})}
                placeholder='Instagram'
                image='instagram'
                focusImage='instagram-focus'
                maxLength='200'
                disabled={!this.state.canModify}/>
              <Input
                value={(this.state.youtube || '')}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({youtube: text})}
                placeholder='YouTube'
                image='youtube'
                focusImage='youtube-focus'
                maxLength='200'
                disabled={!this.state.canModify}/>
              <Input
                value={(this.state.website || '')}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({website: text})}
                placeholder='Website'
                image='website'
                focusImage='website-focus'
                maxLength='200'
                disabled={!this.state.canModify}/>
            </ModalSection>

            {/* MODAL EDITOR BUTTONS */}
            <ModalSection>
              <ModalButtons>
                <NegativeButton
                  onClick={() => this.updateState({
                    showVenuePanel: false,
                    editTitle: false,
                    title: getTitle(this.state.activeIndex),
                    editDescription: false,
                    description: getDescription(this.state.activeIndex)
                  })}>
                  <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Cancel
                </NegativeButton>
                { this.state.canModify
                  ? <PositiveButton onClick={() => this.updateVenue()}>Save</PositiveButton>
                  : null }
              </ModalButtons>
            </ModalSection>
          </SidePanel>
        </Modal>
      </App>
    )
  }

  addGenre(selectedGenre) {
    if(selectedGenre){
      var genres = this.state.selectedGenres
      var added = { id:selectedGenre.value,
                    name:selectedGenre.label }
      genres.push(added)
      this.updateState({selectedGenres: genres})
    }
  }

  removeGenre(genre) {
    var nextGenres = []
    this.state.selectedGenres.forEach((_genre) => {
      if(_genre.id !== genre.id){
        nextGenres.push(_genre)
      }
    })
    this.updateState({selectedGenres: nextGenres})
  }

  updateVenue() {
    let old_details = this.props.venues[this.state.activeIndex]
    let venue = {
      id: old_details.id,
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      city: {
        name: this.state.city,
        province: {
          name: this.state.province,
          country: {
            name: this.state.country
          }
        }
      },
      postal_code: this.state.postal_code,
      capacity: this.state.capacity
    }

    //Don't submit {picture: null} if no picture was uploaded.
    if (this.state.pictureData) {
      venue['picture'] = this.state.pictureData
    } else {
      delete venue['picture']
    }

    if (this.state.selectedGenres) { venue['genres'] = this.state.selectedGenres.map(genre => genre.id) }

    if (this.state.facebook) { venue['facebook'] = this.state.facebook }
    if (this.state.twitter) { venue['twitter'] = this.state.twitter }
    if (this.state.instagram) { venue['instagram'] = this.state.instagram }
    if (this.state.youtube) { venue['youtube'] = this.state.youtube }
    if (this.state.website) { venue['website'] = this.state.website }

    if(this.validateGenre(venue)){
      this.props.updateVenue(venue)
      this.updateState({showVenuePanel:false, editTitle:false, editDescription:false})
      this.updateState({picture: null})
    }
  }

  validateGenre(venue){
    if(RP_Venue(venue).has_preferred_genre) return true
      
    this.props.errorMessage('Please add at least one genre tag.')
    return false
  }

  componentDidMount() {
    this.props.loadData()
    this.props.refreshCache()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    genres: appSelectors.selectGenres(state),

    venues: selectors.selectVenues(state, props),
    venues_loading: selectors.selectVenuesLoading(state, props),
    activeCampaigns: selectors.selectActiveCampaigns(state, props),
    pendingCampaigns: selectors.selectPendingCampaigns(state, props),
    activeCampaigns_loading: selectors.selectActiveCampaignsLoading(state, props),
    pendingCampaigns_loading: selectors.selectPendingCampaignsLoading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(actions.loadData())
    },
    searchActs: (genre) => {
      dispatch(push(paths.search('acts','',null,null,null,genre)))
    },
    updateVenue: (venue) => {
      dispatch(actions.updateVenue(venue))
    },
    venueError: (error) => {
      dispatch(actions.venueError(error))
    },
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Venues)


/** VENUE CONTAINER **/
const DataInfoWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: CALC(50% - 2vmin);
  height: auto;
  margin: 0 1vmin 3vmin 1vmin;
  text-align: left;
  background: ${RP_WHITE};
  border-radius: 0.5vmin;

  &:hover {
    background: ${RP_SUPER_LIGHT};
  }

  @media (max-width: 1024px){
    width: 100%;
  }
`
const DataBoxedImage = styled(Image)`
  cursor: pointer !important;
  display: inline-block;
  width: calc(50% - 2vmin);
  margin: 2vmin 0 0 2vmin;
  background: url(${(props) => props.image == null ? '/Assets/images/defaults/defaultVenue.png' : props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.5vmin;
`
const DataBoxedImageOverlay = styled.div`
  position: absolute;
  border-radius: 0.5vmin;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: rgba(0,0,0,0.13);
  border-radius: 0.5vmin;
`
const DataHeading = styled.div`
  padding-bottom: 0.5vmin;
  color: ${RP_DARK_GREY};
  font-size: 2.3vmin;
  font-weight: 600;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 1px solid ${RP_DDD};

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3.5vmin;
  }
`

/* VENUE ACTION BUTTONS */
const ActionWrapper = styled.div`
  position: relative;
  padding: 1vmin;
`
const ActionButton = styled(EditButton)`
  cursor: ${(props) => props.noAction ? 'default' : 'pointer'};
  display: block;
  position: relative;
  padding: 0.3vmin 0;
  margin: 0 auto;
  background: inherit;
  color: ${RP_DARK_GREY};
  font-size: 2.25vmin;
  text-align: left;
  transition: all 0.25s ease;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  i {
    color: ${RP_DARK_GREY};
  }

  &:hover {
    background: inherit;
    color: ${RP_BLACK};

    i {
      color: ${RP_BLACK};
    }
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`

/** MODAL EDITOR CONTAINER **/
const SubInfoContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  text-align: left;
  padding-left: 2vmin;
`
const FormInputLabel = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  font-size: 2vmin;
  text-align: left;
  margin-bottom: 1vmin;
`
const VenueTitle = styled.div`
  display: block;
  position: relative;
  width: auto;
  color: ${RP_BLACK};
  text-align: left;
  font-size: 2.25vmin;
  font-weight: bold;
  line-height: normal;
`
const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.background || RP_RED};
  color: ${RP_WHITE};
  text-align: center;
  padding: 1.5vmin;
  transition: 0.25s ease;
  -webkit-transition: 0.25s ease;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const VenueTab = ({color,icon,type}) =>
(
  <TabWrapper background={color}>
    <i className={icon} style={{fontSize:"2.5vmin"}} />
  </TabWrapper>
);
const ConfirmCampaign = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 2vmin 3vmin;
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2.75vmin;
  }

  &:hover {
    background: ${RP_SUPER_LIGHT};
    cursor: pointer;
  }
`
const Progress = styled.div`
  display: inline-block;
  float: right;
  color: ${RP_GREEN}
`
const FeedButton = styled(Link)`
  display: block;
  position: relative;
  cursor: pointer;
  font-family: ${RP_FONT};
  font-size: 1.8vmin;
  text-align: center;
  outline: none;
  width: calc(100% - 6vmin);
  margin-top: 2vmin;
  padding: 1vmin 3vmin;
  color: #FFF;
  min-width: 1.8vmin;
  min-height: 1.8vmin;
  background-color: ${props => props.background || RP_PINK };
  transition: background ease 0.25s;
  line-height: 1.5;

  &:hover {
    background-color: ${props => props.hoverBackground || RP_RED };
    color: #FFF;
  }
`
const VenueActions = styled.div`
  display: inline-block;
  position: relative;
  width: calc(50% - 4vmin);
  vertical-align: top;
  padding: 2vmin;
`
const TextRight = styled.div`
  text-align: right;
`
const TagWrap = styled.div`
  display: block;
  height: auto;
  background: ${RP_WHITE};
  margin-top: 2vmin;
  margin-bottom: 2vmin;
  text-align: left;
`
const GenreWrap = styled.div`
  display: inline-block;
  margin-top: 1vmin;
  margin-right: 1vmin;
  padding: 1vmin;
  background: ${RP_GREEN};
  color: #FFF;
  border-radius: 0.5vmin;
  line-height: 2.5vmin;

  &:last-child {
    margin-right: 0;
  }
`
const GenreX = styled.i`
  display: inline-block;
  font-size: 2vmin;
  padding-left: 1vmin;

  &:hover {
    cursor: pointer;
    color: ${RP_SUPER_LIGHT};
  }
`