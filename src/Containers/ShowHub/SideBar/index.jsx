import React from 'react'
import styled from 'styled-components'

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { RP_RED } from 'Components'//GLOBALS


export class SideBar extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <SideNav onSelect={this.props.onSelect}>
        <SideNav.Nav defaultSelected="details" style={{paddingTop:'64px'}}>
          <NavItem eventKey="checklist">
            <NavIcon>
              <i className="fa fa-fw fa-check-square-o" style={{fontSize:'1.75em'}}/>
              <NavLabel>Checklist</NavLabel>
            </NavIcon>
            <NavText>
              Checklist
            </NavText>
          </NavItem>
          <NavItem eventKey="details">
            <NavIcon>
              <i className="fa fa-fw fa-info-circle" style={{fontSize:'1.75em'}}/>
              <NavLabel>Show Info</NavLabel>
            </NavIcon>
            <NavText>
              Show Details
            </NavText>
          </NavItem>
          <NavItem eventKey="guest_list">
            <NavIcon>
              <i className="fa fa-fw fa-list" style={{fontSize:'1.75em'}}/>
              <NavLabel>Attendees</NavLabel>
            </NavIcon>
            <NavText>
              Attendees
            </NavText>
          </NavItem>
          <NavItem eventKey="tickets">
            <NavIcon>
              <i className="fa fa-fw fa-ticket" style={{fontSize:'1.75em'}}/>
              <NavLabel>Tickets</NavLabel>
            </NavIcon>
            <NavText>
              Tickets
            </NavText>
          </NavItem>
          <NavItem eventKey="promotion">
            <NavIcon>
              <i className="fa fa-fw fa-users" style={{fontSize:'1.75em'}}/>
              <NavLabel>Promotion</NavLabel>
            </NavIcon>
            <NavText>
              Promotion
            </NavText>
          </NavItem>
          <NavItem eventKey="chat">
            <NavIcon>
              <i className="fa fa-fw fa-comments-o" style={{fontSize:'1.75em'}}/>
              <NavLabel>Chat</NavLabel>
            </NavIcon>
            <NavText>
              Chat
            </NavText>
          </NavItem>
          <NavItem eventKey="documents">
            <NavIcon><i className="fa fa-fw fa-book" style={{fontSize:'1.75em'}}/>
              <NavLabel>
                Docs
              </NavLabel>
            </NavIcon>
            <NavText>
              Documents
            </NavText>
          </NavItem>
          <NavItem eventKey="links">
            <NavIcon>
              <i className="fa fa-fw fa-link" style={{fontSize:'1.75em'}}/>
              <NavLabel>Links</NavLabel>
            </NavIcon>
            <NavText>
              Links
            </NavText>
            <NavItem eventKey="links/show">
              <NavText>
                <i className="fa fa-ticket"/>&nbsp;&nbsp;Ticketing Page
              </NavText>
            </NavItem>
            { this.props.show_venue_link
              ? <NavItem eventKey="links/venue">
                  <NavText>
                    <i className="fa fa-home"/>&nbsp;&nbsp;Venue Information
                  </NavText>
                </NavItem>
              : null }
          </NavItem>
          {
            this.props.is_owner
            ? <NavItem eventKey="actions">
                <NavIcon>
                  <i className="fa fa-fw fa-cogs" style={{fontSize:'1.75em'}}/>
                  <NavLabel>Actions</NavLabel>
                </NavIcon>
                <NavText>
                  Actions
                </NavText>
                <NavItem eventKey="actions/delete">
                  <NavText>
                    <i className="fa fa-times" style={{color:RP_RED}}/>&nbsp;  
                    Delete Show
                  </NavText>
                </NavItem>
              </NavItem>
              : null
          }
        </SideNav.Nav>
      </SideNav>
    );
  }
}

const NavLabel = styled.div`
  position: absolute;
  bottom: -16px;
  font-size: 1.5vmin;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 1.7vmin;    
  }
`