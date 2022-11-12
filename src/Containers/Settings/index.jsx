import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'
import { BuyRedPine } from 'Containers' 

import { RP_RED, RP_DDD, RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_DARKGREY, RP_SUPER_LIGHT, RP_PURPLE, RP_BLUE, RP_ORANGE, RP_GREEN, RP_FONT, Clear, Bold, MyPageWrapper } from 'Components' //GLOBALS
import { FormInput, RoundButton, FormButton } from 'Components' // INPUT & BUTTON
import { Image } from 'Components' // IMAGE
import { Title } from 'Components' // TITLE
import { Link } from 'Components' // LINK
import { LoadingIndicator } from 'Components' 

import Menu from './Menu/index.jsx'
import SettingsSection from './SettingsSection/index.jsx'
import InputSetting from './InputSetting/index.jsx'
import ButtonSetting from './ButtonSetting/index.jsx'
import ToggleSetting from './ToggleSetting/index.jsx'
import ProfilePicture from './ProfilePicture/index.jsx'

import actions from './actions'
import selectors from './selectors'

const SECTIONS = {
  ACCOUNT: 'account',
  REWARDS: 'rewards',
  FINANCES: 'finances',
  PERSONAL: 'personal',
  SOCIAL: 'social',
  COMMUNICATIONS: 'communications',
  PASSWORD: 'password'
}

