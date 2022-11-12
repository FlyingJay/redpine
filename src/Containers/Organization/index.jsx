import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'
import { RP_Organization } from 'Models'

import { App, ConcertsPanel } from 'Containers'

import { RP_RED, RP_BLUE, RP_GREEN } from 'Components' // GLOBALS 
import { ProfilePageWrapper, UpperHeader, UpperHeaderOverlay, HeaderInner, BorderThisPicture, BorderedPicture, 
          ProfileName, ProfileBio, ProfileStats, StatsItem, MiddleSection, MajoritySub, MinoritySub, SexiestPanelEver, 
          PanelHeading, PanelContent } from 'Components' // PROFILE
import { Markdown } from 'Components' 
import { Link } from 'Components' 

import { ActsPanel } from 'Components' // PROFILE/ACTSPANEL
import { MapPanel } from 'Components' // PROFILE/MAPPANEL
import { SocialMediaPanel } from 'Components' // PROFILE/SOCIALMEDIAPANEL

import actions from './actions'
import selectors from './selectors'


const max_display_count = 6;

export class Organization extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      showMoreArtists: false,
      showMoreConcerts: false
    }
  }

  render() {
    const campaigns              = this.props.campaigns 
    const campaigns_count        = campaigns && campaigns.length
    const organization_has_shows = (campaigns_count > 0)

    const acts              = this.props.acts
    const acts_count        = acts && acts.length || 0
    const act_has_performed = (acts_count > 0)
    
    const organization      = this.props.organization
    const _Organization     = RP_Organization(organization)

    return (
      <App>
        <ProfilePageWrapper>
          {
            organization
            ? <UpperHeader background={_Organization.picture}>
                <UpperHeaderOverlay>
                  <HeaderInner>
                    <BorderThisPicture>
                      <BorderedPicture pic={_Organization.picture} />
                    </BorderThisPicture>
                    <ProfileName>
                      <span>{_Organization.title}</span>
                    </ProfileName>
                    <ProfileBio>
                      <i className="fa fa-map-marker" />&nbsp;&nbsp;
                      {_Organization.address_string}.
                    </ProfileBio>
                    <ProfileStats>
                      <StatsItem>
                        <i className="fa fa-calendar-check-o" />
                        <span>
                          {
                            campaigns_count === 1 
                            ? (campaigns_count + ' concert') 
                            : (campaigns_count + ' concerts')
                          }
                        </span>
                      </StatsItem>
                    </ProfileStats>
                  </HeaderInner>
                </UpperHeaderOverlay>
              </UpperHeader>
            : null
          }
          {
            organization
            ? <MiddleSection>
                <MajoritySub>

                  {/* ORGANIZATION FULL BIO */}
                  <SexiestPanelEver>
                    <PanelHeading color={RP_GREEN}>
                      <i className="fa fa-newspaper-o" />
                      <span>Full bio</span>
                    </PanelHeading>
                    <PanelContent>
                      <Markdown text={_Organization.description || (_Organization.title + " has not yet uploaded a bio.") }/>
                    </PanelContent>            
                  </SexiestPanelEver>

                  {/* CONCERTS WITH THIS ORGANIZATION */}
                  <ConcertsPanel is_organization
                    title={`Shows with ${_Organization.title}`}
                    entity={organization}
                    entity_has_shows={organization_has_shows}
                    campaigns={campaigns}
                    campaigns_count={campaigns_count}
                    max_display_count={max_display_count}
                    is_expanded={this.state.showMoreConcerts}
                    onClickExpand={() => this.updateState({showMoreConcerts: true})}/>

                </MajoritySub>
                <MinoritySub>
                  <SendMessageButton manager={_Organization._Manager.id}/> 

                  {/* GOOGLE MAPS */}
                  <MapPanel address_string={_Organization.address_string} location={_Organization.location} />

                  {/* ACTS PERFORMED AT THIS VENUE */}
                  <ActsPanel 
                    title={`Upcoming Performers`}
                    null_message={`No upcoming shows with ${_Organization.title}`}
                    acts={acts} 
                    acts_count={acts_count}
                    act_has_performed={act_has_performed}
                    is_expanded={this.state.showMoreArtists} 
                    onClickExpand={() => this.updateState({showMoreArtists: true})} />

                  {/* VENUE'S SOCIALS */}
                  <SocialMediaPanel entity={organization}/>
                </MinoritySub>
              </MiddleSection>
            : null
          } 
        </ProfilePageWrapper>
      </App>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  loadData() {
    const id = this.props.match.params.organizationId
    this.props.loadOrganization(id)
    this.props.loadCampaigns(id)
  }

  componentDidMount() {
    this.loadData()
  }
}

const mapStateToProps = (state, props) => {
  return {
    organization: selectors.selectOrganization(state, props),
    campaigns: selectors.selectCampaigns(state, props),
    acts: selectors.selectActs(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrganization: (id) => {
      dispatch(actions.loadOrganization(id))
    },
    loadCampaigns: (id) => {
      dispatch(actions.loadCampaigns(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization)

const SendMessageButton = ({manager}) => (
  <Link href={`${paths.messageUser(manager)}`}>
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