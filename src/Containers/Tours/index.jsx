import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { MyPageWrapper, Bold, RP_PINK, RP_BLUE, RP_GREEN, SPOTIFY_GREEN } from 'Components' // GLOBALS
import { InfoBanner, SpecialRedPineHeading, NoDataFound } from 'Components' // MY
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { WarningModal } from 'Components' // MODAL
import { FormButton } from 'Components' // BUTTON
import { Link } from 'Components' // LINK

import { TourSummary } from './TourSummary/index.jsx'
import { TourModal } from './TourModal/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class Tours extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      add_id: null,
      delete_id: null,
      show_delete_warning: false,
      show_create_tour:false
    }
	}

  render() {
    const tours_loading = this.props.tours_loading || false
    const campaigns     = this.props.campaigns || []
    const tours         = this.props.tours || []

    const has_tours     = (tours.length > 0)

    return <App requireAuth artistPage>
            <MyPageWrapper>
              <InfoBanner title="Get on the road!" image="/Assets/images/background/ztranish.png" background={RP_BLUE}>
                Manage your tours and create new ones!
                <br/>
                It's as easy as adding shows to an existing tour, or removing one that has been underperforming.
                <br/><br/>
                <Bold>Bookings will be approved independently of one another.</Bold>
              </InfoBanner>
              <div style={{textAlign:'right'}}>
                <Button onClick={() => this.updateState({show_create_tour:true})}>
                  <i className="fa fa-plane"></i>
                  &nbsp;&nbsp;
                  <span>Start a Tour!</span>
                </Button>
              </div>
              <LoadingIndicator loading={tours_loading}>
                {
                  has_tours
                  ? tours.map((tour,i) => <TourSummary 
                                            key={`Tour_${i}`} 
                                            tour={tour}
                                            campaigns={campaigns[i]}
                                            removeCampaign={(delete_id) => this.updateState({delete_id:delete_id,show_delete_warning:true})}/>)
                  : <NoDataFound>
                      You don't have any active tours.&nbsp;&nbsp;
                      <Link onClick={() => this.updateState({show_create_tour:true})} style={{fontWeight:'bold'}}>
                        Create one to get started!
                      </Link>
                    </NoDataFound>
                }
              </LoadingIndicator>
            </MyPageWrapper>
            <TourModal 
              is_visible={this.state.show_create_tour}
              createTour={(data) => this.createTour(data)}
              onClose={() => this.updateState({show_create_tour:false})}/>
            <WarningModal
              show={this.state.show_delete_warning}
              description="You are about to remove this show from the tour! To permanently delete it, visit My Shows."
              onContinue={() => this.removeCampaign()}
              onClose={() => this.updateState({show_delete_warning:false})}/>
          </App>
  }

  createTour(data){
    const tour = {
      title: data.title,
      headliner: this.props.match.params.actId,
      created_by: this.props.user.id
    }
    this.props.createTour(tour)
  }

  swapCampaign(){
    this.props.swapCampaign(this.state.add_id, this.state.delete_id)
    this.updateState({show_swap_warning:false})
  }

  removeCampaign(){
    this.props.removeCampaign(this.state.delete_id)
    this.updateState({show_delete_warning:false})
  }

  componentDidMount(){
    this.props.loadData()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    act: selectors.selectAct(state,props),
    tours_loading: selectors.selectToursLoading(state,props),
    campaigns: selectors.selectCampaigns(state,props),
    tours: selectors.selectTours(state,props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(actions.loadData())
    },
    createTour: (tour) => {
      dispatch(actions.createTour(tour))
    },
    swapShow: (campaign) => {
      dispatch(actions.swapShow(campaign))
    },
    removeCampaign: (campaign) => {
      dispatch(actions.removeCampaign(campaign))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tours)

const Button = styled(FormButton)`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 0.5vmin;
  background: ${RP_GREEN};
  color: #FFF;

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`