import 'cropperjs/dist/cropper.css';
import 'react-toastify/dist/ReactToastify.min.css';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonCss, Button } from '../../components/Button';
import PhotoEditor from '../../components/PhotoEditor';
import LoadingIndicator from '../../components/LoadingIndicator';
import { toDataURL, dataUrlToFile } from '../../helpers/utils';

import EmptyImage from '../../../static/assets/empty-image.png';

class Campaign extends Component {
  static propTypes = {
    campaign: PropTypes.shape({
      campaign: PropTypes.shape({
        twibbon_img: PropTypes.string,
      }).isRequired,
    }).isRequired,
    createTwibbon: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);

    this.state = {
      image: '',
      twibbon: '',
      uploaded: false,
    };
  }

  componentDidMount() {
    toDataURL(this.props.campaign.campaign.twibbon_img, (dataUrl) => {
      this.setState({ twibbon: dataUrl });
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

  // eslint-disable

  crop() {
    // console.log('crop');
    // console.log(this.cropper.getCroppedCanvas().toDataURL());
  }

  toastId = null;
  notify(message) {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast(message);
    }
  }

  async actionUploadTwibbon(e) {
    e.preventDefault();
    const { campaign } = this.props.campaign;

    // Get base image
    // const cropBoxData = this.cropper.getCropBoxData();

    // Overlay with Twibbon
    const campaignImg = new Image();

    campaignImg.onload = () => {
      const width = campaignImg.width;
      const height = campaignImg.height;
      let image = this.cropper.getCroppedCanvas({
        width,
        height,
      });
      const ctx = image.getContext('2d');

      ctx.drawImage(campaignImg, 0, 0, width, height);
      const copy = image.toDataURL('image/png');
      image = dataUrlToFile(copy);

      this.props
        .createTwibbon({
          campaignUrl: campaign.campaign_url,
          caption: 'hello',
          image,
        })
        .then(() => {
          this.setState({ uploaded: true });
        });
    };
    campaignImg.src = this.state.twibbon;
  }

  renderUploadForm() {
    const { campaign } = this.props.campaign;

    return (
      <Container>
        <canvas
          ref={(elem) => {
            if (elem) this.canvas = elem;
          }}
          hidden
        />
        <Title>{campaign.name}</Title>
        {
          <Container>
            {this.state.image !== '' && (
              <Cropper
                ref={(elem) => {
                  this.cropper = elem;
                }}
                overlayImage={this.state.twibbon}
                style={{
                  height: Math.min(400, 0.8 * window.innerWidth),
                  width: Math.min(400, 0.8 * window.innerWidth),
                }}
                src={this.state.image}
                cropBoxMovable={false}
                cropBoxResizable={false}
                dragMode="move"
                toggleDragModeOnDblclick={false}
                viewMode={3}
                autoCropArea={1}
                // Cropper.js options
                aspectRatio={1}
                modal={false}
                center={false}
                guides={false}
                crop={() => this.crop()}
              />
            )}
            {this.state.image !== '' && (
              <Overlay
                style={{
                  backgroundImage: `url(${this.state.twibbon})`,
                  width: Math.min(400, 0.8 * window.innerWidth),
                  height: Math.min(400, 0.8 * window.innerWidth),
                }}
              />
            )}
          </Container>
        }
        {/* { console.log(this.refs.cropper) } */}
        {!this.state.image && (
          <Label>
            <ButtonDiv>
              <span>Select Image</span>
            </ButtonDiv>
            <input
              type="file"
              accept="image/*"
              onChange={(e, f) => this.onFileChange(e, f)}
              ref={(elem) => {
                this.file = elem;
              }}
            />
          </Label>
        )}
        {this.state.image && (
          <Button onClick={e => this.actionUploadTwibbon(e)}>
            <span>Upload</span>
          </Button>
        )}
      </Container>
    );
  }

  renderAfterUpload() {
    const { result } = this.props.uploadTwibbon;
    console.log(result);
    return (
      <Container>
        <Title>Your twibbon is ready!</Title>
        <Twibbon src={result.img} />
        <ButtonLink href={result.img} download="twibbon.png">
          <span>Download</span>
        </ButtonLink>
        <CaptionsForm
          value={result.caption}
          disabled
        />
        <ToastContainer
          position="bottom-left"
          type="info"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <CopyToClipboard
          text={result.caption}
          onCopy={() => {
            this.notify('Copied');
          }}
        >
          <Button>
            <span>Copy to clipboard with button</span>
          </Button>
        </CopyToClipboard>
      </Container>
    );
  }

  render() {
    if (this.props.uploadTwibbon.loading) {
      return <LoadingIndicator />;
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
  z-index: 1;
`;

const ButtonLink = styled.a`
  ${ButtonCss}
  margin-bottom: 1rem;
`;

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
  text-align: center;
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
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    width: 80%;
    height: 80%;
  }
`;

const CaptionsForm = styled.textarea`
  background-color: ${props => props.theme.color.grayTransparent(0.2)};
  border-radius: 0.5rem;
  border: none;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  margin: 1rem 0;
  min-height: 10rem;
  padding: 1rem;
  resize: none;
  width: 80%;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    padding: 0.25rem;
  }
`;
