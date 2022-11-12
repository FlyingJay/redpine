import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { HorizontalBar } from 'react-chartjs-2';

import { paths, validators } from 'globals'

import { RP_User, RP_Campaign } from 'Models'

import { RP_DARKBLUE, RP_DARK_GREY, RP_BLACK, RP_LIGHTGREY, RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA, RP_PINK, RP_SUPER_LIGHT, RP_GREY } from 'Components' //GLOBALS
import { FormButton } from 'Components' //BUTTON
import { Input } from 'Components' // INPUTN
import { LoadingIndicator } from 'Components'
import { Graph } from 'Components'
import { Link } from 'Components' 

import { Heading } from './../Heading/index.jsx'
import { EditButton } from './../Edit/EditButton/index.jsx'


export class Tickets extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      third_party_tickets: this.props.third_party_tickets
    }
    this.graphOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          barPercentage: 1
        }]
      },
      layout: {
        padding: 25
      },
      maintainAspectRatio: false
    }
  }

  render() {
    const act_can_edit        = this.props.is_owner
    const venue_can_edit      = this.props.is_manager
    const campaign            = this.props.campaign || null
    const total_earned        = Number(campaign && campaign.total_earned || 0).toFixed(2)
    const tickets_sold        = campaign && campaign.tickets_sold || 0
    const timeslot            = campaign && campaign.timeslot || null

    const _Campaign           = RP_Campaign(campaign)
    const is_crowdfunded      = _Campaign.isCrowdfunded()
    
    const goal_amount         = Number(timeslot && timeslot.asking_price || 0).toFixed(2)
    const goal_count          = timeslot && timeslot.min_headcount || 0
    const venue               = timeslot && timeslot.venue || null

    const sales_count_string  = is_crowdfunded ? `  ${tickets_sold} / ${goal_count}  ` : `  ${tickets_sold}`
    const sales_amount_string = is_crowdfunded ? `  ${total_earned} / ${goal_amount}  ` : `  ${total_earned}`

    const sales_count_label   = is_crowdfunded ? 'Headcount / Attendance Goal' : 'Headcount'
    const sales_amount_label  = is_crowdfunded ? 'Total Sales / Show Expenses' : 'Total Sales'

    const pledges         = this.props.pledges || []
    const ticketShareData = this.ticketShareData(pledges)

    const band_labels = this.bandLabels(pledges)
    const band_count  = band_labels.length

    const has_no_sales = (tickets_sold == 0)

    const graphData = {
      labels: Object.keys(ticketShareData),
      datasets: [
        {
          label: ' This act\'s draw',
          backgroundColor: [RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA, RP_RED, RP_BLUE, RP_GREEN, RP_ORANGE, RP_YELLOW, GRAPH_MAGENTA],
          borderWidth: 0,
          data: Object.values(ticketShareData)
        }
      ]
    }

    return <div>
      <Heading text="Attendance" icon="fa fa-flag"/>
      { has_no_sales
        ? <IntroPanel>
            <span>
              This will be your realtime attendance dashboard, tracking headcounts and any ticket sales. You 
              will be able to see how many fans (if any) were drawn by each act and see a full breakdown of what was purchased.
            </span>
            <br/><br/>
            But first, you will need to sell a ticket! Adding an "early-bird" 
            option below can encourage fans to commit to a date.

            { RP_User(this.props.user).is_member_venue
              ? <ThirdParty>
                  <Input inline
                    width="80%"
                    value={this.state.third_party_tickets || ''}
                    validate={validators.ALL_THE_SHIT()}
                    onValidate={(text) => this.updateState({third_party_tickets: text})}
                    placeholder="To give up these features, link a 3rd party ticketing page."
                    image="dot" focusImage="dot-focus"/>
                  <AddButton onClick={() => this.props.addTicketingLink(this.state.third_party_tickets)}><i className="fa fa-link"/></AddButton>
                </ThirdParty> 
              : null }
          </IntroPanel>
        : <div>
            <LeftPanel>
              <Requirement>
                <i className="fa fa-users" />
                {sales_count_string}
                <RequirementLabel>{sales_count_label}</RequirementLabel>
              </Requirement>
              <Requirement>
                <i className="fa fa-usd" />
                {sales_amount_string}
                <RequirementLabel>{sales_amount_label}</RequirementLabel>
              </Requirement> 
            </LeftPanel>
            <RightPanel>
              <LoadingIndicator loading={this.props.stats_loading}>
                { (pledges.length > 0)
                  ? <div style={{height:`${band_count > 5 ? 4*band_count : 20}vmin`,borderLeft:`1px solid ${RP_SUPER_LIGHT}`}}>
                      <HorizontalBar data={graphData} options={this.graphOptions}/>
                    </div>
                  : <SalesClosed>Sell a ticket to see an exciting graph!</SalesClosed> }
              </LoadingIndicator>
              <Link href={paths.showStats(_Campaign.id)}>
                <EditButton text="More Information" show={venue_can_edit || act_can_edit}/>
              </Link>
            </RightPanel>
          </div> }
    </div>
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

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
const Panel = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
`
const IntroPanel = styled(Panel)`
  display: block;
  padding: 5vmin;
  font-weight: 200;
  font-style: italic;

  span{
    font-style: normal;
    font-weight: 400;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2vmin;
  }
`
const ThirdParty = styled.div`
  padding-top: 5vmin;
`
const AddButton = styled(FormButton)`
  vertical-align: top;
  display: inline-block;
  background: ${RP_GREY};
  margin-left: 1vmin;
  font-size: 3vmin;

  &:hover {
    background: ${RP_DARK_GREY};
  }
`
const LeftPanel = styled(Panel)`
  width: 40vmin;
  padding: 5vmin 0 2.5vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    display: block;
    padding: 5vmin 0;
    width: 100%;
    border: none;
  }
`
const RightPanel = styled(Panel)`
  width: CALC(100% - 40vmin - 1px);
  padding: 2.5vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    display: none;
  }
`
const Item = styled.div`
  padding: 1vmin 1vmin 0 1vmin;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Requirement = styled(Item)`
  font-size: 3vmin;
  font-weight: 200;
  white-space: nowrap;
  text-align: center;
  padding: 2vmin 0;

  i {
    color: ${RP_BLUE};
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;

    i {
      font-size: 4vmin;
    }
  }
`
const RequirementLabel = styled.div`
  margin: 0 auto;
  font-size: 1.75vmin;
  font-weight: 200;
  white-space: nowrap;
  text-align: center;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;

    i {
      font-size: 4vmin;
    }
  }
`
const SalesClosed = styled(Item)`
  marin-top: 10vmin;
  font-size: 2vmin;
  font-weight: 400;
  white-space: nowrap;
  line-height: 5vmin;
  text-align: center;

  i {
    font-size: 3vmin;
    color: ${RP_BLUE};
  }
`
