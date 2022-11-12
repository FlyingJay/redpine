import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: auto;
  padding: ${props => props.padding || '3vmin 0'};
  text-align: center;
`

const Text = styled.div`
  z-index: 10;
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  padding: 0 2vmin;
  margin: 0 auto;
  background: #FFF;
  color: #666;
  font-family: 'Open Sans',sans-serif;
  font-size: 2.25vmin;
  font-weight: 700;
  text-align: center;
`

const Line = styled.div`
  content: "";
  display: block;
  background: #EEE;
  display: block;
  height: 1px;
  position: absolute;
  top: 50%;
  width: 100%;
`


class FormSeparator extends React.PureComponent {
  render() {
    return (
      <Container {...this.props}>
        <Text>{this.props.text}</Text>
        <Line />
      </Container>
    )
  }
}

export default FormSeparator