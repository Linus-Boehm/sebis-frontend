import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import TeamDashboardContainer from "../../components/teams/TeamDashboardContainer";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";
import { fetchTeamById, resetTeam } from "../../store/actions/teams";
import { assignSelectedGoal, fetchTeamGoals } from "../../store/actions/goals";

class teams extends React.Component {
  componentDidMount() {
    this.props.dispatch(assignSelectedGoal({}));
    this.props.dispatch(resetTeam());
    this.props.dispatch(fetchTeamById(this.props.currentId));
    this.props.dispatch(fetchTeamGoals(this.props.currentId));
  }

  componentWillReceiveProps = async (nextProps, nextContext) => {
    if (nextProps.currentId !== this.props.currentId) {
      await this.props.dispatch(assignSelectedGoal({}));
    }
  };

  static async getInitialProps({ query }) {
    return { currentId: query.id };
  }

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="flex h-full">
          <div className="column">
            <div className="content">
              <TeamDashboardContainer team_id={this.props.currentId}/>
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

export default connect(mapStateToProps)(teams);
