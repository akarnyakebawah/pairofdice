import React, { Component } from 'react';
import styled from 'styled-components';
import { ButtonCss, Button, ButtonLink } from '../../components/Button';
import PhotoEditor from '../../components/PhotoEditor';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getImage } from '../../api';

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      clicked: '',
      image: '',
      twibbon:  '',
      url: '',
    }
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.withCredentials = true;
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  componentDidMount() {
    this.toDataURL(this.props.campaign.campaign.twibbon_img, (dataUrl) => {
      this.setState({twibbon: dataUrl});
      // console.log('RESULT:', dataUrl)
    });
  }

  onFileChange(e, f) {
    const file = f || e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('Invalid files to be uploaded');
      return;
    }

    reader.onload = () => {
      this.setState({
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  _crop() {
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }  

  render() {
    const { campaign } = this.props.campaign;

    // console.log(this.state.twibbon === '');
    if (this.state.twibbon === '') {
      return (
        <LoadingIndicator />
      );
    }

    return (
      <Container>
        <canvas ref={(elem) => { if (elem) this.canvas = elem; }} hidden />
        <Title>{campaign.name}</Title>
        {/* {
          this.state.image !== '' && <PhotoEditor image={this.state.image} overlayImage={this.state.twibbon} editorSize={500} exportSize={750} />
        } */}
        {
          <Container>
            { this.state.image !== '' &&
              <Cropper
              ref='cropper'
              overlayImage={this.state.twibbon}
              style={{height: 400, width: 400}}
              src={this.state.image}
              cropBoxMovable={false}
              cropBoxResizable={false}
              dragMode='move'
              toggleDragModeOnDblclick={false}
              viewMode={3}
              autoCropArea={1}
              // Cropper.js options
              aspectRatio={1}
              modal={false}
              center={false}
              guides={false}
              crop={this._crop.bind(this)}>
              </Cropper>
            }
            {
              this.state.image !== '' && <Overlay style={{backgroundImage: `url(${this.state.twibbon})`}} />
            }
          </Container>
        }
        { console.log(this.refs.cropper) }
        <Label>
          <ButtonDiv><span>lol</span></ButtonDiv>
          <input
            type="file"
            accept="image/*"
            onChange={(e, f) => this.onFileChange(e, f)}
            ref={elem => { this.file = elem; }}
          />
        </Label>
      </Container>
    )
  }
}

export default Campaign;

const Overlay = styled.div`
  position: absolute;
  pointer-events: none;
  width: 400px;
  height: 400px;
  top: inherit;
  right: inherit;
  bottom: inherit;
  left: inherit;
  background-size: cover;
`

const Container = styled.div`
  margin: 0;
  /* margin-top: -150px; */
  align-self: center;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin-top: 0;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.superHuge};
  display: block;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.jumbo};
  }
`;

const ButtonDiv = styled.div`
  ${ButtonCss}
`
const Label = styled.label`
position: relative;
input {
  display: none;
}
img {
  background-color: ${props => props.theme.color.grayTransparent(0.1)};
  border: 0.5rem ${props => props.theme.color.grayTransparent(0.5)} dashed;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 10rem;
  margin: 1rem 0;
  object-fit: scale-down;
  padding: 1rem;
  &.hover {
    border: 0.5rem ${props => props.theme.color.grayTransparent(0.5)} solid;
  }
  .loaded {
    display: none;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    width: auto;
    max-width: 100%;
  }
}
`;
