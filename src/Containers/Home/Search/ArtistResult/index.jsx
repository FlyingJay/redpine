import React from 'react'
import styled from 'styled-components'

import { RP_Act } from 'Models'

import { paths } from 'globals'

import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, 
          SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Link } from 'Components'

export class ArtistResult extends React.PureComponent {
  render() {
    const _Act = RP_Act(this.props.band)

    return (
      <Link href={paths.acts(_Act.id)}>
        <SearchResultsContainer>
          <SearchResultThumb image={_Act.picture} />
          <SearchResultInfo>
            <SearchResultHeading>{_Act.name}</SearchResultHeading>
             <SearchResultSubHeading>
              <SearchResultStatValue style={{padding: '0', fontWeight: '400'}}>{_Act.subtitle}</SearchResultStatValue>
             </SearchResultSubHeading>
          </SearchResultInfo>
        </SearchResultsContainer>
      </Link>
    )
  }
}