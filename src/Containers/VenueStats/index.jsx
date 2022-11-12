import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2';

import { App } from 'Containers'

import { MyPageWrapper, RP_FONT, RP_DDD, RP_SUPER_LIGHT, RP_BLACK, RP_DARK_GREY, RP_WHITE } from 'Components' // GLOBALS
import { LoadingIndicator } from 'Components' //BUTTON
import { Modal } from 'Components' //TITLE
import { Title } from 'Components' //TITLE
import { Graph } from 'Components' // GRAPH

import selectors from './selectors'
import actions from './actions'
import constants from './constants'


export class VenueStats extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      infoTab: 1,
      historySize: 12
    }
	}

	render() {
    const venue = this.props.venue
    const campaigns = this.props.campaigns || []

    const partnerData = this.partnerData(campaigns)

    const campaignPartnersData = {
      labels: partnerData.map(function(p) { return p.name }),
      datasets: [
        {
          label: ' Number of Shows',
          backgroundColor: 'rgba(245,99,99,0.5)',  
          borderColor: 'rgb(245,99,99)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(245,99,99)',
          hoverBorderColor: 'rgb(49,49,49)',
          data: partnerData.map(function(p) { return p.count })
        }
      ]
    }

    const campaignPartnersOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif',
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif'
          }
        }]
      },
      maintainAspectRatio: false
    }

		return (
      <App requireAuth>
        <Modal show onClose={() => this.props.history.goBack()}>
          { this.props.venue 
            ? <MyPageWrapper>
                <Title title={"Statistics for " + venue.title} summary="More coming soon. If there is something you'd like to see, just let us know!" />
                <TabOptions>
                  <TabOption onClick={() => this.updateState({infoTab: 1})} activatedOption={(this.state.infoTab == 1) ? true : false}>
                    <i className="fa fa-trophy" />&nbsp; Overview
                  </TabOption>
                </TabOptions>
                {
                  /*All-TIME STATISTICS*/
                }
                <LoadingIndicator loading={this.props.stats_loading}>
                  <TabFrame show={this.state.infoTab == 1}>
                    <Graph title="Top 10 Collaborators" summary={"Who do you host most often?"} last>
                      <HorizontalBar data={campaignPartnersData} options={campaignPartnersOptions} />
                    </Graph>
                  </TabFrame>
                </LoadingIndicator>
              </MyPageWrapper>
            : null }
        </Modal>
      </App>
    )
	}

  partnerData(campaigns) {
    const data = []

    campaigns.forEach((campaign) => {
      campaign.bands.forEach((band) => {
        if(data.map(function (band) { return band.name; }).indexOf(band.band.name) === -1){
          data.push({name:band.band.name, count:1})
        }else{
          data[data.map(function (band) { return band.name; }).indexOf(band.band.name)].count += 1
        }
      })
    })

    data.sort(function(a, b) {
      return ((a.count > b.count) ? -1 : ((a.count == b.count) ? 0 : 1));
    });

    return data.slice(0,20)
  }

  componentDidMount() {
    const venue_id = this.props.match.params.venueId
    this.props.loadStats(venue_id)
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    venue: selectors.selectVenue(state, props),
    campaigns: selectors.selectCampaigns(state, props),
    stats_loading: selectors.selectStatsLoading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStats: (act_id) => {
      dispatch(actions.loadStats(act_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueStats)


const TabOptions = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0 0 1vmin 0;
  background: ${RP_SUPER_LIGHT};
  border-bottom: 0px solid ${RP_DDD};

  @media (max-width: 768px) and (orientation: portrait) {
    border-bottom: 0px solid ${RP_DDD};
  }
`
const TabOption = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  float: left;
  width: auto;
  height: auto;
  padding: 2vmin 3vmin;
  transition: all 0.5s ease;
  text-align: left;
  background: ${(props) => props.activatedOption ? RP_DDD : RP_SUPER_LIGHT};
  color: ${(props) => props.activatedOption ? RP_BLACK : RP_DARK_GREY};
  border-color: ${(props) => props.activatedOption ? RP_DDD : RP_WHITE};
  font-family: ${RP_FONT};
  font-size: 1.8vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }

  &:hover {
    background: ${RP_DDD};
    color: ${RP_BLACK};
    border-color: ${RP_DDD};
  }
`
const TabFrame = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  word-wrap: break-word;
  text-align: left;
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 2vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
