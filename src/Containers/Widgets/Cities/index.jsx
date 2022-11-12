import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { RP_Act } from 'Models'

import { App, ConcertsPanel } from 'Containers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { Map } from 'Components' // MAP


export class WidgetCities extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const cities = this.props.cities

    let locations = []
    if(cities){
      locations = cities.map(city => {
        return {
          label: city.name,
          latitude: city.location ? city.location.latitude : null,
          longitude: city.location ? city.location.longitude : null
        }
      })
    }

    return <App no_ui>
            <div style={{height:'100vh'}}>
              <Map location={locations} multi_marker zoom={4}/>
            </div>
           </App>
  }

  componentDidMount() {
    this.props.refreshCache()
  }
}

const mapStateToProps = (state, props) => {
  return {
    cities: appSelectors.selectCities(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetCities)
