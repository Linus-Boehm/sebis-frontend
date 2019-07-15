import React from "react";
import { connect } from "react-redux";
import { find } from "lodash";
import AgreementInfo from "./AgreementInfo";
import GoalInfoContainer from "../goals/GoalInfoContainer";
import * as AgreementActions from "../../store/actions/agreements";
import * as CommentsActions from "../../store/actions/comments";
class AgreementInfoContainer extends React.Component {
  fetchMyAgreements = async () => {
    try {
      return await this.props.dispatch(AgreementActions.fetchMyAgreements());
    } catch (e) {
      console.log(e);
    }
  };
  fetchCommentsToAgreement = async id => {
    try {
      return await this.props.dispatch(CommentsActions.fetchComments(id));
    } catch (e) {
      console.log(e);
    }
  };

  fetchAndSelectAgreement = async () => {
    await this.fetchMyAgreements();

    const agreement = this.props.agreements[this.props.queryId];

    await this.fetchCommentsToAgreement(agreement._id);

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
      ((this.props.selectedAgreement.assignee_confirmed === true &&
        this.props.selectedAgreement.reviewer_confirmed === true) ||
        this.getMyConfirmState() === true)
    ) {
      return false;
    }
    return true;
  }

  getMyConfirmState = () => {
    if (
      this.props.current_user &&
      this.props.current_user._id === this.props.selectedAgreement.reviewer
    ) {
      return this.props.selectedAgreement.reviewer_confirmed;
    } else {
      return this.props.selectedAgreement.assignee_confirmed;
    }
  };

  render() {
    return (
      <div className="flex h-full">
        <div className="column">
          <div className="content">
            <AgreementInfo
              {...this.props}
              isEditable={this.isEditable()}
              onChangeInput={this.onChangeInput}
              onUpdateAgreement={this.onUpdateAgreement}
            />
          </div>
        </div>
        {this.props.selectedGoal._id && (
          <div className="column is-one-third border-l-2 border-gray-200">
            <GoalInfoContainer
              agreementMode={true}
              editModeDisabled={!this.isEditable()}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedAgreement, agreements } = state.agreements;

  const { userList } = state.users;
  const { selectedGoal } = state.goals;

  return {
    selectedGoal: selectedGoal,
    current_user: state.auth.user,
    agreements,
    selectedAgreement,
    userList
  };
}

export default connect(mapStateToProps)(AgreementInfoContainer);
