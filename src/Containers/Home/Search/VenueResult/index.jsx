import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { Clear } from 'Components' // GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, 
  SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Link } from 'Components'


export class VenueResult extends React.PureComponent {

  render() {
    const venue = this.props.venue
    return (
      <Link href={paths.venues(venue.id)}>
        <SearchResultsContainer>
          <SearchResultThumb image={venue.picture} />
          <SearchResultInfo>
            <SearchResultHeading>{venue.title}</SearchResultHeading>
            <SearchResultSubHeading>

              <SearchResultStatValue style={{padding: '0'}}>
                {this.venue_address(venue)}
              </SearchResultStatValue>
              <Clear></Clear>

              {venue.capacity ? <SearchResultStatFocus>{venue.capacity}</SearchResultStatFocus> : null}
              {venue.capacity ? <SearchResultStatValue>Capacity</SearchResultStatValue> : null}
              <Clear></Clear>

            </SearchResultSubHeading>
          </SearchResultInfo>
        </SearchResultsContainer>
      </Link>
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
}