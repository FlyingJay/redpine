import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Pie, HorizontalBar } from 'react-chartjs-2';

import { App } from 'Containers'

import { RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA, MyPageWrapper } from 'Components' //GLOBALS
import { LoadingIndicator } from 'Components'
import { Title } from 'Components' // TITLE
import { Graph } from 'Components' // GRAPH

import selectors from './selectors'
import actions from './actions'

class ShowStats extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
  	const pledges         = this.props.pledges || []
    const has_results     = pledges && (pledges.length > 0)

  	const ticketShareData = this.ticketShareData(pledges)
  	const ticketCountData = this.ticketCountData(pledges)

		const shareData = {
		  labels: Object.keys(ticketShareData),
		  datasets: [
		    {
		      data: Object.values(ticketShareData),
					backgroundColor: [RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA, RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA]
		    }
		  ]
		}

    const shareOptions = {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }

		const excitedData = {
		  labels: Object.keys(ticketCountData),
		  datasets: [
		    {
		      label: ' # of people \'going to see\' this act',
		      backgroundColor: [RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA, RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA],
		      borderWidth: 0,
		      data: Object.values(ticketCountData)
		    }
		  ]
		}

    const excitedOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: '16',
            fontFamily: '\'Open Sans\', Sans Serif',
            beginAtZero: true
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
    	<App requireAuth artistPage>
    		<MyPageWrapper>
    			<Title title='Show Statistics' 
	        	summary={has_results
    					? 'Show data for ' + pledges[0].campaign.title
    					: 'No data is available for this show.'}/>
          <LoadingIndicator loading={this.props.stats_loading}>
  	        {
              has_results
              ? <Graph 
                  title='Ticket Share' 
                  summary='The number of tickets sold by each band'
                  style={{marginBottom:'5vmin'}}>
                  <Pie data={shareData} options={shareOptions} />
                </Graph>
              : null
            }
  	        <br/>
            {
              has_results
              ? <Graph 
                  title='Who are fans most excited for?' 
                  summary="Fans for 'everyone' are counted for every band" last>
                  <HorizontalBar data={excitedData} options={excitedOptions}/>
                </Graph>
              : null
            }
          </LoadingIndicator>
    		</MyPageWrapper>
    	</App>
    )
  }

  bandLabels(pledges) {
  	if (pledges.length > 0){
  		return pledges[0].campaign.bands.map(band => band.band.name)
  	} else {
  		return []
  	}
  }

  ticketShareData(pledges) {
  	const band_labels = this.bandLabels(pledges)
  	const sales = {}

  	band_labels.forEach(name => {
  		sales[name] = 0
  	})

  	pledges.forEach(pledge => {
  		pledge.bands.forEach(band => {
  			sales[band.band.name] += (pledge.count/pledge.bands.length)
  		})
  	})

  	return sales
  }

  ticketCountData(pledges) {
  	const band_labels = this.bandLabels(pledges)
  	const sales = {}

  	band_labels.forEach(name => {
  		sales[name] = 0
  	})

  	pledges.forEach(pledge => {
  		pledge.bands.forEach(band => {
  			sales[band.band.name] += pledge.count
  		})
  	})

  	return sales
  }

  componentDidMount() {
    const id = this.props.match.params.campaignId
    this.props.loadData(id)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    pledges: selectors.selectPledges(state, props),
    stats_loading: selectors.selectStatsLoading(state, props),
    error: selectors.selectError(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (id) => {
      dispatch(actions.loadData(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowStats)
