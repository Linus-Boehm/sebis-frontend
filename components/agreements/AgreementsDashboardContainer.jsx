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
  }

  render() {
    return (
      <AgreementsDashboard
        {...this.props}

        fetchMyAgreements={this.fetchMyAgreements}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    agreements,
    fetches
  } = state.agreements;

  const {
    user
  } = state.users;

  return {
    fetches,
    agreements: Object.values(agreements),
    user
  };
}

export default connect(mapStateToProps)(AgreementsDashboardContainer);