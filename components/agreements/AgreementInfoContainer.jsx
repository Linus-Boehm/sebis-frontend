import React from "react";
import { connect } from "react-redux";
import AgreementInfo from "./AgreementInfo";
import * as AgreementActions from "../../store/actions/agreements";

class AgreementInfoContainer extends React.Component {
  fetchMyAgreements = async () => {
    try {
      await this.props.dispatch(AgreementActions.fetchMyAgreements());
    } catch (e) {
      console.log(e);
    }
  };

  fetchAndSelectAgreement = async () => {
    await this.fetchMyAgreements();

    const agreement = this.props.agreements[this.props.queryId];

    this.props.dispatch(AgreementActions.assignSelectedAgreement(agreement));
  };

  onChangeInput = changes => {
    const { selectedAgreement } = this.props;

    this.props.dispatch(
      AgreementActions.assignSelectedAgreement({
        ...selectedAgreement,
        ...changes
      })
    );
  };

  onUpdateAgreement = async () => {
    const { selectedAgreement } = this.props;

    await this.props.dispatch(
      AgreementActions.updateAgreement(selectedAgreement)
    );

    const agreement = this.props.agreements[selectedAgreement._id];
    await this.props.dispatch(
      AgreementActions.assignSelectedAgreement(agreement)
    );
  };

  // ---

  async componentDidMount() {
    this.fetchAndSelectAgreement();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.queryId && prevProps.queryId !== this.props.queryId) {
      this.fetchAndSelectAgreement();
    }
  }
  isEditable() {
    return true;
  }

  render() {
    return (
      <AgreementInfo
        {...this.props}
        isEditable={this.isEditable()}
        onChangeInput={this.onChangeInput}
        onUpdateAgreement={this.onUpdateAgreement}
      />
    );
  }
}

function mapStateToProps(state) {
  const { selectedAgreement, agreements } = state.agreements;

  const { userList } = state.users;

  return {
    agreements,
    selectedAgreement,
    userList
  };
}

export default connect(mapStateToProps)(AgreementInfoContainer);
