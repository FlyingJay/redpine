import React from 'react'
import styled from 'styled-components'

import { RP_WHITE, RP_DARK_GREY } from 'Components'

import { MAX_UPLOAD_SIZE, MAX_MUSIC_UPLOAD_SIZE } from 'globals'

/*
THIS IS A FUNCTIONAL COMPONENT TO HANDLE RETRIEVING DATA FROM FILES
*/

const FILE_TYPES = {
  PNG:'image/png',
  JPEG:'image/jpeg',
  GIF:'image/gif',
  MPEG3:'audio/mpeg3',
  XMPEG3:'audio/x-mpeg3',
  MP3:'audio/mp3',
  XMP3:'audio/x-mp3',
  PDF:'application/pdf',
  DOC:'application/msword',
  DOCX:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ODT:'application/vnd.oasis.opendocument.text'
}

class FileInput extends React.PureComponent {
  static ERROR_CODES = {
    TOO_BIG: 'TOO_BIG',
    INVALID_TYPE: 'INVALID_TYPE'
  }

  handleFile(e) {
    if (!this.props.musicOnly && e.total > MAX_UPLOAD_SIZE) {
      this.props.onError(`The file you're trying to upload is too big.  Maximum file size is ${ MAX_UPLOAD_SIZE / 1000000 }MB.`, FileInput.ERROR_CODES.TOO_BIG)
    } 
    else if (this.props.musicOnly && e.total > MAX_MUSIC_UPLOAD_SIZE){
      this.props.onError(`The file you're trying to upload is too big.  Maximum file size is ${ MAX_MUSIC_UPLOAD_SIZE / 1000000 }MB.`, FileInput.ERROR_CODES.TOO_BIG)
    }
    else if (this.props.includeName) {
      this.props.onChange(e.target.result, e.target.filename)
    }
    else {
      this.props.onChange(e.target.result)
    }
  }

  typeError(valid_extensions) {
    let error_string = 'We only accept '
    valid_extensions.forEach((extension,i) => {
      i == (valid_extensions.length - 1)
      ? error_string += 'and .' + extension + ' files at this time.'
      : error_string += '.' + extension + ', '
    })
    this.props.onError(error_string, FileInput.ERROR_CODES.INVALID_TYPE)
  }

  isValidType(file) {
    const valid_mime_types = []
    const valid_extensions = []
    const valid_types = this.props.valid_types || []

    valid_types.forEach(type => {
      if(FILE_TYPES[type]){
        valid_mime_types.push(FILE_TYPES[type])
        valid_extensions.push(type)
      }
    })

    const uploaded_type = file.type
    if(valid_mime_types.indexOf(uploaded_type) === -1){
      this.typeError(valid_extensions)
      return false
    }
    
    return true
  }

  readFile(file) {
    if (!this.isValidType(file)) return

    var reader = new FileReader()
    reader.onload = this.handleFile.bind(this)
    reader.filename = file.name
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <FileInputContainer disabled={this.props.disabled} onClick={() => {
        if (this.props.disabled) return
        this.fileInput.click()
      }}>
        {this.props.children}
        <input ref={(self) => this.fileInput = self} style={{display: 'none'}} type="file" onChange={(e) => {
          this.readFile(e.target.files[0])
          e.target.value = null
        }} />
      </FileInputContainer>
    )
  }
}

export default FileInput

const FileInputContainer = styled.div`
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`