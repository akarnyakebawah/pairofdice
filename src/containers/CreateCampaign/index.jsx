import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { createCampaign } from "../../redux/modules/campaign";
import { Button } from "../../components/Button";
import LoadingButtonIndicator from "../../components/LoadingButtonIndicator";
import ErrorIndicator from "../../components/ErrorIndicator";
import { BASE_ROUTE, LOGIN_ROUTE } from "../../constants/routes";
import { dataUrlToFile, capitalize } from "../../helpers/utils";

@connect(state => ({ campaign: state.campaign, auth: state.auth }), {
  createCampaign
})
class CreateCampaign extends Component {
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
    image: {} // Image in dataUrl, parse to File to be sent to server
  };

  componentDidMount() {
    if (!this.props.auth.token) {
      this.props.history.replace(LOGIN_ROUTE);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.auth.token !== nextProps.auth.token &&
      !nextProps.auth.token
    ) {
      this.props.history.replace(LOGIN_ROUTE);
    }
  }

  onChangeState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async createCampaign(e) {
    e.preventDefault();
    const { name, url, captions } = this.state;
    const image = dataUrlToFile(await this.fileUploader.getCroppedImage());
    await this.props.createCampaign({ name, url, captions, image });

    // If the campaign is created and no error, redirect to share page
    if (!!this.props.campaign.campaign && !this.props.campaign.error) {
      this.props.history.push(`${BASE_ROUTE}${url}/share`);
    }
  }

  render() {
    const { name, url, captions } = this.state;
    const { loading, error } = this.props.campaign;
    let nameError = "";
    let urlError = "";
    let imageError = "";
    if (error && error.status === 400) {
      nameError = error.response.body.name && error.response.body.name[0];
      urlError =
        error.response.body.campaign_url && error.response.body.campaign_url[0];
      imageError =
        error.response.body.twibbon_img && error.response.body.twibbon_img[0];
      if (imageError === "image ratio must be 1:1")
        imageError += ". Try moving and using the cropper.";
    }
    return (
      <Container>
        <FormTitle>Filters</FormTitle>
        <Dropzone
          style={{
            width: Math.min(300, 0.8 * window.innerWidth),
            height: Math.min(300, 0.8 * window.innerHeight)
          }}
          onDrop={this.onDrop}
          accept="image/png"
          multiple={false}
          onDropRejected={this.onDropRejected}
        >
          Drag a file or click to upload.
        </Dropzone>
        {!!imageError && (
          <ErrorIndicator>{capitalize(imageError)}</ErrorIndicator>
        )}
        <FormTitle>Campaign Name</FormTitle>
        <NameForm
          name="name"
          value={name}
          onChange={e => this.onChangeState(e)}
        />
        {!!nameError && (
          <ErrorIndicator>{capitalize(nameError)}</ErrorIndicator>
        )}
        <FormTitle>Campaign URL</FormTitle>
        <UrlFormContainer>
          <div>twiggsy.com/</div>
          <UrlForm
            name="url"
            onChange={e => this.onChangeState(e)}
            value={url}
          />
        </UrlFormContainer>
        {!!urlError && <ErrorIndicator>{capitalize(urlError)}</ErrorIndicator>}
        <FormTitle>Captions</FormTitle>
        <CaptionsForm
          name="captions"
          onChange={e => this.onChangeState(e)}
          value={captions}
        />
        <Button primary onClick={e => this.createCampaign(e)}>
          {loading && <LoadingButtonIndicator />}
          {!loading && <span>Create</span>}
        </Button>
      </Container>
    );
  }
}

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

export default CreateCampaign;
