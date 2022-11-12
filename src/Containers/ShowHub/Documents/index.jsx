import React from 'react'
import styled from 'styled-components'

import { RP_GREEN, RP_DARKBLUE, RP_BLUE, RP_LIGHTGREY } from 'Components' //GLOBALS
import { UploadDocument } from 'Components' //UPLOADDOCUMENT
import { FileDownload } from 'Components' //FILEDOWNLOAD

import { Heading } from './../Heading/index.jsx'

export class Documents extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const documents = this.props.documents || []

    return (
      <DocumentsWrap>
        <Heading text="Documents" icon="fa fa-book"/>
        {
          documents.map(doc => {
            const label = doc.name || 'Doc ' + doc.id
            return <DocumentWrap key={doc.id}>
                    <FileDownload url={doc.document}>
                      <Document>
                        <i className="fa fa-file-text"/>&nbsp;&nbsp;
                        {label}
                      </Document>
                    </FileDownload>
                   </DocumentWrap>
          })
        }
        <DocumentWrap>
          <UploadDocument 
            text="Add Document / Image / Poster" 
            valid_types={['PDF','DOC','DOCX','ODT','PNG','JPEG']}
            onChange={(data,filename) => this.props.saveDocument(data,filename)}/>
        </DocumentWrap>
      </DocumentsWrap>
    )
  }
}

const DocumentsWrap = styled.div`
  text-align: center;
  margin-bottom: 1vmin;
`
const DocumentWrap = styled.div`
  background: rgba(255,255,255,0.9);
  font-size: 2vmin;
  margin-bottom: 0.25vmin;

  &:hover {
    background: #FFF;
    color: ${RP_GREEN};
  }

  @media (max-width:768px) and (orientation: portrait){
    font-size: 2.5vmin;
  }
`
const Document = styled.div`
  display: block;
  padding: 1.5vmin 1.5vmin 1.5vmin 2.5vmin;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 2vmin;
`