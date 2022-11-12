import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'
import { RP_Campaign } from 'Models'

import { RP_SUPER_LIGHT, RP_BLACK, RP_PINK } from 'Components' //GLOBALS
import { Link } from 'Components' //LINK


export class EditCampaign extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const _Campaign     = RP_Campaign(this.props.campaign)
    const user_is_owner = _Campaign.userIsOwner(this.props.user)

    return  user_is_owner
            ? <Link linkComponent={EditButton} href={paths.showHub(_Campaign.id)}>
                To edit these details, check the show hub
                &nbsp;&nbsp;<i className="fa fa-arrow-right" style={{textAlign:'right'}} />
              </Link>
            : null
  }
}

const EditButton = styled.div`
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  background: ${RP_SUPER_LIGHT}
  color: ${RP_BLACK};
  font-size: 2.2vmin;
  text-align: center;
  border-bottom: 1px solid #FFF;
  transition: 0.25s all ease;

  &:hover {
    background: ${(props) => props.disabled ? RP_SUPER_LIGHT : RP_PINK};
    color: ${(props) => props.disabled ? RP_BLACK : '#FFF'};
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    font-size: 3vmin;
    line-height: 8vmin;
  }
`