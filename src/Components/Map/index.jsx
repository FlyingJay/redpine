import React from 'react'
import styled from 'styled-components'


export class Map extends React.PureComponent {
  initMap(props) {
    if (!this.props.location)
      return

    let coords = this.props.multi_marker ? this.props.location : [this.props.location]
    let coords_count = coords.length

    if(coords_count > 0){
      let rough_middle = coords[Math.floor(coords_count/2)]
      let mid = {lat: parseFloat(rough_middle.latitude), lng: parseFloat(rough_middle.longitude)};
      
      let map = new google.maps.Map(document.getElementById(`map_${this.props.id || 0}`), {
        zoom: this.props.zoom || 17,
        center: mid
      })
      coords.forEach(coord => {
        let loc = {lat: parseFloat(coord.latitude), lng: parseFloat(coord.longitude)};
        let marker = new google.maps.Marker({
          label: coord.label,
          position: loc,
          map: map
        })
      })
    }
  }

  render() {
    return <MapContainer id={`map_${this.props.id || 0}`} />
  }

  componentDidMount() {
    this.initMap(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.initMap(nextProps)
  }
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`