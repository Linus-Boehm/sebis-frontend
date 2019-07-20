import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";
import OrganizationGoalsList from "../../components/goals/list/OrganizationGoalsList";

class companyGoals extends React.Component {
  static async getInitialProps({ query }) {
    return { currentId: query.id };
  }

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="flex h-full">
          <div className="column">
            <div className="content">
              <OrganizationGoalsList />
            </div>
          </div>
          {this.props.selectedGoal._id && (
            <GoalInfoContainer />
          )}
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  const { selectedGoal } = state.goals;

  return {
    selectedGoal: selectedGoal
  };
}

export default connect(mapStateToProps)(companyGoals);
