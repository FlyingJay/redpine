import React from 'react'
import styled from 'styled-components'

import { RP_RED, RP_PINK, RP_SUPER_LIGHT } from 'Components' // GLOBALS

const ActWrap = styled.div`
  display: block;
  position: relative;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
  margin-bottom: 1vmin;
`
const Name = styled.div`
  display: block;
  text-align: left;
  font-size: 2.3vmin;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const Status = styled.div`
  display: block;
  text-align: left;
  font-size: 1.8vmin;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0.25vmin;
`
const Action = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 5vmin;
  line-height: 5vmin;
  text-align: center;
  background: ${RP_PINK};
  color: #FFF;

  &:hover {
    cursor: pointer;
    background: ${RP_RED};
  }
`

export class ActItem extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const act = this.props.act || null
    const is_user = this.props.is_user || false
    const onClick = this.props.onClick

    return (
      <ActWrap>
        <Name>{act.name}</Name>
        <Status>
          {
            is_user
            ? ''
            : act.is_redpine 
              ? '*Pending acceptance' 
              : '*Pending sign-up'
          }
        </Status>
        {
          is_user
          ? null
          : <Action onClick={() => onClick()}>
              <i className="fa fa-times"/>
            </Action>
        }
      </ActWrap>
    )
  }
}