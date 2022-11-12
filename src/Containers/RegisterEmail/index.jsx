import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { paths, getQueryParams } from 'globals'

import { RP_Act } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { Bold } from 'Components'
import { Link, BackgroundPanel, LoginPanel, TextButton, Input, FormButton, RP_BLACK, RP_WHITE, RP_PINK, RP_RED, RP_DARK_GREY, Checkbox, FormError, Clear } from 'Components'
import { SelectSocialLink } from 'Components'
import { SelectMusicLink } from 'Components'
import { SelectGenres } from 'Components'
import { Select } from 'Components'

import actions from './actions'
import selectors from './selectors'


export class RegisterEmail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      act: null,
      hometown: null,
      genres: [],
      birthdate: moment(),

      social_option: null,
      music_option: null,
      facebook: null,
      twitter: null,
      instagram: null,
      youtube: null,
      soundcloud: null,
      bandcamp: null
    }

    const params = getQueryParams()
    let update = {}

    if (params.token) {
      update.token = params.token
      update.is_artist = true,
      update.step = 4
    }
    if (params.email) {
      update.email = params.email
    }
    if (params.referrer) {
      update.referrer = params.referrer
    }
    this.updateState(update)
  }

  render() {
    const genres = this.props.genres || []
    const cities = this.props.cities || []
    const error = this.props.error || {}

    return (
      <App forbidAuth>
        <BackgroundPanel background='happi.png'>
          <LoginPanel>
            {
              /*
                FACEBOOK SIGNUP REMOVED FOR NOW - 8/30/2018 (Jason)
                <Link href={paths.register()}>
                  <BackBtn name="register">
                    <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;
                    <span style={{color: RP_DARK_GREY}}>Sign up with Facebook</span>
                  </BackBtn>
                </Link>
              */
            }
            <Clear></Clear>
            <FormError error={error.detail} />

            {/* USER TYPE */}
            <FormSubsection show={this.state.step == 1}>
              <Notice style={{marginTop: '0'}}>
                For us to provide you with the best experience possible, we need to know who you are from the options below. Once you're done click <b style={{fontWeight: 'bold'}}>Continue</b>.
              </Notice>
              <Spacer />
              <Checkbox name='is-fan' label="I am a Fan" onChange={(val) => this.updateState({is_fan: val})} />
              <Checkbox name='is-artist' label="I am an Artist" checked={this.state.is_artist} onChange={(val) => this.updateState({is_artist: val})} />
              <Checkbox label="I am an Industry Professional" onChange={(val) => this.updateState({is_venue:(val || this.state.is_venue), is_artist:(val || this.state.is_artist)})} />
              <Checkbox name='is-venue' label="I operate a Venue" onChange={(val) => this.updateState({is_venue: val})} />
               <Bottom>
                <Link href={paths.login()}>
                  <LoginBtn name='login'>Login</LoginBtn>
                </Link>
                { this.state.is_fan || this.state.is_artist || this.state.is_venue
                  ? <NextBtn name='next-step' onClick={() => this.step1Next()}>Continue</NextBtn>
                  : <BtnDisabled name='next-step'>Continue</BtnDisabled> }
                <Clear></Clear>
              </Bottom>
            </FormSubsection>

            {/* ACT CREATION */}
            <FormSubsection show={this.state.step == 2}>
              <Notice style={{marginTop: '0'}}>
                So you're an artist? Add some basic details for your act to help us find you opportunities. Once you're done click <b style={{fontWeight: 'bold'}}>Continue</b>.
              </Notice>
              <Spacer />
              <Input error={error.act} type='text' placeholder='Act Name' image='last-name' focusImage='last-name-focus' onUpdate={(e) => this.updateState({act: e.target.value })} />

              <Select
                style={{marginBottom:'1vmin'}}
                name='city-select'
                options={
                  cities.map((city) => {
                    return {
                      value: city.id,
                      label: city.name
                    }
                  })
                }
                onChange={(e) => this.updateState({hometown:e.value,hometown_text:e.label})}
                placeholder={ this.state.hometown_text || 'Pick your nearest city..' } />

              <SelectGenres
                genres={genres}
                selectedGenres={this.state.genres}
                onChange={(selectedGenres) => this.updateState({genres:selectedGenres})}/>

              <Bottom>
                <BackBtn style={{marginBottom: '0'}} onClick={() => this.updateState({step:1})}>
                  <i className="fa fa-arrow-left" />&nbsp;&nbsp;back
                </BackBtn>
                { this.state.act && (this.state.genres.length > 0) && this.state.hometown
                  ? <NextBtn name='next-step' onClick={() => this.updateState({step:3})}>Continue</NextBtn>
                  : <BtnDisabled name='next-step'>Continue</BtnDisabled> }
                <Clear></Clear>
              </Bottom>
            </FormSubsection>

            {/* ACT SOCIALS */}
            <FormSubsection show={this.state.step == 3}>
              <Notice style={{marginTop: '0'}}>
                Please add your handle for one social media service, and one music source.
                <br/>
                { this.state.music_option === 0
                  ? <b style={{fontWeight: 'bold'}}>To add your Spotify, include the complete profile link.</b>
                  : <b style={{fontWeight: 'bold'}}>We encourage you to add the rest later.</b> }
              </Notice>
              <Spacer/>
              <SelectSocialLink updateState={(state) => this.updateState(state)}/>
              <SelectMusicLink updateState={(state) => this.updateState(state)}/>
              <Bottom>
                <BackBtn style={{marginBottom: '0'}} onClick={() => this.updateState({step:2})}>
                  <i className="fa fa-arrow-left" />&nbsp;&nbsp;back
                </BackBtn>
                { this.state.social_option != null && this.state.music_option != null
                  ? <NextBtn name='next-step' onClick={() => this.step3Next()}>Continue</NextBtn>
                  : <BtnDisabled name='next-step'>Continue</BtnDisabled> }
                <Clear></Clear>
              </Bottom>
            </FormSubsection>

            {/* USER DETAILS */}
            <FormSubsection show={this.state.step == 4}>
              {
                this.state.is_artist || this.state.is_venue
                ? [
                  <Notice key="notice" style={{marginTop: '0'}}>The fields below ask for your personal information, and not the information for your band or venue.</Notice>,
                  <Spacer key="spacer" />
                ]
                : null
              }
              <Input error={error.first_name} name='first-name' type='text' placeholder='First Name' image='first-name' focusImage='first-name-focus' onUpdate={(e) => this.updateState({first_name: e.target.value})} />
              <Input error={error.last_name} name='last-name' type='text' placeholder='Last Name' image='last-name' focusImage='last-name-focus' onUpdate={(e) => this.updateState({last_name: e.target.value })} />
              <Input error={error.email} type='text' placeholder='Email' image='email' focusImage='email-focus' value={this.state.email} onUpdate={(e) => this.updateState({email: e.target.value})} />
              <Input error={error.username} type='text' placeholder='Username, make it something cool!' image='username' focusImage='username-focus' onUpdate={(e) => this.updateState({username: e.target.value})} />
              <Input error={error.password} type='password' placeholder='Password' image='password' focusImage='password-focus' onUpdate={(e) => this.updateState({password: e.target.value})} />
              {/* Nest an input within the mobiscroll.Date tags to use 
                  that component instead of the default Mobiscroll one. */}
              <mobiscroll.Date
                display="center"
                placeholder="Please Select..."
                value={this.state.birthdate}
                onSet={(value) => this.validateBirthdate(value.valueText)}>
                <Input 
                  placeholder="Birthday"
                  value={this.state.birthdate}
                  error={error.birthdate} 
                  image="dot" 
                  focusImage="dot-focus"/>
              </mobiscroll.Date>
              <Notice>
                By registering you agree to our <Link href={paths.privacyPolicy()}><span>Privacy Policy</span></Link> and <Link href={paths.termsOfUse()}><span>Terms of Use</span></Link>.
              </Notice>
              <Bottom>
                <BackBtn name='back-step' style={{marginBottom:'0'}} onClick={() => this.step4Back()}>
                  <i className="fa fa-arrow-left" />&nbsp;&nbsp;back
                </BackBtn>
                {
                  this.state.first_name && this.state.last_name && this.state.email && this.state.username && this.state.password && this.state.birthdate
                  ? <RegisterBtn name='submit-registration' onClick={() => this.props.submitRegistration(this.state,this.props.redirect)}>
                      Sign Up
                    </RegisterBtn>
                  : <BtnDisabled name="submit-registration-disabled">Sign Up</BtnDisabled>
                }
                <Clear></Clear>
              </Bottom>
            </FormSubsection>
          </LoginPanel>
        </BackgroundPanel>
      </App>
    )
  }

  trimHandle(handle){
    if(handle.startsWith('@') || handle.startsWith('#')){
      return handle.substr(1)
    }
    return handle
  }

  step1Next(){
    if(this.state.is_artist && !this.state.is_venue){
      this.updateState({step:2})
    }else{
      this.updateState({step:4})
    }
  }

  step3Next(){
    if(this.state.social_option == 0){
      this.updateState({facebook:'https://www.facebook.com/'+this.state.facebook,step:4})
    }
    if(this.state.social_option == 1){
      this.updateState({twitter:'https://www.twitter.com/'+this.state.twitter,step:4})
    }
    if(this.state.social_option == 2){
      this.updateState({instagram:'https://www.instagram.com/'+this.state.instagram,step:4})
    }

    if(this.state.music_option == 0){
      this.updateState({spotify:this.state.spotify,step:4})
    }
    if(this.state.music_option == 1){
      this.updateState({youtube:'https://www.youtube.com/user/'+this.state.youtube,step:4})
    }
    if(this.state.music_option == 2){
      this.updateState({soundcloud:'https://www.soundcloud.com/'+this.state.soundcloud,step:4})
    }
    if(this.state.music_option == 3){
      this.updateState({bandcamp:'https://'+this.state.bandcamp+'.bandcamp.com',step:4})
    }
  }

  step4Back(){
    if(this.state.is_artist && !this.state.is_venue && !this.state.token){
      this.updateState({step:3})
    }else{
      this.updateState({step:1})
    }
  }

  validateBirthdate(birthdate){
    if(moment(birthdate).isAfter(Date.now())){
      this.props.error_message('Your birthdate should have already happened.')
    }else{
      this.updateState({birthdate:moment.utc(birthdate).toISOString().slice(0,-5)})
    }
  }

  componentDidMount() {
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
    redirect: appSelectors.selectRedirect(state, props),
    genres: appSelectors.selectGenres(state),
    cities: appSelectors.selectCities(state),

    error: selectors.selectError(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitRegistration: (user,redirect) => {
      dispatch(actions.submitRegistration(user,redirect))
    },
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    },
    error_message: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmail)

