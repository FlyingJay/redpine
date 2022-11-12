import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_Venue } from 'Models'

import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Link } from 'Components'

export class VenueResult extends React.PureComponent {
  render() {
    const _Venue = RP_Venue(this.props.venue)

    return (
      <Link onClick={() => this.props.onSelectVenue(this.props.venue)}>
        <SearchResultsContainer>
          <SearchResultThumb image={_Venue.picture} />
          <SearchResultInfo>
            <SearchResultHeading>{_Venue.title}</SearchResultHeading>
             <SearchResultSubHeading>
              <SearchResultStatValue style={{padding: '0', fontWeight: '400'}}>{_Venue.city_province_string}</SearchResultStatValue>
             </SearchResultSubHeading>
          </SearchResultInfo>
        </SearchResultsContainer>
      </Link>
    )
  }
}