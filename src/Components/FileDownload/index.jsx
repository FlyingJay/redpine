import React from 'react'
import styled from 'styled-components'
import { saveAs } from 'file-saver/FileSaver'

/*
THIS IS A FUNCTIONAL COMPONENT TO HANDLE DOWNLOADING FILES FROM OUR SERVER
*/

const FileInputContainer = styled.div`
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

class FileDownload extends React.PureComponent {
  static ERROR_CODES = {
    NO_LINK: 'NO_LINK',
    REJECTED: 'REJECTED',
    NO_FILE: 'NO_FILE'
  }

  render() {
    return (
      <FileInputContainer disabled={this.props.disabled} onClick={() => {
        if (this.props.disabled) return

        this.props.url 
        ? this.downloadFile(this.props.url)
        : this.props.onError('No link isn\'t attached to a URL', FileDownload.ERROR_CODES.NO_LINK)
        
        }}>
        {this.props.children}
      </FileInputContainer>
    )
  }

  downloadFile(url){
    const request = this.createCORSRequest("GET", url)
    if(!request){
      this.props.onError('Request refused by file server.', FileDownload.ERROR_CODES.REJECTED)
    }
    else{
      request.responseType = "blob" 
      request.onload = function() {
        if (this.status == 200) {
          saveAs(this.response)
        }
      }
      request.onerror = function() {
        this.props.onError('The file was not found on the server.', FileDownload.ERROR_CODES.NO_FILE)
      }
      request.send();
    }
  }

  // Create the XHR object.
  createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }
}

export default FileDownload