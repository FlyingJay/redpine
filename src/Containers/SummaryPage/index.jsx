import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'

import selectors from './selectors'
import actions from './actions'
import constants from './constants'
import { paths } from 'globals'
import { App } from 'Containers'
import { MyPageWrapper, Clear, RP_FONT, RP_DDD, RP_SUPER_LIGHT, RP_BLACK, RP_DARK_GREY, RP_WHITE, RP_BLUE, RP_GREEN, RP_RED } from 'Components' // GLOBALS
import { Title, SectionHeader } from 'Components' //TITLE
import { FormInput } from 'Components' //INPUT
import { Link } from 'Components' //LINK
import { Modal, SidePanel, ModalSection } from 'Components' //TITLE

const TabOptions = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 0;
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
  padding-top: 3vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`

const DataWrapper = styled.div`
  background: ${props => props.header ? RP_BLUE : RP_WHITE };
  display: block;
  text-align: left;
  border-radius: 3px;
  margin-bottom: 0.25vmin;

  &:hover {
    background: ${props => props.header ? RP_BLUE : RP_SUPER_LIGHT};
    cursor: ${props => props.header ? 'default' : 'pointer'};
  }
`

const Content = styled.div`
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 2vmin;
`

const ContentExpanded = styled(Content)`
  display: ${props => props.visible ? 'block' : 'none'};
  text-align: center;
`

const Column = styled(Content)`
  color: ${props => props.header ? RP_WHITE : RP_BLACK };
  display: inline-block;
  padding: 1vmin;
  text-align: center;
`
const DataHeader = ({title,column_text}) => (
  <DataWrapper background={RP_BLUE} header>
    <Column style={{width:'30%',textAlign:'left'}} header>
      {title}
    </Column>
    {column_text.map((text,index) => {
      var width = (55/column_text.length).toFixed(0)
      return (<Column 
                header
                key={text + '_' + index}
                style={{width:(width+'%')}}>
                {text}
              </Column>);
    })}      
  </DataWrapper>
);

const DataElement = ({title,expanded,column_text,trending_up,onClick}) => (
  <DataWrapper onClick={onClick}>
    <Column style={{width:'30%',textAlign:'left'}}>
      {title}
    </Column>
    {column_text.map((text,index) => {
      var width = (55/column_text.length).toFixed(0)
      return (<Column  onClick={onClick}
                key={title + '_' + index}
                style={{width:(width+'%')}}>
                {text}
                <Arrow 
                  up={trending_up[index]}/>
              </Column>);
    })}
    <ContentExpanded visible={expanded}>
      <Column style={{width:'30%'}}>
        Manager's Name
      </Column>
      <Column style={{width:'30%'}}>
        e-mail
      </Column>
      <Column style={{width:'30%'}}>
        Address
      </Column> 
    </ContentExpanded>
  </DataWrapper>
);

const InfoRow = styled(Content)`
  display: block;
  text-align: ${props => props.main_row ? 'left' : 'right' };
  font-size: ${props => props.main_row ? '3vmin' : '2vmin' };
  padding-left: ${props => props.main_row ? '0' : '2vmin' };
`

const SimilarBand = styled(Content)`
  display: inline-block;
  text-align: left;
  font-size: 2vmin;
  padding: 1vmin;

  &:hover {
    background: ${RP_SUPER_LIGHT};
    cursor: pointer;
  }
`

const UserListing = ({first_name,last_name,email}) => (
  <div style={{marginTop:'2vmin'}}>
    <InfoRow main_row>
      {first_name + " " + last_name}
    </InfoRow>
    <InfoRow>
      {email}
    </InfoRow>
  </div>
);

const RelatedBandListing = ({core_id,name,strength}) => (
  <Link href={paths.acts(core_id)}>
    <SimilarBand>
      {name}
    </SimilarBand>
  </Link>
);

const ArrowIcon = styled.i`
  padding-left: 1vmin;
  color: ${props => props.up ? RP_GREEN : RP_RED};
  display: ${props => props.up == null ? 'none' : 'inline-block'};
