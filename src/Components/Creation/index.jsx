import React from 'react'
import styled from 'styled-components'
import { RP_RED, RP_BLACK, RP_BLUE, RP_DARKBLUE, RP_WHITE, RP_DARKGREY, RP_DDD, RP_DARK_GREY, RP_GREEN, RP_PINK, RP_SUPER_LIGHT, RP_FONT } from 'Components' // GLOBALS
import { Image, FormInput, TextBox, Button } from 'Components' // BUTTON, IMAGE, INPUT

//*** MODAL FORM ***
const ModalFormWrapper = styled.div`
  z-index: 9999999;
  opacity: ${(props) => props.show ? '1' : '0'};
  visibility: ${(props) => props.show ? 'visible' : 'hidden'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${RP_WHITE};
  overflow-y: auto;
  transition: all .3s ease .15s;
  
  &::-webkit-scrollbar {cursor: pointer;width: 1vmin;}
  &::-webkit-scrollbar-track {background: rgb(243,243,243);}
  &::-webkit-scrollbar-thumb {background: ${RP_DDD};}
  &::-webkit-scrollbar-thumb:hover {}
`

export class ModalForm extends React.PureComponent {
  render() {
    return (
      <ModalFormWrapper show={this.props.show}>
        {this.props.children}
      </ModalFormWrapper>
    )
  }
}

//*** LANDING PAGE INFO AND DETAILS ***
export const TotalLandingWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
`
//** LANDING PAGE HEADER **
export const LandingInfoWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 5vmin 0;
  background: url('${props => props.image || '' }');
  background-size: cover;

  @media (max-width: 767px) and (orientation: portrait) { 
    background: url('${props => props.mobileImage || '' }');
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    background: url('${props => props.mobileImage || '' }');
  }
`
export const InnerContentWrapper = styled.div`
  display: block;
  position: relative;
  width: ${props => props.width || '60vw' };
  height: auto;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 70vw;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 70vw;
  }
`
export const InnerContent = styled.div`
  display: block;
  position: relative;
  width: 23vw;
  height: auto;
  padding: 9vmin 5vmin;
  padding-right: 9vmin;
  background: ${RP_WHITE};
  border-radius: 0.5vmin;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: auto;
    background: transparent;
    box-shadow: 0px 0px 0px rgba(0,0,0,0);
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: auto;
    background: transparent;
    box-shadow: 0px 0px 0px rgba(0,0,0,0);
  }
`
export const ContentMinorHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  color: #373635;
  font-size: 1.8vmin;
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 767px) and (orientation: portrait) {
    color: ${RP_WHITE};
    font-size: 2.5vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    color: ${RP_WHITE};
    font-size: 1.8vmin;
  }
`
export const ContentMajorHeading = styled.div`
  display: block;
  position: relative;
  width: 21vw;
  height: auto;
  margin: 5vmin 0;
  color: #373635;
  font-size: 4vmin;
  font-weight: bold;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: auto;
    color: ${RP_WHITE};
    font-size: 5vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: auto;
    color: ${RP_WHITE};
    font-size: 3vmin;
  }
`
export const ContentSummary = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  color: #373635;
  font-size: 2vmin;
  font-weight: 100;

  @media (max-width: 767px) and (orientation: portrait) {
    color: ${RP_WHITE};
    font-size: 2.5vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    color: ${RP_WHITE};
    font-size: 2.5vmin;
  }
`
export const ContentAction = styled(Button)`
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  margin-top: 7vmin;
  margin-right: ${(props) => props.alternativeColor ? '1.3vmin' : '0' };
  background: ${(props) => props.alternativeColor ? RP_BLUE : RP_PINK };
  transition: all 0.25s ease;

  &:hover {
    background: ${(props) => props.alternativeColor ? RP_DARKBLUE : RP_RED };
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.5vmin;
    padding: 2vmin 4vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.6vmin;
    padding: 2vmin 4vmin;
  }
`
//** LANDING PAGE DETAILS **
export const LandingInfoDetails = styled.div`
  display: block;
  position: relative;
  width: 69vw;
  height: auto;
  margin: 0 auto;
  padding: 7vmin 0;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 7vmin 0 5vmin 0;
  }
`
//* MAIN SECTION *
export const HowToSectionWrapper = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 5vmin 0;
  text-align: center;
  color: ${RP_DARK_GREY}
  font-size: 2.3vmin;
  font-weight: 100;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1vmin;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 4vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 2vmin;
  }
`
export const DetailsSection = styled.div`
  display: ${(props) => props.show === false ? 'none' : 'block'};
  padding: 5vmin 0;
