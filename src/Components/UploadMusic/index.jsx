import React from 'react'
import styled from 'styled-components'

import { RP_RED, RP_LIGHTGREY } from 'Components' //GLOBALS
import { FileInput } from 'Components'


export class UploadMusic extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  onChange(data) {
    this.updateState({
      error: null
    })
    this.props.onChange(data)
  }

  onError(message, code) {
    this.updateState({ error: message })
  }

  render() {
    return (
      <FileInput 
        show={false} 
        valid_types={['MPEG3','XMPEG3','MP3','XMP3']}
        onChange={(data) => this.onChange(data)} 
        onError={(message, code) => this.onError(message, code)}>
        <Error>{this.state.error}</Error>
        <UploadButton>
          <i style={{cursor: 'pointer', fontSize: '2.7vmin', marginRight:'2vmin'}} className="fa fa-music" />
          {this.props.text}
        </UploadButton>
      </FileInput>
    )
  }
}

export default UploadMusic

const Error = styled.div`
  padding: 0 0 1.5vmin 0;
  color: ${RP_RED};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;
`
const UploadButton = styled.div`
  display: block;
  padding: 1.5vmin;
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${RP_LIGHTGREY};
  }
`