import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_User } from 'Models'

import { RP_BLUE, RP_ORANGE, RP_GREEN } from 'Components'
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, SearchResultSubHeading, SearchResultStat, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { Link } from 'Components'

export class UserResult extends React.PureComponent {
  render() {
    const _User = RP_User(this.props.user)

    return (
      <Link onClick={() => this.props.onSelectUser(this.props.user)}>
        <SearchResultsContainer>
          <SearchResultThumb image={_User.picture} />
          <SearchResultInfo>
            <SearchResultHeading>{_User.full_name}</SearchResultHeading>
            <SearchResultSubHeading>
              <SearchResultStatValue style={{padding: '0', fontWeight: '400'}}>
                <Tag is_visible={_User.is_artist} color={RP_BLUE}><i className="fa fa-music"/>&nbsp;&nbsp;Artist</Tag>
                <Tag is_visible={!_User.is_artist && _User.is_venue} color={RP_GREEN}><i className="fa fa-music"/>&nbsp;&nbsp;Venue</Tag>
                <Tag is_visible={_User.is_artist && _User.is_venue} color={RP_ORANGE}><i className="fa fa-home"/>&nbsp;&nbsp;Organization</Tag>
              </SearchResultStatValue>
            </SearchResultSubHeading>
          </SearchResultInfo>
        </SearchResultsContainer>
      </Link>
    )
  }
}

const Tag = styled.div`
  display: ${props => props.is_visible ? 'inline-block' : 'none'};
  margin: 0.5vmin 0.5vmin 0 0;
  padding: 0.5vmin 1vmin;
  background: ${props => props.color};
  color: #FFF;
  border-radius: 0.3vmin;
  font-size: 1.5vmin;
`