export class Settings extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      section: SECTIONS.ACCOUNT,
      firstName: '',
      lastName: '',
      username: '',
      email: '',

      addrLine: '100 Music Way',
      addrStreetNo: '100',
      addrStreetName: 'Music Way',
      addrCity: 'Toronto',
      addrProv: 'Ontario',
      addrCountry: 'Canada',
      addrPostal: 'L7L 6J8',

      webLink: 'redpinemusic.com',
      facebookLink: 'facebook.com',
      twitterLink: 'twitter.com',
      instagramLink: 'instagram.com',
      soundcloudLink: 'soundcloud.com',
      youtubeLink: 'youtube.com',
      snapchatLink: 'snapchat.com'
    }
  }

  render() {
    const venues = this.props.venues || []
    const user = this.props.user || {}
    const profile = user.profile || {}

    const has_enough_moneh = (parseFloat(profile.account_balance) >= 10)

    return (
        <App requireAuth>
          <MyPageWrapper style={{textAlign: "left"}}>
            <Title settings="true" title="My Settings" summary="View and edit your account and personal information here" width />
              
              <Menu items={[{
                icon: 'fa fa-bars',
                text: 'Account',
                isSelected: this.state.section === SECTIONS.ACCOUNT,
                onClick: () => this.setSection(SECTIONS.ACCOUNT),
              },{
                icon: 'fa fa-usd',
                text: 'Finances',
                isSelected: this.state.section === SECTIONS.FINANCES,
                onClick: () => this.setSection(SECTIONS.FINANCES),
              },{
                icon: 'fa fa-gift',
                text: 'Rewards',
                isSelected: this.state.section === SECTIONS.REWARDS,
                onClick: () => this.setSection(SECTIONS.REWARDS),

              // }, {
              //   icon: 'fa fa-street-view',
              //   text: 'Personal',
              //   isSelected: this.state.section === SECTIONS.PERSONAL,
              //   onClick: () => this.setSection(SECTIONS.PERSONAL)
              // }, {
              //   icon: 'fa fa-facebook',
              //   text: 'Social',
              //   isSelected: this.state.section === SECTIONS.SOCIAL,
              //   onClick: () => this.setSection(SECTIONS.SOCIAL)
              // }, {
              //  icon: 'fa fa-plane',
              //  text: 'Communication',
              //  isSelected: this.state.section === SECTIONS.COMMUNICATION,
              //  onClick: () => this.setSection(SECTIONS.COMMUNICATION)
              // }, {
              //   icon: 'fa fa-lock',
              //   text: 'Password',
              //   isSelected: this.state.section === SECTIONS.PASSWORD,
              //   onClick: () => this.setSection(SECTIONS.PASSWORD)
              }]} />
            <SettingsDetailsWrap>

              {/* ACCOUNT SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.ACCOUNT}
                title="Account Settings"
                subtitle="View and edit your account information">
                
                <ProfilePicture onChange={(data) => this.setPicture(data)} onError={(err) => this.props.error(err)} picture={profile.picture}/>
                <Clear></Clear><br/>

                <SettingsItem differ="true" background="rgb(246,44,80)" color={RP_WHITE}>
                  <ToggleSetting 
                    label="Enable features for artists" 
                    sublabel="This allows you to create and manage acts."
                    enabled={profile.is_artist} 
                    onChange={(e) => this.setProfile({is_artist: e.target.checked})} />
                </SettingsItem>
                <SettingsItem differ="true" background="rgb(38,98,218)" color={RP_WHITE}>
                  <ToggleSetting 
                    label="Enable features for venues"
                    sublabel="This allows you to create and manage venues." 
                    enabled={profile.is_venue} 
                    onChange={(e) => this.setProfile({is_venue: e.target.checked})} />
                </SettingsItem>
                <SettingsItem differ="true" background={RP_PURPLE} color={RP_WHITE}>
                  <ToggleSetting
                    label="Enable features for industry experts"
                    sublabel="Industry experts make use of both feature sets." 
                    enabled={profile.is_venue && profile.is_artist} 
                    onChange={(e) => this.setProfile({is_venue:e.target.checked, is_artist:e.target.checked})} />
                </SettingsItem>
              </SettingsSection>

              {/* FINANCES SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.FINANCES}
                title="Financial Settings"
                subtitle="View your account balance and request payouts.">
                <SettingsItem>
                  <ButtonSetting 
                    label={'$' + parseFloat(profile.account_balance).toFixed(2)}
                    sublabel={has_enough_moneh
                      ? "You will receice an e-transfer to this email: " + user.email
                      : "You may request an e-transfer once you have a minimum of $10 on your account."}
                    buttonText="Get Paid"
                    disabled={!has_enough_moneh}
                    submitFunction={this.props.requestPayment} />
                </SettingsItem>
                <BaseNote>
                  If you've played a show, your revenue for the event will be deposited in the account for your act. The act's owner will need to pay out each artist from 
                  <Link href={paths.myActs()} style={{fontWeight:'bold'}}>
                    &nbsp;My Acts
                  </Link>.
                </BaseNote>
                <BaseNote>  
                  Note: There is currently a $1 charge for e-transfers.  We're working hard to find solutions that will reduce or eliminate this cost to you.
                </BaseNote>
              </SettingsSection>

              {/* REWARDS SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.REWARDS}
                title="Your Rewards"
                subtitle="We appreciate it when you help us build this community, so let us pay you back!">
                <HalfDashboard>
                  <LoadingIndicator loading={this.props.pending_rewards_loading}>
                    <i className="fa fa-usd" style={{color:RP_ORANGE}}/>
                    &nbsp;{Number(this.props.pending_rewards).toFixed(2)}&nbsp;
                    <RequirementLabel>Waiting for shows</RequirementLabel>
                  </LoadingIndicator>
                </HalfDashboard> 
                <HalfDashboard>
                  <LoadingIndicator loading={this.props.earned_rewards_loading}>
                    <i className="fa fa-usd" style={{color:RP_GREEN}}/>
                    &nbsp;{Number(this.props.earned_rewards).toFixed(2)}&nbsp;
                    <RequirementLabel>Earned so far</RequirementLabel>
                  </LoadingIndicator>
                </HalfDashboard>
                <BaseNote style={{marginTop:'5vmin'}}>
                  To earn rewards, you can invite artists to sign up for RedPine using this link: 
                </BaseNote>
                <LinkPanel>{profile.referral_url}</LinkPanel>
                <BaseNote>
                  When they sign up, we'll set $5.00 aside for each of you! You will both be rewarded once they play their first show.
                  <br/>
                  <div style={{fontSize:'1.5vmin',textAlign:'right'}}>...and one ticket is sold.</div>
                </BaseNote>
                <BaseNote>
                  Rewards are automatically added to your account balance - share and forget!
                </BaseNote>
                <BaseNote style={{marginTop:'2vmin',borderTop:`1px solid ${RP_SUPER_LIGHT}`,fontStyle:'italic'}}>
                  We're also looking for venue connections! Contact us via <Link href={paths.redpineFacebook()} target="_blank" red>facebook</Link>, <Link href={paths.redpineTwitter()} target="_blank" red>twitter</Link> or <Link href={paths.supportMail()} target="_blank" red>email</Link> if you can make an introduction and we'll be sure to thank you for it!
                </BaseNote>
              </SettingsSection>

              {/* PERSONAL SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.PERSONAL}
                title="Your Information"
                subtitle="Your personal information like name and email.">
                <PersonalSettings {...this.state}/>
              </SettingsSection>

              {/* ADDRESS SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.PERSONAL}
                title="Address Settings"
                subtitle="Your location and whereabouts.">
                <AddressSettings style={{paddingTop: '5vmin'}} {...this.state}/>
              </SettingsSection>

              {/* SOCIAL SETTINGS */}
              <SettingsSection
                show={this.state.section === SECTIONS.SOCIAL}
                title="Social Media Settings"
                subtitle="View and edit your social media accounts">
                <SocialSettings {...this.state}/>
              </SettingsSection>

              {/* COMMUNICATION SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.COMMUNICATION}
                title="Communication and Email Settings"
                subtitle="View and edit your communication preferences with RedPine">
                <InternalSettingsNote>
                  <Bold>Note:</Bold> There are certain emails which we are required to send and you cannot opt out of these emails. For example when you make a pledge to a campaign, 
                  we are required, and will always send you an email containing a summary of the transaction. Similarly, we are also required to send you an email of any 
                  changes you make to your account, like changing your password.
                </InternalSettingsNote>

                <SettingsItem differ="true" background="rgb(38,98,218)" color={RP_WHITE}>
                  <ToggleSetting 
                    label="Concerts near Me" 
                    sublabel="Emails regarding concerts which are happening around you."
                    enabled={profile.is_artist} onChange={(e) => this.setProfile({is_artist: e.target.checked})} />
                </SettingsItem>

                <SettingsItem differ="true" background="rgb(2,169,243)" color={RP_WHITE}>
                  <ToggleSetting 
                    label="Promotions" 
                    sublabel="General promotions, deals, advertisements and etc."
                    enabled={profile.is_artist} onChange={(e) => this.setProfile({is_artist: e.target.checked})} />
                </SettingsItem>
              </SettingsSection>

              {/* PASSWORD SETTINGS */}
              <SettingsSection 
                show={this.state.section === SECTIONS.PASSWORD}
                title="Change your Password"
                subtitle="Make sure its something memorable!">
                <PasswordSettings/>
              </SettingsSection>

            </SettingsDetailsWrap>
            { this.state.section === SECTIONS.ACCOUNT
              ? <BuyRedPine user={this.props.user}/>
              : null }
          </MyPageWrapper>
        </App>
      )
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  setSection(section) {
    this.updateState({ section })
  }

  setProfile(update) {
    const profile = Object.assign({}, this.props.user.profile, update, {picture:undefined,birthdate:undefined})
    this.props.updateUser(Object.assign({}, this.props.user, {profile}))
  }

  setPicture(data) {
    const profile = { 
      picture: data, 
      welcome_add_profile_pic: true
    }
    this.props.updateUser(Object.assign({}, {profile}))
  }

  componentDidMount() {
    this.props.getRewards()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state, props),
    pending_rewards: selectors.selectPendingRewards(state, props),
    pending_rewards_loading: selectors.selectPendingRewardsLoading(state, props),
    earned_rewards: selectors.selectEarnedRewards(state, props),
    earned_rewards_loading: selectors.selectEarnedRewardsLoading(state, props),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(actions.updateUser(user))
    },
    requestPayment: () => {
      dispatch(actions.requestPayment())
    },
    getRewards: () => {
      dispatch(actions.getRewards())
    },
    error: (err) => {
      dispatch(appActions.sendNotification('negative', 'times', err))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)


