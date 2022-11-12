import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_DDD } from 'Components' //GLOBALS
import { ImagePanel } from 'Components'
import { Link } from 'Components'


export class AppBar extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
  	const profile = this.props.profile
  	const is_logged_in = profile

  	return is_logged_in
  				 ? <UberWrapper>
		  				 <AppLinks>
		  					 <AppLink title="Search" link={paths.search()} image="/Assets/images/apps/search.png"/>
		  					 {
		  					 	 profile.is_venue
		  					 	 ? <AppLink title="My Venues" link={paths.myVenues()} image="/Assets/images/apps/venues.png"/> : null
		  					 }
		  					 {
		  					 	 profile.is_artist
		  					 	 ? <AppLink title="My Acts" link={paths.myActs()} image="/Assets/images/apps/acts.png"/> : null
		  					 }
		  					 {
		  					 	 profile.is_artist
		  					 	 ? <AppLink title="My Shows" link={paths.myShows()} image="/Assets/images/apps/shows.png"/> : null
		  					 }
		  					 <AppLink title="Tickets" link={paths.tickets()} image="/Assets/images/apps/tickets.png"/>
		  					 <AppLink title="Promotion" link={paths.promotion()} image="/Assets/images/apps/promotion.png"/>
		  					 {
		  					 	 profile.is_venue || profile.is_artist
		  					 	 ? <AppLink title="Reviews" link={paths.reviews()} image="/Assets/images/apps/reviews.png"/> : null
		  					 }
		  					 <AppLink title="Settings" link={paths.settings()} image="/Assets/images/apps/settings.png"/>
		  		   	 </AppLinks>
		  		   	 <BlackLine/>
	  		   	 </UberWrapper>
	  		   : null
  }
}
const BlackLine = styled.div`
	border-bottom: 1px solid ${RP_DDD};
`
const AppLinks = styled.div`
	display: inline-block;
	margin: 0 auto;

	padding: 0 2vmin;

	@media (max-width: 768px) and (orientation: portrait){
		padding-top: 1.75vmin;
	}
`
const AppLink = ({link,image,title}) => (
  <Link href={link}>
  	<Wrapper>
	  	<AppImage image={image}/>
	    <AppText>
	      {title}
	    </AppText>
    </Wrapper>
  </Link> 
)
const UberWrapper = styled.div`
	display: block;
	text-align: center;
`
const Wrapper = styled.div`
	display: inline-block;
  vertical-align: middle;
  margin-right: 5vmin;
  margin-bottom: 2vmin;
  text-align: center;

  i {
  	font-size: 6vmin;
  }

  @media (max-width: 768px) and (orientation: portrait) { 
	  margin-right: 10vmin;
	  margin-bottom: 10vmin;
  }
`
const AppImage = styled(ImagePanel)`
  display: inline-block;
  height: 75px;
  width: 75px;
  background: ${(props) => props.image ? `url(${props.image})` : `url('/Assets/images/logo/sq1.png')`};
  background-size: cover;

  @media (max-width: 768px) and (orientation: portrait) { 
	  height: 50px;
	  width: 50px;
  }
`
const AppText = styled.div`
  font-weight: bold;
  line-height: 5vmin;
  font-size: 2.25vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
  	font-size: 3vmin;
  }
`