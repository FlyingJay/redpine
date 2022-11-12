import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { getQueryParams, paths } from 'globals'
import { SEARCH_CATEGORIES } from 'enums'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { Bold, Clear, RP_BLACK, RP_DARK_GREY, RP_SUPER_LIGHT, RP_PINK, RP_DARKGREY, FormNotice, RP_FONT, RP_RED, RP_BLUE, RP_GREY } from 'Components' // GLOBALS
import { LoadingIndicator } from 'Components'
import { FormSeparator } from 'Components' //SEPARATOR
import { Checkbox } from 'Components'
import { Select } from 'Components' //INPUT
import { Paging } from 'Components' 
import { Link } from 'Components' 

import { ConcertResult } from './ConcertResult/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class Promotion extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      query: '',
      price: null,
      genre: null,
      capacity: null,
      city: 1,

      show_filters: (window.innerWidth > 1024),

      expand_campaignResults: false,
      expand_open_showResults: false,
    }
    this.price_options = ['ANY', '< $5', '$5 - $10', '$10 - $25', '> $25']
  }

  render() {
    const user = this.props.user
    const genres = this.props.genres || []
    const cities = this.props.cities || []
    const provinces = this.props.provinces || []
    const countries = this.props.countries || []

    const campaigns = this.props.campaignResults || []
    const open_shows = this.props.open_showResults || []

    const query    = this.state.query ? this.state.query : ''
    const price    = this.state.price ? this.price_options[this.state.price] : 'ANY'

    const city     = cities.find(city => { return (city.id == this.state.city) })                || {id:null,name:'ANY'}
    const province = provinces.find(province => { return (province.id == this.state.province) }) || {id:null,name:'ANY'}
    const country  = countries.find(country => { return (country.id == this.state.country) })    || {id:null,name:'ANY'}
    const genre    = genres.find(genre => { return (genre.id == this.state.genre) })             || {id:null,name:'ANY'}

    const open_shows_count    = (this.state.category === SEARCH_CATEGORIES.OPEN_SHOWS ? this.props.results_count : 0)
    const campaigns_count     = (this.state.category === SEARCH_CATEGORIES.CONCERTS ? this.props.results_count : 0)

    const is_loading = (this.state.category == SEARCH_CATEGORIES.CONCERTS && this.props.campaignResults_loading) || 
                       (this.state.category == SEARCH_CATEGORIES.OPEN_SHOWS && this.props.open_showResults_loading) 
    return (
      <App padding>
        <MyPageWrapper>
          <Categories>
            <FormSeparator text="Share & Earn"/>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.CONCERTS} onClick={() => this.categorySelected(SEARCH_CATEGORIES.CONCERTS)}>
              <ImageIcon src="/Assets/images/apps/shows.png"/>&nbsp;&nbsp;{`Shows ${campaigns_count ? `(${campaigns_count})` : ''}`}
            </CategoryButton>
            <CategoryButton enabled={this.state.category === SEARCH_CATEGORIES.OPEN_SHOWS} onClick={() => this.categorySelected(SEARCH_CATEGORIES.OPEN_SHOWS)}>
              <ImageIcon src="/Assets/images/apps/shows.png"/>&nbsp;&nbsp;{`Open Lineups ${open_shows_count ? `(${open_shows_count})` : ''}`}
            </CategoryButton>
          </Categories>

          <SearchBody>
            {/* SEARCH BAR AND BUTTON */}
            <FullPageSearchInput placeholder="Looking for a specific show?" value={query} onChange={(e) => this.updateState({query: e.target.value})} type="text"/>
            <SearchButton onClick={() => this.getResults()}>
              <i className="fa fa-search"/>
              { is_loading ? '  Loading...' : '  Search' }
            </SearchButton>

            { this.state.show_filters
              ? <SearchFilters>
                {/* LOCATION FILTERS */}
                { cities
                  ? <SearchFilter>
                      <SearchLabel>City</SearchLabel>
                      <SearchSelect options={
                          cities.map((city) => {
                            return {
                              value: city.id,
                              label: (city.name == 'ANY' ? 'ANY' : city.name + ', ' +  city.province.name)
                            }
                          })}
                        onChange={(e) => this.updateState({city:e.value})}
                        placeholder={city.name == 'ANY' ? 'ANY' : city.name + ', ' +  city.province.name} />
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
                { countries && (this.state.province == null) && (this.state.city == null)
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
                    : null }
                */}

                <Clear/>

                <SearchFilter>
                  <SearchLabel>Genre</SearchLabel>
                  <SearchSelect 
                    options={genres.map(genre => {return {value: genre.id, label: genre.name}} )}
                    onChange={(e) => this.updateState({genre:e.value})}
                    placeholder={genre.name} />
                </SearchFilter> 
                <FilterDropdown
                  label="Promoter Cut"
                  options={this.price_options}
                  placeholder={price}
                  onChange={(e) => this.updateState({price:e.value})}/>

                <ClearFilters onClick={() => this.clearFilters()}><i className="fa fa-undo"/>&nbsp;Clear Filters</ClearFilters>
                <ClearFilters onClick={() => this.updateState({show_filters:false})}><i className="fa fa-eye-slash"/>&nbsp;Hide Filters</ClearFilters>
              </SearchFilters>
            : <SearchFilters>
                <ClearFilters onClick={() => this.updateState({show_filters:true})}><i className="fa fa-eye"/>&nbsp;Show Filters</ClearFilters>
              </SearchFilters> }

            <FormSeparator/>
            {{[SEARCH_CATEGORIES.CONCERTS]: 
                <SearchResults user={this.props.user} 
                  category={this.state.category} 
                  page={this.props.page}
                  page_size={20}
                  is_loading={this.props.campaignResults_loading}
                  results={campaigns}
                  results_count={this.props.results_count}
                  onClickResult={(campaign) => this.props.viewCampaign(campaign)}
                  getResults={this.getResults.bind(this)}/>,
                  
              [SEARCH_CATEGORIES.OPEN_SHOWS]: 
                <SearchResults user={this.props.user} 
                  category={this.state.category} 
                  page={this.props.page}
                  page_size={20}
                  is_loading={this.props.open_showResults_loading}
                  results={open_shows} 
                  results_count={this.props.results_count}
                  onClickResult={(campaign) => this.selectOpenCampaign(campaign)}
                  getResults={this.getResults.bind(this)}/>
            }[this.state.category]}
          </SearchBody>
        </MyPageWrapper>
      </App>
    )
  }

  categorySelected(category){
    this.setState({category:category}, this.getResults)
  }

  getResults(page=1){
    if(this.state.category == SEARCH_CATEGORIES.CONCERTS && !this.props.campaignResults_loading){ this.props.performSearch(this.state,page) }
    if(this.state.category == SEARCH_CATEGORIES.OPEN_SHOWS && !this.props.open_showResults_loading){ this.props.performSearch(this.state,page) }
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
      genre_text: ''
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
    provinces: appSelectors.selectProvinces(state),
    countries: appSelectors.selectCountries(state),

    campaignResults: selectors.selectCampaignResults(state),
    open_showResults: selectors.selectOpenShowResults(state),

    campaignResults_loading: selectors.selectCampaignResultsLoading(state),
    open_showResults_loading: selectors.selectOpenShowResultsLoading(state),

    page: selectors.selectPage(state),
    results_count: selectors.selectResultsCount(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    },
    viewCampaign: (campaign) => {
      dispatch(push(paths.shows(campaign.id)))
    },
    performSearch: (search,page) => {
      dispatch(actions.performSearch(search,page))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Promotion)


const FilterDropdown = ({label,options,placeholder,onChange}) => (
  <SearchFilter>
    <SearchLabel>{label}</SearchLabel>
    <SearchSelect 
      options={options.map((text, index) => { return {value: index, label: text} })}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}/>
  </SearchFilter>
)

