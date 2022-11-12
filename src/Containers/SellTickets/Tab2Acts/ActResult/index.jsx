import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_Act } from 'Models'

import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Link } from 'Components'

export class ActResult extends React.PureComponent {
  render() {
    const _Act = RP_Act(this.props.act)

    return (
      <Link onClick={() => this.props.onSelectAct(this.props.act)}>
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