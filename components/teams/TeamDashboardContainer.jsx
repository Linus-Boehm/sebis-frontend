import React from "react";
import { connect } from "react-redux";
import TeamDashboard from "./TeamDashboard";
import { fetchTeamById } from "../../store/actions/teams";

class TeamDashboardContainer extends React.Component {

  fetchAndSelectTeam = async () => {
    try {
      if (this.props.team_id)
        this.props.dispatch(fetchTeamById(this.props.team_id));
    } catch (e) {
      console.log(e);
    }
  }

  // ---

  componentDidMount() {
    this.fetchAndSelectTeam();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.team_id && prevProps.team_id !== this.props.team_id) {
      this.fetchAndSelectTeam();
    }
  }

  render() {
    return (
      <TeamDashboard {...this.props} />
    );
  }
}

function mapStateToProps(state) {

  return {
    team: state.teams.team,
    users: state.users.userList
  };
}

export default connect(mapStateToProps)(TeamDashboardContainer);
