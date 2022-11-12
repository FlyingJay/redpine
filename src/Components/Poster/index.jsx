import React from 'react'
import styled from 'styled-components'

import { helpers, paths } from 'globals'
import { RP_Act } from 'Models'

import { RP_RED, RP_BLUE, RP_GREEN, RP_PURPLE, RP_ORANGE, RP_PINK } from 'Components'
import { Link } from 'Components'

const circle_positions = [
	{
		left:70,
		top:30,
		size:25
	},{
		left:25,
		top:30,
		size:20
	},{
		left:5,
		top:15,
		size:15
	},{
		left:80,
		top:13,
		size:15
	},{
		left:45,
		top:15,
		size:15
	},{
		left:25,
		top:17,
		size:10
	},{
		left:55,
		top:32.5,
		size:10
	},{
		left:65,
		top:17.5,
		size:10
	},{
		left:10,
		top:35,
		size:7.5
	}
]
const positions = helpers.shuffle(Array.from(circle_positions))
const positions_count = circle_positions.length

const images = [
	"/Assets/images/defaults/switchboard.jpg",
	"/Assets/images/defaults/microphone2.jpg"
]
const images_count = images.length

const colors = [RP_RED, RP_BLUE, RP_GREEN, RP_PURPLE, RP_ORANGE, RP_PINK]
const colors_count = colors.length


export class Poster extends React.PureComponent {
	render() {
			let campaign_acts = helpers.shuffle(this.props.campaign_acts)
	    campaign_acts = campaign_acts.filter(campaign_act => campaign_act.is_accepted)
	    
	    const acts_with_pictures = campaign_acts.filter(campaign_act => campaign_act.band.picture != null)
	    const only_one = (acts_with_pictures.length == 1)

	    return(
	      <Background image={this.props.image || images[Math.floor(Math.random()*images_count)]}>
	        <Title>{this.props.title}</Title>
	        { this.props.venue
	        	? <Subtitle>{`@ ${this.props.venue}`}</Subtitle>
	        	: null }
	        { acts_with_pictures.map((campaign_acts,index) => {
	        		const _Act = RP_Act(campaign_acts.band)
	        		const position = positions[index % positions_count]

	        		return index < 5 ? <Link href={paths.acts(_Act.id)} key={_Act.id}>
	        													<ActPicture 
									        						image={_Act.picture} 
									        						left={only_one ? 37.5 : position.left} 
									        						top={only_one ? 17.5 : position.top} 
									        						size={only_one ? 25 : position.size} 
									        						color={colors[Math.floor(Math.random()*colors_count)]}/> 
									        				</Link> : null
	        	}) }
	       	<ActNames>
	       		{ campaign_acts.map((campaign_act,index) => {
	       				const _Act = RP_Act(campaign_act.band)
	       				
	       				return <Link href={paths.acts(_Act.id)} key={_Act.id} style={{color:'#FFF',fontWeight:200}}>
	       								{ index < (campaign_acts.length - 1) 
	       							 		? `${_Act.name} | ` 
	       							 		: _Act.name }
	       							 </Link>
	       			}) }	
	       		<RedPineLogo/>
	       	</ActNames>
	      </Background>
	    )
	  }

  componentDidMount() {

  }
}
export default Poster

const Background = styled.div`
  display: block;
  position: relative;
  background: 
  	linear-gradient(
  	  to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    ),
    url('${props => props.image}');
  background-size: cover;
  top: 0;
  left: 0;
  border: 0;
  width: 100%;
  height: 60vmin;
  overflow: hidden;
`
const Title = styled.div`
	font-size: 4vmin;
	font-weight: 200;
	color: #FFF;
	text-align: center;
	padding: 5vmin 5vmin 0 5vmin;

  @media (max-width: 1268px){ 
		font-size: 3vmin;
  }

  @media (max-width: 768px){ 
		font-size: 4vmin;
  }
`
const Subtitle = styled.div`
	font-size: 2.5vmin;
	font-weight: 200;
	color: #FFF;
	text-align: center;
`
const ActNames = styled.div`
	position: absolute;
	bottom: 0;
	background: ${RP_BLUE};
	width: calc(100% - 9vmin);
	padding: 2vmin 7vmin 2vmin 2vmin;
	text-align: center;
	font-size: 2.5vmin;
`
const ActPicture = styled.div`
  display: block;
  position: absolute;
  top: ${props => props.top}vmin;
  left: ${props => props.left}vmin;
  width: ${props => props.size}vmin;
  height: ${props => props.size}vmin;
  border-radius: ${props => props.size}vmin;
  border: 5px solid ${(props) => props.color};
  background: url('${props => props.image}');
  background-size: cover;

  @media (max-width: 768px){ 
	  top: ${props => props.top + 2}vmin;
	  left: ${props => props.left/1.25}vmin;
	  width: ${props => props.size/1.25}vmin;
	  height: ${props => props.size/1.25}vmin;
  	border-radius: ${props => props.size/1.25}vmin;
  	border: 3px solid ${(props) => props.color};
  }
`
const RedPineLogo = styled.div`
  display: block;
  position: absolute;
  width: 5vmin;
  height: 5vmin;
  background: url('/Assets/images/logo/sq1.png');
  background-size: cover;
  border-radius: 0.5vmin;
  bottom: 1vmin;
  right: 1vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
    width: 5vmin;
    height: 5vmin;
    background-size: 5vmin;
  }
`