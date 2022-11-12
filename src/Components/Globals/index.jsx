import React from 'react'
import styled from 'styled-components'

/// COLOR SCHEME

// PINE COLOURS
export const RP_RED = '#FF1312';
export const RP_PINK = '#F56363';
export const RP_ORANGE = '#FF9000';
export const RP_DARKORANGE = '#F07000';
export const RP_PURPLE = '#9400D3';
export const RP_DARKPURPLE = '#7a02ad';
export const RP_YELLOW = '#F0ED2D';
export const RP_GREEN = '#5DDC5D';
export const RP_BLUE = '#0AA4CA';
export const RP_DARKBLUE = '#006A9E';

// BLACK AND WHITE
export const RP_WHITE = '#FFFFFF';
export const RP_LIGHTGREY = '#F1EEEA';
export const RP_SUPER_LIGHT = '#EEEEEE';
export const RP_GREY = '#D5D5D5';
export const RP_DDD = '#DDDDDD';
export const RP_SILVER = '#C0C0C0';
export const RP_DARKGREY = '#999999';
export const RP_DARK_GREY = '#595959';
export const RP_BLACK = '#313131';

// SCROLL BARS
export const RP_TRACK = '#F3F3F3';
export const RP_THUMB = '#D9D9D9';

// JUST FOR GRAPHS
export const GRAPH_MAGENTA = '#E257E5';

// SOCIAL MEDIA
export const FACEBOOK = '#354F88';
export const FACEBOOK_DEFAULT = '#3B5998';
export const TWITTER = '#45B0E3';
export const INSTAGRAM = '#F56363';
export const SOUNDCLOUD_ORANGE = '#F50';
export const YOUTUBE_RED = '#FF0000';
export const SPOTIFY_GREEN = '#1F9B49';




// FONTS
export const RP_LOGOFONT = '\'Pacifico\', cursive';
export const RP_FONT = '\'Open Sans\', Sans Serif';

export const LogoRed = styled.span`
  font-size: ${props => props.size || '7vmin'};
  font-family: ${RP_LOGOFONT};
  color : ${RP_RED};
`
export const Bold = styled.span`
  font-weight: bold;
`
export const LogoWhite = styled.span`
  font-size: ${props => props.size || '7vmin'};
  font-family: ${RP_LOGOFONT};
  color : #FFF;
`
export const LogoBlack = styled.span`
  font-size: ${props => props.size || '4vmin'};
  font-family: ${RP_LOGOFONT};
  color : #494949;
`
export const RedWhiteLogo = ({inline,size}) => (
  <div style={{display:inline ? 'inline-block' : 'block'}}>
    <LogoRed size={size}>Red</LogoRed>
    <LogoWhite size={size}>Pine</LogoWhite>
  </div>
);
export const RedBlackLogo = ({inline,size}) => (
  <div style={{display:inline ? 'inline-block' : 'block'}}>
    <LogoRed size={size}>Red</LogoRed>
    <LogoBlack size={size}>Pine</LogoBlack>
  </div>
);
export const CenterText = styled.p`
  margin: 0 auto;
  text-align:center;
  width:100%;
  color: ${RP_BLACK};
`
export const Center = styled.div`
  text-align: center;
`
export const Bottom = styled.div`
  position: absolute;
  bottom: 0;
`
export const Left = styled.div`
  position: absolute;
  left: 0;
`
export const Clear = styled.div`
  display: block;
  position: relative;
  clear: both;
`
export const TopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`
export const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
export const BottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`
//Older version of MyPageWrapper, can be refactored into it.
export const MobileFirstDiv = styled.div`
  width: 60vw;
  height: auto;
  margin: 0 auto;
  display: block;

  @media (max-width: 700px) { 
    width: 100%;
  }
`
export const MyPageWrapper = styled.div`
  display: block;
  width: 80vw;
  margin: 0 auto;
  padding: 50px 0 10vmin 0;

  @media (max-width: 768px) and (orientation: portrait) { 
    padding: 20px 0 10vmin 0;
    width: 90vw;
  }
`
export const FormNotice = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 0 0 3vmin 0;
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.7vmin;
  }
`