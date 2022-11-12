import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_WHITE } from 'Components' // GLOBALS


export class Image extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return <ImagePanel {...this.props}>
            {this.props.children}
          </ImagePanel>
  }
}

export default Image


const ImagePanel = styled.div`
  margin: 0 auto;
  position: relative;
  display: ${props => props.inline ? 'inline-block' : 'block'};
  height: ${props => props.height || '100%' };
  width: ${props => props.width || '100%' };
  float: ${props => props.float || 'none' };
  background: url('${props => props.image || '/Assets/images/defaults/default-thumb.png' }');
  background-size: ${props => props.inline ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center !important;

  &:hover {
    cursor: ${props => props.clickable ? 'pointer' : 'default'};
  }
`
const RoundImage = styled(ImagePanel)`
  border-radius: 100vmin;
`
export const LoadingImage = styled(ImagePanel)`
  display: inline-block;
  width: 5vmin;
  height: 5vmin;
`
export const PageErrorImage = styled(ImagePanel)`
  width: 80vmin;
  height: 61vmin;
`
export const NavBarUserPic = styled(ImagePanel)`
  display: inline-block;
  vertical-align: middle;
  margin-right: 0vmin;
  margin-left: 1vmin;
  background: ${(props) => props.pic ? `url(${props.pic})` : `url('/Assets/images/profile.jpg')`};
  background-size: cover;
  border-radius: ${props => props.radius || '100%' };
  box-shadow: 0 0.5px 0 0 ${RP_WHITE} inset, 0 1px 2px 0 #B3B3B3;
`
export const ProfileBandPic = styled(ImagePanel)`
  display: inline-block;
  vertical-align: middle;
  margin-right: 0vmin;
  margin-left: 1vmin;
  background: ${(props) => props.pic ? `url(${props.pic})` : `url('/Assets/images/profile.jpg')`};
  background-size: cover;
  border-radius: ${props => props.radius || '100%' };
  box-shadow: 0 0.5px 0 0 ${RP_WHITE} inset, 0 1px 2px 0 #B3B3B3;
`
export const CampaignImage = styled(ImagePanel)`
  cursor: inherit !important;
  border-radius: ${props => props.radius || '0.75vmin' };
`
export const VenueImage = styled(ImagePanel)`
  border-radius: ${props => props.radius || '0.5vmin' };
  box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  background-position: cover !important;

`
export const ActBioImage = styled(ImagePanel)`
  border-radius: ${props => props.radius || '0.5vmin' };
  box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  background-size: cover;
`
export const TutorialIconator = styled(ImagePanel)`
  display: none;
  border-radius: ${props => props.radius || '0.75vmin' };
`
export const LightOverlay = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
`
export const Overlay = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
`
export const ConcertThumb = styled(ImagePanel)`
  display: inline-block;
  position: relative;
  width: 10vmin;
  height: 10vmin;
  margin-right: 3vmin;
  border-radius: 0.25vmin;
  vertical-align: top;
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.1);
`
export const AmenityImage = styled(ImagePanel)`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 7vmin;
  height: 7vmin;
  margin-right: 1vmin;
  background: ${(props) => props.icon ? `url(${props.icon})` : RP_WHITE};
  background-size: 5vmin;
  background-position: right center !important;
  background-repeat: no-repeat;
  filter: ${(props) => props.enabled ? 'grayscale(0%);' : 'grayscale(100%);'};
  -webkit-filter: ${(props) => props.enabled ? 'grayscale(0%);' : 'grayscale(100%)'};
`
export const CampaignOverlay = styled(Overlay)`
  cursor: inherit !important;
  border-radius: 1vmin 1vmin 0 0;

  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;

  &:hover {
    background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
  }
`
export const BackgroundImage = styled.div`
  height: ${props => props.height || 'auto' };
  background: url('${props => props.image}') no-repeat;
  background-size: cover;
`
export const ImageIcon = styled.img`
  width: 16px;
  height: 16px;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 10px;
    height: 10px;
  }
`