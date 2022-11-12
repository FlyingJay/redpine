import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_Organization } from 'Models'

import { RP_BLACK, RP_SUPER_LIGHT, RP_RED, Bold } from 'Components' // GLOBALS
import { Image } from 'Components'
import { Link } from 'Components'


export class ActOrganization extends React.PureComponent {
  render () {
    return <Wrapper>
            <Image image={this.props.picture} height="9vmin" width="9vmin" inline style={{borderRadius:'0.75vmin 0 0 0',backgroundSize:'cover'}}/>
            <Heading>
              <Link href={this.props.link}>
                <Title>{this.props.title}</Title>
              </Link>
              <br/>
              <Subtitle>{this.props.subtitle}</Subtitle>
              <ActionWrap>
                {this.props.actions}
              </ActionWrap>
            </Heading>
            {this.props.children}
    	  	 </Wrapper>
  }
}

const Wrapper = styled.div`
  display: block;
  position: relative;
	vertical-align: top;
	width: calc(100% - 2vmin - 2px);
	margin: 1vmin;
  font-size: 1.8vmin;

  border: 1px solid ${RP_SUPER_LIGHT};
  border-radius: 0.75vmin;

  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.17);
`
const Heading = styled.div`
  display: inline-block;
  width: calc(100% - 13vmin);
	padding: 1vmin 2vmin 0 2vmin;
  margin-bottom: 1vmin;
  vertical-align: top;
  text-align: left;

  &:hover {
    color: ${RP_BLACK};
  }
`
const Title = styled.div`
  font-weight: 100;
  display: inline-block;
  vertical-align: top;
  position: relative;
  font-size: 2.5vmin;
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
const ActionWrap = styled.div`
  position: absolute;
  right: 1vmin;
  bottom: 1vmin;
`
export default ActOrganization