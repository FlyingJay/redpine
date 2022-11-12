import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import appActions from 'Containers/App/actions'

import { RP_BLACK, RP_RED } from 'Components'


export class HelpLink extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
     return <Wrapper {...this.props}>
              <QuestionMark onClick={() => this.props.showHelp(this.props.topic)} {...this.props}>
                <i className="fa fa-question-circle-o"/>
              </QuestionMark>
              { this.props.children }
            </Wrapper>
  }
} 

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showHelp: (topic) => {
      dispatch(appActions.showHelp(topic))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HelpLink)


const Wrapper = styled.div`
  position: ${props => props.inline || props.block ? 'relative': ''};
  display: ${props => props.inline ? 'inline-block' : ''};
`
const QuestionMark = styled.div`
  position: absolute;
  z-index: 10;
  top: ${props => props.shift && props.shift.top || '-10'}px;
  right: ${props => props.shift && props.shift.right || '0'}px;
  
  color: ${RP_BLACK};

  i {
    font-size: ${props => props.fontSize ? props.fontSize : '2.5vmin'};
  }

  &:hover {
    color: ${RP_RED};
    cursor: pointer;
  }
`