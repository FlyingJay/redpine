import React from 'react'
import styled from 'styled-components'

import { RP_RED } from 'Components' //GLOBALS

export class EditButton extends React.PureComponent {
  constructor(props) {
    super(props)  
  }

  render() {
    return (
      <Edit {...this.props}>
        {this.props.text}&nbsp;&nbsp;
        <i className="fa fa-arrow-right" />&nbsp;&nbsp;
      </Edit>
    )
  }
}
export default EditButton

const Edit = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  width: 90%;
  text-align: right;
  padding: 0 0 1vmin 1vmin;
  font-weight: bold;
  font-Size: 1.8vmin;

  &:hover {
    cursor: pointer;
    color: ${RP_RED};
  }

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2vmin;
  }
`
