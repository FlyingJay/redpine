import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_SUPER_LIGHT, RP_DDD } from 'Components' //GLOBALS


export class SettingsSection extends React.PureComponent {
  render() {
    return (
      <SectionContainer show={this.props.show}>
        <SectionTopWrap>
          <SectionHeading>{this.props.title}</SectionHeading>
          <SectionSummary>{this.props.subtitle}</SectionSummary>
        </SectionTopWrap>
        <SectionDetails>{this.props.children}</SectionDetails>
      </SectionContainer>
    )
  }
}

export default SettingsSection


const SectionContainer = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`
const SectionTopWrap = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 2vmin 3vmin;
  margin: 0;
  border-bottom: 1px solid ${RP_DDD};
  text-align: left;
`
const SectionHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  color: ${RP_BLACK};
  font-size: 2vmin;
  font-weight: bold;
`
const SectionSummary = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  font-weight: 100;
`
const SectionDetails = styled.div`
  padding: 2vmin 3vmin;
`