import React from 'react';
import { connect } from 'react-redux';
import * as AgreementActions from '../../store/actions/agreements';
import AgreementInfo from './AgreementInfo';

class AgreementInfoContainer extends React.Component {

  fetchMyAgreements = async () => {
    try {
      await this.props.dispatch(AgreementActions.fetchMyAgreements())
    } catch (e) {
      console.log(e);
    }
  };

  fetchAndSelectAgreement = async () => {
    await this.fetchMyAgreements();

    const agreement = await this.props.agreements[ this.props.queryId ]

    this.props.dispatch(AgreementActions.assignSelectedAgreement(agreement))
  };

  onChangeAgreement = (data) => {
    this.props.dispatch(AgreementActions.assignSelectedAgreement(data))
  };

  // ---

  async componentDidMount() {
    this.fetchAndSelectAgreement()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.queryId && prevProps.queryId !== this.props.queryId) {
      this.fetchAndSelectAgreement();
    }
  }

  render() {
    return (
      <AgreementInfo
        {...this.props}

        onChangeAgreement={this.onChangeAgreement}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    selectedAgreement,
    agreements
  } = state.agreements;

  const {
    userList
  } = state.users;

  return {
    agreements,
    selectedAgreement,
    userList
  };
}

export default connect(mapStateToProps)(AgreementInfoContainer);