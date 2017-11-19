import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createCampaign } from '../../redux/modules/campaign';
import { Button, ButtonLink } from '../../components/Button';
import FileUploader from './FileUploader';
import { SHARE_CAMPAIGN_ROUTE } from '../../constants/routes';

@connect(
  state => ({ campaign: state.campaign }),
  { createCampaign },
)
class CreateCampaign extends Component {
  static propTypes = {
    campaign: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    createCampaign: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onChangeState = this.onChangeState.bind(this);
  }

  state = {
    name: '',
    url: '',
    captions: '',

    // Image upload
    isImageLoaded: false,
    image: {},
    imageDataUrl: '',
  };

  onChangeState(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async createCampaign(e) {
    e.preventDefault();
    const { name, url, captions, image } = this.state;
    await this.props.createCampaign({ name, url, captions, image });
    if (!!this.props.campaign.campaign) {
      this.props.history.push(SHARE_CAMPAIGN_ROUTE);
    }
  }

  render() {
    const {
      name,
      url,
      captions,
      isImageLoaded,
      image,
      imageDataUrl,
    } = this.state;
    const { loading } = this.props.campaign;
    return (
      <Container>
        <FormTitle>Filters</FormTitle>
        <FileUploader
          setState={e => this.setState(e)}
          image={image}
          imageDataUrl={imageDataUrl}
          isImageLoaded={isImageLoaded}
        />
        <FormTitle>Campaign Name</FormTitle>
        <NameForm
          name="name"
          value={name}
          onChange={e => this.onChangeState(e)}
        />
        <FormTitle>Campaign URL</FormTitle>
        <UrlFormContainer>
          <div>twiggsy.com/</div>
          <UrlForm
            name="url"
            onChange={e => this.onChangeState(e)}
            value={url}
          />
        </UrlFormContainer>
        <FormTitle>
          Captions <i>(optional)</i>
        </FormTitle>
        <CaptionsForm
          name="captions"
          value={captions}
          onChange={e => this.onChangeState(e)}
        />
        <Button primary onClick={e => this.createCampaign(e)}>
          {loading && <span>Loading...</span>}
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
