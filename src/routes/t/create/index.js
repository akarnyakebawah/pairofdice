/* @flow */
import "cropperjs/dist/cropper.css";
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cropper from "react-cropper";
import Dropzone from "react-dropzone";
import { createCampaign } from "modules/campaign";
import { Button } from "components/Button";
import LoadingButtonIndicator from "components/LoadingButtonIndicator";
import ErrorIndicator from "components/ErrorIndicator";
import { BASE_ROUTE, LOGIN_ROUTE } from "routes/constants";
import { capitalize, dataUrlToFile, resizeImage } from "../../../commons/utils";

import { toastActions } from "../../../modules/toast/toastActions";

import Campaign from "models/Campaign";

const Container = styled.div`
  align-self: center;
  width: 80%;
  color: ${props => props.theme.color.white};
  margin-bottom: 2rem;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

const FormTitle = styled.div`
  font-size: ${props => props.theme.fontSize.large};
  font-weight: bolder;
  margin-top: 2rem;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

const UrlFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  div {
    flex: 0;
    text-align: left;
    font-size: ${props => props.theme.fontSize.medium};
    margin-right: 1rem;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    width: 95%;
  }
`;

const Input = styled.input`
  border: none;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  padding: 1rem;
  width: 100%;
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
  width: 100%;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    padding: 0.25rem;
  }
`;

const NameForm = styled(Input)`
  border: none;
  border-bottom: 1px ${props => props.theme.color.white} solid;
  background-color: transparent;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  width: 100%;

  &:focus {
    outline: none;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    padding: 0.25rem;
  }
`;

const UrlForm = styled(Input)`
  background-color: ${props => props.theme.color.grayTransparent(0.2)};
  border-radius: 0.5rem;
  max-width: 20rem;
  width: 50%;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    width: 100%;
    padding: 1rem 0.25rem;
  }
`;

interface Props {
  auth: {
    token: string
  };
  campaign: {
    error: any,
    loading: boolean,
    campaign: Campaign
  };
  createCampaign: func;
  history: {
    replace: func,
    push: func
  };
}

interface State {
  name: string;
  url: string;
  captions: string;

  isImageLoaded: boolean;
  images: Array<string>;
}

class CreateCampaign extends Component<Props, State> {
  static propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired,
    campaign: PropTypes.shape({
      error: PropTypes.object.isRequired,
      loading: PropTypes.bool.isRequired,
      campaign: PropTypes.object.isRequired
    }).isRequired,
    createCampaign: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    name: "",
    url: "",
    captions: "",

    // Image upload
    isImageLoaded: false,
    images: [] // Image in dataUrl, parse to File to be sent to server
  };

  cropper = [];

  componentDidMount() {
    if (!this.props.auth.token) {
      this.props.history.replace(LOGIN_ROUTE);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.token !== nextProps.auth.token && !nextProps.auth.token) {
      this.props.history.replace(LOGIN_ROUTE);
    }
  }

  onChangeState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async createCampaign(e) {
    e.preventDefault();
    if (this.cropper.length === 0) {
      toastActions.showErrorToast({ message: "You haven't upload any images yet." });
      return;
    }
    const { name, url, captions } = this.state;
    const image = dataUrlToFile(await this.cropper[0].getCroppedCanvas().toDataURL("image/png"));
    await this.props.createCampaign({ name, url, captions, image });

    // If the campaign is created and no error, redirect to share page
    if (!!this.props.campaign.campaign && !this.props.campaign.error) {
      this.props.history.push(`${BASE_ROUTE}${url}/share`);
    }
  }

  onDrop = acceptedFiles => {
    let counter = 0;
    acceptedFiles.forEach(acceptedFile => {
      resizeImage(acceptedFile, ({ imageDataUrl }) => {
        const { images } = this.state;
        this.setState({ images: images.concat(imageDataUrl) });
        counter += 1;
        if (counter === acceptedFiles.length) {
          this.setState({ isImageLoaded: true });
        }
      });
    });
  };

  render() {
    const { name, url, captions, isImageLoaded, images } = this.state;
    const { loading, error } = this.props.campaign;
    let nameError = "";
    let urlError = "";
    let imageError = "";
    if (error && error.status === 400) {
      nameError = error.response.body.name && error.response.body.name[0];
      urlError = error.response.body.campaign_url && error.response.body.campaign_url[0];
      imageError = error.response.body.twibbon_img && error.response.body.twibbon_img[0];
      if (imageError === "image ratio must be 1:1")
        imageError += ". Try moving and using the cropper.";
    }
    return (
      <Container>
        <FormTitle>Filters</FormTitle>
        {!isImageLoaded && (
          <Dropzone
            onDrop={this.onDrop}
            accept="image/png"
            multiple={false}
            onDropRejected={() =>
              toastActions.showErrorToast({ message: "Only .png files are allowed." })
            }
          >
            <div>Click or drag to upload images.</div>
            <div>Supported files: .png</div>
          </Dropzone>
        )}
        {isImageLoaded &&
          images.map((image, index) => (
            <Cropper
              ref={elem => {
                this.cropper.push(elem);
              }}
              style={{
                height: Math.min(400, 0.8 * window.innerWidth),
                width: Math.min(400, 0.8 * window.innerWidth)
              }}
              src={image}
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
          ))}
        {!!imageError && <ErrorIndicator>{capitalize(imageError)}</ErrorIndicator>}
        <FormTitle>Campaign Name</FormTitle>
        <NameForm name="name" value={name} onChange={e => this.onChangeState(e)} />
        {!!nameError && <ErrorIndicator>{capitalize(nameError)}</ErrorIndicator>}
        <FormTitle>Campaign URL</FormTitle>
        <UrlFormContainer>
          <div>twiggsy.com/</div>
          <UrlForm name="url" onChange={e => this.onChangeState(e)} value={url} />
        </UrlFormContainer>
        {!!urlError && <ErrorIndicator>{capitalize(urlError)}</ErrorIndicator>}
        <FormTitle>Captions</FormTitle>
        <CaptionsForm name="captions" onChange={e => this.onChangeState(e)} value={captions} />
        <Button primary onClick={e => this.createCampaign(e)}>
          {loading && <LoadingButtonIndicator />}
          {!loading && <span>Create</span>}
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaign,
  auth: state.auth
});
const mapDispatchToProps = { createCampaign };

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign);
