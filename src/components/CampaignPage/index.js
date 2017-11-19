import React, { Component } from 'react';
import { Button, ButtonLink } from '../../components/Button';

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
    }
  }
  render() {
    const { campaign } = this.props.campaign;

    // for development only guys
    const mediaUrl = campaign.twibbon_img;

    return (
      <h1>{campaign.name} {mediaUrl}</h1>
    )
  }
}

export default Campaign;

