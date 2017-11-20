import React, { Component } from 'react';
import styled from 'styled-components';
import { ButtonCss, Button, ButtonLink } from '../../components/Button';
import PhotoEditor from '../../components/PhotoEditor';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getImage } from '../../api';
import { dataUrlToFile } from '../../helpers/utils';

import EmptyImage from '../../../static/assets/empty-image.png';
import { campaign } from '../../constants/apiUrl';

class Campaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      twibbon:  '',
      uploaded: false,
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
      this.setState({ image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  _crop() {
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }  

  renderEditor() {
    return (
      <EditorContainer>
        <Background src={EmptyImage} width={500}/>
        <PhotoEditor
          ref={(elem) => { if (elem) this.editor = elem; }}
          image={this.state.image}
          overlayImage={this.state.twibbon}

          editorSize={500}
          exportSize={750}
        />
      </EditorContainer>
    )
  }

  async actionUploadTwibbon(e) {
    e.preventDefault();
    const { campaign } = this.cropper;
    let image = await this.editor.getImage();
    image = dataUrlToFile(image);

    await this.props.createTwibbon({
      campaignUrl: campaign.campaign_url,
      caption: 'hello',
      image
    });

    this.setState({
      uploaded: true,
    });
  }

  renderUploadForm() {
    const { campaign } = this.props.campaign;

    return (
      <Container>
        <canvas ref={(elem) => { if (elem) this.canvas = elem; }} hidden />
        <Title>{campaign.name}</Title>
        {
          <Container>
            { this.state.image !== '' &&
              <Cropper
              ref={(elem) => { this.cropper = elem; }}
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
        {/* { console.log(this.refs.cropper) } */}
        {
          !this.state.image &&
          <Label>
            <ButtonDiv><span>Select Image</span></ButtonDiv>
            <input
              type="file"
              accept="image/*"
              onChange={(e, f) => this.onFileChange(e, f)}
              ref={elem => { this.file = elem; }}
            />
          </Label>
        }
        {
          this.state.image &&
          <Button onClick={e => this.actionUploadTwibbon(e)}>
            <span>Upload</span>
          </Button>
        }
      </Container>
    )
  }

  renderAfterUpload() {
    const { result } = this.props.uploadTwibbon;
    return (
      <Container>
          <Title>Your twibbon is ready!</Title>
          <Twibbon src={result.img} />
          <a href={result.img} download="twibbon.png">Download</a>
      </Container>
    );
  }

  render() {

    if (this.state.twibbon === '' || this.props.uploadTwibbon.loading) {
      return (
        <LoadingIndicator />
      );
    }

    if (!this.state.uploaded) {
      return this.renderUploadForm();
    }

    return this.renderAfterUpload();
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
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin-top: 0;
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 30px;
  color: ${props => props.theme.color.white};
  font-size: 3rem;
  display: block;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: 3rem;
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

const EditorContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width};
  object-fit: scale-down;
  z-index: 0;
`;

const Twibbon = styled.img`
  width: 500px;
  height: 500px;
`;