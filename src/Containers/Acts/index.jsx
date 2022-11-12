import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths, validators } from 'globals'

import { App } from 'Containers'
import { RP_Act, RP_User, RP_Organization } from 'Models'

import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_RED, RP_BLACK, RP_WHITE, RP_GREEN, SPOTIFY_GREEN, RP_BLUE, RP_DARKBLUE, RP_PINK, RP_ORANGE, RP_DARKORANGE, FACEBOOK, FACEBOOK_DEFAULT, RP_YELLOW, RP_PURPLE, RP_DARKPURPLE, RP_FONT, RP_DARKGREY, RP_DARK_GREY, RP_SUPER_LIGHT, Bold, Clear, MyPageWrapper } from 'Components' // GLOBALS
import { Modal, WarningModal, SidePanel, ModalSection, ModalHeading, ModalSubheading, ImagePanel, ImagePanelOverlay, Description, DescriptionTextBox, ModalButtons, EditButton, PositiveButton, NegativeButton, TabbedData } from 'Components'  // MODAL & MODALOTHERS
import { MainEntity, ColorButton, IconButton } from 'Components' // MY
import { RoundButton, FormButton } from 'Components' // BUTTON
import { Input, TextBox, Select } from 'Components' // INPUT
import { Image, ActBioImage } from 'Components' // IMAGE
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { FormSeparator  } from 'Components' // CHECKBOX
import { SelectGenres } from 'Components' // CHECKBOX
import { UploadImage } from 'Components' // UPLOADIMAGE
import { UploadMusic } from 'Components' // UPLOADMUSIC
import { Checkbox } from 'Components' // CHECKBOX
import { Title } from 'Components' // TITLE
import { Link } from 'Components' // LINK
import { TabBox } from 'Components'
import { Badge } from 'Components'

import { ActOrganization } from './ActOrganization/index.jsx'
import { ActionMessage } from './ActionMessage/index.jsx'

import selectors from './selectors'
import actions from './actions'
import constants from './constants'


