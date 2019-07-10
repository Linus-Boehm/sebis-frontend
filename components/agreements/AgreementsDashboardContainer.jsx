import React from 'react';
import { connect } from 'react-redux';
import * as AgreementActions from '../../store/actions/agreements';
import AgreementsDashboard from './AgreementsDashboard';

class AgreementsDashboardContainer extends React.Component {

  fetchMyAgreements = async () => {
    try {
      await this.props.dispatch(AgreementActions.fetchMyAgreements())
    } catch (e) {
      console.log(e);
    }
  };

  // ---

  async componentDidMount() {
    this.fetchMyAgreements()
  }

  render() {
    return (
      <AgreementsDashboard
        {...this.props}
      />
    )
  }
}

function filterMyAgreements({ agreements, user, fetches }) {

  const userId = (user || {})._id;

  // Used to filter outdated/stale agreements in store
  const lastFetchTime = (fetches[ "my" ] || {}).assignedAt || new Date();

  return agreements.filter((agreement) => (
    agreement.assignedAt >= lastFetchTime &&
    (agreement.assignee === userId || agreement.reviewer === userId)
  ))
}

function mapStateToProps(state) {
  const {
    agreements,
    fetches
  } = state.agreements;

  const {
    user
  } = state.auth;

  return {
    agreements: filterMyAgreements({ agreements: Object.values(agreements), user, fetches }),
  };
}

export default connect(mapStateToProps)(AgreementsDashboardContainer);