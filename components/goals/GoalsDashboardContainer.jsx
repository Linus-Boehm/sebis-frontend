import React from 'react';
import { connect } from 'react-redux';
import GoalsDashboard from './GoalsDashboard';
import { fetchTeams } from "../../store/actions/teams";
import { fetchUsers } from '../../store/actions/users'
import { fetchMyAgreements } from '../../store/actions/agreements'

class GoalsDashboardContainer extends React.Component {

  async componentDidMount() {
    try {

      this.props.dispatch(fetchUsers())
      this.props.dispatch(fetchTeams())
      this.props.dispatch(fetchMyAgreements())


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
  } = state.auth;

  return {
    teams: filterByMyTeams(Object.values(teamList), user)
  };
}

export default connect(mapStateToProps)(GoalsDashboardContainer);