import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_SUPER_LIGHT, RP_RED, RP_GREEN, SPOTIFY_GREEN, Bold } from 'Components' // GLOBALS
import { BaseButton } from 'Components' // BUTTON
import { Image } from 'Components'
import { Link } from 'Components'


export class MainEntity extends React.PureComponent {
  render () {
  	const is_empty = !this.props.link
  	const link_props = is_empty ? {onClick: this.props.onCreate} : {href: this.props.link}

    return <Wrapper>
    				{ is_empty
    					? <Image inline
		            	image={this.props.new_picture}
		            	height="16vmin" 
		            	width="16vmin" 
		            	style={{borderRadius:'0.75vmin 0 0 0',backgroundSize:'cover',margin:'2vmin'}}/>
    					: <Image inline
		            	image={this.props.picture} 
		            	height="20vmin" 
		            	width="20vmin" 
		            	style={{borderRadius:'0.75vmin 0 0 0',backgroundSize:'cover'}}/> }
            <Heading>
	           	<Link {...link_props}>
                <Title>
                	{is_empty ? 'Create New..' : this.props.title}
                </Title>
              </Link>
              <br/>
              { is_empty
              	? <IconButton onClick={() => this.props.onCreate()}>
                    <i className="fa fa-plus"></i>
                  </IconButton>
              	: this.props.actions }
            </Heading>
            {this.props.children}
            { !is_empty && !this.props.no_plus
            	? <AddWrap hoverColor={RP_GREEN} style={{lineHeight:'3vmin',fontSize:'2.5vmin'}} onClick={this.props.onAdd}>
              		<Plus className="fa fa-plus"/>
            		</AddWrap>
            	: null }
    	  	 </Wrapper>
  }
}

const Wrapper = styled.div`
	display: inline-block;
  position: relative;
	vertical-align: top;
	width: calc(50% - 2vmin - 2px);
	margin: 0 2vmin 5vmin 0;
  font-size: 1.8vmin;

  border: 1px solid ${RP_SUPER_LIGHT};
  border-radius: 0.75vmin;

  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.17);

  @media (max-width: 1268px) {
  	display: block;
  	width: 100%;
  	margin: 0 0 4vmin 0;
  }
`
const Heading = styled.div`
  display: inline-block;
  max-width: calc(100% - 24vmin);
	padding: 1vmin 0 1.5vmin 2vmin;
  margin: 1vmin 2vmin 0 0;
  vertical-align: top;

  &:hover {
    color: ${RP_BLACK};
  }
`
const Title = styled.div`
  font-weight: 100;
  display: inline-block;
  vertical-align: top;
  position: relative;
  font-size: 3.3vmin;
  text-align: left;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: ${RP_RED};
  }
`
const Subtitle = styled.div`
  font-size: 2.25vmin;
  text-align: left;
  font-weight: 200;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const IconButton = styled(BaseButton)`
  color: #FFF;
  font-weight: bold;
  background: ${RP_GREEN};
  padding: 0.5vmin 1.5vmin;
  transition: background ease 0.25s;
  margin: 1.5vmin 1.5vmin 0 0;
  border-radius: 0.5vmin;
  font-size: 2.5vmin;

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`
const AddWrap = styled.div`
  display: block;
  position: relative;
  background: ${props => props.color || 'rgba(255,255,255,0.9)'};
  color: ${RP_BLACK};
  text-align: center;
  padding: 2vmin 0;
  font-size: 2vmin;

  &:hover {
    color: ${props => props.hoverColor || RP_BLACK};
    cursor: ${props => props.hoverColor ? 'pointer' : 'default'};
    background: ${RP_SUPER_LIGHT};
  }

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2.5vmin;
  }
`
const Plus = styled.i`
  line-height: 3vmin;
  transition: background ease 0.25s;

  &:hover {
    cursor: pointer;
  }
`

export default MainEntity