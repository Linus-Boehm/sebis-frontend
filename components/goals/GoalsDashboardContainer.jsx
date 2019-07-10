import React from 'react';
import { connect } from 'react-redux';
import GoalsDashboard from './GoalsDashboard';
import { fetchTeams } from "../../store/actions/teams";

class GoalsDashboardContainer extends React.Component {

  async componentDidMount() {
    try {

      this.props.dispatch(fetchTeams())

    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <GoalsDashboard
        {...this.props}
      />
    )
  }
}

function filterByMyTeams(allTeams, user) {
  return allTeams.filter((team) => {
    const isUserInTeam = team.team_roles.findIndex(
      (teamRole) => user && teamRole && teamRole.user_id === user._id
    );
    return isUserInTeam !== -1
  })
}

function mapStateToProps(state) {
  const {
    teamList
  } = state.teams;

  const {
    user
  } = state.users;

  return {
    teams: Object.values(teamList)//filterByMyTeams(Object.values(teamList), user),
  };
}

export default connect(mapStateToProps)(GoalsDashboardContainer);