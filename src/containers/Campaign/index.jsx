import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';


import NotFound from '../../components/NotFound';
import LoadingIndicator from '../../components/LoadingIndicator';
import { loadCampaign } from '../../redux/modules/campaign';
import { createTwibbon, resizeImage } from '../../redux/modules/createTwibbon';

import CampaignPage from '../../components/CampaignPage';
import ShareCampaign from '../../components/ShareCampaign';
import * as apiUrl from '../../constants/apiUrl';

@connect(
  state => ({
    campaign: state.campaign,
    uploadTwibbon: state.createTwibbon,
  }),
  { loadCampaign, createTwibbon, resizeImage },
)
class Campaign extends Component {
  componentDidMount() {
    const { loadCampaign, match } = this.props;
    loadCampaign(match.params.campaignUrl);
  }

  render() {
    const { match, campaign, createTwibbon, uploadTwibbon, resizeImage } = this.props;

    if (campaign.loading) {
      return (
        <LoadingIndicator />
      );
    }

    if (campaign.error) {
      return (
        <NotFound />
      );
    }

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}/`}
          render={
            () => (<CampaignPage
              uploadTwibbon={uploadTwibbon}
              campaign={campaign}
              createTwibbon={createTwibbon}
              resizeImage={resizeImage}
            />)
          }
        />
        <Route
          path={`${match.url}/share`}
          render={
            () => <ShareCampaign campaign={campaign} />
          }
        />
      </Switch>
    );
  }
}

export default Campaign;
