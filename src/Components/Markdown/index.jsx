import React from 'react'
import styled from 'styled-components'
import marked from 'marked'

const MultiLinedString = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`

const MultiLinedStringPart = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
`

export const Markdown = ({text}) => (
  <MultiLinedString dangerouslySetInnerHTML={{__html: marked(text)}} />
);