import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_DARKGREY, RP_SUPER_LIGHT, RP_BLUE, RP_DARKBLUE } from 'Components'
import { FormInput, TextBox, FormButton } from 'Components'


export const SidePanel = styled.div`
  display: block;
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 40vw;
  height: 100%;
  padding: 0 3vmin;
  background: ${RP_WHITE}
  text-align: center;
  box-shadow: -1px 0px 10px 1px #797979;
  
  &::-webkit-scrollbar {cursor: pointer;width: 1.5vmin;}
  &::-webkit-scrollbar-track {background: ${RP_SUPER_LIGHT};border-radius:5vmin;}
  &::-webkit-scrollbar-thumb {background: ${RP_DARKGREY};border-radius:5vmin;}
  &::-webkit-scrollbar-thumb:hover {}

  @media (max-width: 1024px) and (orientation: portrait){ 
    width: 100%;
    padding: 0;
  }
`
export const ModalSection = styled.div`
  display: block;
  position: relative;
  padding: ${props => props.top ? '8vmin' : '0'} 6vmin 3vmin 6vmin;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 1024px) and (orientation: portrait){ 
    padding: ${props => props.top ? '12vmin' : '0'} 6vmin 3vmin 6vmin;
  }
`  
export const ModalHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  color: ${RP_DARK_GREY};
  font-size: 3vmin;
  font-weight: bold;
  text-align: left;

  @media (max-width: 1024px) and (orientation: portrait){ 
    font-size: 4.5vmin;
  }
`
export const ModalSubheading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin-bottom: 2vmin;
  color: ${RP_DARKGREY};
  font-size: 2.25vmin;
  font-weight: bold;
  text-align: left;

  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  @media (max-width: 1024px) and (orientation: portrait){ 
    font-size: 2.75vmin;
  }
`
export const FieldName = styled.div`
  color: ${RP_DARK_GREY};
  font-size: 1.7vmin;
  font-weight: bold;
  padding-top: 2vmin;
`
export const ImagePanel = styled.div`
  position: relative;
  background: url(${(props) => props.background});
  background-size: ${(props) => props.backgroundSize || 'cover'};
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.5vmin 0.5vmin 0 0;
`
export const ImagePanelOverlay = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  border-radius: 0.5vmin;
`
export const Description = styled.div`
  margin: 0;
  background: rgba(255,255,255,0.6);
  padding: 0;
  text-align: left;
  font-size: 2.25vmin;
`
export const DescriptionTextBox = styled(TextBox)`
  display: block;
  position: relative;
  padding: 2vmin 3vmin;
  border-radius: 0.5vmin;
  resize: vertical;
  max-height: 35vmin;
`

export const ModalButtons = styled.div`
  display: block;
  position: relative;
  text-align: right;
`
export const EditButton = styled.div`
  display: inline-block;
  padding: 0;
  color: ${(props) => props.alternateColor ? RP_SUPER_LIGHT : RP_DARK_GREY};
  font-size: 2.5vmin;

  span {
    cursor: pointer;
    color: ${(props) => props.alternateColor ? RP_SUPER_LIGHT : RP_DARK_GREY};
    font-size: 1.8vmin;
  }

  &:hover {
    i {
      color: ${(props) => props.alternateColor ? RP_WHITE : RP_BLACK};
    }
    span {
      color: ${(props) => props.alternateColor ? RP_WHITE : RP_BLACK};
    }
  }
`
export const PositiveButton = styled(FormButton)`
  display: inline-block;
  position: relative;
  width: auto;
  background: ${RP_BLUE};

  &:hover {
    background: ${RP_DARKBLUE};
  }
`
export const NegativeButton = styled(FormButton)`
  display: inline-block;
  position: relative;
  width: auto;
  background: ${RP_WHITE};
  color: ${RP_DARK_GREY};

  &:hover {
    background: ${RP_WHITE};
    color: ${RP_BLACK};
  }
`
export const TabbedData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${RP_BLACK};
`
export const ModalPromptLike = styled.div`
  display: block;
  position: relative;
  top: 55%;
  width: 50vw;
  max-width: 800px;
  height: auto;
  margin: 0 auto;
  padding: 0 3vmin 3vmin 3vmin;
  background: ${RP_WHITE};
  border-radius: 0.5vmin;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.33);
  transform: translateY(-60%);

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 65vw;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 75vw;
  }
`
export const ModalPromptHeader = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 2.5vmin 3vmin;
  margin: 0 -3vmin;
  background: ${RP_SUPER_LIGHT}
  color: ${RP_BLACK};
  font-size: 2.3vmin;
  font-weight: 400;
  border-radius: 0.5vmin 0.5vmin 0 0;
  text-align: left;
`
export const ModalPromptDesc = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 3vmin 0;
  color: ${RP_BLACK};
`
export const DescTotalWarn = styled.div`
  margin-bottom: 3vmin;
  color: ${RP_BLACK};
  font-size: 3vmin;
  font-size: 700;
`
export const DescConsequences = styled.div`
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  font-size: 300;
`
export const ModalPromptActions = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 1.5vmin;
  text-align: right;
`
export const ConfirmAction = styled(FormButton)`
  background: ${RP_BLUE};
  color: ${RP_WHITE};

  &:hover {
    background: ${RP_DARKBLUE};
    color: ${RP_WHITE};
  }
`
export const CancelAction = styled(FormButton)`
  margin-right: 2vmin;
  background: ${RP_WHITE};
  color: ${RP_DARK_GREY};
  font-weight: bold;

  &:hover {
    background: ${RP_WHITE};
    color: ${RP_BLACK};
  }
`