const PersonalSettings = ({firstName, lastName, username, email}) => (
  <SettingsTableLayout>
    <InputSetting label="First Name" value={firstName} editable="false" />
    <InputSetting label="Last Name" value={lastName} editable="false" />
    <SettingsRow>
      <RowLabel></RowLabel>
      <RowData style={{fontSize: '1.6vmin'}}>
        Your <span style={{color: RP_RED}}>First Name</span> and <span style={{color: RP_RED}}>Last Name</span> may be visible to other users on the platform. 
        For example, when you make a pledge, other users may be able to see you and distinguish your pledge using these fields.
      </RowData>
    </SettingsRow>

    <InputSetting label="Username" value={username} editable="false" />
    <InputSetting label="Email" value={email} editable="false" />
    <SettingsRow>
      <RowLabel></RowLabel>
      <RowData style={{fontSize: '1.6vmin'}}>
        <Bold>Note:</Bold> We do not share your <span style={{color: RP_RED}}>username</span> or <span style={{color: RP_RED}}>email</span> with anyone on the platform. 
        These fields are only present for you to remain in control of your account.
      </RowData>
    </SettingsRow>
  </SettingsTableLayout>
)

const AddressSettings = ({addrLine, addrStreetNo, addrStreetName, addrCity, addrProv, addrPostal, addrCountry}) => (
  <SettingsTableLayout>
    <InputSetting label="Full Address" value={addrLine} editable="false" />
    <SettingsRow>
      <RowLabel>Street No.</RowLabel>
      <RowData>{addrStreetNo}</RowData>
    </SettingsRow>
    <SettingsRow>
      <RowLabel>Stree Name</RowLabel>
      <RowData>{addrStreetName}</RowData>
    </SettingsRow>
    <SettingsRow>
      <RowLabel>City</RowLabel>
      <RowData>{addrCity}</RowData>
    </SettingsRow>
    <SettingsRow>
      <RowLabel>Province</RowLabel>
      <RowData>{addrProv}</RowData>
    </SettingsRow>
    <SettingsRow>
      <RowLabel>Country</RowLabel>
      <RowData>{addrCountry}</RowData>
    </SettingsRow>
    <SettingsRow>
      <RowLabel>Postal Code</RowLabel>
      <RowData>{addrPostal}</RowData>
    </SettingsRow>
    <SettingsRow>
      <RowLabel></RowLabel>
      <RowData style={{fontSize: '1.6vmin'}}>
        Your <span style={{color: RP_RED}}>Address</span> and <span style={{color: RP_RED}}>Location Details</span> are not visible to other users throughout the platform. 
        <br/><br/><Bold>Note:</Bold> If you are a venue manager, then the addresses of any venues you manage will be visible to users throughout the platform.
      </RowData>
    </SettingsRow>
  </SettingsTableLayout>
)

