import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_BLUE, RP_DARKBLUE } from 'Components'
import { SectionHeader } from 'Components'
import { BaseButton } from 'Components'

export * from './InfoBanner/index.jsx'
export * from './MainEntity/index.jsx'
export * from './Show/index.jsx'

export const SpecialRedPineHeading = styled(SectionHeader)`
  color: ${RP_BLACK};
  text-align: left;
  font-weight: bold;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 4vmin;
    text-align: left;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    text-align: left;
  }
`
export const NoDataFound = styled.div`
  display: block;
  width: 100%;
  height: auto;
  margin: 0px auto;
  color: ${RP_BLACK};
  font-size: 2vmin;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 2.5vmin;
    text-align: center;
  }
`
export const ColorButton = styled(BaseButton)`
  color: #FFF;
  font-weight: bold;
  background: ${props => props.color || RP_BLUE};
  line-height: 1.5;
  min-width: 1.8vmin;
  min-height: 1.8vmin;
  padding: 5px 10px;
  transition: background ease 0.25s;
  margin-right: 1.5vmin;
  margin-top: 1.5vmin;
  border-radius: 0.5vmin;

  &:hover {
    background: ${props => props.hoverColor || RP_DARKBLUE};
  }
`
export const IconButton = styled(BaseButton)`
  color: #FFF;
  font-weight: bold;
  background: ${props => props.color || RP_BLUE};
  padding: 0.5vmin 1.5vmin;
  transition: background ease 0.25s;
  margin-left: 1.5vmin;
  border-radius: 0.5vmin;
  font-size: 2.5vmin;

  &:hover {
    background: ${props => props.hoverColor || RP_DARKBLUE};
  }
`