export class Acts extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      act: null,
      showBandPanel: false,
      showMusicPanel: false,
      formErrorShow: false,
      bandError: '',
      name: '',
      bio: '',
      genre: null,
      genre_text: 'Select a genre..',
      current_city: null,
      current_city_text: '',
      hometown: null,
      hometown_text: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      spotify: '',
      soundcloud: '',
      bandcamp: '',
      website: '',
      selectedGenres: [],
      activeId: null,
      picture: null,
      pictureData: null,
      playlistId: null,

      show_payout_warning: false,
      paying_act: null,

      show_remove_organization_warning: false,
      removing_organization: null
    }
  }

  render() {
    const user         = this.props.user || null
    const active_act   = this.props.active_act || null
    const bands        = this.props.bands || []
    const cities       = this.props.cities || []
    const genres       = this.props.genres || []
    const spotify      = this.props.spotify || null
    const acts_loading = this.props.acts_loading || null
    
    const userId    = user && user.id || null
    const has_bands = (bands.length > 0)

    return (
      <App requireAuth artistPage>
        <MyPageWrapper>
          <Title title='My Acts' summary='Edit info, view events, get paid'/>
          <ActionMessage has_bands={has_bands}/>
          <MyBandList>
            {/* EDIT BAND PANEL */}
            <Modal show={this.state.showBandPanel} onClose={(e) => this.closeModal()} transparent>
              <SidePanel>
                <ModalSection top>
                  <ModalHeading>Act Info</ModalHeading>
                  <ModalSubheading>
                    { this.state.activeId == null
                      ? 'Just add a name, bio, and one social link to create your act - everything else is optional.'
                      : 'Edit your act details' }
                  </ModalSubheading>
                  <UploadImage
                    default_image={this.state.picture}
                    onChange={(data) => this.updateState({ picture: data, pictureData: data })}
                    text="Update act photo"
                    height="26vmin"
                    disablePictureRemove
                    clear_when_changed={this.state.showBandPanel}/>
                </ModalSection> 

                {/* NAME + DESCRIPTION */}
                <ModalSection>
                  <TextRight>
                    <Input
                      value={this.state.name}
                      validate={validators.ALL_THE_SHIT()}
                      onValidate={(text) => this.updateState({name:text})}
                      style={{padding:'2vmin 3vmin',borderRadius:'0.5vmin'}}
                      placeholder="Name (Can't be empty!)"
                      maxLength='200'/>
                  </TextRight>
                  <TextRight>
                    <DescriptionTextBox value={this.state.bio} onChange={(e) => this.updateState({bio: e.target.value})} placeholder="Bio (Can't be empty!)" maxLength='500'></DescriptionTextBox>
                  </TextRight>

                  <Select style={{marginTop:'2vmin'}}
                    options={
                      cities.map(city => {
                        return {
                          value: city.id,
                          label: city.name
                        }
                      })
                    }
                    onChange={(e) => this.updateState({hometown:e.value,hometown_text:e.label})}
                    placeholder={ this.state.hometown_text || 'Where\'s your act from?' } />
                </ModalSection>

                {/* GENRE */}
                <ModalSection>
                  <ModalHeading>Genres</ModalHeading>
                  <ModalSubheading>What kind of shows will you play?</ModalSubheading>
                  <SelectGenres
                    genres={genres}
                    selectedGenres={this.state.selectedGenres}
                    onChange={(selectedGenres) => this.updateState({selectedGenres:selectedGenres})}/>
                </ModalSection>

                {/* SOCIAL MEDIA */}
                <ModalSection>
                  <ModalHeading>Social Media</ModalHeading>
                  <ModalSubheading>Give your fans a way to connect with you</ModalSubheading>
                  <Input
                    value={(this.state.facebook || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({facebook: text})}
                    placeholder='Facebook'
                    image='facebook'
                    focusImage='facebook-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.twitter || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({twitter: text})}
                    placeholder='Twitter'
                    image='twitter'
                    focusImage='twitter-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.instagram || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({instagram: text})}
                    placeholder='Instagram'
                    image='instagram'
                    focusImage='instagram-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.youtube || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({youtube: text})}
                    placeholder='YouTube'
                    image='youtube'
                    focusImage='youtube-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.spotify || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({spotify: text})}
                    placeholder='Spotify'
                    image='spotify'
                    focusImage='spotify-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.soundcloud || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({soundcloud: text})}
                    placeholder='SoundCloud'
                    image='soundcloud'
                    focusImage='soundcloud-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.bandcamp || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({bandcamp: text})}
                    placeholder='Bandcamp'
                    image='bandcamp'
                    focusImage='bandcamp-focus'
                    maxLength='200'/>
                  <Input
                    value={(this.state.website || '')}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({website: text})}
                    placeholder='Website'
                    image='website'
                    focusImage='website-focus'
                    maxLength='200'/>
                </ModalSection>

                <ModalSection style={{paddingBottom:'12vmin'}}>
                  <ModalButtons>
                    { this.state.name && this.state.bio 
                      ? this.state.activeId != null
                        ? <PositiveButton onClick={() => this.updateBand()}>Save</PositiveButton>
                        : <PositiveButton onClick={() => this.createBand()}>Create</PositiveButton>
                      : this.state.activeId != null
                        ? <NegativeButton style={{cursor:'default',background:RP_DARK_GREY,color:'#FFF'}}>Save</NegativeButton>
                        : <NegativeButton style={{cursor:'default',background:RP_DARK_GREY,color:'#FFF'}}>Create</NegativeButton> }
                  </ModalButtons>
                </ModalSection>
              </SidePanel>
            </Modal>

            <LoadingIndicator loading={acts_loading} is_child_visible={bands.length > 0}>
              { bands.map((act, index) => {
                  const _Act = RP_Act(act)
                  const organization_requests_count = (_Act.organizations.filter(act_org => act_org.is_accepted === null && act_org.is_application === true) || []).length
                  return (
                    <MainEntity key={_Act.id}
                      picture={_Act.picture}
                      title={_Act.name}
                      link={paths.acts(_Act.id)}
                      no_plus
                      actions={[
                        <ColorButton key={_Act.id+"b_1"}
                          onClick={() => this.editAct(_Act,index,userId)}>
                          <i className="fa fa-pencil"/>&nbsp;&nbsp;
                          Edit
                        </ColorButton>,
                        <ColorButton key={_Act.id+"b_2"} color={RP_RED} hoverColor={RP_PINK}
                          onClick={() => this.props.actCalendar(_Act.id)}>
                          <i className="fa fa-calendar"/>&nbsp;&nbsp;
                          Calendar
                        </ColorButton>,
                        <ColorButton key={_Act.id+"b_5"} color={RP_PURPLE} hoverColor={RP_DARKPURPLE}
                          onClick={() => this.props.tours(_Act.id)}>
                          <i className="fa fa-plane"/>&nbsp;&nbsp;
                          Touring
                        </ColorButton>,
                        <br key={_Act.id+"br_i"}/>,
                        <ColorButton key={_Act.id+"b_3"} color={FACEBOOK_DEFAULT} hoverColor={FACEBOOK}
                          onClick={() => this.props.acts(_Act.id)}>
                          <i className="fa fa-user"/>&nbsp;&nbsp;
                          Profile
                        </ColorButton>,
                        <ColorButton key={_Act.id+"b_6"} color={RP_ORANGE} hoverColor={RP_DARKORANGE}
                          onClick={() => this.props.actStats(_Act.id)}>
                          <i className="fa fa-bar-chart"/>&nbsp;&nbsp;
                          Statistics
                        </ColorButton>,
                        <ColorButton key={_Act.id+"b_7"} color={RP_GREEN} hoverColor={SPOTIFY_GREEN} onClick={() => this.payout(_Act)}>
                          <i className="fa fa-usd"/>&nbsp;&nbsp;
                          Pay Me
                        </ColorButton>,
                        <ActBalance key={_Act.id+"_balance"} onClick={() => this.payout(_Act)}>
                          ${_Act.account_balance}
                        </ActBalance>]}>
                      <FormSeparator text="Organizations" padding="0"/>
                      <div key="Organizations">
                        { _Act.has_organizations
                          ? _Act.organizations.map(organization_band => {
                            const _User = RP_User(this.props.user)
                            const _Organization = RP_Organization(organization_band.organization)
                            if(organization_band.is_accepted || organization_band.is_application){
                              return (
                                <ActOrganization key={organization_band.id}
                                  picture={_Organization.picture}
                                  title={<span>
                                      { _Organization.title }&nbsp;
                                      { organization_band.is_accepted && organization_band.is_application
                                        ? <i className="fa fa-check-circle" style={{color:RP_GREEN}} />
                                        : <i className="fa fa-question-circle-o" style={{color:RP_RED}} /> }
                                    </span>}
                                  subtitle={
                                    organization_band.is_accepted === null 
                                    ? _Act.userIsOwner(_User.user)
                                      ? 'Does your act work with this organization?'
                                      : 'Awaiting approval'
                                    : organization_band.is_application === null
                                      ? _Organization.userIsManager(_User.user)
                                        ? 'Do you work with this organization?'
                                        : 'Awaiting approval'
                                      : null }
                                  link={paths.organizations(_Organization.id)}
                                  actions={
                                    (organization_band.is_accepted === null && _Act.userIsOwner(_User.user))
                                    || (organization_band.is_application === null && _Organization.userIsManager(_User.user))
                                    ? <div>
                                        <IconButton key={_Act.id+"p_1"} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}
                                          onClick={() => this.props.confirmOrganizationMembership(organization_band.id)}>
                                          <i className="fa fa-check"/>
                                        </IconButton>
                                        <IconButton key={_Act.id+"p_2"} color={RP_PINK} hoverColor={RP_RED}
                                          onClick={() => this.props.denyOrganizationMembership(organization_band.id)}>
                                          <i className="fa fa-times"/>
                                        </IconButton>
                                      </div>
                                    : <div>
                                        <IconButton key={_Act.id+"a_3"} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}
                                          onClick={() => this.props.organizations(_Organization.id)}>
                                          <i className="fa fa-user"></i>
                                        </IconButton>
                                        <IconButton key={_Act.id+"a_5"} color={RP_PINK} hoverColor={RP_RED}
                                          onClick={() => this.updateState({show_remove_organization_warning:true,removing_organization:organization_band})}>
                                          <i className="fa fa-times"></i>
                                        </IconButton>
                                      </div>}/>
                                )
                            }})
                          : <ModalSubheading style={{textAlign:'center',margin:'3vmin 0'}}>
                              This act isn't affiliated with any organizations.
                            </ModalSubheading> }
                      </div>
                    </MainEntity>)
                })}
              <MainEntity
                new_picture='/Assets/images/apps/acts.png' 
                onCreate={() => {
                  this.updateState({
                    showBandPanel:true,
                    canModify:true,
                    name:'',
                    bio:'',
                    activeId:null,
                    picture: null,
                    pictureData: null
                  })}}/>
            </LoadingIndicator>
          </MyBandList>
        </MyPageWrapper>
        <WarningModal light_warning
          show={this.state.show_payout_warning}
          description="Are you sure you would like to withdraw all funds from your act?"
          onContinue={() => this.props.payout(this.state.paying_act)}
          onClose={() => this.updateState({show_payout_warning:false,paying_act:null})}/>
        <WarningModal light_warning
          show={this.state.show_remove_organization_warning}
          description="This will remove your act from the chosen organization."
          onContinue={() => this.props.removeBandOrganization(this.state.removing_organization)}
          onClose={() => this.updateState({show_remove_organization_warning:false,removing_organization:null})}/>
      </App>
    )
  }

  editAct(_Act,index,userId){
    this.updateState({
      showBandPanel:true,
      picture:_Act.picture,
      pictureData: null,
      name:_Act.name,
      bio:_Act.short_bio,
      hometown:_Act.hometown_id,
      hometown_text:_Act.hometown_name,
      facebook: _Act.facebook,
      twitter: _Act.twitter,
      instagram: _Act.instagram,
      youtube: _Act.youtube,
      spotify: _Act.spotify,
      soundcloud: _Act.soundcloud,
      bandcamp: _Act.bandcamp,
      website: _Act.website,
      activeId:index,
      selectedGenres:_Act.genres
    })
  }

  updateBand() {
    let old_details = this.props.bands[this.state.activeId]
    let act = {
      id: old_details.id,
      name: this.state.name,
      short_bio: this.state.bio
    }

    if (this.state.pictureData) { act['picture'] = this.state.pictureData }
    if (this.state.hometown) { act['hometown'] = this.state.hometown }
    if (this.state.current_city) { act['current_city'] = this.state.current_city }

    if (this.state.selectedGenres) { act['genres'] = this.state.selectedGenres.map(genre => genre.id) }

    if (this.state.facebook) { act['facebook'] = this.state.facebook }
    if (this.state.twitter) { act['twitter'] = this.state.twitter }
    if (this.state.instagram) { act['instagram'] = this.state.instagram }
    if (this.state.youtube) { act['youtube'] = this.state.youtube }
    if (this.state.spotify) { act['spotify'] = this.state.spotify }
    if (this.state.soundcloud) { act['soundcloud'] = this.state.soundcloud }
    if (this.state.bandcamp) { act['bandcamp'] = this.state.bandcamp }
    if (this.state.website) { act['website'] = this.state.website }

    if (this.state.pictureData) {
      act['picture'] = this.state.pictureData
    } else {
      delete act['picture']
    }

    if(this.validateSocials(act) && this.validateGenre(act)){
      this.props.updateBand(act, this.closeModal.bind(this))

      if(!this.props.user.profile.welcome_add_act_socials){
        this.props.tutorialEventCompleted(this.props.user, {welcome_add_act_socials:true})
      }
    }
  }

  createBand() {
    let act = {
      name:this.state.name,
      short_bio:this.state.bio,
      owner:this.props.user.id,
      is_redpine: true
    }

    if (this.state.pictureData) { act['picture'] = this.state.pictureData }
    if (this.state.hometown) { act['hometown'] = this.state.hometown }
    if (this.state.current_city) { act['current_city'] = this.state.current_city }

    if (this.state.selectedGenres) { act['genres'] = this.state.selectedGenres.map(genre => genre.id) }

    if (this.state.facebook) { act['facebook'] = this.state.facebook }
    if (this.state.twitter) { act['twitter'] = this.state.twitter }
    if (this.state.instagram) { act['instagram'] = this.state.instagram }
    if (this.state.youtube) { act['youtube'] = this.state.youtube }
    if (this.state.spotify) { act['spotify'] = this.state.spotify }
    if (this.state.soundcloud) { act['soundcloud'] = this.state.soundcloud }
    if (this.state.bandcamp) { act['bandcamp'] = this.state.bandcamp }
    if (this.state.website) { act['website'] = this.state.website }

    if(this.validateSocials(act) && this.validateGenre(act)){
      this.props.createBand(act, this.closeModal.bind(this))

      if(!this.props.user.profile.welcome_create_act || !this.props.user.profile.welcome_add_act_socials){
        this.props.tutorialEventCompleted(this.props.user, {welcome_create_act:true,welcome_add_act_socials:true})
      }
    }
  }

  validateSocials(act){
    if(RP_Act(act).hasSocialLink()) return true
      
    this.props.errorMessage('Please add at least one social media or website link.')
    return false
  }

  validateGenre(act){
    if(RP_Act(act).has_genre) return true
      
    this.props.errorMessage('Please add at least one genre tag.')
    return false
  }

  payout(_Act){
    if(_Act.account_balance > 10.00){
      this.updateState({show_payout_warning:true,paying_act:_Act.id})
    }else{
      this.props.errorMessage('A $10 minimum is required to request a payout. (If you really need the money, please contact us)')
    }
  }

  closeModal() {
    this.updateState({
      showBandPanel:false,
      showMusicPanel:false
    })
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
    user: appSelectors.selectUser(state),
    cities: appSelectors.selectCities(state),
    genres: appSelectors.selectGenres(state),
    spotify: appSelectors.selectSpotify(state),

    acts_loading: selectors.selectActsLoading(state, props),
    active_act: selectors.selectActiveAct(state, props),
    bands: selectors.selectBands(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(actions.loadData())
    },
    acts: (act_id) => {
      dispatch(push(paths.acts(act_id)))
    },
    organizations: (organization_id) => {
      dispatch(push(paths.organizations(organization_id)))
    },
    actCalendar: (act_id) => {
      dispatch(push(paths.actCalendar(act_id)))
    },
    tours: (act_id) => {
      dispatch(push(paths.tours(act_id)))
    },
    actStats: (act_id) => {
      dispatch(push(paths.actStats(act_id)))
    },
    messageUser: (user) => {
      dispatch(push(paths.messageUser(user)))
    },
    hometownVenues: (hometown) => {
      dispatch(push(paths.search('venues','',hometown)))
    },
    createBand: (band,closeModal) => {
      dispatch(actions.createBand(band,closeModal))
    },
    updateActPartial: (data) => {
      dispatch(actions.updateActPartial(data))
    },
    updateBand: (band,closeModal) => {
      dispatch(actions.updateBand(band,closeModal))
    },
    confirmOrganizationMembership: (organization_band) => {
      dispatch(actions.confirmOrganizationMembership(organization_band))
    },
    denyOrganizationMembership: (organization_band) => {
      dispatch(actions.denyOrganizationMembership(organization_band))
    },
    removeBandOrganization: (organization_band) => {
      dispatch(actions.removeBandOrganization(organization_band))
    },
    payout: (act) => {
      dispatch(actions.payout(act))
    },
    tutorialEventCompleted: (user, events) => {
      dispatch(appActions.tutorialEventCompleted(user, events))
    },
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    },
    successMessage: (text) => {
      dispatch(appActions.success_message(text))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    },
    bandError: (error) => {
      dispatch(actions.bandError(error))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Acts)

const MyBandList = styled.div`
  display: block;
  height: auto;
  margin: 0 auto;
  font-size: 2.25vmin;
`
const TextRight = styled.div`
  text-align: right;
  font-size: 2.25vmin;
`
const ActBalance = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5vmin;
  padding: 2vmin;
  color: ${RP_BLACK};
  font-weight: 200;

  &:hover {
    color: ${RP_GREEN};
    cursor: pointer;
  }
`