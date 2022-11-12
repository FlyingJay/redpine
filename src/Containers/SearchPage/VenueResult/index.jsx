import React from 'react'
import styled from 'styled-components'

import { RP_Venue, RP_User } from 'Models'
import { helpers } from 'globals'

import { Bold,Clear, RP_BLUE, RP_DARKGREY } from 'Components' // GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, 
  SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Tooltip } from 'Components' 
import { Badge } from 'Components'


export class VenueResult extends React.PureComponent {
  render() {
    const _User = RP_User(this.props.user)
    const _Venue = RP_Venue(this.props.venue)

    const is_hidden = (!_User.is_member_artist && !_Venue.has_fast_reply)

    return (
      <SearchResultsContainer onClick={() => this.props.onClick()} disabled={is_hidden}>
        { is_hidden
          ? <Overlay opacity="0.5"/>
          : null } 
        <SearchResultThumb image={_Venue.picture} fullSearch={true}>
          { is_hidden
            ? <Overlay opacity="0.9"/>
            : null } 
        </SearchResultThumb>

        <SearchResultInfo fullSearch={true}>
          <SearchResultHeading>
            <Bold>{ _Venue.title }</Bold>
            { _Venue.has_fast_reply
              ? <span>&nbsp;<i className="fa fa-check-circle" style={{color:RP_BLUE}}/></span>
              : is_hidden
                ? <span>&nbsp;<i className="fa fa-lock" style={{color:RP_DARKGREY}}/></span>
                : null }
          </SearchResultHeading>
          <SearchResultSubHeading>
            { _Venue.has_preferred_genre
              ? <SearchResultStatValue style={{padding:'0'}}>
                  <i className="fa fa-music"/>&nbsp;&nbsp;
                  {_Venue.genre_string}
                </SearchResultStatValue>
              : <SearchResultStatValue style={{padding:'0'}}>
                  <i className="fa fa-music"/>&nbsp;
                  Any genre
                </SearchResultStatValue> }
            <br/>
            <div style={{textAlign:'right'}}>
              <SearchResultStatFocus key="1">{_Venue.capacity}</SearchResultStatFocus>
              <SearchResultStatValue key="2">Capacity</SearchResultStatValue>
            </div>
          </SearchResultSubHeading>
          <Ammenity is_visible={_Venue.has_wifi}>Wifi</Ammenity>
          <Ammenity is_visible={_Venue.is_accessible_by_transit}>Public Transit</Ammenity>
          <Ammenity is_visible={_Venue.has_atm_nearby}>ATM</Ammenity>
          <Ammenity is_visible={_Venue.has_free_parking_nearby}>Free Parking</Ammenity>
          <Ammenity is_visible={_Venue.has_paid_parking_nearby}>Paid Parking</Ammenity>
          <Ammenity is_visible={_Venue.is_wheelchair_friendly}>Wheelchair Friendly</Ammenity>
          <Ammenity is_visible={_Venue.allows_smoking}>Allows Smoking</Ammenity>
          <Ammenity is_visible={_Venue.allows_all_ages}>Allows All-Ages</Ammenity>
          <Ammenity is_visible={_Venue.has_stage}>Stage</Ammenity>
          <Ammenity is_visible={_Venue.has_microphones}>Microphones</Ammenity>
          <Ammenity is_visible={_Venue.has_drum_kit}>Drum Kit</Ammenity>
          <Ammenity is_visible={_Venue.has_piano}>Piano</Ammenity>
          <Ammenity is_visible={_Venue.has_wires_and_cables}>Cables</Ammenity>
          <Ammenity is_visible={_Venue.has_soundtech}>Sound Tech</Ammenity>
          <Ammenity is_visible={_Venue.has_lighting}>Lighting</Ammenity>
          <Ammenity is_visible={_Venue.has_drink_tickets}>Drink Tickets</Ammenity>
          <Ammenity is_visible={_Venue.has_meal_vouchers}>Meal Vouchers</Ammenity>
          <Ammenity is_visible={_Venue.has_merch_space}>Merch Space</Ammenity>
          <Ammenity is_visible={_Venue.has_cash_box}>Cash Box</Ammenity>
          <Ammenity is_visible={_Venue.has_float_cash}>Float Cash</Ammenity>

        { _Venue.is_promotion
          ? <Tooltip place="top" tip="Message RedPine for more info!">
              <Badge text="+ Social Media Promo" fontSize="2vmin"/>
            </Tooltip> 
          : null }
        </SearchResultInfo>
      </SearchResultsContainer>
    )
  }

  venue_address(v){
    var address = v.address + ". " 
                + (v.city !== null ? (v.city.name + ", ") : "") 
                + (v.city !== null ? (v.city.province !== null ? v.city.province.name + ". " : "") : "")
                + (v.city !== null ? (v.city.province !== null ? (v.city.province.country !== null ? v.city.province.country.name + ". " : "") : "") : "")
                + v.postal_code.toUpperCase()
    return address
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.venue == null) return true
    if (nextProps.venue != this.props.venue) return true
    return false
  }
}

const Ammenity = styled.div`
  display: ${props => props.is_visible ? 'inline-block' : 'none'};
  margin: 0.5vmin 0.5vmin 0 0;
  padding: 0.5vmin 1vmin;
  background: ${RP_BLUE};
  color: #FFF;
  border-radius: 0.3vmin;
  font-size: 1.5vmin;
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