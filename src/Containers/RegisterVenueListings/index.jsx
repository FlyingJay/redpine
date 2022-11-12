import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { Bold, RP_BLACK, RP_RED, RP_GREEN, RP_DARK_GREY, RP_SUPER_LIGHT } from 'Components' //GLOBALS
import { ModalHeading, ModalSubheading, DetailsSubsection, SubsectionHeading, SubsectionSummary } from 'Components' //MODAL AND MODALOTHERS
import { LoadingIndicator } from 'Components'
import { Input, FormButton } from 'Components' //INPUT
import { Link } from 'Components'
import { SquareFields } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class RegisterVenueListings extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    }
	}

  render() {
    const show_square = this.props.show_square || false
    const error = this.props.error || {}

    const is_venue_listings_user = (this.props.user && !this.props.user.profile)

    return <App no_ui>
             {
              this.props.success
              ? <FullPage style={{textAlign:'center'}}>
                  <SuccessWrap>
                    <SuccessSection style={{fontSize:'4vmin'}}>
                      Your purchase was a success!&nbsp;&nbsp;<i className="fa fa-check"/>
                    </SuccessSection>
                    <SuccessSection style={{fontSize:'3vmin'}}>
                      To view the listings, sign-in to the django administration portal with your credentials.
                    </SuccessSection>
                    <SuccessSection style={{fontSize:'2vmin'}}>
                      It's nice to have all your contacts in one place, so we understand if you want to contribute! 
                      <br/>
                      Feel free to contact us at hello@showvenues.ca with any troubles or ideas.
                    </SuccessSection>
                  </SuccessWrap>
                  <ViewListings onClick={() => this.props.viewListings()}>
                    <i className="fa fa-bars"/>&nbsp;&nbsp;Browse Venues
                  </ViewListings>
                </FullPage>
              : null
             }
             {
              is_venue_listings_user || this.props.show_admin
              ? <FullPage>
                  <iframe src={paths.djangoAdmin()} width="100%" height="100%" frameBorder="0"/>
                </FullPage>
              : <Wrapper>
                  <Description>
                    Showvenues.ca allows you to search for concert venues in every city across Canada. 
                    <br/>
                    Find the venue you want to play and we'll give you the contact info for the booker.
                  </Description>
                  <Column>
                    <Panel>
                      <ModalHeading>Looking for a Venue?</ModalHeading>
                      <ModalSubheading>Search no further, we have what you need!</ModalSubheading>

                      <div style={{paddingTop:'3vmin',borderTop:'1px solid '+RP_SUPER_LIGHT}}>
                        <i className="fa fa-check" style={{color:RP_GREEN}}/>&nbsp;
                        <Bold>Comprehensive</Bold>
                        <Perk>We have hundreds of venues listed. Still can't find the right one? Let us know and we'll make it happen!</Perk>
                      </div>
                      <br/>

                      <div>
                        <i className="fa fa-check" style={{color:RP_GREEN}}/>&nbsp;
                        <Bold>Accurate</Bold>
                        <Perk>Listings are constantly being updated - know the info you're using is accurate, and plan events with confidence!</Perk>
                      </div>
                      <br/>

                      <div>
                        <i className="fa fa-check" style={{color:RP_GREEN}}/>&nbsp;
                        <Bold>Detailed</Bold>
                        <Perk>Search venues by city and see contact info for the ones you want to book!</Perk>
                      </div>
                    </Panel>
                    <br/>

                    <Panel style={{paddingBottom:'2vmin'}}>
                      <Bold>Already have an account?</Bold>
                      <RegisterBtn onClick={() => this.props.viewListings()}>
                        <i className="fa fa-user"/>&nbsp;&nbsp;Sign In
                      </RegisterBtn>
                      <br/>
                      <br/>

                      <ModalSubheading>
                        Want to contribute? 
                        <br/>
                        Email us at: hello@showvenues.ca
                      </ModalSubheading>
                    </Panel>
                  </Column>

                  <Column>
                    <Panel>
                      <ModalHeading>Browse in seconds!</ModalHeading>
                      <ModalSubheading>
                        For just $3.50/month get a year of our extensive venue listings.
                      </ModalSubheading>

                      <Input onUpdate={(e) => this.updateState({first_name: e.target.value})} error={error.first_name} name='first-name' type='text' placeholder='First Name' image='first-name' focusImage='first-name-focus' />
                      <Input onUpdate={(e) => this.updateState({last_name: e.target.value})} error={error.last_name} name='last_name' type='text' placeholder='Last Name' image='last-name' focusImage='last-name-focus' />
                      <Input onUpdate={(e) => this.updateState({email: e.target.value})} error={error.email} name='email' type='text' placeholder='Email' image='email' focusImage='email-focus' />
                      <Input onUpdate={(e) => this.updateState({username: e.target.value})} error={error.username} name='username-venues' type='text' placeholder='Username' image='username' focusImage='username-focus' />
                      <Input onUpdate={(e) => this.updateState({password: e.target.value})} error={error.password} name='password-venues' type='password' placeholder='Password' image='password' focusImage='password-focus' />               
                      <RiskFree>
                        <Bold>No pressure, and no risk to try!</Bold> 
                        <br/>
                        We'll issue a refund within 5 days of your purchase if you are unsatisfied for any reason at all.
                      </RiskFree>
                      <Notice>
                        By registering you agree to our <Link href={paths.privacyPolicy()}><span>Privacy Policy</span></Link> and <Link href={paths.termsOfUse()}><span>Terms of Use</span></Link>.
                      </Notice>   
                      <br/>               
                      {
                        this.state.first_name && this.state.last_name && this.state.email && this.state.username && this.state.password
                        ? <RegisterBtn onClick={() => this.props.showSquare()}>
                            Sign Up
                          </RegisterBtn>
                        : <BtnDisabled>Sign Up</BtnDisabled>
                      }
                    </Panel>
                  </Column>
                  {
                    show_square
                    ? <SquareFields
                        summary={`ShowVenues listings are billed annually. "Purchase" will submit your payment of $42.00 for a 1-year subscription.`}
                        onSubmit={this.register.bind(this)}
                        back={() => this.props.hideSquare()}/>
                    : null
                  }
                </Wrapper>
              }
            </App>
  }

  register(customer){
    const purchaseArgs = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      token: customer
    }

    this.props.submitRegistration(purchaseArgs)
  }

  componentWillReceiveProps(props){
    //If the user still has an existing RP session, silently log them out.
    if(props.user && props.user.profile){
      this.props.logout()
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state, props),
    show_admin: selectors.selectShowAdmin(state, props),
    show_square: selectors.selectShowSquare(state, props),
    success: selectors.selectSuccess(state, props),
    error: selectors.selectError(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewListings: () => {
      dispatch(actions.viewListings())
    },
    showSquare: () => {
      dispatch(actions.showSquare())
    },
    hideSquare: () => {
      dispatch(actions.hideSquare())
    },
    submitRegistration: (params) => {
      dispatch(actions.submitRegistration(params))
    },
    logout: () => {
      dispatch(appActions.logout(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterVenueListings)

const Notice = styled.div`
  font-size: 1.7vmin;
  margin-top: 15px;
  color: ${RP_DARK_GREY};
  text-align: center;

  span {
    color: ${RP_RED};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`
const RiskFree = styled.div`
  font-size: 1.7vmin;
  margin-top: 15px;
  color: ${RP_DARK_GREY};
  text-align: left;
  padding: 0 15px;
`
const Wrapper = styled.div`
  max-width: 100vw;
  min-height: calc(100vh - 20vmin);
  padding: 5vmin 0 2.5vmin 0;
  background: url('/Assets/images/background/bg12.jpg');
  background-size: cover;
  text-align: center;

  @media (max-width: 1280px) and (orientation: portrait){
    padding: 5vmin 0;
  }
`
const Description = styled.div`
  padding: 0 5vmin 5vmin 5vmin;
  color: #FFF;
`
const Column = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 30vw;

  &:nth-child(2) {
    margin-right: 2vmin;
    margin-bottom: 0; 
  }

  @media (max-width: 1280px) and (orientation: portrait){
    width: 90vw;

    &:nth-child(2) {
      margin-right: 0;
      margin-bottom: 2vmin;
    }
  }
`
const Panel = styled.div`
  background: #FFF;
  padding: 5vmin 5vmin 9vmin 5vmin;
  border-radius: 4vmin;
  box-shadow: 2px 1px 2px rgba(0,0,0,0.1);
  text-align: left;
`
const RegisterBtn = styled(FormButton)`
  display: block;
  position: relative;
  float: right;
`
const BtnDisabled = styled(FormButton)`
  cursor: defualt !important;
  display: block;
  position: relative;
  float: right;
  background: ${RP_DARK_GREY};
  color: #FFF;

  &:hover {
    background: ${RP_DARK_GREY};
    color: #FFF;
  }
`
const Perk = styled.div`
  font-size: 2vmin;
  padding-left: 2vmin;

  @media (max-width: 1024px) and (orientation: portrait){
    font-size: 3vmin;
  }
`
const FullPage = styled.div`
  margin: 0; 
  padding: 0; 
  height: 100vh; 
  overflow: hidden;
`
const SuccessWrap = styled.div`
  padding: 20vh 10vw 10vh 10vw;

  @media (max-width: 1024px) and (orientation: portrait){
    padding: 20vh 0 10vh 0;
  }
`
const SuccessSection = styled.div`
  padding: 0 5vmin 5vmin 5vmin;
  color: ${RP_BLACK};

  i {
    color: ${RP_GREEN};
  }
`
const ViewListings = styled(FormButton)`
  padding: 3vmin 5vmin;
  font-size: 2.5vmin;
`