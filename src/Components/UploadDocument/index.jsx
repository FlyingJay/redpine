import React from 'react'
import styled from 'styled-components'

import { RP_RED } from 'Components' //GLOBALS
import { FileInput } from 'Components'

export class UploadDocument extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  render() {
    const valid_types = this.props.valid_types ? this.props.valid_types : ['PDF','DOC','DOCX','ODT']
    return <FileInput 
            show={false} 
            valid_types={valid_types}
            onChange={(data,filename) => this.onChange(data,filename)} 
            onError={(message, code) => this.onError(message, code)} 
            includeName>
            {
              this.state.error
              ? <Error>{this.state.error}</Error>
              : null
            }
            <UploadButton>
              <i style={{cursor:'pointer', marginRight:'2vmin'}} className="fa fa-plus" />
              {this.props.text}
            </UploadButton>
          </FileInput>
  }

  onChange(data,filename) {
    this.updateState({
      error: null
    })
    this.props.onChange(data,filename)
  }

  onError(message, code) {
    this.updateState({ error: message })
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

export default UploadDocument

const Error = styled.div`
  padding: 1.5vmin;
  color: ${RP_RED};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;
`
const UploadButton = styled.div`
  display: block;
  padding: 1.5vmin;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
