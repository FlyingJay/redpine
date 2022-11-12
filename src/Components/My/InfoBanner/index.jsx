import React from 'react'
import styled from 'styled-components'

import { MajorCTA, SectionHeader, SectionSubHeader } from 'Components'


export class InfoBanner extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return <CTAContainer image={this.props.image} imageFill={this.props.background} imageSize="25vmin" imagePosition="90% center">
  	        <CTAContentWrapper>
  	          <CTAHeader color="#FFF">{this.props.title}</CTAHeader>
  	          <CTASubheader color="#FFF">
  	          	{this.props.children}
  	          </CTASubheader>
  	        </CTAContentWrapper>
  	       </CTAContainer>
  }
}
export default InfoBanner

const CTAContainer = styled(MajorCTA)`
  width: 100%;
  margin-bottom: 3vmin;
  padding: 3vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    margin-bottom: 5vmin;
    border-radius: 3px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 5vmin;
    border-radius: 3px;
  }
`
const CTAContentWrapper = styled.div`
  display: block;
  position: relative;
  width: 60%;
  padding: 0 10%;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 50%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 50%;
  }
`
const CTAHeader = styled(SectionHeader)`
  width: 100%;
  padding: 0;
  padding-bottom: 1vmin;
  font-size: 4vmin;
  text-align: left;
  line-height: normal;

  @media (max-width: 767px) and (orientation: portrait) {
    padding-bottom: 3vmin;
    font-weight: bold;
  }
`
const CTASubheader = styled(SectionSubHeader)`
  width: 100%;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`