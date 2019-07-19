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

    const agreement = this.props.agreements[ this.props.queryId ];

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

  componentDidMount() {
    this.fetchAndSelectAgreement()

    this.interval = setInterval(() => {
      const agreement = this.props.agreements[ this.props.queryId ];
      this.fetchCommentsToAgreement(agreement._id);
    }, 5000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
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
      this.props.currentUser &&
      this.props.currentUser._id === this.props.selectedAgreement.reviewer
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


function calcGoalWeightsSum(selectedAgreement, allGoals, fetches) {
  if (!allGoals || allGoals.length === 0 || !selectedAgreement || !selectedAgreement._id || !fetches) {
    return 0;
  }

  const lastFetchTime = (fetches[ `agreement-${selectedAgreement._id}` ] || {})
    .assignedAt;

  const agreementGoals = allGoals.filter((el) =>
    el.related_to &&
    el.related_to === selectedAgreement._id &&
    el.assignedAt >= (lastFetchTime || 0)
  );

  return agreementGoals.reduce((prev, current) => {
    console.log(current);
    return prev + (current.oa_weight || 0)
  }, 0)
}

function mapStateToProps(state) {
  const { selectedAgreement, agreements } = state.agreements;

  const { userList } = state.users;
  const { selectedGoal } = state.goals;

  const { goals, fetches } = state.goals;
  const goalWeightsSum = calcGoalWeightsSum(selectedAgreement, Object.values(goals), fetches);
  console.log(goalWeightsSum);

  return {
    selectedGoal: selectedGoal,
    currentUser: state.auth.user,
    agreements,
    selectedAgreement,
    userList,

    goalWeightsSum
  };
}

export default connect(mapStateToProps)(AgreementInfoContainer);
