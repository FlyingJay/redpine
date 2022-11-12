import React from 'react'
import styled from 'styled-components'
import { PageSection as PageSectionOriginal } from 'Components' // PANEL
import { RP_BLACK, RP_WHITE, RP_DARKGREY, RP_DARK_GREY, RP_FONT } from 'Components' //GLOBALS

/*** ALMOST FOOTER CONTENT WRAPPER - CALL TO ACTION (CTA) FOR ALL VredENUES AND ARTISTS ***/
export const MajorCTA = styled(PageSectionOriginal)`
  width: 80%;
  padding: 10vmin 0;
  margin-top: 0;
  margin-bottom: 5vmin;
  overflow: hidden;
  background: ${(props) => props.image ? `url(${props.image})`: RP_WHITE};
  background-color: ${(props) => props.imageFill ? props.imageFill : RP_WHITE}
  background-size: ${(props) => props.imageSize ? props.imageSize : 'cover'};;
  background-position: ${(props) => props.imagePosition ? props.imagePosition : 'center'};
  background-repeat: no-repeat;
  border-radius: 3px;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    margin-bottom: 0vmin;
    border-radius: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 100%;
    margin-bottom: 0vmin;
    border-radius: 0;
  }
`

export const MonthHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 7vmin 0 1vmin 0;
  color: ${RP_DARK_GREY}
  font-size: 2.8vmin;
  font-weight: bold;

  &:first-child {
    padding: 0 0 1vmin 0 !important;
  }
`
export const SectionHeader = styled.div`
  display: ${props => props.blockType ?  'block' : 'inline-block'};
  position: relative;
  width: 100%;
  margin: 0 auto;
  color: ${props => props.color || RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 3vmin;
  font-weight: 300;
  text-align: center;
  line-height: 10vmin;
  white-space: normal;
`
export const SectionSubHeader = styled.div`
	display: block;
  padding-bottom: 5vmin;
	color: ${props => props.color || RP_BLACK};
	font-family: ${RP_FONT};
	font-size: 2vmin;
	font-weight: 100;
	white-space: normal;
`
export const PageTitle = styled.div`
	display: block;
	position: relative;
	padding-bottom: 0vmin;
	color: ${RP_BLACK};
	font-family: ${RP_FONT};
	font-size: 3.5vmin;
	font-weight: normal;
	text-align: left;

  @media (max-width: 1024px){ 
    font-size: 4.5vmin;
  }
`
export const PageSummary = styled.div`
	display: block;
	position: relative;
	color: ${RP_DARK_GREY};
	margin: 0 auto 3vmin auto;
	font-family: ${RP_FONT};
	font-size: 2.5vmin;
	font-weight: 100;
	text-align: ${props => props.center ? 'center' : 'left'};

  @media (max-width: 1024px){ 
    font-size: 4vmin;
  }
`
const TitleWrap = styled.div`
	display: block;
	margin: 0px auto;
	width: 100%;
	text-align: ${props => props.settings ? 'left' : 'center'};;
	height: auto;
`
export class Title extends React.PureComponent {
  render() {
    return (
      <TitleWrap settings={this.props.settings}>
        <PageTitle>{this.props.title}</PageTitle>
        <PageSummary center={this.props.center}>{this.props.summary}</PageSummary>
      </TitleWrap>
    )
  }
}

export default Title