const Spacer = styled.div`
  width: 100%
  height: 15px
`
const FormSubsection = styled.div`
  display: ${(props) => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
`
const Notice = styled.div`  
  font-size: 2vmin;
  margin-top: 15px;
  color: ${RP_DARK_GREY};

  span {
    color: ${RP_RED};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`
const BirthdayMessage = styled.div`  
  font-size: 1.7vmin; 
  text-align: center;
  padding: 10px 0;
  color: ${RP_DARK_GREY};
`
const BackBtn = styled(FormButton)`
  display: block;
  position: relative;
  float:left;
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 3vmin;
  background: ${RP_WHITE};
  color: ${RP_DARK_GREY};
  text-align: left;

  &:hover {
    background: ${RP_WHITE};
    color: ${RP_BLACK};
  }
`
const NextBtn = styled(FormButton)`
  display: block;
  position: relative;
  float: right;
`
const LoginBtn = styled(FormButton)`
  display: block;
  position: relative;
  float:left;
  padding-left: 0;
  padding-right: 0;
  background: ${RP_WHITE};
  color: ${RP_DARK_GREY};
  text-align: left;

  &:hover {
    background: ${RP_WHITE};
    color: ${RP_BLACK};
  }
`
const BtnDisabled = styled(FormButton)`
  cursor: defualt !important;
  display: block;
  position: relative;
  float: right;
  background: ${RP_DARK_GREY};
  color: ${RP_WHITE};

  &:hover {
    background: ${RP_DARK_GREY};
    color: ${RP_WHITE};
  }
`
const RegisterBtn = styled(FormButton)`
  display: block;
  position: relative;
  float: right;
`
const Bottom = styled.div`
  position: relative;
  margin-top: 3vmin;
  height: auto;
`