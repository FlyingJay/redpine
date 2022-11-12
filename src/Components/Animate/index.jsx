import React from 'react'
import styled, { keyframes } from 'styled-components'


// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
// Rotate children over two seconds
export const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  font-size: 1.2rem;
`