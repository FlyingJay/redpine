import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { RP_User } from 'Models'
import { SEARCH_CATEGORIES } from 'enums'
import { getQueryParams, paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { Bold, Clear, RP_BLACK, RP_DARK_GREY, RP_SUPER_LIGHT, RP_PINK, RP_DARKGREY, FormNotice, RP_FONT, RP_RED, RP_BLUE, RP_GREY } from 'Components' // GLOBALS
import { WarningModal } from 'Components' //MODAL
import { LoadingIndicator } from 'Components'
import { FormSeparator } from 'Components' //SEPARATOR
import { Checkbox } from 'Components'
import { Select } from 'Components' //INPUT
import { Feed } from 'Components' 
import { Link } from 'Components' 
import { Modal } from 'Components' 
import { Range } from 'Components' //Input/Range

import { SelectAct } from 'Components'
import { SelectActRegister } from 'Components'

import { ConcertResult } from './ConcertResult/index.jsx'
import { ArtistResult } from './ArtistResult/index.jsx'
import { VenueResult } from './VenueResult/index.jsx'
import { OpportunityResult } from './OpportunityResult/index.jsx'
import { OpenShowResult } from './OpenShowResult/index.jsx'
import { OpenMicResult } from './OpenMicResult/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      query: '',
      radius: 10,

      price: null,
      genre: null,
      capacity: null,
      city: null,

      has_wifi: false,
      is_accessible_by_transit: false,
      has_atm_nearby: false,
      has_free_parking_nearby: false,
      has_paid_parking_nearby: false,
      is_wheelchair_friendly: false,
      allows_smoking: false,
      allows_all_ages: false,
      has_stage: false,
      has_microphones: false,
      has_drum_kit: false,
      has_piano: false,
      has_wires_and_cables: false,
      has_soundtech: false,
      has_lighting: false,
      has_drink_tickets: false,
      has_meal_vouchers: false,
      has_merch_space: false,
      has_cash_box: false,
      has_float_cash: false,
      has_fast_reply: false,

      show_filters: false,

      expand_campaignResults: false,
      expand_bandResults: false,
      expand_venueResults: false,
      expand_opportunityResults: false,
      expand_open_showResults: false,
      expand_open_micResults: false
    }
    this.price_options = ['ANY', '< $10', '$10 - $20', '$21 - $50', '> $50']
    this.capacity_options = [ 'ANY', '< 50', '50 - 200', '201 - 500', '500+']
  }

  render() {
    const user = this.props.user
    const _User = RP_User(this.props.user)

    const genres = this.props.genres || []

    const cities = this.state.category === SEARCH_CATEGORIES.VENUES
                   ? this.props.venue_cities || []
                   : this.state.category === SEARCH_CATEGORIES.ARTISTS
                    ? this.props.act_cities || []
                    : this.props.cities || []

    const provinces = this.props.provinces || []
    const countries = this.props.countries || []

    const user_acts = this.props.user_acts || []

    const campaigns = this.props.campaignResults || []
    const acts = this.props.bandResults || []
    const venues = this.props.venueResults || []
    const opportunities = this.props.opportunityResults || []
    const open_shows = this.props.open_showResults || []
    const open_mics = this.props.open_micResults || []

    const query    = this.state.query ? this.state.query : ''
    const price    = this.state.price ? this.price_options[this.state.price] : 'ANY'
    const capacity = this.state.capacity ? this.capacity_options[this.state.capacity] : 'ANY'

    const city     = cities.find(city => { return (city.id == this.state.city) })                || {id:null,name:'ANY'}
    const province = provinces.find(province => { return (province.id == this.state.province) }) || {id:null,name:'ANY'}
    const country  = countries.find(country => { return (country.id == this.state.country) })    || {id:null,name:'ANY'}
    const genre    = genres.find(genre => { return (genre.id == this.state.genre) })             || {id:null,name:'ANY'}

    const opportunities_count = (this.state.category === SEARCH_CATEGORIES.OPPORTUNITIES ? this.props.results_count : 0)
    const open_shows_count    = (this.state.category === SEARCH_CATEGORIES.OPEN_SHOWS ? this.props.results_count : 0)
    const open_mics_count     = (this.state.category === SEARCH_CATEGORIES.OPEN_MICS ? this.props.results_count : 0)
    const campaigns_count     = (this.state.category === SEARCH_CATEGORIES.CONCERTS ? this.props.results_count : 0)
    const acts_count          = (this.state.category === SEARCH_CATEGORIES.ARTISTS ? this.props.results_count : 0)
    const venues_count        = (this.state.category === SEARCH_CATEGORIES.VENUES ? this.props.results_count : 0)

    const is_loading = (this.state.category == SEARCH_CATEGORIES.CONCERTS && this.props.campaignResults_loading) || 
                       (this.state.category == SEARCH_CATEGORIES.ARTISTS && this.props.bandResults_loading) || 
                       (this.state.category == SEARCH_CATEGORIES.VENUES && this.props.venueResults_loading) ||
                       (this.state.category == SEARCH_CATEGORIES.OPPORTUNITIES && this.props.opportunityResults_loading) ||
                       (this.state.category == SEARCH_CATEGORIES.OPEN_SHOWS && this.props.open_showResults_loading) ||
                       (this.state.category == SEARCH_CATEGORIES.OPEN_MICS && this.props.open_micResults_loading) 

    return (
      <App padding>
        <MyPageWrapper>
          <Categories>
            <CategorySeparator text="Play"/>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.OPPORTUNITIES} onClick={() => this.categorySelected(SEARCH_CATEGORIES.OPPORTUNITIES)}>
              <ImageIcon src="/Assets/images/apps/doors.png"/>&nbsp;&nbsp;{`Paid Gig ${opportunities_count ? `(${opportunities_count})` : ''}`}
            </CategoryButton>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.OPEN_SHOWS} onClick={() => this.categorySelected(SEARCH_CATEGORIES.OPEN_SHOWS)}>
              <ImageIcon src="/Assets/images/apps/shows.png"/>&nbsp;&nbsp;{`Open Lineup ${open_shows_count ? `(${open_shows_count})` : ''}`}
            </CategoryButton>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.OPEN_MICS} onClick={() => this.categorySelected(SEARCH_CATEGORIES.OPEN_MICS)}>
              <ImageIcon src="/Assets/images/apps/acts.png"/>&nbsp;&nbsp;{`Open Mic ${open_mics_count ? `(${open_mics_count})` : ''}`}
            </CategoryButton>
            <CategorySeparator text="Discover"/>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.CONCERTS} onClick={() => this.categorySelected(SEARCH_CATEGORIES.CONCERTS)}>
              <ImageIcon src="/Assets/images/apps/shows.png"/>&nbsp;&nbsp;{`Show ${campaigns_count ? `(${campaigns_count})` : ''}`}
            </CategoryButton>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.ARTISTS} onClick={() => this.categorySelected(SEARCH_CATEGORIES.ARTISTS)}>
              <ImageIcon src="/Assets/images/apps/search.png"/>&nbsp;&nbsp;{`Act ${acts_count ? `(${acts_count})` : ''}`}
            </CategoryButton>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.VENUES} onClick={() => this.categorySelected(SEARCH_CATEGORIES.VENUES)}>
              <ImageIcon src="/Assets/images/apps/venues.png"/>&nbsp;&nbsp;{`Venue ${venues_count ? `(${venues_count})` : ''}`}
            </CategoryButton>
          </Categories>

          <SearchBody>
            {/* SEARCH BAR AND BUTTON */}
            <FullPageSearchInput placeholder="What can we help you find?" value={query} onChange={(e) => this.updateState({query: e.target.value})} type="text"/>

            <DistanceSlider enabled={this.state.city}>
              {this.state.city ? `Search Radius - ${this.state.radius} km` : 'Pick a city & search radius..' }
              <Range default={10} 
                disabled={!this.state.city}
                onChange={(radius) => this.updateState({radius:radius})}/>
            </DistanceSlider>
              
            <SearchButton onClick={() => this.getResults()}>
              <i className="fa fa-search"/>
              { is_loading ? '  Loading...' : '  Search' }
            </SearchButton>

            <SearchFilters>
              {/* LOCATION FILTERS */}
              { cities
                ? <SearchFilter>
                    <SearchLabel>City</SearchLabel>
                    <SearchSelect options={
                        cities.map((city) => {
                          return {
                            value: city.id,
                            label: (city.name == 'ANY' ? 'ANY' : city.name)
                          }
                        })}
                      onChange={(e) => this.updateState({city:e.value})}
                      placeholder={city.name == 'ANY' ? 'ANY' : city.name} />
                  </SearchFilter>
                : null }
                
              { provinces && (this.state.city == null)
                ? <SearchFilter>
                    <SearchLabel>Province / State</SearchLabel>
                    <SearchSelect options={
                        provinces.map((province) => {
                          return {
                            value: province.id,
                            label: province.name == 'ANY' ? 'ANY' : province.name + ', ' +  province.country.name 
                          }
                        })}
                      onChange={(e) => this.updateState({province:e.value})}
                      placeholder={province.name == 'ANY' ? 'ANY' : province.name + ', ' +  province.country.name} />
                  </SearchFilter> 
                : null }

              {/* HIDDEN COUNTRY FILTER
                countries && (this.state.province == null) && (this.state.city == null)
                ? <SearchFilter>
                    <SearchLabel>Country</SearchLabel>
                    <SearchSelect options={
                        countries.map((country) => {
                          return {
                            value: country.id, 
                            label: country.name
                          }
                        })}
                      onChange={(e) => this.updateState({country:e.value})}
                      placeholder={country.name} />
                  </SearchFilter>
                  : null */}

              <Clear/>
              <SearchFilter>
                <SearchLabel>Genre</SearchLabel>
                <SearchSelect 
                  options={genres.map(genre => {return {value: genre.id, label: genre.name}} )}
                  onChange={(e) => this.updateState({genre:e.value})}
                  placeholder={genre.name} />
              </SearchFilter> 

              {/* SPECIFIC FILTERS */}
              {{[SEARCH_CATEGORIES.CONCERTS]:  
                  <FilterDropdown
                    label="Ticket Price"
                    options={this.price_options}
                    placeholder={price}
                    onChange={(e) => this.updateState({price:e.value})}/>,

                [SEARCH_CATEGORIES.VENUES]: 
                  <FilterDropdown style={{marginBottom:'2vmin'}}
                    label="Capacity"
                    options={this.capacity_options}
                    placeholder={capacity}
                    onChange={(e) => this.updateState({capacity:e.value})}/>,
               }[this.state.category]}

              { this.state.category == SEARCH_CATEGORIES.VENUES && this.state.show_filters
                ? [<Clear key="0" style={{marginBottom:'2vmin'}}/>,
                   <Checkbox label="Wifi?" checked={this.state.has_wifi} onChange={(e) => this.updateState({has_wifi:!this.state.has_wifi})} key="1" margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" inline/>,
                   <Checkbox label="Public Transit?" checked={this.state.is_accessible_by_transit} onChange={(e) => this.updateState({is_accessible_by_transit:!this.state.is_accessible_by_transit})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="2" inline/>,
                   <Checkbox label="ATM?" checked={this.state.has_atm_nearby} onChange={(e) => this.updateState({has_atm_nearby:!this.state.has_atm_nearby})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="3" inline/>,
                   <Checkbox label="Free Parking?" checked={this.state.has_free_parking_nearby} onChange={(e) => this.updateState({has_free_parking_nearby:!this.state.has_free_parking_nearby})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="4" inline/>,
                   <Checkbox label="Paid Parking?" checked={this.state.has_paid_parking_nearby} onChange={(e) => this.updateState({has_paid_parking_nearby:!this.state.has_paid_parking_nearby})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="5" inline/>,
                   <Checkbox label="Wheelchair Friendly?" checked={this.state.is_wheelchair_friendly} onChange={(e) => this.updateState({is_wheelchair_friendly:!this.state.is_wheelchair_friendly})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="6" inline/>,
                   <Checkbox label="Allows Smoking" checked={this.state.allows_smoking} onChange={(e) => this.updateState({allows_smoking:!this.state.allows_smoking})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="7" inline/>,
                   <Checkbox label="Allows All Ages" checked={this.state.allows_all_ages} onChange={(e) => this.updateState({allows_all_ages:!this.state.allows_all_ages})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="8" inline/>,
                   <Checkbox label="Stage" checked={this.state.has_stage} onChange={(e) => this.updateState({has_stage:!this.state.has_stage})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="9" inline/>,
                   <Checkbox label="Microphones" checked={this.state.has_microphones} onChange={(e) => this.updateState({has_microphones:!this.state.has_microphones})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="10" inline/>,
                   <Checkbox label="Drum Kit" checked={this.state.has_drum_kit} onChange={(e) => this.updateState({has_drum_kit:!this.state.has_drum_kit})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="11" inline/>,
                   <Checkbox label="Piano" checked={this.state.has_piano} onChange={(e) => this.updateState({has_piano:!this.state.has_piano})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="12" inline/>,
                   <Checkbox label="Cables" checked={this.state.has_wires_and_cables} onChange={(e) => this.updateState({has_wires_and_cables:!this.state.has_wires_and_cables})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="13" inline/>,
                   <Checkbox label="Sound Tech" checked={this.state.has_soundtech} onChange={(e) => this.updateState({has_soundtech:!this.state.has_soundtech})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="16" inline/>,
                   <Checkbox label="Lighting" checked={this.state.has_lighting} onChange={(e) => this.updateState({has_lighting:!this.state.has_lighting})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="17" inline/>,
                   <Checkbox label="Drink Tickets" checked={this.state.has_drink_tickets} onChange={(e) => this.updateState({has_drink_tickets:!this.state.has_drink_tickets})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="18" inline/>,
                   <Checkbox label="Meal Vouchers" checked={this.state.has_meal_vouchers} onChange={(e) => this.updateState({has_meal_vouchers:!this.state.has_meal_vouchers})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="19" inline/>,
                   <Checkbox label="Merch Space" checked={this.state.has_merch_space} onChange={(e) => this.updateState({has_merch_space:!this.state.has_merch_space})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="20" inline/>,
                   <Checkbox label="Cash Box" checked={this.state.has_cash_box} onChange={(e) => this.updateState({has_cash_box:!this.state.has_cash_box})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="21" inline/>,
                   <Checkbox label="Float Cash" checked={this.state.has_float_cash} onChange={(e) => this.updateState({has_float_cash:!this.state.has_float_cash})} margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" key="22" inline/>]                    
                : null }
              { this.state.category == SEARCH_CATEGORIES.VENUES
                ? [<br key="23"/>,<br key="24"/>,
                   <Checkbox label="Replies Quickly?" checked={this.state.has_fast_reply} onChange={(e) => this.updateState({has_fast_reply:!this.state.has_fast_reply})} key="25" margin="0 1vmin 1vmin 0" padding="1vmin 1.5vmin" inline/>]
                : null }

              <ClearFilters onClick={() => this.clearFilters()}><i className="fa fa-undo"/>&nbsp;Clear Filters</ClearFilters>
              { this.state.category == SEARCH_CATEGORIES.VENUES
                ? this.state.show_filters
                  ? <ClearFilters onClick={() => this.updateState({show_filters:false})}><i className="fa fa-eye-slash"/>&nbsp;Hide Filters</ClearFilters> 
                  : <ClearFilters onClick={() => this.updateState({show_filters:true})}><i className="fa fa-eye"/>&nbsp;Show Filters</ClearFilters> 
                : null }
            </SearchFilters>

            <FormSeparator/>
            {{[SEARCH_CATEGORIES.CONCERTS]: 
                <SearchResults category={this.state.category} 
                  page={this.props.page}
                  page_size={20}
                  is_loading={this.props.campaignResults_loading}
                  results={campaigns}
                  results_count={this.props.results_count}
                  onClickResult={(campaign) => this.props.viewCampaign(campaign)}
                  getResults={this.getResults.bind(this)}/>,

              [SEARCH_CATEGORIES.ARTISTS]: 
                <SearchResults category={this.state.category} 
                  page={this.props.page}
                  page_size={50}
                  is_loading={this.props.bandResults_loading}
                  results={acts} 
                  results_count={this.props.results_count}
                  onClickResult={(band) => this.props.viewBand(band)}
                  getResults={this.getResults.bind(this)}/>,

              [SEARCH_CATEGORIES.VENUES]: 
                <SearchResults category={this.state.category} 
                  page={this.props.page}
                  page_size={10}
                  is_loading={this.props.venueResults_loading}
                  results={venues} 
                  results_count={this.props.results_count}
                  onClickResult={(venue) => this.selectVenue(venue,_User.is_member_artist)}
                  getResults={this.getResults.bind(this)}
                  user={user}/>,

              [SEARCH_CATEGORIES.OPPORTUNITIES]: 
                <SearchResults category={this.state.category} 
                  page={this.props.page}
                  page_size={20}
                  is_loading={this.props.opportunityResults_loading}
                  results={opportunities} 
                  results_count={this.props.results_count}
                  onClickResult={(opening) => this.selectOpening(opening)}
                  getResults={this.getResults.bind(this)}/>,
                  
              [SEARCH_CATEGORIES.OPEN_SHOWS]: 
                <SearchResults category={this.state.category} 
                  page={this.props.page}
                  page_size={20}
                  is_loading={this.props.open_showResults_loading}
                  results={open_shows} 
                  results_count={this.props.results_count}
                  onClickResult={(campaign) => this.selectOpenCampaign(campaign)}
                  getResults={this.getResults.bind(this)}/>,
                  
              [SEARCH_CATEGORIES.OPEN_MICS]: 
                <SearchResults category={this.state.category} 
                  page={this.props.page}
                  page_size={20}
                  is_loading={this.props.open_micResults_loading}
                  results={open_mics} 
                  results_count={this.props.results_count}
                  onClickResult={(campaign) => this.selectOpenCampaign(campaign)}
                  getResults={this.getResults.bind(this)}/>
            }[this.state.category]}
          </SearchBody>

          { this.state.show_select_act
            ? <Modal show onClose={() => this.updateState({show_select_act:false})} transparent>
                <SelectAct
                  user={user}
                  acts={user_acts}
                  acts_loading={this.props.user_acts_loading}
                  cities={cities}
                  genres={genres}
                  actSelected={(act) => this.props.joinOpenShow(this.state.selected_campaign,act)}
                  actCreated={(act_details) => this.createActThenJoinOpenShow(act_details)}
                  error={(text) => this.props.errorMessage(text)}/>
              </Modal>
            : null }

          { this.state.show_register
            ? <Modal show onClose={() => this.updateState({show_register:false})} transparent>
                <SelectActRegister
                  register={(user_details) => this.props.registerThenCreateAct(user_details,this.state.selected_campaign,this.state.act_details)}
                  error={(text) => this.props.errorMessage(text)}/>
              </Modal>
            : null }

          <WarningModal light_warning
            show={this.state.show_warning}
            description="Sorry, this venue isn't available for your account type - please continue to upgrade your subscription."
            onContinue={() => this.props.showBuyRedPine()}
            onClose={() => this.updateState({show_warning:false})}/>
        </MyPageWrapper>
      </App>
    )
  }

  selectVenue(venue,has_access){
    if(venue.has_fast_reply || has_access){
      this.props.viewVenue(venue)
    }else{
      this.updateState({show_warning:true})
    }
  }

  selectOpening(opening){
    if(opening.campaign){
      this.updateState({show_select_act:true,selected_campaign:opening.campaign})
      this.props.loadUserActs()
    }else{
      this.props.bookOpening(opening)
    }
  }

  selectOpenCampaign(campaign){
    this.updateState({show_select_act:true,selected_campaign:campaign})
    this.props.loadUserActs()
  }

  createActThenJoinOpenShow(act_details){
    if(this.props.user){
      this.updateState({show_select_act:false})
      this.props.createActThenJoinOpenShow(this.state.selected_campaign,act_details)
    }else{
      this.updateState({show_select_act:false,show_register:true,act_details:act_details})
    }
  }

  categorySelected(category){
    this.setState({category:category}, this.getResults)
  }

  getResults(page=1){
    if(this.state.category == SEARCH_CATEGORIES.CONCERTS && !this.props.campaignResults_loading){ this.props.performSearch(this.state,page) }
    if(this.state.category == SEARCH_CATEGORIES.ARTISTS && !this.props.bandResults_loading){ this.props.performSearch(this.state,page) }
    if(this.state.category == SEARCH_CATEGORIES.VENUES && !this.props.venueResults_loading){ this.props.performSearch(this.state,page) }
    if(this.state.category == SEARCH_CATEGORIES.OPPORTUNITIES && !this.props.opportunityResults_loading){ this.props.performSearch(this.state,page) }
    if(this.state.category == SEARCH_CATEGORIES.OPEN_SHOWS && !this.props.open_showResults_loading){ this.props.performSearch(this.state,page) }
    if(this.state.category == SEARCH_CATEGORIES.OPEN_MICS && !this.props.open_micResults_loading){ this.props.performSearch(this.state,page) }
  }

  clearFilters(){
    this.updateState({
      query:'',
      city: null,
      city_text: '',
      province: null,
      province_text: '',
      country: null,
      country_text: '',
      price: null,
      price_text: '',
      genre: null,
      genre_text: '',
      capacity: null,
      capacity_text: '',
      has_wifi: false,
      is_accessible_by_transit: false,
      has_atm_nearby: false,
      has_free_parking_nearby: false,
      has_paid_parking_nearby: false,
      is_wheelchair_friendly: false,
      allows_smoking: false,
      allows_all_ages: false,
      has_stage: false,
      has_microphones: false,
      has_drum_kit: false,
      has_piano: false,
      has_wires_and_cables: false,
      has_soundtech: false,
      has_lighting: false,
      has_drink_tickets: false,
      has_meal_vouchers: false,
      has_merch_space: false,
      has_cash_box: false,
      has_float_cash: false,
      has_fast_reply: false
    })
    this.forceUpdate()
  }

  componentDidMount() {
    const params = getQueryParams()
    let query = params.query ? params.query : ''

    let category = SEARCH_CATEGORIES.CONCERTS
    switch(params.category){
      case 'shows':
        category = SEARCH_CATEGORIES.CONCERTS
        break;
      case 'acts':
        category = SEARCH_CATEGORIES.ARTISTS
        break;
      case 'venues':
        category = SEARCH_CATEGORIES.VENUES
        break;
      case 'opportunities':
        category = SEARCH_CATEGORIES.OPPORTUNITIES
        break;
      case 'open_shows':
        category = SEARCH_CATEGORIES.OPEN_SHOWS
        break;
      case 'open_mics':
        category = SEARCH_CATEGORIES.OPEN_MICS
        break;
    }

    const initialState = Object.assign({}, this.state, {
      query: query,
      category:category,
      city: params.city,
      province: params.province,
      country: params.country,
      genre: params.genre,
      capacity: params.capacity,
      price: params.price
    })

    this.setState(initialState, () => {
      this.getResults()
      this.props.refreshCache()
    })
  }

  componentWillReceiveProps(props) {
    if(props.genres && props.genres.filter(g => g.id === null).length == 0){
      props.genres.unshift({id:null,name:'ANY'})   
    }
    if(props.cities && props.cities.filter(c => c.id === null).length == 0){
      props.cities.unshift({id:null,name:'ANY'})
    }
    if(props.venue_cities && props.venue_cities.filter(c => c.id === null).length == 0){
      props.venue_cities.unshift({id:null,name:'ANY'})
    }
    if(props.act_cities && props.act_cities.filter(c => c.id === null).length == 0){
      props.act_cities.unshift({id:null,name:'ANY'})
    }
    if(props.provinces && props.provinces.filter(c => c.id === null).length == 0){
      props.provinces.unshift({id:null,name:'ANY'})
    }
    if(props.countries && props.countries.filter(c => c.id === null).length == 0){
      props.countries.unshift({id:null,name:'ANY'})   
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    genres: appSelectors.selectGenres(state),
    cities: appSelectors.selectCities(state),
    venue_cities: appSelectors.selectVenueCities(state),
    act_cities: appSelectors.selectActCities(state),
    provinces: appSelectors.selectProvinces(state),
    countries: appSelectors.selectCountries(state),

    campaignResults: selectors.selectCampaignResults(state),
    bandResults: selectors.selectBandResults(state),
    venueResults: selectors.selectVenueResults(state),
    opportunityResults: selectors.selectOpportunityResults(state),
    open_showResults: selectors.selectOpenShowResults(state),
    open_micResults: selectors.selectOpenMicResults(state),

    campaignResults_loading: selectors.selectCampaignResultsLoading(state),
    bandResults_loading: selectors.selectBandResultsLoading(state),
    venueResults_loading: selectors.selectVenueResultsLoading(state),
    opportunityResults_loading: selectors.selectOpportunityResultsLoading(state),
    open_showResults_loading: selectors.selectOpenShowResultsLoading(state),
    open_micResults_loading: selectors.selectOpenMicResultsLoading(state),

    page: selectors.selectPage(state),
    results_count: selectors.selectResultsCount(state),
    
    user_acts: selectors.selectUserActs(state),
    user_acts_loading: selectors.selectUserActsLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    },
    viewBand: (band) => {
      dispatch(push(paths.acts(band.id)))
    },
    viewCampaign: (campaign) => {
      dispatch(push(paths.shows(campaign.id)))
    },
    viewVenue: (venue) => {
      dispatch(push(paths.venues(venue.id)))
    },
    bookOpening: (opening) => {
      dispatch(push(paths.showCreate()+'?opening='+opening.id))
    },
    performSearch: (search,page) => {
      dispatch(actions.performSearch(search,page))
    },
    joinOpenShow: (campaign,act) => {
      dispatch(actions.joinOpenShow(campaign,act))
    },
    createActThenJoinOpenShow: (campaign,act_details) => {
      dispatch(actions.createActThenJoinOpenShow(campaign,act_details))
    },
    registerThenCreateAct: (user_details,campaign,act_details) => {
      dispatch(actions.registerThenCreateAct(user_details,campaign,act_details))
    },
    loadUserActs: () => {
      dispatch(actions.loadUserActs())
    },
    showBuyRedPine: () => {
      dispatch(appActions.showBuyRedPine())
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)


const FilterDropdown = ({label,options,placeholder,onChange}) => (
  <SearchFilter>
    <SearchLabel>{label}</SearchLabel>
    <SearchSelect 
      options={options.map((text, index) => { return {value: index, label: text} })}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}/>
  </SearchFilter>
)

const SearchResults = ({category,page,page_size,is_loading,results,results_count,onClickResult,getResults,user}) => {
  const has_results = (results_count > 0)
  const no_results_string = `No ${{[SEARCH_CATEGORIES.CONCERTS]:'concerts',
                                   [SEARCH_CATEGORIES.ARTISTS]:'acts',
                                   [SEARCH_CATEGORIES.VENUES]:'venues',
                                   [SEARCH_CATEGORIES.OPPORTUNITIES]:'opportunities',
                                   [SEARCH_CATEGORIES.OPEN_SHOWS]:'open shows',
                                   [SEARCH_CATEGORIES.OPEN_MICS]:'open mics'
                                  }[category]} were found. Try a different search..`
  return(
    <Feed infinite page_size={page_size} page={page} results_count={results_count} reload={(page) => getResults(page)}>
      <LoadingIndicator loading={is_loading} is_child_visible={results_count > 0} bottom>
      { has_results
        ? <FullPageSearchResultsWrapper>
            { results.map((result,index) => {
                return {[SEARCH_CATEGORIES.CONCERTS]: <ConcertResult key={result.id} onClick={() => onClickResult(result)} campaign={result}/>,
                        [SEARCH_CATEGORIES.ARTISTS]: <ArtistResult key={result.id} onClick={() => onClickResult(result)} act={result}/>,
                        [SEARCH_CATEGORIES.VENUES]: <VenueResult key={result.id} onClick={() => onClickResult(result)} venue={result} user={user}/>,
                        [SEARCH_CATEGORIES.OPPORTUNITIES]: <OpportunityResult key={result.id} onClick={() => onClickResult(result)} opening={result}/>,
                        [SEARCH_CATEGORIES.OPEN_SHOWS]: <OpenShowResult key={result.id} onClick={() => onClickResult(result)} campaign={result}/>,
                        [SEARCH_CATEGORIES.OPEN_MICS]: <OpenMicResult key={result.id} onClick={() => onClickResult(result)} campaign={result}/>
                       }[category]
              }) }
          </FullPageSearchResultsWrapper>
        : <NoResults>{no_results_string}</NoResults>
      }
      </LoadingIndicator>
    </Feed>
  )
}
const MyPageWrapper = styled.div`
  display: block;
  width: 80vw;
  margin: 0 auto;
  padding: 2vmin 0 10vmin 0;

  @media (max-width: 768px) and (orientation: portrait) { 
    width: 90vw;
    padding-top: 0;
  }
`
const Categories = styled.div`
  display: inline-block;
  width: 15%;
  vertical-align: top;
  margin-bottom: 2vmin;

  @media (max-width: 1024px) and (orientation: portrait) {
    display: block;
    width: 100%;
    padding-top: 0;
  }
`
const CategorySeparator = styled(FormSeparator)`
  @media (max-width: 1024px) and (orientation: portrait) {
    display: none;
  }
`
const SearchBody = styled.div`
  display: inline-block;
  width: calc(85% - 6vmin);
  vertical-align: top;
  margin-left: 2vmin;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
  padding: 2vmin;
  border-radius: 0.3vmin;

  @media (max-width: 1024px) and (orientation: portrait) {
    display: block;
    width: calc(100% - 4vmin);
    margin: 0;
  }
`
const SearchFilter = styled.div`
  display: inline-block;
  margin: 0 1vmin 0.5vmin 0;
`
const SearchLabel = styled.div`
  display:inline-block;
  padding-bottom: 1vmin;
  text-align: center;
  font-style: ${RP_FONT};
  font-size: 2vmin;

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.7vmin;
  }
`
const SearchSelect = styled(Select)`
  display: inline-block;
  width: 33vmin;

  line-height: 2vmin;
  font-size: 2vmin;
  padding: 0;

  @media (max-width: 767px) {
    line-height: 3vmin;
    font-size: 3vmin;
  }
`
const SearchButton = styled.div`
  cursor: pointer;
  display: block;
  vertical-align: top;
  position: relative;
  width: 20vmin;
  max-width: 150px;
  padding: 1vmin 1vmin;
  margin: 0 auto;
  border-radius: 0.3vmin;
  background: ${RP_RED};
  color: #FFF;
  text-align: center;
  transition: all 0.25s ease;
  font-family: ${RP_FONT};
  font-size: 2vmin;
  font-weight: 400;
  margin-right: 0;
  box-shadow: 4px 4px 3px ${RP_GREY};  

  &:hover {
    background: ${RP_PINK};
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
const DistanceSlider = styled.div`
  float: left;
  width: CALC(100% - 30vmin);
  padding: 2vmin 0 0 2vmin;
  font-size: 2vmin;
  color:${props => props.enabled ? RP_BLACK : RP_DARKGREY};

  @media (max-width: 767px) {
    font-size: 3vmin;
  }
`
const ResultCount = styled(FormNotice)`
  display: inline-block;
  padding: 1vmin 0;
  margin-bottom: 2vmin;
  background: #FFF;
  color: ${RP_DARK_GREY};
  font-size: 2.3vmin;
  font-weight: 300;

  span {
    font-weight: bold;
  }
`
const NoResults = styled(FormNotice)`
  display: block;
  text-align: center;
  padding: 1vmin 0;
  margin-bottom: 2vmin;
  background: #FFF;
  color: ${RP_DARK_GREY};
  font-size: 2.3vmin;
  font-weight: 300;
`
const SectionEnd = styled.div`
  cursor: ${(props) => props.hideCursor ? 'default' : 'pointer'};
  display: ${(props) => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  margin-top: 3vmin;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_DARKGREY};
  font-size: 1.8vmin;
  text-align: center;
  border-radius: 3px;
  transition: all .25s ease;

  i {
    color: ${RP_DARKGREY};
    font-size: 2vmin;
  }

  &:hover {
    i {
      color: ${RP_BLACK};
    }
  }
`
const TotalFullSearchWrapper = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: CALC(100% - 32%);
  max-width: 900px;
  height: auto;
  left: 32%;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    left: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 100%;
    left: 0;
  }
`
const FullPageSearchInput = styled.input`
  display: block;
  position: relative;
  width: CALC(100% - 10vmin);
  height: 5vmin;
  padding: 2vmin 0 2vmin 10vmin;
  margin-bottom: 1vmin;
  background: url(/Assets/images/image-input/search-dark.png);
  background-size: 6vmin;
  background-repeat: no-repeat;
  background-position: 2vmin center;
  color: #494949;
  border: none;
  outline: none;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 3vmin;
  box-shadow: 2px 2px 3px ${RP_GREY};
`
const CategoryButton = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  width: auto;
  margin-bottom: 1vmin;
  padding: 2vmin 1vmin;
  height: auto;
  text-transform: uppercase;
  font-family: 'Open Sans',Helvetica,Arial;
  text-align: center;
  font-size: 1.7vmin;
  line-height: 3vmin;
  color: ${RP_DARK_GREY};
  border-radius: 0.3vmin;
  border: ${(props) => props.enabled ? '1px solid '+RP_DARK_GREY : 'none'};
  background: ${(props) => props.enabled ? RP_SUPER_LIGHT : '#FFF'};
  font-weight: bold;
  box-shadow: 2px 2px 3px ${RP_GREY};
  word-wrap: break-word;

  &:hover {
    background: ${RP_SUPER_LIGHT};
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    display: inline-block;
    width: auto;
    margin-top: 2vmin;
    margin-right: 2vmin;
    padding: 2vmin 2.5vmin;
  }

  @media (max-width: 767px) {
    font-size: 2.5vmin;
  }
`
const FullPageSearchResultsWrapper = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`
const ImageIcon = styled.img`
  display: inline-block;
  position: relative; 
  width: 3.5vmin;
  height: 3.5vmin;
  vertical-align: middle;
  margin-right: 1vmin;

  border-radius: ${props => props.logo ? '0.5vmin' : '0'};
`
const ClearFilters = styled(Link)`
  display: block;
  text-align: right;
  font-size: 2vmin;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 2.5vmin;
  }
`
const DesktopOnly = styled.div`
  @media(max-width: 1024px) and (orientation: portrait){
    display: none;
  }
`
const SearchFilters = styled.div`
  margin-top: 1vmin;
  padding: 2vmin;
`