`

const Arrow = ({up,hidden}) => (
  <ArrowIcon 
    up={up} 
    className={up ? "fa fa-arrow-up" : "fa fa-arrow-down"} />
);

export class SummaryPage extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      infoTab: 1,
      venueDetails: null,
      bandDetails: null,
      monthsInHistory: 10,
      showDetails: false,
      detailsType: null,
    }

    // New function definition to implement Array.filter() on a list of objects.
    Object.filter = (obj, predicate) => Object.keys(obj).filter(key => predicate(obj[key])).reduce((res,key) => (res[key] = obj[key], res), {});
    
    this.props.loadSummary()
	}

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  showDetails(id,core_id,type){
    switch(type){
      case 'venue':
        this.props.getVenue(core_id)
        this.updateState({showDetails:true,detailsType:'venue'})
        break;
      case 'band':
        this.props.getBand(id,core_id)
        this.updateState({showDetails:true,detailsType:'band'})
        break;
    }
  }

  closeModal() {
    this.updateState({showDetails: false})
  }

	render() {
    const campaigns = this.props.campaigns || []
    const band_campaigns = this.props.band_campaigns || []
    const venue_campaigns = this.props.venue_campaigns || []
    const timeslots = this.props.timeslots || []
    const pledges = this.props.pledges || []
    const band_pledges = this.props.band_pledges || []    
    const band = this.props.band || []
    const venue = this.props.venue || []
    const related_bands = this.props.related_bands || []

    var global_campaign_success_rate = this.global_campaign_success_rate(campaigns,0)
    var global_booking_success_rate = this.global_booking_success_rate(timeslots,0)

		return (
      <App requireAuth>
      <MyPageWrapper>
        <Modal show={this.state.showDetails} transparent={true} onClose={(e) => this.closeModal()}>
          <SidePanel>
            {
              this.state.detailsType == 'venue'
              ? <ModalSection top>
                  <Title title={venue.title} summary="Managers, emails, and stuff." />
                  <br/>
                  <br/>
                  {(venue.managers || []).map((m) => 
                    <UserListing
                      key={m.manager.id}
                      first_name={m.manager.first_name}
                      last_name={m.manager.last_name}
                      email={m.manager.email} />
                  )}
                </ModalSection>
              : null
            }
            {
              this.state.detailsType == 'band' 
              ? <ModalSection top>
                  <Title title={band.name} summary="Members, emails, and stuff." />
                  <br/>
                  {[band.owner].map((artist) => 
                    <UserListing
                      key={artist.user.id}
                      first_name={artist.user.first_name}
                      last_name={artist.user.last_name}
                      email={artist.user.email} />
                  )}
                  <br/>
                  <div style={{marginTop:'2vmin',marginBottom:'0.5vmin'}}>
                    <InfoRow main_row>
                      Similar Acts:
                    </InfoRow>
                    {(related_bands || []).map((band) => 
                      <RelatedBandListing
                        key={band.id}
                        core_id={band.core_id}
                        name={band.name}
                        strength={band.strength} />
                    )}
                    {related_bands.length == 0 ?
                      <InfoRow>This band has not recieved a pledge!</InfoRow>
                      :
                      ""
                    }
                  </div>
                </ModalSection>
              : ''
            }
          </SidePanel>
        </Modal>
        <Title title={"Summary"} summary="An overview tool for all accounts on RedPine." />
        <TabOptions>
          <TabOption onClick={() => this.updateState({infoTab: 1})} activatedOption={(this.state.infoTab == 1) ? true : false}>
            <i className="fa fa-trophy" />&nbsp; RedPine
          </TabOption>
          <TabOption onClick={() => this.updateState({infoTab: 2})} activatedOption={(this.state.infoTab == 2) ? true : false}>
            <i className="fa fa-home" />&nbsp; Venues
          </TabOption>
          <TabOption onClick={() => this.updateState({infoTab: 3})} activatedOption={(this.state.infoTab == 3) ? true : false}>
            <i className="fa fa-ticket" />&nbsp; Bands
          </TabOption>
          <TabOption onClick={() => this.updateState({infoTab: 4})} activatedOption={(this.state.infoTab == 4) ? true : false}>
            <i className="fa fa-cog" />&nbsp; Settings
          </TabOption>
        </TabOptions>
        {
          /*REDPINE STATISTICS*/
        }
        <TabFrame show={this.state.infoTab == 1}>
          <SectionHeader blockType>
            Gross Sales: &nbsp;
            <strong>${this.global_sales(campaigns)}</strong>
          </SectionHeader>
          <SectionHeader blockType>
            Campaign Success Rate: &nbsp;
            <strong>{global_campaign_success_rate}%</strong>
            <Arrow up={this.trending_up(
                        this.global_campaign_success_rate(campaigns,this.state.monthsInHistory),
                        global_campaign_success_rate
                      )}/>
          </SectionHeader>
          <SectionHeader blockType>
            Booking Success Rate: &nbsp;
            <strong>{global_booking_success_rate}%</strong>
            <Arrow up={this.trending_up(
                        this.global_booking_success_rate(timeslots,this.state.monthsInHistory),
                        global_booking_success_rate
                      )}/>
          </SectionHeader>
        </TabFrame>
        {
          /*VENUE STATISTICS*/
        }
        <TabFrame show={this.state.infoTab == 2}>
          <DataHeader
            title={"Venue"}
            column_text={["Booking Success","Booking Speed","Total Listings"]}/>
          {Object.keys(venue_campaigns).map((key) => {
            var venue_booking_success_rate = this.venue_booking_success_rate(venue_campaigns,key,0)
            var venue_listing_length = this.venue_listing_length(venue_campaigns,key,0)
            return(
              <DataElement
                key={"v-"+key}
                title={venue_campaigns[key][0].venue.title}
                column_text={[
                  venue_booking_success_rate + '%',
                  venue_listing_length + ' Days',
                  this.venue_listing_count(venue_campaigns,key)
                ]}
                trending_up={[
                  this.trending_up(this.venue_booking_success_rate(venue_campaigns,key,this.state.monthsInHistory),venue_booking_success_rate),
                  this.trending_down(this.venue_listing_length(venue_campaigns,key,this.state.monthsInHistory),venue_listing_length),
                  null
                ]}
                expanded={false} 
                onClick={() => this.showDetails(venue_campaigns[key][0].venue.id,
                                                venue_campaigns[key][0].venue.core_id,
                                                'venue')}/>
            );
          })}
        </TabFrame>
        {
          /*BAND STATISTICS*/
        }
        <TabFrame show={this.state.infoTab == 3}>
          <DataHeader
            title={"Band"}
            column_text={["Campaign Success","Campaign Length","Revenue / Ticket","Total Pledges"]}/>
          {Object.keys(band_campaigns).map((key) => {
            var band_campaign_success_rate = this.band_campaign_success_rate(band_campaigns[key],0)
            var band_campaign_lenth = this.band_campaign_lenth(band_campaigns[key],0)
            var band_average_ticket_revenue = this.band_average_ticket_revenue(band_pledges[key],campaigns,0)
            return (
              <DataElement
                key={"b-"+key}
                title={band_campaigns[key][0].band.name}
                column_text={[
                  band_campaign_success_rate + '%',
                  band_campaign_lenth + ' Days',
                  '$' + band_average_ticket_revenue,
                  this.band_pledge_count(band_pledges[key])
                ]}
                trending_up={[
                  this.trending_up(
                    this.band_campaign_success_rate(band_campaigns[key],this.state.monthsInHistory), band_campaign_success_rate),
                  this.trending_down(
                    this.band_campaign_lenth(band_campaigns[key],this.state.monthsInHistory), band_campaign_lenth),
                  this.trending_up(
                    this.band_average_ticket_revenue(band_pledges[key],campaigns,this.state.monthsInHistory), band_average_ticket_revenue),
                  null,
                ]}
                expanded={false} 
                onClick={() => this.showDetails(band_campaigns[key][0].band.id,
                                                band_campaigns[key][0].band.core_id,
                                                'band')}/>
            );
          })}
        </TabFrame>
        <TabFrame show={this.state.infoTab == 4}>
          <SectionHeader blockType>
            Historical Trend (in months): &nbsp;
            <FormInput 
            value={this.state.monthsInHistory} 
            onChange={(e) => this.updateState({monthsInHistory: e.target.value})} 
            style={{width:'30%',display:'inline-block'}}/>
          </SectionHeader>
        </TabFrame>
      </MyPageWrapper>
      </App>
    )
	}

  global_sales(campaigns,history){
    var sum = 0.00
    Object.keys(Object.filter(campaigns, c => c[0].is_successful)).forEach((key) => {
      sum += parseFloat(campaigns[key][0].gross_sales)
    })
    return sum.toFixed(2)
  }

  global_campaign_success_rate(campaigns,history){
    if(Object.keys(campaigns).length > 0){
      var campaigns_within_period = Object.keys(campaigns).length

      return ((Object.keys(Object.filter(campaigns, c => {
        if (moment().diff(moment(c[0].campaign_success),'months') < history) {
          campaigns_within_period -= 1
          return false
        } else {
          return c[0].is_successful
        }
      })).length.toFixed(2)/campaigns_within_period.toFixed(2))*100).toFixed(2)
    }else{
      return 0
    }
  }

  global_booking_success_rate(timeslots,history){
    if(timeslots.length > 0){
      var timslots_within_period = timeslots.length

      return (((timeslots.filter((t) => {
        if (moment().diff(moment(t.campaign_success),'months') < history) {
          timslots_within_period -= 1
          return false
        } else {
          return t.is_successful
        }
      })).length.toFixed(2)/timslots_within_period.toFixed(2))*100).toFixed(2)
    }else{
      return 0
    }
  }

  venue_booking_success_rate(campaigns,key,history){
    if(Object.keys(campaigns).length > 0){
      var unique_campaigns = this.unique_campaigns(campaigns,key)
      var campaigns_within_period = Object.keys(unique_campaigns).length
      var success = 0
      Object.keys(unique_campaigns).forEach((key) => {
        if (moment().diff(moment(unique_campaigns[key][0].campaign_success),'months') < history) {
          campaigns_within_period -= 1
        }
        else if (unique_campaigns[key][0].is_successful) {
          success += 1
        }
      })
      return campaigns_within_period > 0 ? ((success.toFixed(2)/campaigns_within_period.toFixed(2))*100).toFixed(0) : "0"
    }
  }

  venue_listing_length(campaigns,key,history){
    if(Object.keys(campaigns).length > 0){
      var unique_campaigns = this.unique_campaigns(campaigns,key)
      var totalTime = 0
      var bookings = 0
      Object.keys(unique_campaigns).forEach((key) => {
        if (unique_campaigns[key][0].is_successful && moment().diff(moment(unique_campaigns[key][0].campaign_success),'months') >= history) {
          bookings += 1
          totalTime += moment(unique_campaigns[key][0].campaign_success).diff(moment(unique_campaigns[key][0].timeslot_listed),'days')
        }
      })
      if(bookings > 0){
        return this.round((totalTime/bookings),1)
      } else {
        return "---"
      }
    }
  }

  venue_listing_count(campaigns,key){
    return Object.keys(this.unique_campaigns(campaigns,key)).length
  }

  band_campaign_success_rate(campaigns,history){
    if(campaigns.length > 0){
      var campaigns_within_period = campaigns.length
      var success = 0
      campaigns.forEach((campaign) => {
        if(moment().diff(moment(campaign.campaign_success),'months') < history){
          campaigns_within_period -= 1
        }
        else if (campaign.is_successful) {
          success += 1
        }
      })
      return campaigns_within_period > 0 ? ((success.toFixed(2)/campaigns_within_period.toFixed(2))*100).toFixed(0) : "0"
    }
  }

  band_campaign_lenth(campaigns,history){
    if(campaigns.length > 0){
      var totalTime = 0
      var bookings = 0
      campaigns.forEach((campaign) => {
        if(campaign.is_successful && moment().diff(moment(campaign.campaign_success),'months') >= history){
          bookings += 1
          totalTime += moment(campaign.campaign_success).diff(moment(campaign.campaign_start), 'days')
        }
      })
      if(bookings > 0){
        return this.round((totalTime/bookings),1)
      } else {
        return "---"
      }
    }
  }

  band_pledge_count(pledges){
    if(pledges){
      if(pledges.length > 0){
        var sum = 0
        pledges.forEach((pledge) => {
          if(pledge.is_processed){
            sum += pledge.count
          }
        })
        return sum.toFixed(0)
      }
    } else {
      return "0"
    }
  }

  band_average_ticket_revenue(pledges,campaigns,history){
    if(pledges){
      if(pledges.length > 0){
        var sum = 0.00
        var num_pledges = 0
        pledges.forEach((pledge) => {
          if(pledge.is_processed && moment().diff(moment(campaigns[pledge.campaign].campaign_success),'months') >= history){
            sum += parseFloat(pledge.total)
            num_pledges += pledge.count
          }
        })
        return num_pledges > 0 ? (sum/parseFloat(num_pledges)).toFixed(2) : "0.00"
      }
    } else {
      return "0.00"
    }
  }

  unique_campaigns(campaigns,key){
    var unique_campaigns = {}
    campaigns[key].forEach(c => {
      if(unique_campaigns[c.campaign] == undefined){
        unique_campaigns[c.campaign] = []
      }
      unique_campaigns[c.campaign].push(c)
    })
    return unique_campaigns
  }

  trending_up(oldValue,newValue){
    return (oldValue == newValue || newValue == '---') ? null : (newValue > oldValue || oldValue == '---')
  }

  //Used for metrics where lower numbers are better
  trending_down(oldValue,newValue){
    return (oldValue == newValue || newValue == '---') ? null : (newValue < oldValue || oldValue == '---')
  }

  //Rounds to lowest number of decimals, maximum precision defined by 'decimals'
  round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
}

const mapStateToProps = (state, props) => {
  return {
    campaigns: selectors.selectCampaigns(state, props),
    band_campaigns: selectors.selectBandCampaigns(state, props),
    venue_campaigns: selectors.selectVenueCampaigns(state, props),
    timeslots: selectors.selectTimeslots(state, props),
    pledges: selectors.selectPledges(state, props),
    band_pledges: selectors.selectBandPledges(state, props),
    band: selectors.selectBand(state, props),
    venue: selectors.selectVenue(state, props),
    related_bands: selectors.selectRelatedBands(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSummary: () => {
      dispatch(actions.loadSummary())
    },
    getBand: (id,core_id) => {
      dispatch(actions.getBand(id,core_id))
    },
    getVenue: (id) => {
      dispatch(actions.getVenue(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage)