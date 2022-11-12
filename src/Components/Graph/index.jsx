import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { Clear } from 'Components' // GLOABLS
import { RedLink } from 'Components' // LINK
import { Title } from 'Components' // TITLE


export class Graph extends React.PureComponent {

	render () {
		return (
			<div>
        <GraphBox>
          <Title title={this.props.title} summary={this.props.summary} />
          {this.props.children}
          <Clear/>
        </GraphBox>
        <Clear/>
        {
        	this.props.last
        	? <SuggestSomeShitToUs/>
        	: null
        }
      </div>
		);
	}
}

const SuggestSomeShitToUs = ({}) => (
  <SuggestWrapper>
      Want to find out more about yourself or suggest new analytics? Reach us via
      &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>,
      &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or
      &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink> and we'll see what we can do!
  </SuggestWrapper>
)

const GraphBox = styled.div`
  display: block;
  position: relative;
  display: block;
  height: 40vmin;
  padding-bottom: 10vmin;
`
const SuggestWrapper = styled.div`
  display: block;
  position: relative;
  margin-top: 13vmin;
  font-size: 1.8vmin;
  text-align: center;
`