`
export const DetailsSectionStepCount = styled.div`
  width: 2vmin;
  height: 2vmin;
  padding: 1vmin;
  background: ${RP_SUPER_LIGHT};
  box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  border-radius: 100%;
  color: ${RP_BLACK};
  font-size: 1.6vmin;
  font-weight: bold;
  text-align: center;
  line-height: 2vmin;
`
export const DetailsHeading = styled.div`
  padding: 1vmin 0;
  color: ${RP_BLACK};
  font-size: 6vmin;
  font-weight: 100;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 5vmin;
    font-weight: bold;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 3vmin;
    font-weight: bold;
  }
`
export const DetailsSubheading = styled.div`
  width: 100%;
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 100;
  padding-bottom: 5vmin;

  @media (max-width: 767px) and (orientation: portrait) { 
    font-size: 3vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.8vmin;
  }
`
//* SUBSECTION *
export const DetailsSubsection = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: CALC(100% / 3);
  height: auto;
  padding: 1vw 0;

  i {
    color: ${RP_PINK};
    font-size: 3vmin;
  }

  @media (max-width: 767px) and (orientation: portrait) { 
    display: ${props => props.display ? 'block' : 'none'};
    width: 100%;
    padding: 3vmin 0;
    margin: 0 auto;

    i {
      font-size: 5vmin;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    display: ${props => props.display ? 'inline-block' : 'none'};
    width: CALC(100% / 2);
    padding: 2vmin 0;

    i {
      font-size: 2.3vmin;
    }
  }
`
export const SubsectionHeading = styled.div`
  width: 90%;
  padding: 1vmin 0;
  color: ${RP_DARK_GREY};
  font-size: 2.1vmin;
  font-weight: bold;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    font-size: 4vmin;
    font-weight: bold;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    font-size: 2vmin;
    font-weight: bold;
  }
`
export const SubsectionSummary = styled.div`
  width: 90%;
  color: ${RP_DARK_GREY};
  font-size: 2vmin;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    font-size: 3vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    font-size: 1.6vmin;
  }
`
//** LANDING INFO FOOTER **
export const LandingInfoFooter = styled.div`
  display: block;
  position: relative;
  width: 69vw;
  height: auto;
  padding: 10vmin 0;
  margin: 3vmin auto 7vmin auto;
  background: url('${props => props.image || '' }');
  background-size: cover;
  border-radius: 0.5vmin;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  text-align: center;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100vw;
    margin-bottom: 0;
    border-radius: 0;
    box-shadow: 0px 0px 0px rgba(0,0,0,0);
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80vw;
  }
`
export const FooterHeading = styled.div`
  display: inline-block;
  position: relative;
  width: auto;
  max-width: 50vw
  padding: 0 0 3vmin 0;
  margin: 0 auto;
  color: ${RP_WHITE};
  font-size: 4vmin;
  font-weight: 100;

  @media (max-width: 767px) and (orientation: portrait) { 
    max-width: 63vw
    font-size: 5vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 69vw;
    font-size: 3vmin;
  }
`
export const FooterAction = styled(Button)`
  display: inline-block;
  position: relative;
  width: auto;
  max-width: 20vw;
  margin: 0 auto;
  color: ${RP_WHITE};
  font-size: 2vmin;
  font-weight: 100;

  @media (max-width: 768px) and (orientation: portrait) {
    padding: 2vmin 4vmin;
  }
`
export const FormScreenStep = styled.div`
  display: ${(props) => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
`
export const NormalButton = styled(Button)`
  background-color: ${RP_BLUE};

  &:hover {
    background-color: ${RP_DARKBLUE};
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
export const PrevButton = styled(Button)`
  margin-left: 0;
  padding-left: 0;
  padding-right: 0;
  background-color: transparent;
  color: ${RP_DARK_GREY};
  font-weight: bold;

  &:hover {
    color: ${RP_BLACK};
    background: transparent;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
/*** FINALIZE DETAILS ***/
export const DetailsWrap = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 0 0 0.5vmin 0;
  margin: 0;
`
export const DetailsSepa = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 0 0 5vmin 0;
  margin: 0;
`
export const DetailName = styled.div`
  display: inline-block;
  verticalAlign: top;
  position: relative;
  width: 35%;
  height: auto;
  padding: 0;
  margin: 0;
  color: ${RP_BLACK};
  font-size: 2vmin;
  font-weight: bold;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.7vmin;
  }
`
export const DetailDescription = styled.div`
  display: inline-block;
  verticalAlign: top;
  position: relative;
  width: 65%;
  height: auto;
  padding: 0;
  margin: 0;
  color: ${RP_DARK_GREY};
  font-size: 2vmin;
  font-weight: 400;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.7vmin;
  }
`