const SocialSettings = ({webLink, soundcloudLink, youtubeLink, facebookLink, twitterLink, instagramLink, snapchatLink}) => (
  <SettingsTableLayout>
    <InputSetting label="Website" value={webLink} editable="false" />
    <InputSetting label="Facebook" value={facebookLink} editable="false" />
    <InputSetting label="Twitter" value={twitterLink} editable="false" />
    <InputSetting label="Instagram" value={instagramLink} editable="false" />
    <InputSetting label="Snapchat" value={snapchatLink} editable="false" />
    <InputSetting label="SoundCloud" value={soundcloudLink} editable="false" />
    <InputSetting label="YouTube" value={youtubeLink} editable="false" />
  </SettingsTableLayout>
)

const PasswordSettings = () => (
  <SettingsTableLayout>
    <SettingsRow style={{padding: '0 5vmin 0 0'}}>
      <RowLabel>Current Password</RowLabel>
      <RowData>
        <SettingsInput width="100%" type="password" placeholder="Your current password" image={"username"} focusImage={"username-focus"} required />
      </RowData>
    </SettingsRow>
    <SettingsRow style={{padding: '0 5vmin 0 0'}}>
      <RowLabel>New Password</RowLabel>
      <RowData>
        <SettingsInput type="password" placeholder="Your current password" image={"password"} focusImage={"password-focus"} required />
      </RowData>
    </SettingsRow>
    <SettingsRow style={{padding: '0 5vmin 0 0'}}>
      <RowLabel>Confirm</RowLabel>
      <RowData>
        <SettingsInput type="password" placeholder="Your current password" image={"shield"} focusImage={"shield-focus"} required />
      </RowData>
    </SettingsRow>
    <SettingsRow style={{textAlign: 'right', padding: '1vmin 5vmin 0 0'}}>
      <RowLabel></RowLabel>
      <RowData>
        <UpdateButton>Update</UpdateButton>
      </RowData>
    </SettingsRow>
  </SettingsTableLayout>
)

