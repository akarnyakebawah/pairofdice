import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';


import NotFound from '../../components/NotFound';
import LoadingIndicator from '../../components/LoadingIndicator';
import { loadCampaign } from '../../redux/modules/campaign';

import CampaignPage from '../../components/CampaignPage';
// import ShareCampaign from '../../components/ShareCampaign';

@connect(
  state => ({
    campaign: state.campaign,
  }),
  { loadCampaign },
)
class Campaign extends Component {

  componentDidMount() {
    const { loadCampaign, match } = this.props;
    loadCampaign(match.params.campaignUrl);
  }

  render() {
    const { match, campaign } = this.props;

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
        <Route exact path={`${match.url}/`} component={() => <CampaignPage campaign={campaign} />} />
        {/* <Route exact path={`${match.url}/share`} component={() => <CampaignPage campaign={campaign} />} /> */}
      </Switch>
    );
  }
}

export default Campaign;
