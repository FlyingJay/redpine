import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign, RP_Venue } from 'Models'
 
import { Slider, PrevArrow, NextArrow } from 'Components' // SLIDER
import { CampaignBlock } from 'Components' // CAMPAIGNBLOCK
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Money } from 'Components' // MONEY


export class FeaturedCampaigns extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const campaigns = this.props.campaigns || []
    const campaigns_count = campaigns.length
    const has_campaigns = (campaigns_count > 0)

    const settings = {
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {breakpoint: 768, settings: {slidesToShow: Math.min(2,campaigns_count), slidesToScroll: 2}}, 
        {breakpoint: 1024, settings: {slidesToShow: Math.min(3,campaigns_count), slidesToScroll: 3}}, 
        {breakpoint: 1920, settings: {slidesToShow: Math.min(4,campaigns_count), slidesToScroll: 4}},
        {breakpoint: 3000, settings: {slidesToShow: Math.min(6,campaigns_count), slidesToScroll: 3}},
        {breakpoint: 4000, settings: {slidesToShow: Math.min(8,campaigns_count), slidesToScroll: 4}}
      ],
      swipeToSlide: true,
      rows: 1
    }

    return <LoadingIndicator loading={this.props.loading}>
            <Slider {...settings}>
              {
                has_campaigns
                ? campaigns.map(campaign => <CampaignBlock campaign={campaign}/>)
                : <NoShows>
                    No concerts are currently featured in this category.
                  </NoShows>
              }
            </Slider>
           </LoadingIndicator>
  }
}

const NoShows = styled.div`
  padding-left: 5vmin;
`