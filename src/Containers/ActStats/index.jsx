import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { Radar, Line, HorizontalBar } from 'react-chartjs-2';

import { App } from 'Containers'

import { MyPageWrapper, RP_FONT, RP_DDD, RP_SUPER_LIGHT, RP_BLACK, RP_DARK_GREY, RP_WHITE } from 'Components' // GLOBALS
import { LoadingIndicator } from 'Components'
import { Button } from 'Components'
import { Modal } from 'Components' 
import { Title } from 'Components' 
import { Graph } from 'Components'

import selectors from './selectors'
import actions from './actions'
import constants from './constants'


export class ActStats extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      infoTab: 1,
      historySize: 12
    }
	}

	render() {
		return (
      <App requireAuth>
        <Modal show onClose={() => this.props.history.goBack()}>
          {this.props.band ? this.renderStats() : null}
        </Modal>
      </App>
    )
	}

  renderStats() {
    const band = this.props.band
    const campaigns = this.props.campaigns || []

    const campaignHistoryData = {
      labels: this.historyLabels().slice(-this.state.historySize),
      datasets: [
        {
          label: ' Number of Shows',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(245,99,99,0.5)',  
          borderColor: 'rgb(245,99,99)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          pointStyle: 'crossRot',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 15,
          pointHoverBackgroundColor: 'rgb(245,99,99)',
          pointHoverBorderColor: 'rgb(49,49,49)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 60,
          cubicInterpolationMode: 'monotone',
          data: this.campaignHistoryData(campaigns).slice(-this.state.historySize)
        }
      ]
    }

    const campaignHistoryOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif'
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif',
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      },
      layout: {
        padding: 10
      },
      maintainAspectRatio: false
    }

    const pledgeHistoryData = {
      labels: this.historyLabels().slice(-this.state.historySize),
      datasets: [
        {
          label: ' Number of Pledges',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(245,99,99,0.5)',  
          borderColor: 'rgb(245,99,99)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          pointStyle: 'crossRot',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 15,
          pointHoverBackgroundColor: 'rgb(245,99,99)',
          pointHoverBorderColor: 'rgb(49,49,49)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 60,
          cubicInterpolationMode: 'monotone',
          data: this.pledgeHistoryData(campaigns).slice(-this.state.historySize)
        }
      ]
    }

    const pledgeHistoryOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif'
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif',
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      },
      layout: {
        padding: 10
      },
      maintainAspectRatio: false
    }

    const goalHistoryData = {
      labels: this.historyLabels().slice(-this.state.historySize),
      datasets: [
        {
          label: ' Number of Pledges',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(245,99,99,0.5)',  
          borderColor: 'rgb(245,99,99)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          pointStyle: 'crossRot',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 15,
          pointHoverBackgroundColor: 'rgb(245,99,99)',
          pointHoverBorderColor: 'rgb(49,49,49)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 60,
          cubicInterpolationMode: 'monotone',
          data: this.goalHistoryData(campaigns).slice(-this.state.historySize)
        }
      ]
    }

    const goalHistoryOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif'
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif',
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      },
      layout: {
        padding: 10
      },
      maintainAspectRatio: false
    }

    const partnerData = this.partnerData(band.name,campaigns)

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

    const TimelineButtons = ({}) => (
      <div style={{textAlign:'right',width:'auto',margin:'1vmin'}}>
        <Button onClick={() => this.updateState({historySize:3})} style={{marginRight:'1vmin'}}>3M</Button>
        <Button onClick={() => this.updateState({historySize:6})} style={{marginRight:'1vmin'}}>6M</Button>
        <Button onClick={() => this.updateState({historySize:12})} >1Y</Button>
      </div>  
    );
  
    return (
      <MyPageWrapper>
        <Title title={"Statistics for " + band.name} summary="Anything else you'd like to see? Let us know!" />
        <TabOptions>
          <TabOption onClick={() => this.updateState({infoTab: 1})} activatedOption={(this.state.infoTab == 1) ? true : false}>
            <i className="fa fa-trophy" />&nbsp; All-Time
          </TabOption>
          <TabOption onClick={() => this.updateState({infoTab: 3})} activatedOption={(this.state.infoTab == 3) ? true : false}>
            <i className="fa fa-flag" />&nbsp; Shows
          </TabOption>
          <TabOption onClick={() => this.updateState({infoTab: 4})} activatedOption={(this.state.infoTab == 4) ? true : false}>
            <i className="fa fa-ticket" />&nbsp; Attendance
          </TabOption>
        </TabOptions>
        {
          /*All-TIME STATISTICS*/
        }
        <LoadingIndicator loading={this.props.stats_loading}>
          <TabFrame show={this.state.infoTab == 1}>
            <Graph title="Top 10 Collaborators" summary={"Who does " + band.name + " play with most often?"} last>
              <HorizontalBar data={campaignPartnersData} options={campaignPartnersOptions} />
            </Graph>
          </TabFrame>
          {
            /*CAMPAIGN STATISTICS*/
          }
          <TabFrame show={this.state.infoTab == 3}>
            <TimelineButtons />
            <Graph title="Show Total" summary={"How muuch has " + band.name + " been playing?"}>
              <Line data={campaignHistoryData} options={campaignHistoryOptions} />
            </Graph>
          </TabFrame>
          {
            /*PLEDGE STATISTICS*/
          }
          <TabFrame show={this.state.infoTab == 4}>
            <TimelineButtons />
            <Graph title="Attendance" summary={"Are " + band.name + " shows becoming more popular?"} last>
              <Line data={pledgeHistoryData} options={pledgeHistoryOptions} />
            </Graph>
          </TabFrame>
        </LoadingIndicator>
      </MyPageWrapper>
    )
  }

  historyLabels(months) {
    const month = moment().month()
    const year = moment().year()

    const m = constants.MONTHS
    const labels = [].concat(m.slice(month+1,12)).concat(m.slice(0,month+1))

    return labels
  }

  campaignHistoryData(campaigns) {
    const month = moment().month()
    const year = moment().year()
    const data = [0,0,0,0,0,0,0,0,0,0,0,0]

    campaigns.forEach((campaign) => {
      const cMonth = moment(campaign.funding_end).month()
      const cYear = moment(campaign.funding_end).year()
      if (cMonth <= month && cYear === year) {
        data[cMonth] += 1
      }
      else if (cMonth > month && cYear === year-1) {
        data[cMonth] += 1
      }
    })

    return [].concat(data.slice(month+1,12)).concat(data.slice(0,month+1))
  }

  pledgeHistoryData(campaigns) {
    const month = moment().month()
    const year = moment().year()
    const data = [0,0,0,0,0,0,0,0,0,0,0,0]

    campaigns.forEach((campaign) => {
      const cMonth = moment(campaign.funding_end).month()
      const cYear = moment(campaign.funding_end).year()
      if (cMonth <= month && cYear === year) {
        data[cMonth] += campaign.tickets_sold
      }
      else if (cMonth > month && cYear === year-1) {
        data[cMonth] += campaign.tickets_sold
      }
    })

    return [].concat(data.slice(month+1,12)).concat(data.slice(0,month+1))
  }

  goalHistoryData(campaigns) {
    const month = moment().month()
    const year = moment().year()

    const count = [0,0,0,0,0,0,0,0,0,0,0,0]
    const goals = [0,0,0,0,0,0,0,0,0,0,0,0]

    campaigns.forEach((campaign) => {
      const cMonth = moment(campaign.funding_end).month()
      const cYear = moment(campaign.funding_end).year()
      const timeslot = campaign && campaign.timeslot || null
      const goal_count = timeslot && timeslot.min_headcount || 0

      if (cMonth <= month && cYear === year) {
        count[cMonth] += 1
        goals[cMonth] += goal_count
      }
      else if (cMonth > month && cYear === year-1) {
        count[cMonth] += 1
        goals[cMonth] += goal_count
      }
    })

    for(var i=0;i<goals.length;i++){
      if (count[i] != 0) {
        goals[i] /= count[i]
      }
    }

    return [].concat(goals.slice(month+1,12)).concat(goals.slice(0,month+1))
  }

  partnerData(bandName,campaigns) {
    const data = []

    campaigns.forEach((campaign) => {
      campaign.bands.forEach((band) => {
        if(data.map(function (band) { return band.name; }).indexOf(band.band.name) === -1){
          if(band.band.name !== bandName){
            data.push({name:band.band.name, count:1})
          }
        }else{
          data[data.map(function (band) { return band.name; }).indexOf(band.band.name)].count += 1
        }
      })
    })

    data.sort(function(a, b) {
      return ((a.count > b.count) ? -1 : ((a.count == b.count) ? 0 : 1));
    });

    return data.slice(0,10)
  }

  componentDidMount() {
    const act_id = this.props.match.params.actId
    this.props.loadStats(act_id)
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    band: selectors.selectBand(state, props),
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

export default connect(mapStateToProps, mapDispatchToProps)(ActStats)


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
