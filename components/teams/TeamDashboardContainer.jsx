import React from "react";
import { connect } from "react-redux";
import * as GoalActions from "../../store/actions/goals";
import TeamDashboard from "./TeamDashboard";
import { fetchTeams } from "../../store/actions/teams";

class TeamDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  fetchTeamGoals = async team_id => {
    try {
      await this.props.dispatch(GoalActions.fetchTeamGoals(team_id));
    } catch (e) {
      console.log(e);
    }
  };
  async componentDidMount() {
    try {
      await this.props.dispatch(fetchTeamById(this.props.team_id));
    } catch (e) {
      console.log(e);
    }
  }

  // ---

  render() {
    return (
      <TeamDashboard {...this.props} fetchTeamGoals={this.fetchTeamGoals} />
    );
  }
}

function mapStateToProps(state) {
  const { goals, selectedGoal, fetches } = state.goals;

  const { teamList } = state.teams;

  const { user } = state.auth;

  return {
    goals,
    selectedGoal,
    fetches,
    teams: Object.values(teamList),
    user
  };
}

export default connect(mapStateToProps)(TeamDashboardContainer);
