import React from 'react'
import styled from 'styled-components'

import { RP_Campaign } from 'Models'
import { RP_BLACK, RP_SUPER_LIGHT, RP_DARK_GREY, Clear, TopRight } from 'Components' // GLOBALS


export class OpeningPreview extends React.PureComponent {

  render() {
    const opening = this.props.opening

    return (
      <Container onClick={() => this.props.onClick()}>
        <Info>
          <Heading>{opening.title}</Heading>
          <SubHeading style={{paddingTop: '1.5vmin'}}>
            {opening.extra_details}
          </SubHeading>
        </Info>
        { this.props.edit
          ? <TopRight><i className="fa fa-pencil"/></TopRight>
          : null }
      </Container>
    )
  }
}

const Container = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  height: auto;
  width: 50vmin;
  padding: 1vmin;
  color: #494949;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2vmin;
  background: '#FFF';
  border-radius: 0.5vmin;
  text-align: left;

  &:hover {
    background: ${RP_SUPER_LIGHT};
  }
`
const Info = styled.div`
  white-space: pre-wrap;
`
const Heading = styled.div`
  display: block;
  position: relative;
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 2vmin;
  font-weight: bold;
  color: ${RP_BLACK};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`
const SubHeading = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  color: ${RP_DARK_GREY};
  font-family: 'Open Sans',Helvetica,Arial;
  font-size: 1.8vmin;
  pointer-events: none;
`