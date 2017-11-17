import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button, ButtonLink } from '../../components/Button';
import FileUploader from './FileUploader';

class Form extends Component {
  constructor() {
    super();
    this.onChangeState = this.onChangeState.bind(this);
  }

  state = {
    campaignName: '',
    campaignUrl: '',
    captions: '',
    filters: {},

    // Image upload
    isImageLoaded: false,
    image: ''
  };

  onChangeState(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      campaignName,
      campaignUrl,
      captions,
      isImageLoaded,
      image,
    } = this.state;
    return (
      <Container>
        <FormTitle>Filters</FormTitle>
        <FileUploader
          setState={e => this.setState(e)}
          image={image}
          isImageLoaded={isImageLoaded}
        />
        <FormTitle>Campaign Name</FormTitle>
        <NameForm
          name="campaignName"
          value={campaignName}
          onChange={e => this.onChangeState(e)}
        />
        <FormTitle>Campaign URL</FormTitle>
        <UrlFormContainer>
          <div>twiggsy.com/</div>
          <UrlForm
            name="campaignUrl"
            onChange={e => this.onChangeState(e)}
            value={campaignUrl}
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
        <Button primary>
          <span>Create</span>
        </Button>
      </Container>
    );
  }
}

const Container = styled.div`
  align-self: center;
  width: 80%;
  color: ${props => props.theme.color.white};
`;

const FormTitle = styled.div`
  font-size: ${props => props.theme.fontSize.large};
  font-weight: bolder;
  margin: 1rem 0;
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
  }
`;


const Input = styled.input`
  border: none;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  padding: 1rem;
`;

const CaptionsForm = styled.textarea`
  background-color: ${props => props.theme.color.grayTransparent(0.2)};
  border-radius: 0.5rem;
  border: none;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  padding: 1rem;
  margin: 1rem 0;
  min-height: 10rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const HiddenFileForm = styled.input`
  display: flex;
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
`;

const UrlForm = styled(Input)`
  background-color: ${props => props.theme.color.grayTransparent(0.2)};
  border-radius: 0.5rem;
  max-width: 20rem;
  width: 50%;
  &:focus {
    outline: none;
  }
`;

export default Form;
