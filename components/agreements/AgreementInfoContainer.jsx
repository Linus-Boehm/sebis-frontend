import React from "react";
import { connect } from "react-redux";
import { find } from "lodash";
import AgreementInfo from "./AgreementInfo";
import * as AgreementActions from "../../store/actions/agreements";

class AgreementInfoContainer extends React.Component {
  fetchMyAgreements = async () => {
    try {
      return await this.props.dispatch(AgreementActions.fetchMyAgreements());
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
    let result = !!find(Object.keys(changes), e => {
      return e == "reviewer_confirmed" || e == "assignee_confirmed";
    });
    if (!result) {
      changes = {
        ...changes,
        reviewer_confirmed: false,
        assignee_confirmed: false
      };
    }

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
    await this.props.dispatch(
      AgreementActions.assignSelectedAgreement(selectedAgreement)
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
    if (
      !this.props.selectedAgreement ||
      (this.props.selectedAgreement.assignee_confirmed === true &&
        this.props.selectedAgreement.reviewer_confirmed === true)
    ) {
      return false;
    }
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