const SettingsTotalWrap = styled.div`
  display: block;
  position: relative;
  height: auto;
  margin: 0 auto;
  text-align: center;
`
const SettingsDetailsWrap = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 50vw;
  height: auto;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 100%;
  }
`
const InternalSettingsNote = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin-bottom: 5vmin;
  color: ${RP_BLACK};
  font-size: 1.6vmin;
`
const SettingsItem = styled.div`
  cursor: ${props => props.differ ? 'default' : 'default' };
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 25vmin;
  height: 25vmin;
  margin-right: 1vmin;
  margin-bottom: 1vmin;
  background: ${props => props.differ ? RP_SUPER_LIGHT : RP_DDD };
  border: 1px solid ${props => props.differ ? RP_SUPER_LIGHT : '#EBEBEB' };
  border-radius: 0.75vmin;

  &:hover{
    background: ${props => props.background || '#EBEBEB' };
    color: ${props => props.color || RP_BLACK };
  }

  @media (max-width: 768wpx) and (orientation: portrait) { 
    width: 100%;
    height: auto;
  }
`
const SettingsTableLayout = styled.div`
  padding: 2vmin 0;
`
const SettingsRow = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0;
  padding: .75vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    padding: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    padding: 1vmin 0;
  }
`
const RowLabel = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 15vw;
  height: auto;
  margin: 0;
  padding: 0 5vmin 0 0;
  font-size: 1.8vmin;
  font-weight: bold;  
  text-align: right;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 20vw;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 20vw;
  }
`
const RowData = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 30vw;
  max-width: 30vw;
  height: auto;
  margin: 0;
  padding: 0;
  font-size: 1.8vmin;
  font-weight: 100;

  @media (max-width: 767px) and (orientation: portrait) {
    max-width: 47vw;
    width: 47vw;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    max-width: 47vw;
    width: 47vw;
  }
`
const SettingsInput = styled(FormInput)`
  width: 100%;
  padding: 1vmin 2vmin 1vmin 6vmin;
`
const BaseNote = styled.div`
  display: block;
  padding: 2vmin;
  font-size: 1.8vmin;
`
const LinkPanel = styled.div`
  margin: 0 2vmin;
  padding: 1.75vmin;
  font-size: 1.8vmin;
  background: ${RP_SUPER_LIGHT};
  border-radius: 0.75vmin;
  cursor: hover;
`
const UpdateButton = styled.div`
`
const HalfDashboard = styled.div`
  display: inline-block;
  width: 50%;
  font-size: 3vmin;
  font-weight: 200;
  white-space: nowrap;
  text-align: center;
  padding: 2vmin 0;
  vertical-align: top;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;

    i {
      font-size: 4vmin;
    }
  }
`
const RequirementLabel = styled.div`
  margin: 0 auto;
  font-size: 1.75vmin;
  font-weight: 200;
  white-space: nowrap;
  text-align: center;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;

    i {
      font-size: 4vmin;
    }
  }
`