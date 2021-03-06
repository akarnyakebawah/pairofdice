/* @flow */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import NotFound from "components/NotFound";
import LoadingIndicator from "components/LoadingIndicator";
import { loadCampaign } from "modules/campaign";

import CampaignPage from "./Campaign";
import ShareCampaign from "./share";

import { Campaign as CampaignModel } from "models";

interface Props {
  loadCampaign: func;
  campaign: CampaignModel;
  match: {
    params: {
      campaignUrl: string
    }
  };
}

class Campaign extends Component<Props> {
  componentDidMount() {
    this.props.loadCampaign(this.props.match.params.campaignUrl);
  }

  render() {
    const { match, campaign } = this.props;

    if (campaign.loading) {
      return <LoadingIndicator />;
    }

    if (campaign.error) {
      return <NotFound />;
    }

    return (
      <Switch>
        <Route exact path={`${match.url}/`} render={() => <CampaignPage />} />
        <Route path={`${match.url}/share`} render={() => <ShareCampaign />} />
      </Switch>
    );
  }
}

export default connect(
  state => ({
    campaign: state.campaign
  }),
  { loadCampaign }
)(Campaign);
