import React from 'react'
import styled from 'styled-components'

import { validators, paths } from 'globals' 

import { RP_BLUE, RP_DARKBLUE, RP_ORANGE, RP_DARKORANGE, RP_GREEN, SPOTIFY_GREEN, RP_GREY, RP_DARK_GREY, RP_SUPER_LIGHT, RP_DARKGREY, RP_BLACK, RP_RED, RP_PINK, RP_FONT, FormNotice, Bold } from 'Components' //GLOBALS
import { Modal, SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton, SearchModal } from 'Components' //MODAL
import { LoadingIndicator } from 'Components'
import { FormButton, ListTile } from 'Components'
import { VenueList } from 'Components'
import { Link } from 'Components'

import { VenueResult } from './VenueResult/index.jsx'


export class SelectVenue extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      query: '',
      
      showSearchModal: false,
      category: this.props.starting_category
    }
  }

  render() {
    const venues = this.props.venues || []
    const search_venues = this.props.search_venues || []

    const search_venues_count = search_venues.length

    return (
      <Modal show transparent onClose={(e) => this.props.onClose()}>
        <SidePanel>
      {{ [null]: <ModalSection top>
                  <ModalHeading>Venue</ModalHeading>
                  <ModalSubheading>Where will the show take place?</ModalSubheading>
                  <ListTile background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.showMyVenues()}>
                    <i className="fa fa-list"/>
                    <div>My Venues</div>
                  </ListTile>
                  <ListTile background={RP_PINK} hoverBackground={RP_RED} onClick={() => this.updateState({category:'SEARCH'})}>
                    <i className="fa fa-search"/>
                    <div>RedPine Venues</div>
                  </ListTile>
                  <ListTile background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.props.sellTickets()}>
                    <i className="fa fa-globe"/>
                    <div>Anywhere Else</div>
                  </ListTile>
                 </ModalSection>,

  ['MY_VENUES']: <ModalSection top>
                  <ModalHeading>My Venues</ModalHeading>
                  <ModalSubheading style={{marginBottom:'4vmin'}}>Choose from any venue you manage</ModalSubheading>
                  <VenueList 
                    venues={venues} 
                    is_loading={this.props.venues_loading}
                    venueSelected={(venue) => this.props.venueSelected(venue,true)}/>
                 </ModalSection>,

     ['SEARCH']: <ModalSection top>
                  <ModalHeading>Search</ModalHeading>
                  <ModalSubheading>
                    Query by venue name to select the location for this show. 
                    <br/>
                    Not sure where to host? <Link href={paths.search('venues')} bold>Try our advanced search</Link> to filter by location, genre, and ammenities.</ModalSubheading>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    this.showSearch()
                  }}>
                    <ActSearch 
                      onChange={(e) => this.updateState({query: e.target.value})}
                      placeholder="Search all venues on RedPine.." />
                    <SearchButton onClick={() => this.showSearch()}><i className="fa fa-search"/></SearchButton>
                    <SearchModal show={this.state.showSearchModal} onClose={() => this.updateState({showSearchModal: false})} ESCLettering="NONE">
                      <Results>
                        <LoadingIndicator loading={this.props.search_venues_loading}>
                          { search_venues_count > 0
                            ? search_venues.map((venue) => <VenueResult key={venue.id} venue={venue} onSelectVenue={(venue) => this.props.venueSelected(venue,false)}/> )
                            : <NoResults>No venues were found. Try a different phrase...</NoResults> }
                        </LoadingIndicator>
                      </Results>
                    </SearchModal>
                  </form>
                 </ModalSection>
          }[this.state.category]}

          { this.state.category !== null && !this.props.starting_category
            ? <ModalSection style={{textAlign:'left'}}>
                <FormButton onClick={() => this.updateState({category:null})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT} bold>
                  <Bold><i className="fa fa-arrow-left"/>&nbsp;&nbsp;BACK</Bold>
                </FormButton>
              </ModalSection>
            : null }
        </SidePanel>
      </Modal>
    )
  }

  showMyVenues() {
    this.props.loadVenues()
    this.updateState({category:'MY_VENUES'})    
  }

  showSearch() {
    if (this.state.query === '') return

    this.updateState({showSearchModal: true})
    this.props.searchVenues(this.state.query)
  }

  componentDidMount(){
    if(this.props.starting_category == 'MY_VENUES'){
      this.props.loadVenues()
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const TextRight = styled.div`
  textAlign: right;
`
const SearchButton = styled.div`
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: calc(20% - 4vmin);
  padding: 2vmin 2vmin;
  margin: 0 auto;
  border-radius: 0 0.5vmin 0.5vmin 0;
  background: ${RP_RED};
  color: #FFF;
  text-align: center;
  transition: all 0.25s ease;
  font-size: 1.8vmin;
  font-weight: 400;

  &:hover {
    background: ${RP_PINK};
  }
`
const Results = styled.div`
  padding: 0 3vmin 0 3vmin;
  margin: 0 -3vmin;

  width: CALC(33vw - 6vmin);
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
const NoResults = styled(FormNotice)`
  display: block;
  padding: 1vmin;
  margin-bottom: 1vmin;
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 400;
`
const ActSearch = styled.input`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: calc(80% - 11vmin);
  max-width: 700px;
  padding: 2vmin 5vmin 2vmin 6vmin;
  border-radius: 0.3vmin;
  background: #FFF url(/Assets/images/image-input/search.png) no-repeat;
  background-position: 2vmin center;
  background-size: 3vmin;
  margin: 0 auto;
  border: none;
  outline: none;
  color: ${RP_BLACK};
  transition: all 0.25s ease;
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 1.8vmin;
  font-weight: 400;
  outline: none;

  &:hover {
    color: ${RP_BLACK};
    border-color: #FFF;
  }

  &:focus {
    color: ${RP_BLACK};
    border-color: #FFF;
    background: #FFF url(/Assets/images/image-input/search-focus.png) no-repeat;
    background-position: 2vmin center;
    background-size: 3vmin;
  }
`