import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createCampaign } from '../../redux/modules/createCampaign';

import { Button, ButtonLink } from '../../components/Button';

import config from '../../config';

@connect(state => ({ campaign: state.createCampaign }), { createCampaign })
class CreateCampaign extends Component {
  static propTypes = {
    campaign: PropTypes.shape({
      campaign: PropTypes.object.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    createCampaign: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onChangeState = this.onChangeState.bind(this);
  }

  onChangeState(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Container>
        <h1>Share your campaign</h1>
        <pre>
          <code>
            {JSON.stringify(this.props.campaign, 2, 2)}
          </code>
        </pre>
        <FormTitle>Campaign Name</FormTitle>
        {this.props.campaign && this.props.campaign.campaign &&
          <img src={`${config.API_URL}${this.props.campaign.campaign.twibbon_img}`} alt="twibbon img" />}
        <UrlFormContainer>
          <div>twiggsy.com/</div>
          <UrlForm
            disabled
            name="url"
            onChange={e => this.onChangeState(e)}
            value={this.props.campaign.campaign && this.props.campaign.campaign.campaign_url}
          />
        </UrlFormContainer>
        <Button onClick={e => this.createCampaign(e)}>
          <span>Copy to Clipboard</span>
        </Button>
        <Button secondary>
          Preview
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
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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
