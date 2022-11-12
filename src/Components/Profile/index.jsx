import React from 'react'
import styled from 'styled-components'

import { MyPageWrapper, RP_BLACK, RP_DARKGREY, RP_BLUE, RP_DARK_GREY, RP_SUPER_LIGHT } from 'Components' // GLOBALS
import { ProfileBandPic } from 'Components' // IMAGE


export const ProfilePageWrapper = styled(MyPageWrapper)`
  width: 75vw;
  background: #E3E3E3;
  padding: 0;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100% !important;
    max-width: 100% !important;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) { 
    width: 90% !important;
    max-width: 90% !important;
  }
`

/*** HEADING ***/
export const UpperHeader = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 30vmin;
  padding: 7vmin 0;
  background: ${(props) => props.background ? `url(${props.background})` : `url('/Assets/images/background/bg1.jpg')`};
  background-size: cover;
  background-position: center;

  @media (max-width: 767px) and (orientation: portrait) {
    height: 40vmin;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) {
    height: 40vmin;
  }
`
export const UpperHeaderOverlay = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(62,62,62,.7);
`
export const HeaderInner = styled.div`
  display: block;
  position: relative;
  width: 50%;
  height: auto;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 767px) and (orientation: portrait) {
    width: 75%;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) {
    width: 75%;
  }
`
export const BorderThisPicture = styled.div`
  display: block;
  position: relative;
  width: 13vmin;
  height: 13vmin;
  margin: 0 auto;
  padding: 0.5vmin;
  border: 3px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 100%; 
`
export const BorderedPicture = styled(ProfileBandPic)`
  cursor: pointer;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-shadow: none;
`
export const ProfileName = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 2vmin 0 1vmin 0;
  text-align: center;

  span {
    display: inline-block;
    color: #FFF;
    font-size: 2.9vmin;
    font-weight: bold;
    text-align: center;
  }

  i {
    display: inline-block;
    width: 2.5vmin;
    height: 2.5vmin;
    margin-left: 2vmin;
    background: #FFF;
    color: ${(props) => props.is_featured ? RP_BLUE : RP_DARKGREY};
    font-size: 2.9vmin;
    text-align: center;
    line-height: 2.5vmin;
    border-radius: 100%;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3.5vmin;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
export const ProfileBio = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  color: #FFF;
  font-size: 2vmin;
  font-weight: 300;
  text-align: center;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.7vmin;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) {
    font-size: 2vmin;
  }
`
export const ProfileStats = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 3vmin;
  text-align: center; 
`
export const StatsItem = styled.div`
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  padding-right: 2vmin;
  color: #FFF;
  font-size: 1.8vmin;
  font-weight: 300;
  text-align: left;

  i {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    padding-right: 1vmin;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    width: auto;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2.1vmin;
  }
`

/*** EVERYTHING ELSE ***/
export const MiddleSection = styled.div`
  display: block;
  position: relative;
  width: CALC(100% - 6vmin);
  height: auto;
  padding: 3vmin;
  text-align: center;
`
export const MajoritySub = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: calc(60% - 2vmin);
  height: auto;
  margin-right: 2vmin;

  @media (max-width: 1024px) {
    width: 100%;
    margin-right: 0;
  }
`
export const MinoritySub = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 40%;
  height: auto;

  @media (max-width: 1024px) {
    width: 100%;
  }
`
export const SexiestPanelEver = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: CALC(100% - 4vmin);
  height: auto;
  padding: 2vmin;
  margin-bottom: 2vmin;
  background: #FFF;
  box-shadow: 0 0 1px rgba(0,0,0,.1);
  border-radius: 0.33vmin;
  text-align: left;
`
export const PanelHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding-bottom: 0.75vmin;
  border-bottom: 1px solid #E5E5E5;

  i {
    padding-right: 2vmin;
    color: ${(props) => props.color ? props.color : RP_DARK_GREY};
    font-size: 2.1vmin;
    font-weight: 400;
    text-align: left;
  }

  span {
    color: ${RP_DARK_GREY};
    font-size: 2.1vmin;
    font-weight: 400;
    text-align: left;

    b {
      font-size: 1.8vmin;
      font-weight: bold;
    }
  }

  @media (max-width: 767px) and (orientation: portrait) {
    i {
      font-size: 3vmin;
    }

    span {
      font-size: 3vmin;

      b {
        font-size: 2vmin;
        font-weight: bold;
      }
    }
  }
`
export const PanelContent = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding-top: 2vmin;
  color ${RP_BLACK};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;

  span {
    color: ${RP_BLACK};
    font-size: 1.8vmin;
  font-weight: 400;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2.3vmin;

    span {
      color: ${RP_BLACK};
      font-size: 2.3vmin;
    }
  }
`
export const SexifyPersonality = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding-top: 3vmin;
  color: ${RP_DARKGREY};
  font-size: 1.8vmin;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
`
export const ViewAllData = styled.div`
  cursor: pointer;
  display: ${(props) => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  margin: 2vmin auto 0 auto;
  background: ${RP_SUPER_LIGHT};
  text-align: center;
  border-radius: 3px;
  transition: all .25s ease;

  i {
    color: ${RP_DARKGREY};
    font-size: 2vmin;
  }

  &:hover {
    i {
      color: ${RP_BLACK};
    }
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    &:hover {
      i {
        color: ${RP_DARKGREY};
      }
    }
  }
`