import React from 'react'
import styled from 'styled-components'

import ReactCrop from 'react-image-crop';

import { FileInput, RP_RED, RP_BLACK, RP_WHITE, RP_DDD, RP_DARK_GREY, RP_GREY, RP_SUPER_LIGHT } from 'Components'


export class UploadImage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      background: this.props.background,
      error: null
    }
  }

  render() {
    return <ReactCrop src={this.state.background || '/Assets/images/defaults/default-thumb.png'} crop={{ aspect: 16 / 9 }} onChange={newCrop => this.onChange(newCrop)} />;
    /*
    return <FileInput 
            show={false} 
            valid_types={['PNG','JPEG','GIF']}
            disabled={this.props.disabled} 
            onChange={(data) => this.onChange(data)} 
            onError={(message, code) => this.onError(message, code)}>
            <Error>{this.state.error}</Error>
            <Container disabled={this.props.disabled} background={this.state.background} height={this.props.height}>
              <Overlay iniOverlay={this.props.disablePictureRemove}>
                {this.props.disabled ? null :
                  this.state.background ? (
                    this.props.disablePictureRemove 
                    ? (
                      <ChangePictureIcon>
                        <i className="fa fa-camera"></i>
                      </ChangePictureIcon>
                    )
                    : (
                      <CancelBtn className="fa fa-times" onClick={(e) => {
                                                            e.stopPropagation()
                                                            this.onCancel()
                                                          }}></CancelBtn>
                    )
                  ) : (
                    <span>
                      <i className="fa fa-picture-o" style={{marginRight: '10px'}}></i>
                      <span>{this.props.text || "Choose a photo"}</span>
                    </span>
                  )
                }
              </Overlay>
            </Container>
          </FileInput>*/
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  onChange(data) {
    this.updateState({
      background: data,
      error: null
    })

    this.props.onChange(data)
  }

  onError(message, code) {
    this.updateState({ error: message })
  }

  onCancel() {
    this.updateState({
      background: null
    })

    this.props.onChange(null)
  }

  componentWillReceiveProps(props){
    this.updateState({background: props.background})
  }
}

export default UploadImage

const Container = styled.div`
  background: ${props => props.background ? 'url(' + props.background + ')' : RP_SUPER_LIGHT};
  background-size: cover;
  background-position: center;
  color: ${RP_DARK_GREY};
  border-radius: 0.75vmin;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  position: relative;
  line-height: ${props => props.height || '13vmin'};
  height: ${props => props.height || '13vmin'};
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
  text-align: center;

  &:hover {
    color: ${RP_BLACK};
    background: ${props => props.background ? 'url(' + props.background + ')' : RP_GREY};
    background-size: cover;
    background-position: center;
  }
`
const Overlay = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.iniOverlay ? 'rgba(0,0,0,0.13)' : 'rgba(0,0,0,0)'};
  border-radius: 0.75vmin;

  .fa-camera {
    display: none;
    color: ${RP_SUPER_LIGHT};
  }

  &:hover {
    background: ${props => props.iniOverlay ? 'rgba(0,0,0,0.69)' : 'rgba(0,0,0,0)'};

    .fa-camera {
      display: block;
      color: ${RP_WHITE};
    }
  }
`
const ChangePictureIcon = styled.div`
  display: block;
  position: absolute;
  width: 2vmin;
  height: 2vmin;
  top: 2vmin;
  right: 2vmin;
  font-size: 2vmin;
  text-align: center;

  i {
    position: relative;
    top: 0;
    right: 0;
  }
`
const CancelBtn = styled.i`
  position: absolute;
  right: -1vmin;
  top: -1vmin;
  background: ${RP_DDD};
  color: ${RP_DARK_GREY};
  border: 1px solid ${RP_WHITE};
  width: 3vmin;
  height: 3vmin;
  border-radius: 100%;
  line-height: 3vmin;
  text-align: center;

  &:hover {
    color: ${RP_WHITE};
    background: ${RP_DARK_GREY};
  }
`
const Error = styled.div`
  padding: 0 0 1.5vmin 0;
  color: ${RP_RED};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;
`
