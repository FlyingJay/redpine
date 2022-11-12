import React from 'react'
import styled from 'styled-components'

import { RP_User, RP_Venue } from 'Models'

import { RP_BLACK, RP_PINK, RP_DDD, RP_SUPER_LIGHT, RP_DARKGREY, RP_BLUE, Clear } from 'Components' // GLOBALS
import { Tooltip } from 'Components' 
import { Markdown } from 'Components' 
import { Badge } from 'Components' 


export class VenueResult extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const _User          = RP_User(this.props.user)
    
    const venue          = this.props.venue
    const _Venue         = RP_Venue(venue)
    
    const selected       = this.props.selected
    const is_crowdfunded = this.props.is_crowdfunded
    const is_opening     = this.props.is_opening

    const can_edit_venue = !this.props.is_opening
    
    const is_hidden = (!_User.is_member_artist && !_Venue.has_fast_reply)

    const f = (val) => { return parseInt(val) } //format price

    return (
      <VenueWrap onClick={() => can_edit_venue ? this.props.onClick() : null} selected={selected} disabled={is_hidden}>
        { is_hidden
          ? <Overlay opacity="0.5"/>
          : null }      
        { this.props.selected
          ? null
          : <div className="openLink"><i className="fa fa-arrow-right"/></div> }
        <Photo photo={_Venue.picture} selected={selected}>
          { is_hidden
            ? <Overlay opacity="0.9"/>
            : null }
            { _Venue.is_promotion
              ? <Tooltip place="top" tip="Message RedPine for more info!">
                  <Badge text="+ Social Media Promo" fontSize="1.75vmin" shift={{top:'-10px','right':'-10px'}}/>
                </Tooltip> 
              : null }
        </Photo>
        <Details>
          <Name selected={selected}>
            {_Venue.title}
            { _Venue.has_fast_reply
              ? <Tooltip place="bottom" tip="RedPine Verified!">
                  &nbsp;<i className="fa fa-check-circle" style={{color:RP_BLUE}}/>
                </Tooltip>  
              : !_User.is_member_artist 
                ? <Tooltip place="bottom" tip="Requires Membership">
                    &nbsp;<i className="fa fa-lock" style={{color:RP_DARKGREY}}/>
                  </Tooltip>
                : null }
          </Name>
          <DetailItem selected={selected}>
            <Icon className="fa fa-music"/>
            <DetailContent>{_Venue.genre_string}</DetailContent>
          </DetailItem>
          <DetailItem selected={selected}>
            <Icon className="fa fa-home"/>
            <DetailContent>Capacity of {_Venue.capacity}</DetailContent>
          </DetailItem>
          <DetailItem selected={selected}>
            &nbsp;<Icon className="fa fa-map-marker"/>
            <DetailContent>{_Venue.address}</DetailContent>
          </DetailItem>
          { this.props.selected && can_edit_venue
            ? <ChangeButton>
                Edit&nbsp;&nbsp;
                <i className="fa fa-arrow-right"/>
              </ChangeButton>
            : null }
        </Details>
        <Clear></Clear>
        { selected
          ? <Description is_crowdfunded={is_crowdfunded}>
              <Markdown text={_Venue.description}/>
              <br/>
              { _Venue.before_booking_info
                ? <Markdown text={_Venue.before_booking_info}/>
                : null }
            </Description>
          : null }
      </VenueWrap>
    )
  }
}

const ChangeButton = styled.div`
  display: block;
  text-align: right;
  font-size: 2.5vmin;
  color: ${RP_DARKGREY};
  padding: 2vmin; 0 0 0;

  &:hover {
    color: ${RP_BLACK};
  }
`
const VenueWrap = styled.div`
  display: block;
  position: relative;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
  padding: 1vmin 0 1vmin 0;

  .openLink {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 3vmin;
    height: 100%;
    padding: 0 1vmin;
    background: ${RP_DDD};
    color: ${RP_PINK};
    font-size: 1.8vmin;
    font-weight: 400;
    text-align: center;

    i {
      display: inline-block;
      vertical-align: middle;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 2vmin;
      height: 2vmin;
      margin: auto;
      line-height: 2vmin;
    }
  }

  ${props => !props.disabled
    ? `cursor: pointer;

       &:hover {
         background: rgb(249,249,249);

         .openLink {
           display: block;
         }
        }` 
    : ``}

  @media (max-width: 767px) and (orientation: portrait) {
    background: rgb(249,249,249);
  }
`
const Details = styled.div`
  display: block;
  position: relative;
  float: left;
  padding: 0 0 0 4vmin !important;
  margin: 0;
  width: CALC(65% - 4vmin);
  height: 100%;
  text-align: left;
  padding: 5px 10px;
  color: #666;
`
const Name = styled.div`
  font-size: ${props => props.selected ? '2.5vmin' : '2vmin'};
  font-weight: bold;
`
const DetailItem = styled.div`
  display: block;
  position: relative;
  margin-bottom: 0px;
  margin-right: 0;
  font-size: ${props => props.selected ? '2.3vmin' : '1.8vmin'};
  font-weight: 300;
`
const Description = styled.div`
  display: block;
  position: relative;
  margin: ${props => props.is_crowdfunded ? '0 1vmin 2vmin 1vmin' : '2vmin 1vmin'};
  font-size: 2vmin;
  font-weight: 300;
`
const Icon = styled.i`
  margin-right: 2vmin;
  text-align: center;
`
const DetailContent = styled.div`
  display: inline-block;
`
const Photo = styled.div`
  display: block;
  position: relative;
  float: left;
  left: 0;
  top: 0;
  height: ${props => props.selected ? '20vmin' : '12vmin'};
  width: 35%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.photo});
`
const Overlay = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(238,238,238,${props => props.opacity || 0.33});
  border-radius: inherit;
`