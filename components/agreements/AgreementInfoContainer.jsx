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
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    selectedAgreement,
    agreements
  } = state.agreements;

  return {
    agreements,
    selectedAgreement
  };
}

export default connect(mapStateToProps)(AgreementInfoContainer);