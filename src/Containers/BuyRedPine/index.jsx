import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'
import { RP_User } from 'Models'

import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { RP_RED, RP_BLACK, RP_GREY, RP_DARK_GREY, RP_SUPER_LIGHT, RP_BLUE, RP_GREEN } from 'Components' // GLOBALS
import { SquareFields } from 'Components'
import { FormSeparator } from 'Components'
import { Title } from 'Components'
import { Money } from 'Components'
import { Modal } from 'Components'
import { Link } from 'Components'

import actions from './actions'


class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
  	return (
  		this.props.is_modal
  		? <Modal show onClose={() => this.props.onClose()} type="BUYREDPINE">
  				<div style={{padding:'5vmin'}}>
  					{this.props.children}
  				</div>
  			</Modal>
  		: <div>
  				{this.props.children}
  			</div>
  	)
  }
}


export class BuyRedPine extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    	tab: 0,

    	//SquareFields
    	show_square: false,
    	account_type: '',
    	product_name: '',
    	product_price: 0.00
    }
  }

  render() {
  	const _User = RP_User(this.props.user)

  	const tab = this.state.tab

    return <Wrapper is_modal={this.props.is_modal} onClose={this.props.is_modal ? this.props.hideBuyRedPine : null}>
    				<ToggleDisplay>
    					<ToggleButton selected={tab === 0} onClick={() => this.updateState({tab:0})}>
    					 	Artists
    					</ToggleButton>
    				</ToggleDisplay>
    				<ToggleDisplay>
    					<ToggleButton selected={tab === 1} onClick={() => this.updateState({tab:1})}>
    						Venues
    					</ToggleButton>
    				</ToggleDisplay>
    				<ToggleDisplay>
    					<ToggleButton selected={tab === 2} onClick={() => this.updateState({tab:2})}>
    						Organizers
    					</ToggleButton>
    				</ToggleDisplay>

    				{/* ARTISTS */}
    				<div style={{display:tab == 0 ? 'block' : 'none'}}>
	  					<ThirdWidth>
				  			<Top/>
					  		<Summary>
					  			<Title title="Free" summary="Everything you need to book a show"/>
					  			<TierPrice amount={0}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>1 act profile</li>
					  			<li><Check/>Limited to one booking request at a time</li>
					  			<li><Check/>Limited to one opportunity at a time</li>
					  			<li><Check/>Limited selection of venues</li>
					  			<li>&nbsp;</li>
					  		</Features>
					  		<div style={{textAlign:'right'}}>
							  	{ _User.is_artist
					  				? <You/>
							  		: <Settings/> }
							  </div>
					  	</ThirdWidth>
					  	<ThirdWidth highlighted>
					  		<Top highlighted>
					  			RedPine Recommended
					  			&nbsp;&nbsp;<i className="fa fa-check" style={{color:RP_GREEN}}/>
					  		</Top>
					  		<Summary>
					  			<Title title="Member" summary="Great for frequent performers"/>
					  			<TierPrice amount={9.99}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>1 act profile</li>
					  			<li><Check/>Unlimited booking requests</li>
					  			<li><Check/>Unlimited opportunity applications</li>
					  			<li><Check/>Unlimited access to all venues</li>
					  			<li>&nbsp;</li>
					  			<li>&nbsp;</li>
					  		</Features>
					  		{ _User.is_member_artist
					  			? <div style={{textAlign:'right'}}>
							  			<You/>
							  		</div>
							  	: <div style={{textAlign:'right'}}>
							  			<BuyNow onClick={() => this.updateState({show_square:true,account_type:'ARTIST',product_name:'MEMBER',product_price:9.99})}>
							  				Subscribe
							  			</BuyNow>
							  		</div> }
					  	</ThirdWidth>
					  	<ThirdWidth>
					  		<Top/>
					  		<Summary>
					  			<Title title="Ultimate" summary="For agents and managers"/>
					  			<TierPrice amount={49.99}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>Unlimited act profiles</li>
					  			<li><Check/>Unlimited booking requests</li>
					  			<li><Check/>More website integrations</li>
					  			<li><Check/>Unlimited opportunity applications</li>
					  			<li><Check/>Unlimited access to all venues</li>
					  			<li><Check/>Dedicated RedPine booking assistant</li>
					  		</Features>
					  		{ _User.is_ultimate_artist
					  			? <div style={{textAlign:'right'}}>
							  			<You/>
							  		</div>
							  	: <div style={{textAlign:'right'}}>
							  			<BuyNow onClick={() => this.updateState({show_square:true,account_type:'ARTIST',product_name:'ULTIMATE',product_price:49.99})}>
							  				Subscribe
							  			</BuyNow>
							  		</div> }
					  	</ThirdWidth>
					  </div>

    				{/* VENUES */}
    				<div style={{display:tab == 1 ? 'block' : 'none'}}>
			  			<ThirdWidth>
					  		<Top/>
					  		<Summary>
					  			<Title title="Free" summary="Everything you need to organize a show"/>
					  			<TierPrice amount={0}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>Detailed venue profile</li>
					  			<li><Check/>Recieve detailed booking requests</li>
					  			<li><Check/>Add filters for incoming requests</li>
					  			<li><Check/>Always-updated booking calendar</li>
					  			<li><Check/>Add opportunities, and open mics</li>
					  			<li><Check/>Auto-generated ticketing pages</li>
					  			<li><Check/>Book acts from your website</li>
					  			<li><Check/>24/7 Support</li>
					  		</Features>
					  		<div style={{textAlign:'right'}}>
							  	{ _User.is_venue
					  				? <You/>
							  		: <Settings/> }
							  </div>
					  	</ThirdWidth>
					  	<ThirdWidth highlighted>
					  		<Top highlighted>
					  			RedPine Recommended
					  			&nbsp;&nbsp;<i className="fa fa-check" style={{color:RP_GREEN}}/>
					  		</Top>
					  		<Summary>
					  			<Title title="Member" summary="Easily manage your bookings"/>
					  			<TierPrice amount={49.99}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
						  		<li><Check/>Personal support agent</li>
					  			<li><Check/>3rd party ticketing pages</li>
						  		<li><Check/>Embed all shows on your website</li>
						  		<li><Check/>All Free features</li>
						  		<li>&nbsp;</li>
						  		<li>&nbsp;</li>
						  		<li>&nbsp;</li>
						  		<li>&nbsp;</li>
						  		<li>&nbsp;</li>
					  		</Features>
					  		{ _User.is_member_venue
					  			? <div style={{textAlign:'right'}}>
							  			<You/>
							  		</div>
							  	: <div style={{textAlign:'right'}}>
							  			<BuyNow onClick={() => this.updateState({show_square:true,account_type:'VENUE',product_name:'MEMBER',product_price:49.99})}>
							  				Subscribe
							  			</BuyNow>
							  		</div> }
					  	</ThirdWidth>
					  	<ThirdWidth>
					  		<Top/>
					  		<Summary>
					  			<Title title="Ultimate" summary="Promote your events, coordinate the team"/>
					  			<TierPrice amount={199.99}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>Auto-post shows to social media</li>
					  			<li><Check/>Auto-post shows to Google Maps</li>
					  			<li><Check/>RedPine-Google calendar sync</li>
					  			<li><Check/>All Member features</li>
					  			<li>&nbsp;</li>
						  		<li>&nbsp;</li>
						  		<li>&nbsp;</li>
						  		<li>&nbsp;</li>
					  		</Features>
					  		{ _User.is_ultimate_venue
					  			? <div style={{textAlign:'right'}}>
							  			<You/>
							  		</div>
							  	: <div style={{textAlign:'right'}}>
								  		<BuyNow onClick={() => this.updateState({show_square:true,account_type:'VENUE',product_name:'ULTIMATE',product_price:199.99})}>
								  			Subscribe
								  		</BuyNow>
							  		</div> }
					  	</ThirdWidth>
				  	</div>

    				{/* ORGANIZERS */}
    				<div style={{display:tab == 2 ? 'block' : 'none'}}>
			  			<ThirdWidth>
					  		<Top/>
					  		<Summary>
					  			<Title title="Free" summary="Learn what RedPine can do"/>
					  			<TierPrice amount={0}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>Detailed organization profile</li>
					  			<li><Check/>Always-updated booking calendar</li>
					  			<li><Check/>Book shows, one at a time</li>
					  			<li><Check/>Post paid opportunities</li>
					  			<li><Check/>Auto-generated ticketing pages</li>
					  			<li><Check/>Auto-generated event posters</li>
					  			<li><Check/>24/7 Support</li>
					  		</Features>
					  		<div style={{textAlign:'right'}}>
							  	{ _User.is_venue && _User.is_artist
					  				? <You/>
							  		: <Settings/> }
							  </div>
					  	</ThirdWidth>
					  	<ThirdWidth highlighted>
					  		<Top highlighted>
					  			RedPine Recommended
					  			&nbsp;&nbsp;<i className="fa fa-check" style={{color:RP_GREEN}}/>
					  		</Top>
					  		<Summary>
					  			<Title title="Member" summary="Make it happen"/>
					  			<TierPrice amount={59.99}/>
					  		</Summary>
					  		<Hide><FormSeparator style={{padding:0}}/></Hide>
					  		<Features>
					  			<li><Check/>List your venues</li>
					  			<li><Check/>Unlimited act profiles</li>
						  		<li><Check/>Personal support agent</li>
					  			<li><Check/>3rd party ticketing pages</li>
						  		<li><Check/>Embed all shows on your website</li>
						  		<li><Check/>All member venue features</li>
						  		<li><Check/>All member artist features</li>
					  		</Features>
					  		{ _User.is_member_organizer
					  			? <div style={{textAlign:'right'}}>
							  			<You/>
							  		</div>
							  	: <div style={{textAlign:'right'}}>
							  			<BuyNow onClick={() => this.updateState({show_square:true,account_type:'ORGANIZER',product_name:'MEMBER',product_price:59.99})}>
							  				Subscribe
							  			</BuyNow>
							  		</div> }
					  	</ThirdWidth>
					  	<ThirdWidth>
					  		<Top/>
					  	</ThirdWidth>
				  	</div>

				  	{ this.state.show_square
              ? <SquareFields
                  summary={`This purchase will upgrade your ${this.state.account_type} account to the "${this.state.product_name}" level.`}
                  onSubmit={this.subscribe.bind(this)}
                  back={() => this.updateState({show_square:false,account_type:'',product_name:'',product_price:0.00})}/>
              : null }
				  </Wrapper>
  }

  subscribe(customer){
    const subscription_args = {
    	account_type: this.state.account_type,
    	product_name: this.state.product_name,
    	amount: this.state.product_price,
      token: customer
    }

    this.props.submitSubscription(subscription_args)
    this.updateState({show_square:false})
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitSubscription: (subscription_args) => {
      dispatch(actions.submitSubscription(subscription_args))
    },
    hideBuyRedPine: () => {
      dispatch(appActions.hideBuyRedPine())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyRedPine)


const TierPrice = ({amount}) => <Price>
												  				<Money amount={amount}/>
												  				{ amount > 0
												  					? <span style={{fontSize:'1.75vmin'}}>per month</span>
												  					: null }
												  			</Price>

const You = () => <YourAccount><i className="fa fa-user" style={{color:RP_DARK_GREY}}/>&nbsp;Your Account</YourAccount>
const Settings = () => <YourAccount><Link href={paths.settings()}><i className="fa fa-cog" style={{color:RP_DARK_GREY}}/>&nbsp;Go to Settings</Link></YourAccount>
const Check = () => <span><i className="fa fa-check-circle-o" style={{color:RP_GREEN}}/>&nbsp;&nbsp;</span>


const ThirdWidth = styled.div`
  display: inline-block;
  position: relative;
  width: 33%;
  vertical-align: top;
  text-align: center;
  margin-bottom: 5vmin;

	${props => props.highlighted ? `
		-webkit-box-shadow: 2px 2px 10px rgba(0,0,0,0.4);
		box-shadow: 2px 2px 10px rgba(0,0,0,0.4);
	` : ''}

  @media (max-width: 1268px) {
    display: block;
    width: 100%;

		-webkit-box-shadow: none;
		box-shadow: none;
  }

  @media (max-width: 767px){
  	border-top: 1px solid ${RP_GREY};
  }
`
const HalfWidth = styled.div`
  display: inline-block;
  position: relative;
  width: 50%;
  vertical-align: top;
  text-align: center;
  margin-bottom: 5vmin;

	${props => props.highlighted ? `
		-webkit-box-shadow: 2px 2px 10px rgba(0,0,0,0.4);
		box-shadow: 2px 2px 10px rgba(0,0,0,0.4);
	` : ''}

  @media (max-width: 1268px) {
    display: block;
    width: 100%;

		-webkit-box-shadow: none;
		box-shadow: none;
  }

  @media (max-width: 767px){
  	border-top: 1px solid ${RP_GREY};
  }
`
const ToggleDisplay = styled.div`
  display: inline-block;
  position: relative;
  width: calc(33% - 8vmin);
  vertical-align: top;
  text-align: center;
  padding: 0 4vmin;
  margin-bottom: 4vmin;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 33%;
    padding: 0;
  }
`
const Top = styled.div`
	display: block;
	background: ${props => props.highlighted ? RP_BLUE : '#FFF'};
	line-height: 5vmin;
	min-height: 5vmin;
	font-weight: 200;
	color: ${props => props.highlighted ? '#FFF' : RP_DARK_GREY};
	text-align: ${props => props.highlighted ? 'center' : 'left'};

	${props => props.highlighted ? '' : `
		border-bottom: 2px solid ${RP_SUPER_LIGHT};
	`}

	@media (max-width: 767px) and (orientation: portrait) {
    border-bottom: 0;
    margin-top: ${props => props.highlighted ? '5vmin' : '0'};
  }
`
const Summary = styled.div`
	padding: 4vmin 3vmin;

  @media (min-width: 1268px){
    display: block;
  	width: calc(100% - 6vmin);
  }
	
	width: calc(50% - 6vmin);
	display: inline-block;
	vertical-align: top;

  @media (max-width: 767px){
    display: block;
  	width: calc(100% - 6vmin);
  }
`
const Price = styled.div`
	font-size: 5vmin;
	font-weight: 200!important;
	color: ${RP_DARK_GREY};
`
const Features = styled.ul`
	padding-bottom: 4vmin;
	text-align: left;

  @media (min-width: 1268px){
    display: block;
  	width: calc(100% - 40px);
		padding-inline-start: 40px;
  }
	
	width: calc(50% - 20px);
	display: inline-block;
	vertical-align: top;
	padding-inline-start: 20px;

  @media (max-width: 767px){
    display: block;
  	width: calc(100% - 40px);
		padding-inline-start: 40px;
  }

	li {
		list-style-type: none;
	}
`
const BuyNow = styled.div`
  background: ${RP_RED};
  color: #FFF;
  padding: 2vmin 0;
  text-align: center;
  font-size: 2vmin;
  font-weight: bold;
  transition: 0.25s all ease;

  &:hover {
    background: ${RP_GREEN};
    cursor: pointer;
  }

  @media (min-width: 1268px){
    display: block;
    width: 100%;
  }
	
	display: inline-block;
  width: 50%;

  @media (max-width: 767px){
    display: block;
    width: 100%;
  }
`
const ToggleButton = styled.div`
  display: inline-block;
  padding: 2vmin 4vmin;
  background: #FFF;
  color: ${props => props.selected ? RP_RED : RP_DARK_GREY};
  border-bottom: ${props => props.selected ? `1px solid ${RP_RED}` : '0'};
  transition: background ease 0.25s;
  font-size: 4vmin;
  font-weight: 200;

  &:hover {
  	border-bottom: 1px solid ${RP_RED};
  	cursor: pointer;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    padding: 2vmin 0;
  }
`
const Hide = styled.div`
  @media (min-width: 1268px){
    display: block;
  }
	
	display: none;

  @media (max-width: 767px){
    display: block;
  }
`
const YourAccount = styled.div`
	padding: 4vmin 0;
	text-align: center;

  @media (min-width: 1268px){
    display: block;
    width: 100%;
  }
	
	display: inline-block;
  width: 50%;

  @media (max-width: 767px){
    display: block;
    width: 100%;
  }
`