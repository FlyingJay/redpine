import React from 'react'
import styled from 'styled-components'

import { SEARCH_CATEGORIES } from 'enums'

import { RP_DARK_GREY, RP_BLACK, RP_SUPER_LIGHT, RP_PINK, RP_DARKGREY, Bold } from 'Components' // GLOBALS

import { ResultSection } from './ResultSection/index.jsx'
import { ConcertResult } from './ConcertResult/index.jsx'
import { ArtistResult } from './ArtistResult/index.jsx'
import { VenueResult } from './VenueResult/index.jsx'


export class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      search_type: SEARCH_CATEGORIES.CONCERTS,
      search: '',
      searchOverride: ''
    }
  }

  render() {
    const campaignResults = this.props.campaignResults || []
    const bandResults = this.props.bandResults || []
    const venueResults = this.props.venueResults || []


    const search_type = this.state.search_type

    return <div>
            <Categories>
              <Category 
                onClick={() => this.updateState({search_type:SEARCH_CATEGORIES.CONCERTS})} 
                enabled={search_type === SEARCH_CATEGORIES.CONCERTS}>
                {
                  this.props.campaignResultsCount 
                  ? <Bold>Concerts ({this.props.campaignResultsCount})</Bold> 
                  : <Bold>Concerts</Bold>
                }
              </Category>
              <Category 
                onClick={() => this.updateState({search_type:SEARCH_CATEGORIES.ARTISTS})} 
                enabled={search_type === SEARCH_CATEGORIES.ARTISTS}>
                {
                  this.props.bandResultsCount 
                  ? <Bold>Artists ({this.props.bandResultsCount})</Bold> 
                  : <Bold>Artists</Bold>
                }
              </Category>
              <Category 
                onClick={() => this.updateState({search_type:SEARCH_CATEGORIES.VENUES})} 
                enabled={search_type === SEARCH_CATEGORIES.VENUES}>
                {
                  this.props.venueResultsCount 
                  ? <Bold>Venues ({this.props.venueResultsCount})</Bold> 
                  : <Bold>Venues</Bold>
                }
              </Category>
            </Categories>
            <Results>
              <ResultSection
                label="concert"
                show={search_type === SEARCH_CATEGORIES.CONCERTS}
                max_count={this.props.maxResultsSize}
                count={this.props.campaignResultsCount}
                loading={this.props.campaignResults_loading}
                showMoreResults={this.props.advancedSearch({category:search_type,query:this.state.search})}>
                {
                  campaignResults.map((campaign) => <ConcertResult key={campaign.id} campaign={campaign}/> )
                }
              </ResultSection>
              <ResultSection
                label="artist"
                show={search_type === SEARCH_CATEGORIES.ARTISTS}
                max_count={this.props.maxResultsSize}
                count={this.props.bandResultsCount}
                loading={this.props.bandResults_loading}
                showMoreResults={this.props.advancedSearch({category:search_type,query:this.state.search})}>
                {
                  bandResults.map((band) => <ArtistResult key={band.id} band={band} /> )
                }
              </ResultSection>
              <ResultSection
                label="venue"
                show={search_type === SEARCH_CATEGORIES.VENUES}
                max_count={this.props.maxResultsSize}
                count={this.props.venueResultsCount}
                loading={this.props.venueResults_loading}
                showMoreResults={this.props.advancedSearch({category:search_type,query:this.state.search})}>
                {
                  venueResults.map((venue) => <VenueResult key={venue.id} venue={venue} /> )
                }
              </ResultSection>
            </Results>
          </div>
  }

  componentWillReceiveProps(props) {
    if (props.search && props.search !== this.state.searchOverride) {
      this.updateState({search: props.search, searchOverride: props.search})
      this.props.performSearch(props.search)
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const Categories = styled.div`
  padding: 1vmin 0;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
`
const Category = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: auto;
  margin-right: 2vmin;
  padding: 1vmin 2vmin;
  height: 3vmin;
  text-transform: uppercase;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 1.7vmin;
  line-height: 3vmin;
  color: ${(props) => props.enabled ? '#FFF' : RP_DARK_GREY};
  border-radius: 3px;
  background: ${(props) => props.enabled ? RP_PINK + ' !important' : 'none'};
  box-shadow: ${(props) => props.enabled ? '2px 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  font-weight: 300;

  &:hover {
    background: ${RP_SUPER_LIGHT};
    color: ${(props) => props.enabled ? '#FFF' : RP_BLACK};
    box-shadow: 0 1px 1px rgba(0,0,0,0.15);
  }
`
const Results = styled.div`
  padding: 3vmin 3vmin 0 3vmin;
  margin: 0 -3vmin;

  width: CALC(30vw + 11.2vmin - 6vmin);
  max-width: CALC(700px + 11vmin - 6vmin + 2px);
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {cursor: pointer;width: 1vmin;}
  &::-webkit-scrollbar-track {background: ${RP_SUPER_LIGHT};border-radius:3px;}
  &::-webkit-scrollbar-thumb {background: ${RP_DARKGREY};border-radius:3px;}
  &::-webkit-scrollbar-thumb:hover {}

  @media (max-width: 767px) and (orientation: portrait) { 
    width: CALC(50vw - 6vmin + 11vmin + 17vmin + 2px);
    max-height: 500px;
    max-width: 500px;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: CALC(40vw - 6.2vmin + 11vmin + 17vmin + 2px);
    max-height: 600px;
    max-width: 600px;
  }
`
