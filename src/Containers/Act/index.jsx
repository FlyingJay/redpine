import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { RP_Act, RP_Organization } from 'Models'

import App from 'Containers/App/index.jsx'
import appSelectors from 'Containers/App/selectors'

import { ConcertsPanel } from 'Containers'

import { RP_BLUE, RP_GREEN, RP_RED, RP_BLACK } from 'Components'
import { ProfilePageWrapper, UpperHeader, UpperHeaderOverlay, HeaderInner, BorderThisPicture, BorderedPicture, ProfileName, 
          ProfileBio, ProfileStats, StatsItem, MajoritySub, MinoritySub, SexiestPanelEver, PanelHeading, PanelContent, MiddleSection } from 'Components' // PROFILE
import { Link } from 'Components' 

import { ActsPanel } from 'Components' // PROFILE/ACTSPANEL
import { ReviewsPanel } from 'Components' // PROFILE/REVIEWSPANEL
import { SocialMediaPanel } from 'Components' // PROFILE/SOACIALMEDIAPANEL

import actions from './actions'
import selectors from './selectors'


const max_display_count = 6;

export class Act extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreConcerts: false
    }
    
    if(this.props.match.params.actId){
      this.props.loadBand(this.props.match.params.actId)
      this.props.loadCampaigns(this.props.match.params.actId)
      this.props.loadRelatedBands(this.props.match.params.actId)
    }
  }

  render() {
    const user            = this.props.user
    const profile         = user && this.props.user.profile || null
    const is_artist       = profile && profile.is_artist || false
    const is_venue        = profile && profile.is_venue || false

    const act             = this.props.act
    const _Act            = RP_Act(act)

    const campaigns       = this.props.campaigns || []
    const campaigns_count = campaigns.length
    const act_has_shows   = (campaigns_count > 0)

    const is_socan        = false // Will be set variably once API work is done

    const related_bands       = (this.props.related_bands || []).filter((band) => (band.core_id != 1022)) // Exclude the 'RedPine Presents' account.
    const related_bands_count = related_bands ? related_bands.length : 0

    const act_has_performed   = (related_bands_count > 0)

    let reviews = []
    reviews = reviews.concat(act && is_artist ? act.reviews_by_bands : [])
    reviews = reviews.concat(act && is_venue ? act.reviews_by_venues : [])

    const has_reviews = (reviews.length > 0)

    return <App>
            <ProfilePageWrapper>
              {/* LOAD UPPER HEADER */}
              {
                act
                ? <UpperHeader background={_Act.picture}>
                    <UpperHeaderOverlay>
                      <HeaderInner>
                        <BorderThisPicture>
                          <BorderedPicture pic={_Act.picture} />
                        </BorderThisPicture>
                        <ProfileName is_featured={_Act.is_featured}>
                          <span>{_Act.name}</span>
                          {
                            _Act.is_featured
                            ? <i className="fa fa-check-circle" title={'We love ' + _Act.name}/>
                            : <i className="fa fa-info-circle" title="No activity"/>
                          }
                        </ProfileName>
                        <ProfileBio>
                          {_Act.shortBio()}
                        </ProfileBio>
                        <ProfileBio style={{fontWeight:'bold',marginTop:'0.75vmin'}}>
                          <i className="fa fa-music"/>&nbsp;&nbsp;
                          {_Act.genre_string}
                        </ProfileBio>
                        <ProfileStats>
                          <StatsItem>
                            <i className="fa fa-calendar-check-o" />
                            <span>{(campaigns_count === 1) ? '1 RedPine show' : (campaigns_count + ' RedPine shows')}</span>
                          </StatsItem>
                        </ProfileStats>
                      </HeaderInner>
                    </UpperHeaderOverlay>
                  </UpperHeader>
                : null
              }
              {
                act
                ? <MiddleSection>
                    <MajoritySub>
                      {/* ACT'S PERFORMED SHOWS */}
                      <ConcertsPanel is_act
                        title={`${_Act.name}'s Concerts`}
                        entity={act}
                        entity_has_shows={act_has_shows}
                        campaigns={campaigns}
                        campaigns_count={campaigns_count}
                        max_display_count={max_display_count}
                        is_expanded={this.state.showMoreConcerts}
                        onClickExpand={() => this.updateState({showMoreConcerts: true})}/>

                      {/* RECOMMENDED ACTS */}
                      <ActsPanel 
                        title={`Like ${_Act.name}?  You might enjoy these other artists..`}
                        null_message={`${_Act.name} has not yet played enough RedPine shows`}
                        acts={related_bands} 
                        acts_count={related_bands_count}
                        act_has_performed={act_has_performed}
                        is_expanded={true} 
                        onClickExpand={null} />
                    </MajoritySub>
                    <MinoritySub>
                      <SendMessageButton owner={_Act.owner}/> 

                      {/* BANDS FULL BIO */}
                      <SexiestPanelEver>
                        <PanelHeading color={RP_GREEN}>
                          <i className="fa fa-newspaper-o" />
                          <span>Full bio</span>
                        </PanelHeading>
                        <PanelContent>
                          {
                            _Act.short_bio
                            ? <span>{_Act.short_bio}</span>
                            : <span>{_Act.name} has not added a bio.</span>
                          }
                        </PanelContent>            
                      </SexiestPanelEver>

                      {/* Partners - WIP */}
                      <SexiestPanelEver>
                        <PanelHeading color={RP_BLUE}>
                          <i className="fa fa-users" />
                          <span>Memberships</span>
                        </PanelHeading>
                        <PanelContent>
                          { _Act.is_organization_member
                            ? _Act.organizations.map(act_organization => {
                                const _Organization = RP_Organization(act_organization.organization)
                                if(act_organization.is_accepted && act_organization.is_application){
                                  return <Link href={paths.organizations(_Organization.id)}>
                                          <Thumb image={_Organization.badge}/>
                                         </Link>
                                }
                              })
                            : <span>{_Act.name} has not been confirmed by any partner organizations.</span> }
                        </PanelContent>
                      </SexiestPanelEver>

                      {/* REVIEWS */}
                      <ReviewsPanel
                        name={_Act.name}
                        reviews={reviews}
                        has_reviews={has_reviews}
                        is_visible={has_reviews && is_artist}
                        null_message={`${_Act.name} has not been reviewed.`}/>

                      {/* ACT'S SOCIALS */}
                      <SocialMediaPanel entity={act}/>
                    </MinoritySub>
                  </MiddleSection>
                : null
              }
            </ProfilePageWrapper>
          </App>
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.actId

    if (id != RP_Act(nextProps.act).id) {
      this.props.loadBand(id)
      this.props.loadCampaigns(id)
      this.props.loadRelatedBands(id)
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    act: selectors.selectBand(state, props),
    act_loading: selectors.selectBandLoading(state, props),
    campaigns: selectors.selectCampaigns(state, props),
    related_bands: selectors.selectRelatedBands(state, props),
    user: appSelectors.selectUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBand: (id) => {
      dispatch(actions.loadBand(id))
    },
    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    },
    loadRelatedBands: (id) => {
      dispatch(actions.loadRelatedBands(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Act)

const SocanLogo = styled.img`
  position: relative;
  display: inline-block;

  width: 79px;
  height: 30px;
`
const SendMessageButton = ({owner}) => (
  <Link href={`${paths.messageUser(owner)}`}>
    <BookNow color={RP_BLUE}>
      <i className="fa fa-envelope"/>&nbsp;&nbsp;
      SEND MESSAGE
    </BookNow>
  </Link> 
)

const BookNow = styled.div`
  width: 100%;
  background: ${props => props.color || RP_RED};
  color: #FFF;
  padding: 2vmin 0;
  margin: 0 0 2vmin 0;
  text-align: center;
  font-size: 2vmin;
  font-weight: bold;
  transition: 0.25s all ease;

  &:hover {
    background: ${RP_GREEN};
    cursor: pointer;
  }
`
const Thumb = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 10vmin;
  width: 10vmin;
  margin-right: 2vmin;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.image ? props.image : '/Assets/images/defaults/default-thumb.png'});
  border-radius: 3px;
`