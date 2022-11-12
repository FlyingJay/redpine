import React from 'react'
import styled from 'styled-components'

import { RP_PINK, RP_RED, RP_GREEN, SPOTIFY_GREEN, RP_SUPER_LIGHT } from 'Components' //GLOBALS
import { FormButton } from 'Components' //BUTTON


export class SelectedAct extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const selected               = this.props.selected
    const id                     = this.props.id
    const name                   = this.props.name
    const short_bio              = this.props.short_bio
    const hometown               = this.props.hometown || null
    const hometown_name          = hometown && hometown.name || ''
    const hometown_province      = hometown && hometown.province || ''
    const hometown_province_name = hometown_province && hometown_province.name || ''

    const hometown_string        = hometown && (hometown_name + ', ' + hometown_province_name) || ''

    return (
      <Wrap>
        <Name>{name}</Name>
        <Bio>{short_bio}</Bio>
        <TwoColumn>
          <Hometown>{hometown_string}</Hometown>
        </TwoColumn>
        <TwoColumn>
        {
          selected
          ? <RemoveButton onClick={() => this.props.remove()}>
              <i className="fa fa-times"/>
              &nbsp;&nbsp;Remove
            </RemoveButton>
          : <AddButton onClick={() => this.add()}>
              <i className="fa fa-plus"/>
              &nbsp;&nbsp;Add
            </AddButton>
        }
        </TwoColumn>
      </Wrap>
    )
  }

  add() {
    const new_act = {
      id: this.props.id,
      name: this.props.name,
      short_bio: this.props.short_bio,
      hometown: this.props.hometown
    }
    this.props.add(new_act)
  }
}

const Wrap = styled.div`
  position: relative;
  margin-bottom: 1vmin;
  padding: 1vmin;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
`
const Name = styled.div`
  text-align: left;
  font-weight: bold;
  fontSize: 2.5vmin;
`
const Bio = styled.div`
  text-align: left;
  font-size: 2vmin;
  padding: 0.5vmin;
`
const Hometown = styled.div`
  text-align: left;
  fontStyle: italic;
  fontSize: 2vmin;
`
const RemoveButton = styled(FormButton)`
  position: relative;
  width: auto;
  background: ${RP_PINK};

  &:hover {
    background: ${RP_RED};
  }
`
const AddButton = styled(FormButton)`
  position: relative;
  width: auto;
  background: ${RP_GREEN};

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`
const TwoColumn = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align:bottom;
  text-align: right;
`