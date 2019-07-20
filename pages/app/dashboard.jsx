import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import GoalsDashboardContainer from "~/components/goals/GoalsDashboardContainer";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";
import { fetchUsers } from "../../store/actions/users";
import { assignSelectedGoal } from "../../store/actions/goals";

class Dashboard extends React.Component {
  async componentDidMount() {
    await this.props.dispatch(assignSelectedGoal({}));
    await this.props.dispatch(fetchUsers());
  }

  static async getInitialProps({ store }) {
    return {};
  }

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="flex h-full">
          <div className="">
            <div className="content">
              <GoalsDashboardContainer/>
            </div>
          </div>
          {this.props.selectedGoal._id && (
            <GoalInfoContainer/>
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

export default connect(mapStateToProps)(Dashboard);