const SearchResults = ({user,category,page,page_size,is_loading,results,results_count,onClickResult,getResults}) => {
  const has_results = (results_count > 0)
  const no_results_string = `No ${{[SEARCH_CATEGORIES.CONCERTS]:'concerts',
                                   [SEARCH_CATEGORIES.OPEN_SHOWS]:'open shows'
                                  }[category]} were found. Try a different search..`
  return(
    <Paging page_size={page_size} page={page} results_count={results_count} reload={(page) => getResults(page)}>
      <LoadingIndicator loading={is_loading} is_child_visible={results_count > 0}>
      { has_results
        ? <FullPageSearchResultsWrapper>
            { results.map((result,index) => {
                return {[SEARCH_CATEGORIES.CONCERTS]: <ConcertResult key={result.id} onClick={() => onClickResult(result)} campaign={result} user={user}/>,
                        [SEARCH_CATEGORIES.OPEN_SHOWS]: <ConcertResult key={result.id} onClick={() => onClickResult(result)} campaign={result} user={user}/>
                       }[category]
              }) }
          </FullPageSearchResultsWrapper>
        : <NoResults>{no_results_string}</NoResults>
      }
      </LoadingIndicator>
    </Paging>
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
    font-size: 3vmin;
  }
`
const SearchSelect = styled(Select)`
  display: inline-block;
  width: 33vmin;

  line-height: 2vmin;
  font-size: 2vmin;
  padding: 0;
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

  &:hover {
    background: ${RP_SUPER_LIGHT};
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    display: inline-block;
    width: auto;
    margin-right: 2vmin;
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