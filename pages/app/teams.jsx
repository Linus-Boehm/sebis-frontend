import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import TeamDashboardContainer from "../../components/teams/TeamDashboardContainer";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";
import { fetchUsers } from "../../store/actions/users";
import { fetchTeamById, resetTeam } from "../../store/actions/teams";

class teams extends React.Component {
  async componentDidMount() {
    await this.props.dispatch(fetchUsers());
    await this.props.dispatch(resetTeam());
    await this.props.dispatch(fetchTeamById(this.props.currentId));
  }

  static async getInitialProps({ query }) {
    return { currentId: query.id };
  }

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="flex h-full">
          <div className="column">
            <div className="content">
              <TeamDashboardContainer team_id={this.props.currentId} />
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

export default connect(mapStateToProps)(teams);
