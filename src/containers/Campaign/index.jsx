import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';


import NotFound from '../../components/NotFound';
import LoadingIndicator from '../../components/LoadingIndicator';
import { loadCampaign } from '../../redux/modules/campaign';

import CampaignPage from './CampaignPage';
import ShareCampaign from './ShareCampaign';

@connect(
  state => ({
    campaign: state.campaign,
  }),
  { loadCampaign },
)
class Campaign extends Component {
  static propTypes = {
    loadCampaign: PropTypes.func.isRequired,
    // eslint-disable-next-line
    campaign: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        campaignUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.props.loadCampaign(this.props.match.params.campaignUrl);
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
        <Route
          exact
          path={`${match.url}/`}
          render={() => <CampaignPage />}
        />
        <Route
          path={`${match.url}/share`}
          render={() => <ShareCampaign />}
        />
      </Switch>
    );
  }
}

export default Campaign;
