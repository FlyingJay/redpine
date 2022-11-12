import React from 'react'
import styled from 'styled-components'

import { RP_RED, RP_BLACK, RP_BLUE } from 'Components' //GLOBALS
import { FormInput } from 'Components' //INPUT
import { TextBox } from 'Components' //INPUT


export class CommentBox extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <CommentPanel>
        <form onSubmit={(e) => {
            e.preventDefault()
            this.sendMessage()
          }}>
          <TextBox
            width="calc(100% - 4vmin)"
            placeholder="Say something!"
            image={"email"} 
            focusImage={"email-focus"}
            style={{margin:'2vmin',resize:'vertical'}}
            value={this.state.text}
            onChange={(e) => this.updateState({text:e.target.value})}/>
          <SendButton onClick={() => this.sendMessage()}>
            Send&nbsp;&nbsp;<i className="fa fa-paper-plane-o"/>
            <Count>{this.state.text.length}/500</Count>
          </SendButton> 
          <button type="submit" style={{display: 'none'}} data-comment="i am here to make form submit by enter btn <3" />
        </form>
      </CommentPanel>
    )
  }

  sendMessage() {
    if(this.state.text.length <= 500){
      this.props.sendMessage(this.state.text)
      this.updateState({text:''})
    }else{
      this.props.error("Sorry, the character limit is 500.")
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

export default CommentBox

const CommentPanel = styled.div`
  display: block;
  width: 100%;
  white-space: normal;
  text-align: right;
`
const Input = styled(FormInput)`
  display: inline-block;
  margin: 0;
`
const SendButton = styled.div`
  display: inline-block;
  position:relative;
  width: calc(40% - 4vmin - 2px);
  padding: 2vmin;
  font-size: 3vmin;
  font-weight: 200;
  text-align: center;
  color: #FFF;
  background: ${RP_BLUE};
  transition: 0.25s ease;
  border: 1px solid ${RP_BLUE};
  vertical-align: top;
  margin-right: 2vmin;
  border-radius: 0.5vmin;

  &:hover{
    cursor: pointer;
    border: 1px solid ${RP_RED};
    background: ${RP_RED};
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
const Count = styled.div`
  position: absolute;
  bottom: 0.5vmin;
  right: 0.75vmin;
  font-size: 2vmin;
`