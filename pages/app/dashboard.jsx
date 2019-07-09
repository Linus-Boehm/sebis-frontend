import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import GoalsDashboardContainer from "~/components/goals/GoalsDashboardContainer";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";
import { fetchUsers } from "../../store/actions/users";

class Dashboard extends React.Component {
  async componentDidMount() {
    await this.props.dispatch(fetchUsers());
  }

  static async getInitialProps({ store }) {
    return {};
  }

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="flex h-full">
          <div className="column">
            <div className="content">
              <GoalsDashboardContainer />
            </div>
          </div>
          {this.props.selectedGoal._id && (
            <div className="column is-one-third border-l-2 border-gray-200">
              <GoalInfoContainer />
            </div>
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
