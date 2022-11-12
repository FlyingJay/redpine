import React from 'react'
import styled from 'styled-components'

import { FileInput, RP_SUPER_LIGHT, RP_DARK_GREY, RP_WHITE } from 'Components'


class ProfilePicture extends React.PureComponent {
  render() {
    const picture = this.props.picture || '/Assets/images/profile.jpg'
    return (
      <Container image={picture} >
        <FileInputContainer>
          <FileInput 
            show={false} 
            valid_types={['PNG','JPEG','GIF']}
            onChange={(data) => this.props.onChange(data)} 
            onError={(err) => this.props.onError(err)}>
            <i className="fa fa-camera" />
          </FileInput>
        </FileInputContainer>
      </Container>
    )
  }
}

export default ProfilePicture

const Container = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 25vmin;
  height: 25vmin;
  margin-right: 1vmin;
  background: ${RP_SUPER_LIGHT};
  border-radius: 0.75vmin;
  text-align: center;
  background: url('${props => props.image || '' }');
  background-size: cover;
  background-position: center;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 20.5vmin;
    height: 20.5vmin;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 20vmin;
    height: 20vmin;
  }
`
const CurrentPic = styled.img`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 15vmin;
  height: 15vmin;
  margin: 2.5vmin auto;
  border-radius: 20vmin;
`
const FileInputContainer = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2vmin;
  padding: 1vmin 0;
  background: rgba(0,0,0,0.39);
  color: ${RP_SUPER_LIGHT};
  font-size: 1.7vmin;
  text-align: center;
  line-height: 2vmin;
  border-radius: 0 0 0.75vmin 0.75vmin;

  &:hover{
    background: rgba(0,0,0,0.75);
    color: ${RP_WHITE};
  }
`