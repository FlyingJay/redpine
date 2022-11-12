import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { validators, paths } from 'globals'

import { App } from 'Containers' 
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_RED, RP_BLACK, RP_BLUE, RP_DARKBLUE, RP_WHITE, RP_DARKGREY, RP_DDD, SPOTIFY_GREEN,
          RP_DARK_GREY, RP_GREEN, RP_PINK, RP_SUPER_LIGHT, RP_FONT, Bold, Clear } from 'Components' // GLOBALS
import { Modal, ModalHeading, ModalSubheading, SidePanel, ModalSection, TotalLandingWrapper, LandingInfoWrapper, 
          InnerContentWrapper, InnerContent, ContentMinorHeading, ContentMajorHeading, ContentSummary, 
          ContentAction, LandingInfoDetails, DetailsSection, DetailsHeading, DetailsSubheading, DetailsSubsection, SubsectionHeading, 
          SubsectionSummary, LandingInfoFooter, FooterHeading, FooterAction, FormScreenStep, NormalButton, PrevButton } from 'Components' // MODAL AND MODALOTHERS
import { Input, BasePanel, FormInput, TextBox, Button, TutorialIconator } from 'Components' // BUTTON, INPUT
import { DetailsWrap, DetailsSepa, DetailName, DetailDescription } from 'Components' // CREATION
import { ProgressBar } from 'Components' // PROGRESS BAR
import { UploadImage } from 'Components' //UPLOADIMAGE
import { FormError } from 'Components' // ERROR
import { Link } from 'Components' //LINK

import selectors from './selectors'
import actions from './actions'


