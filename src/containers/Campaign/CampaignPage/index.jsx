import 'cropperjs/dist/cropper.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import Cropper from 'react-cropper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Spinner from 'react-spinkit';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';
import { ButtonCss, Button } from '../../../components/Button';
import { createTwibbon, onImageChange, clearImage } from '../../../redux/modules/twibbon';
import * as apiUrl from '../../../constants/apiUrl';
import theme from '../../../constants/theme';
import BackButtonIcon from '../../../../static/assets/back-button-icon.png';

@connect(state => ({ campaign: state.campaign, twibbon: state.twibbon }), {
  createTwibbon,
  onImageChange,
  clearImage,
})
class Campaign extends Component {
  static propTypes = {
    campaign: PropTypes.shape({
      campaign: PropTypes.shape({
        twibbon_img: PropTypes.string,
      }).isRequired,
    }).isRequired,
    twibbon: PropTypes.shape({
      result: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired,
      uploaded: PropTypes.bool.isRequired,
      imageDataUrl: PropTypes.string.isRequired,
    }).isRequired,
    clearImage: PropTypes.func.isRequired,
    createTwibbon: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
  };

  state = {
    image: '',
    imageFile: {},
    scale: 1,
  };

  onFileChange = async (e, f) => {
    const file = f || e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      // eslint-disable-next-line
      alert('Invalid files to be uploaded');
      return;
    }

    // Get original width of original file
    reader.onload = () => {
      this.props.onImageChange({ imageDataUrl: reader.result, imageFile: file });
    };
    reader.readAsDataURL(file);
  };

  toastId = null;

  notify = (message) => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast(message);
    }
  };

  createTwibbon = async (e) => {
    e.preventDefault();
    const { campaign } = this.props.campaign;

    // Google Analytics, track.
    ReactGA.modalview(`${campaign.campaign_url}/result`);

    // Calculate scaled & cropped dimensions before overlay
    const cropperData = this.cropper.getData();
    const x = parseInt(cropperData.x * this.state.scale, 10);
    const y = parseInt(cropperData.y * this.state.scale, 10);
    const width = parseInt(cropperData.width * this.state.scale, 10);
    const height = parseInt(cropperData.height * this.state.scale, 10);

    await this.props.createTwibbon({ x, y, width, height });
  };

  renderCropper = () => {
    const { campaign } = this.props.campaign;
    const { imageDataUrl } = this.props.twibbon;
    return (
      <Container>
        <Title>{campaign.name}</Title>
        <Container>
          <Cropper
            ref={(elem) => {
              this.cropper = elem;
            }}
            style={{
              height: Math.min(400, 0.8 * window.innerWidth),
              width: Math.min(400, 0.8 * window.innerWidth),
            }}
            src={imageDataUrl}
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
          />
          <Overlay
            style={{
              backgroundImage: `url(${campaign && campaign.twibbon_img})`,
              width: Math.min(400, 0.8 * window.innerWidth),
              height: Math.min(400, 0.8 * window.innerWidth),
            }}
          />
        </Container>
        <Flex>
          <BackButton onClick={this.props.clearImage}>
            <Icon
              icon="md-arrow-round-back"
              fontSize="1.5rem"
              color="white"
            />
          </BackButton>
          <Button onClick={this.createTwibbon}>
            <span>Upload</span>
          </Button>
        </Flex>
      </Container>
    );
  };

  renderUploadForm = () => {
    const { campaign } = this.props.campaign;
    return (
      <Container>
        <Title>{campaign.name}</Title>
        <Twibbon src={campaign.twibbon_img} />
        <Label>
          <ButtonDiv onClick={() => ReactGA.modalview(`${campaign.campaign_url}/crop`)}>
            <span>Select Image</span>
          </ButtonDiv>
          <input
            type="file"
            accept="image/*"
            onChange={this.onFileChange}
            ref={(elem) => {
              this.file = elem;
            }}
          />
        </Label>
      </Container>
    );
  };

  renderUploadSuccess = () => {
    const { result } = this.props.twibbon;
    const { campaign } = this.props.campaign;
    return (
      <Container>
        <Title>Your image is ready!</Title>
        <Twibbon src={result} />
        <Flex>
          <BackButton onClick={this.props.clearImage}>
            <Icon
              icon="md-arrow-round-back"
              fontSize="1.5rem"
              color="white"
              onClick={this.props.clearImage}
            />
          </BackButton>
          <ButtonLink href={result} download="twibbon.png">
            <span>Download</span>
          </ButtonLink>
        </Flex>
        {campaign &&
          campaign.caption_template && (
            <Container>
              <CaptionsForm value={campaign.caption_template} disabled />
              <ToastContainer
                position="bottom-left"
                type="info"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                pauseOnHover
              />
              <CopyToClipboard
                text={campaign.caption_template}
                onCopy={() => {
                  this.notify('Copied.');
                }}
              >
                <Button>
                  <span>Copy to clipboard</span>
                </Button>
              </CopyToClipboard>
            </Container>
          )}
      </Container>
    );
  };

  render() {
    const { loading, uploaded, result, imageDataUrl } = this.props.twibbon;
    if (loading) {
      return (
        <LoadingImageIndicator>
          <Spinner name="three-bounce" color={theme.color.white} fadeIn="none" />
          <Subtitle>Uploading your image...</Subtitle>
        </LoadingImageIndicator>
      );
    }

    if (!uploaded) {
      if (!imageDataUrl) return this.renderUploadForm();
      return this.renderCropper();
    }

    return this.renderUploadSuccess();
  }
}

export default Campaign;

const Overlay = styled.div`
  position: absolute;
  pointer-events: none;
  width: 400px;
  height: 400px;
  top: 0;
  left: 0;
  background-size: cover;
  z-index: 4;
`;

const Container = styled.div`
  margin: 0;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
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
  ${ButtonCss} ${props => props.hidden && 'display: none'};
`;

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

const LoadingImageIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%:
`;

const Subtitle = styled(Title)`
  font-size: ${props => props.theme.fontSize.medium};
`;

const ButtonLink = styled.a`
  ${ButtonCss} margin-bottom: 1rem;
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

const Icon = styled(Ionicon)`
  border-radius: 100%;
  border: solid 1px white;
  margin-right: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  border: none;
  background: transparent;
  :focus {
    outline: none;
  }
`;