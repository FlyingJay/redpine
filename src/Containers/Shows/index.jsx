import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'
import { CAMPAIGN_STATUS } from 'enums'

import { RP_Campaign } from 'Models'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_GREEN, SPOTIFY_GREEN, RP_ORANGE, RP_DARKORANGE, RP_RED, RP_PINK, RP_BLACK, RP_BLUE, RP_DARKBLUE, RP_SUPER_LIGHT, RP_GREY, MyPageWrapper, Bold } from 'Components' // GLOBALS
import { NoDataFound } from 'Components' // MY
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { FormButton, ListTile  } from 'Components' // BUTTON
import { ShowResult } from 'Components' 
import { Title } from 'Components' 
import { Link } from 'Components'

import { DeleteModal } from './DeleteModal/index.jsx'

import selectors from './selectors'
import actions from './actions'


const INVITATION = 0
const UNDER_VENUE_REVIEW = 1
const CONFIRMED = 3
const PAST = 4

export class Shows extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: null,
      tab: null
    }
	}

  render() {
    const campaigns_loading = this.props.campaigns_loading || false
    const campaigns         = this.props.campaigns || []
    const user              = this.props.user || null
    const user_id           = user && user.id || null

    return <App requireAuth artistPage>
            <MyPageWrapper>
              { this.state.tab !== null
                ? <ShowActions>
                    <FormButton onClick={() => this.updateState({tab:null})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT} bold>
                      <Bold><i className="fa fa-arrow-left"/>&nbsp;&nbsp;CATEGORIES</Bold>
                    </FormButton>
                  </ShowActions>
                : null }

              {{  [null]: <Title title='My Shows' summary="Select any show to track it's progress, chat with participants, and edit details" />,
            [INVITATION]: <Title title='Invitations' summary="Everywhere you've been invited to play"/>,
    [UNDER_VENUE_REVIEW]: <Title title='Awaiting Venue Approval' summary="Approval for new shows may take up to 24 hours, so check back regularly!  RedPine may contact you via email regarding your request."/>,
             [CONFIRMED]: <Title title='Active Shows' summary="Tickets and/or RSVPs are now open to the public"/>,
                  [PAST]: <Title title='History' summary="Your complete performance history on RedPine"/>
              }[this.state.tab]}

              {{  [null]: <div>
                            <ListTile width="50%" background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} 
                                      onClick={() => { this.props.loadInvitations()
                                                       this.updateState({tab:INVITATION}) }}>
                              <i className="fa fa-calendar-plus-o"/>
                              <div>Invitations</div>
                            </ListTile>
                            <ListTile width="50%" background={RP_ORANGE} hoverBackground={RP_DARKORANGE} 
                                      onClick={() => { this.props.loadPending()
                                                       this.updateState({tab:UNDER_VENUE_REVIEW}) }}>
                              <i className="fa fa-pause"/>
                              <div>Pending Shows</div>
                            </ListTile>
                            <ListTile width="50%" background={RP_RED} hoverBackground={RP_PINK} 
                                      onClick={() => { this.props.loadActive()
                                                       this.updateState({tab:CONFIRMED}) }}>
                              <i className="fa fa-ticket"/>
                              <div>Active Shows</div>
                            </ListTile>
                            <ListTile width="50%" background={RP_BLUE} hoverBackground={RP_DARKBLUE} 
                                      onClick={() => { this.props.loadHistory()
                                                       this.updateState({tab:PAST}) }}>
                              <i className="fa fa-history"/>
                              <div>History</div>
                            </ListTile>
                          </div>,

            [INVITATION]: <ShowList 
                            shows={campaigns}
                            loading={campaigns_loading}
                            empty_message="You haven't been invited to any shows yet. "
                            play_link/>,
    [UNDER_VENUE_REVIEW]: <ShowList 
                            shows={campaigns}
                            loading={campaigns_loading}
                            empty_message="You have no shows currently awaiting confirmation by a venue."
                            play_link
                            user_id={user_id}
                            onDelete={(id,title) => this.updateState({id,title})}
                            errorMessage={this.props.errorMessage}/>,
             [CONFIRMED]: <ShowList 
                            shows={campaigns}
                            loading={campaigns_loading}
                            empty_message="You don't have any shows currently active."
                            play_link/>,
                  [PAST]: <ShowList 
                            shows={campaigns}
                            loading={campaigns_loading}
                            empty_message="You haven't played any shows."
                            play_link/>

              }[this.state.tab]}
            </MyPageWrapper>
            <DeleteModal 
              title={this.state.title}
              onDelete={() => this.deleteCampaign(this.state.id)}
              onClose={() => this.updateState({title: null})}/>
          </App>
  }

  deleteCampaign(id){
    this.props.deleteCampaign(id,this.state.tab)
    this.updateState({title:null})
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
    campaigns_loading: selectors.selectCampaignsLoading(state,props),
    campaigns: selectors.selectCampaigns(state, props),
    error: selectors.selectError(state,props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInvitations: () => {
      dispatch(actions.loadInvitations())
    },
    loadPending: () => {
      dispatch(actions.loadPending())
    },
    loadActive: () => {
      dispatch(actions.loadActive())
    },
    loadHistory: () => {
      dispatch(actions.loadHistory())
    },
    deleteCampaign: (campaign,category) => {
      dispatch(actions.deleteShow(campaign,category))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    },
    campaignError: (error) => {
      dispatch(actions.showError(error))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shows)


const ShowList = ({shows,loading,empty_message,play_link,user_id,onDelete,errorMessage}) => {
  return <LoadingIndicator loading={loading} is_child_visible={shows.length > 0}>
          { shows.length === 0
            ? <NoShows text={empty_message} play_link={play_link}/>
            : shows.map(campaign => campaign.created_by == user_id 
                                     ? <ShowResult 
                                        key={campaign.id} 
                                        campaign={campaign} 
                                        onDelete={() => onDelete(campaign.id, campaign.title)}
                                        errorMessage={errorMessage}
                                        can_delete/>
                                     : <ShowResult 
                                        key={campaign.id} 
                                        campaign={campaign}/>) }
         </LoadingIndicator>
  }
  
const NoShows = ({text,play_link}) => <NoDataFound>
                                        {text}&nbsp;&nbsp;
                                        { play_link
                                          ? <Link href={paths.showCreate()} style={{fontWeight:'bold'}}>
                                              Play one!
                                            </Link>
                                          : null }
                                      </NoDataFound>

const ShowActions = styled.div`
  display: block;
  padding-bottom: 2vmin;
`