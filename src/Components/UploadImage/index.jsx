import React from 'react';
import styled from 'styled-components'

import ReactCrop from 'react-image-crop'

import { FileInput, RP_RED, RP_BLACK, RP_WHITE, RP_DDD, RP_DARK_GREY, RP_GREY, RP_SUPER_LIGHT, RP_GREEN, SPOTIFY_GREEN } from 'Components'
import { FormButton } from 'Components'
import { Modal } from 'Components'


export class UploadImage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: this.props.square ? 1 : 16 / 9
      },
      hide_modal: false
    }

    this.onSelectFile = e => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          this.setState({ src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    // If you setState the crop in here you should return false.
    this.onImageLoaded = image => {
      this.imageRef = image;
    }

    this.onCropComplete = crop => {
      this.makeClientCrop(crop);
    }

    this.onCropChange = (crop, percentCrop) => {
      // You could also use percentCrop:
      // this.setState({ crop: percentCrop });
      this.setState({ crop });
    }
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }

        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");

      this.props.onChange(canvas.toDataURL())
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    const default_image = this.props.default_image

    return (
      <div className="App">
        {(default_image && !this.state.src) && (
          <Container 
            square={this.props.square}
            disabled={this.props.disabled} 
            background={default_image} 
            height={this.props.height} 
            onClick={() => this.inputElement.click()}>
              <Overlay iniOverlay={this.props.disablePictureRemove}>
                { this.props.disabled ? null 
                  : this.state.background 
                    ? this.props.disablePictureRemove 
                      ? <ChangePictureIcon>
                          <i className="fa fa-camera"></i>
                        </ChangePictureIcon>
                      : <CancelBtn className="fa fa-times" onClick={(e) => {
                                                                      e.stopPropagation()
                                                                      this.onCancel()
                                                                    }}></CancelBtn>
                    : <span>
                        <i className="fa fa-picture-o" style={{marginRight: '10px'}}></i>
                        <span>{this.props.text || "Choose a photo"}</span>
                      </span> }
              </Overlay>
            </Container>
        )}



        { this.state.src && (
          <Modal onClose={() => this.updateState({src:null})} show={this.state.src} transparent>
            <div style={{height:'90vh',width:'100%',lineHeight:'90vh',textAlign:'center',position:'relative'}}>
              <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}/> 
              <BottomRight>
                <FormButton background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => {
                  this.updateState({src:null})
                  this.onCropComplete(this.state.crop)
                }}>
                  <i className="fa fa-check"/>&nbsp;&nbsp;SAVE
                </FormButton>
              </BottomRight>
            </div>
          </Modal> )}

        <div style={{display:this.state.src ? 'block':'none'}}>
          <input type="file" onChange={this.onSelectFile} ref={input => this.inputElement = input}/>
        </div>
        {/* CROPPED IMAGE PREVIEW
          this.state.croppedImageUrl && (
            <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedImageUrl} />
          )*/}
      </div>
    );
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
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
  width: ${props => props.square ? '50%' : 'auto'};
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
  background: ${props => props.iniOverlay ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0)'};
  border-radius: 0.75vmin;
  color: ${RP_SUPER_LIGHT};

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
const BottomRight = styled.div`
  position: fixed;
  display: block;
  text-align: right;
  bottom: 2vmin;
  right: 4vmin;

  @media print {
    visibility: hidden;
  }
`