export class VenuesCreate extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      /** DEFAULTS **/
      formProgress: 0,
      modalState: false,

      /** FORM SECTION **/
      page:1
    }
  }

  render() {
    return (
      <App>
        <MobileFirstDiv>

          {/* LANDING INFO */}
          <LandingInfo 
            showVenueCreate={() => this.updateState({modalState: true})}
            userData={this.props.user ? this.props.user : null} 
            becomeAVenue={() => this.props.settings()} 
            logInToContinue={() => this.props.viewLogin()} />

          {/* CREATE A VENUE */}
          {
            this.props.user && this.props.user.profile.is_venue
            ? <Modal show={this.state.modalState} onClose={() => this.updateState({modalState: false})} transparent>
                <ProgressBar progress={this.state.formProgress} color={RP_PINK} fixedOnTop={true} />

                <SidePanel>
                  <ModalSection top>
                    <FormError error={this.props.creationError.address ? 'The provided address seems to be invalid...' : null} />

                    {/**********************************
                    ****** FIRST PART OF THE FORM ******
                    ************************************/}
                    <FormScreenStep show={this.state.page == 1}>

                      {/* VENUE NAME, VENUE LOCATION, VENUE CAPACITY */}
                      <ModalHeading>Venue Details</ModalHeading>
                      <ModalSubheading style={{padding: '0 0 2vmin 0'}}>
                        Just the typical details like venue name and location
                      </ModalSubheading>

                      {/* VENUE NAME */}
                      <Input
                        image="name" focusImage="nameFocus" 
                        validate={validators.STANDARD_CHARACTERS()}
                        onValidate={(text) => this.updateState({title: text})}
                        placeholder="Venue Name"
                        maxLength="200" />

                      {/* VENUE LOCATION */}
                      <Input
                        image="location" focusImage="location-focus"
                        validate={validators.STANDARD_CHARACTERS()}
                        onValidate={(text) => this.updateState({address: text})}
                        placeholder="Street Address" 
                        maxLength="200" />

                      <Input 
                        image="dot" focusImage="dot-focus"
                        placeholder="Postal / ZIP"
                        validate={validators.LETTERS_NUMBERS()}
                        onValidate={(text) => this.updateState({postal_code: text})}
                        maxLength="7" />

                      {/* VENUE CAPACITY */}
                      <Input 
                        image="capacity" focusImage="capacity-focus"
                        validate={validators.POSITIVE_INTEGER()}
                        onValidate={(text) => this.updateState({capacity: text})}
                        placeholder="Venue Capacity (e.g. 200)" />

                      {/* FORM NAVIGATION BUTTONS */}
                      {
                        (this.state.title && this.state.address && this.state.postal_code && this.state.capacity)
                        ? <NormalButton 
                            onClick={() => this.updateState({page:2, formProgress:50})} 
                            style={{float: 'right', margin: '3vmin auto 0 auto'}}>
                            Next &nbsp; <i className="fa fa-arrow-right"/>
                          </NormalButton>
                        : null
                      }
                    </FormScreenStep>

                    {/**********************************
                    ***** SECOND PART OF THE FORM ******
                    ************************************/}
                    <FormScreenStep show={this.state.page == 2}>

                      {/* VENUE PICTURE AND DESCRIPTION */}
                      <ModalHeading>Important Info</ModalHeading>
                      <ModalSubheading style={{padding: '0 0 2vmin 0'}}>
                        What should everyone know about your space? 
                      </ModalSubheading>
                      <UploadImage
                        default_image={this.state.picture}
                        onChange={(data) => this.updateState({ picture: data })}
                        text="Choose a venue photo"
                        height="33vh"
                        disablePictureRemove/>

                      {/* VENUE DESCRIPTION */}
                      <DescriptionBox
                        onChange={(e) => this.updateState({ description:e.target.value })}
                        placeholder="Venue Description" 
                        maxLength="5000"/>

                      <PrevButton 
                        onClick={() => this.updateState({ page:1, formProgress:0 })} 
                        style={{float: 'left', margin: '3vmin auto 0 auto'}}>
                        <i className="fa fa-arrow-left"/>&nbsp;Back
                      </PrevButton>
                      {
                        this.state.description
                        ? <NormalButton 
                            onClick={() => this.updateState({ page:3, formProgress:100 })} 
                            style={{float: 'right', margin: '3vmin auto 0 auto'}}>
                            Review&nbsp;<i className="fa fa-arrow-right"/>
                          </NormalButton>
                        : null
                      }
                    </FormScreenStep>

                    {/**********************************
                    ***** FINALIZE PART OF THE FORM ****
                    ************************************/}
                    <FormScreenStep show={this.state.page == 3}>
                      <ModalHeading>Quick Review</ModalHeading>
                      <ModalSubheading style={{padding: '0 0 2vmin 0'}}>
                        Are these details correct?
                      </ModalSubheading>

                      <DetailsWrap>
                        <DetailName>Title</DetailName>
                        <DetailDescription>{this.state.title}</DetailDescription>
                      </DetailsWrap>
                      <DetailsWrap>
                        <DetailName>Description</DetailName>
                        <DetailDescription>{this.state.description}</DetailDescription>
                      </DetailsWrap>
                      <DetailsSepa></DetailsSepa>

                      <DetailsWrap>
                        <DetailName>Address</DetailName>
                        <DetailDescription>{this.state.address}, {this.state.postal_code}</DetailDescription>
                      </DetailsWrap>
                      <DetailsWrap>
                        <DetailName></DetailName>
                        <DetailDescription>*RedPine will add your city during our verification process.</DetailDescription>
                      </DetailsWrap>
                      <DetailsWrap>
                        <DetailName>Max. Capacity</DetailName>
                        <DetailDescription>{this.state.capacity} people</DetailDescription>
                      </DetailsWrap>
                      <DetailsSepa></DetailsSepa>

                      <PrevButton onClick={() => this.updateState({page:2, formProgress:50})} style={{float: 'left', margin: '3vmin auto 0 auto'}}>
                        <i className="fa fa-arrow-left"></i> &nbsp; Back
                      </PrevButton>
                      <NormalButton 
                        onClick={() => this.saveVenue()} style={{float:'right', margin:'3vmin auto 0 auto'}}>
                        <i className="fa fa-check"></i> &nbsp; Finalize
                      </NormalButton>
                    </FormScreenStep>
                  </ModalSection>
                </SidePanel>
                <Clear></Clear>
              </Modal>
            : null
          }
        </MobileFirstDiv>
      </App>
    )
  }

  saveVenue() {
    if (this.props.isSaving)
      return

    const venue = {
      title: this.state.title,
      description: this.state.description,
      capacity: this.state.capacity,
      address: this.state.address,
      postal_code: this.state.postal_code,
      picture: this.state.picture
    }

    this.props.saveVenue(venue)
    this.props.tutorialEventCompleted(this.props.user, {welcome_create_venue:true})
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
    isSaving: selectors.selectIsSaving(state, props),
    creationError: selectors.selectCreationError(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveVenue: (venue) => {
      dispatch(actions.saveVenue(venue))
    },
    viewLogin: () => {
      dispatch(appActions.redirectToLogin())
    },
    tutorialEventCompleted: (user, events) => {
      dispatch(appActions.tutorialEventCompleted(user, events))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VenuesCreate)


const LandingInfo = ({showVenueCreate, userData, becomeAVenue, logInToContinue}) => (
  <TotalLandingWrapper>
    
    {/* LANDING INFO BANNER */}
    <LandingInfoWrapper image="/Assets/images/background/bg9.jpg" mobileImage="/Assets/images/background/bg8.jpg">
      <InnerContentWrapper>
        <InnerContent>
          <ContentMinorHeading>LIST YOUR MUSIC VENUE</ContentMinorHeading>
          <ContentMajorHeading>List your business in seconds and help live music thrive.</ContentMajorHeading>
          <ContentSummary>Whether you&#39;re a pub, bar, or dedicated music venue, there are no fees associated with listing your business in our directory. Scroll down to learn about the benefits of being listed on RedPine.</ContentSummary>
          {
            userData
            ? userData.profile.is_venue
              ? <ContentAction onClick={showVenueCreate}>Get Started</ContentAction>
              : <Link href={paths.settings()}><ContentAction>Become a Venue</ContentAction></Link>
            : <Link redirectToLogin><ContentAction>Log in to get started</ContentAction></Link>
          }
        </InnerContent>
      </InnerContentWrapper>
    </LandingInfoWrapper>

    {/* LANDING INFO DETAILS */}
    <LandingInfoDetails>
      <InnerContentWrapper width="auto">

        {/* WHAT'S A CAMPAIGN */}
        <DetailsSection>
          <DetailsHeading>The Benefits</DetailsHeading>
          {/*<DetailsSubheading>Learn a bit about the benefits of listing on RedPine, how we work and what is required from you (the Venue).</DetailsSubheading>*/}

          <DetailsSubsection display>
            <i className="fa fa-list"/>
            <SubsectionHeading>Free Listings</SubsectionHeading>
            <SubsectionSummary>As part of our mission to make live music accessible, we <Bold>don&#39;t charge</Bold> businesses to use our platform. Our costs are covered through a service fee on ticket purchases, should artists choose to ticket through our platform.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-calendar-o "/>
            <SubsectionHeading>Complete Control</SubsectionHeading>
            <SubsectionSummary>You&#39;re in charge. You&#39;ll receive all the info you need from artists at the point of booking including genre, social media, and previous shows. Then, you may turn down the request or continue the conversation.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-music"/>
            <SubsectionHeading>New Artists</SubsectionHeading>
            <SubsectionSummary>Artists use RedPine to discover venues. Whether they&#39;re a local or touring act, you&#39;ll meet new clients with RedPine.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-search-plus"/>
            <SubsectionHeading>Relevant Requests</SubsectionHeading>
            <SubsectionSummary>Already drowning in booking requests? Let us know what you&#39;re looking for and we'll ensure that you only receive requests that suit your business&#39; needs.</SubsectionSummary>
          </DetailsSubsection>
        </DetailsSection>
      </InnerContentWrapper>
    </LandingInfoDetails>

    {/* LANDING INFO FOOTER */}
    <LandingInfoFooter image="/Assets/images/background/bg3.jpg">
      <FooterHeading>List your venue and give the world a new stage!</FooterHeading>
      <Clear></Clear>
      {
        userData
        ? userData.profile.is_venue
          ? <FooterAction onClick={showVenueCreate}>Get Started</FooterAction>
          : <FooterAction onClick={becomeAVenue}>Become a Venue</FooterAction>
        : <FooterAction onClick={logInToContinue}>Log in to get started</FooterAction>
      }
    </LandingInfoFooter>
  </TotalLandingWrapper>
);

const MobileFirstDiv = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`
const DescriptionBox = styled(TextBox)`
  display: block;
  position: relative;
  min-height: 20vmin;
  max-height: 33vmin;
  padding: 2vmin 3vmin;
  resize: vertical;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    max-width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`