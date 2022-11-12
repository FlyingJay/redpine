import React from 'react'
import styled from 'styled-components'

import { RP_DARK_GREY, RP_SUPER_LIGHT, RP_GREY } from 'Components' // GLOBALS


/*** DESKTOP RESULTS ***/
/** LARGE SEARCH RESULT - CONCERTS/VENUES **/

export const SearchResultsContainer = styled.div`
  display: block;
  position: relative;
  height: auto;
  width: auto;
  padding: 1vmin;
  margin-bottom: 1vmin;
  color: #494949;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2vmin;
  background: '#FFF';
  border-radius: 0.5vmin;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
  transition: all 0.25s ease;

  ${props => !props.disabled
    ? `box-shadow: 2px 2px 3px ${RP_GREY};`
    : ``}

  ${props => !(props.nohover || props.disabled)
    ? `&:hover {
          background: ${RP_SUPER_LIGHT};
          cursor: pointer;
        }`: ``}
`
export const SearchResultThumb = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: ${(props) => props.fullSearch ? '10vmin' : '5vmin'};
  width: ${(props) => props.fullSearch ? '10vmin' : '5vmin'};
  margin-right: ${(props) => props.fullSearch ? '2vmin' : '1vmin'};
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.image ? props.image : '/Assets/images/defaults/default-thumb.png'});
  border-radius: ${(props) => props.fullSearch ? '3px' : '1px'};
`
export const SearchResultInfo = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: CALC(100% - ${(props) => props.fullSearch ? '12.1vmin' : '6.1vmin'});
  height: auto;
`
export const SearchResultHeading = styled.div`
  display: block;
  position: relative;
  width: 50%;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2.5min;
  font-weight: bold;
  color: ${RP_DARK_GREY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;

  @media (max-width: 768px){
    font-size: 3vmin;
  }
`
export const SearchResultSubHeading = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  color: ${RP_DARK_GREY};
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2.25vmin;
  pointer-events: none;


  @media (max-width: 768px){
    font-size: 2.5vmin;
  }
`
export const SearchResultStat = styled.div`
  display: block;
  position: relative;
  float: left;
  width: auto;
  text-align: left;
  font-family: 'Open Sans',sans-serif;
  font-size: 2.5vmin;
  font-weight: bold;
  color: ${RP_DARK_GREY};
  margin-left: ${(props) => props.first ? '0' : '3vmin'};
  pointer-events: none;


  @media (max-width: 768px){
    font-size: 3vmin;
  }
`
export const SearchResultStatValue = styled.span`
  display: inline-block;
  position: relative;
  font-weight: 400;
  pointer-events: none;

  font-size: 2.25vmin;
`
export const SearchResultStatFocus = styled.span`
  display: inline-block;
  position: relative;
  padding-right: 0.5vmin;
  font-family: 'Open Sans',sans-serif;
  font-size: 2.25vmin;
  font-weight: bold;
  color: rgb(255,19,18);
  pointer-events: none;

  @media (max-width: 768px){
    font-size: 2.5vmin;
  }
`