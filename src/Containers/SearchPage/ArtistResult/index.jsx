import React from 'react'
import styled from 'styled-components'

import { RP_Act } from 'Models'

import { Bottom, Clear, RP_DARK_GREY, RP_RED, RP_GREY } from 'Components' // GLOBALS


export class ArtistResult extends React.PureComponent {
  render() {
    const _Act = RP_Act(this.props.act)

    return (
      <ActContainer onClick={() => this.props.onClick()}>
        <ActImage image={_Act.picture}>
          <Overlay/>
        </ActImage>
        <Titles>
          <ActName>{_Act.name}</ActName>
          <ActCity>{_Act.genre_hometown}</ActCity>
        </Titles>
      </ActContainer>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.act == null) return true
    if (nextProps.act != this.props.act) return true
    return false
  }
}

const ActContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 25vmin;
  height: auto;
  margin-right: 2vmin;
  margin-bottom: 2vmin;
  color: ${RP_DARK_GREY};
  box-shadow: 4px 4px 3px ${RP_GREY};

  &:hover {
    .venueImageOverlay {
      background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    }
  }
`
const ActImage = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 20vmin;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.image});
`
const ActInfoBasis = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.8vmin;
  font-weight: bold;
`
const Overlay = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  border-radius: inherit;
  border-radius: 1vmin 1vmin 0 0;
`
const ActName = styled(ActInfoBasis)`
  font-size: 2.5vmin;
  font-weight: 600;
  padding: 0 1.5vmin;
  color: #FFF;
`
const ActCity = styled(ActInfoBasis)`
  color: ${RP_RED};
  font-size: 2.25vmin;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1vmin 1.5vmin;
`
const Titles = styled(Bottom)`
  width: 100%;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
`