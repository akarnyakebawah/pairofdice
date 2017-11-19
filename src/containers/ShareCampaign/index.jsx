import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createCampaign } from '../../redux/modules/createCampaign';

import { Button, ButtonLink } from '../../components/Button';
import ShareCampaignComponent from '../../components/ShareCampaign'

import config from '../../config';

@connect(state => ({ campaign: state.createCampaign }), { createCampaign })
class ShareCampaign extends Component {
  static propTypes = {
    campaign: PropTypes.shape({
      campaign: PropTypes.object.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    createCampaign: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ShareCampaignComponent campaign={this.props.campaign} />
    );
  }
}

export default ShareCampaign;
