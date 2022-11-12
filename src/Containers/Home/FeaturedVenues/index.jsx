import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_PINK, RP_BLACK, RP_DARK_GREY, RP_SUPER_LIGHT, Bottom } from 'Components' // GLOBALS
import { Slider, PrevArrow, NextArrow } from 'Components' // SLIDER
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Link } from 'Components' // LINK


export class FeaturedVenues extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      venues: []
    }
  }

  render() {
    const venues_count = this.state.venues.length
    const has_venues = (venues_count > 0)

    const settings = {
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {breakpoint: 768, settings: {slidesToShow: Math.min(2,venues_count), slidesToScroll: 2}}, 
        {breakpoint: 1024, settings: {slidesToShow: Math.min(3,venues_count), slidesToScroll: 3}}, 
        {breakpoint: 1920, settings: {slidesToShow: Math.min(4,venues_count), slidesToScroll: 4}},
        {breakpoint: 3000, settings: {slidesToShow: Math.min(6,venues_count), slidesToScroll: 6}},
        {breakpoint: 4000, settings: {slidesToShow: Math.min(8,venues_count), slidesToScroll: 8}}
      ],
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 4500,
      rows: 2
    }

    return <LoadingIndicator loading={this.props.loading}>
            <Slider {...settings}>
              {
                has_venues
                ? this.state.venues.map((venue, index) => venue.city && venue.city.province
                                                          ? <Link key={index} href={paths.venues(venue.id)}>
                                                              <VenuesContainer>
                                                                <VenuesImage image={venue.picture}>
                                                                  <Overlay className="venueImageOverlay" />
                                                                </VenuesImage>
                                                                <Titles>
                                                                  <VenueName>{venue.title}</VenueName>
                                                                  <VenueCity>
                                                                    {
                                                                      venue.city
                                                                      ? venue.city.name
                                                                      : ''
                                                                    }, {
                                                                      venue.city.province
                                                                      ? venue.city.province.name
                                                                      : ''
                                                                    }
                                                                  </VenueCity>
                                                                </Titles>
                                                              </VenuesContainer>
                                                            </Link>
                                                          : null)
                : <NoVenues>
                    No venues are currently featured in this category.
                  </NoVenues>
              }
            </Slider>
           </LoadingIndicator>
  }

  componentWillReceiveProps(props) {
    if (props.venues && (props.venues.length !== this.state.venues.length)) {
      this.updateState({ venues: props.venues.sort((a, b) => {
        return Math.random() > .5 ? 1 : -1
      })})
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const VenuesContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 40vmin;
  height: auto;
  margin-right: 2vmin;
  border: 1px solid #FFF;
  color: ${RP_DARK_GREY};

  &:hover {
    .venueImageOverlay {
      background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    }
  }
`
const VenuesImage = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 30vmin;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.image});
  border-radius: 3px;
`
const VenueInfo = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin-top: 1vmin;
`
const VenueInfoBasis = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.8vmin;
  font-weight: bold;
`
const VenueOtherInfo = styled(VenueInfoBasis)`
  font-size: 1.8vmin;
  font-weight: 100;
`
const Overlay = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  border-radius: inherit;
`
const NoVenues = styled.div`
  padding-left: 5vmin;
`
const VenueName = styled(VenueInfoBasis)`
  font-size: 2.3vmin;
  font-weight: 600;
  padding: 0 1.5vmin;
  color: #FFF;
`
const VenueCity = styled(VenueInfoBasis)`
  color: ${RP_PINK};
  font-size: 2vmin;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5vmin 1.5vmin 1vmin 1.5vmin;
`
const Titles = styled(Bottom)`
  width: 100%;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
`