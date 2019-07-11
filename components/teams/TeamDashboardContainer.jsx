import React from "react";
import { connect } from "react-redux";
import TeamDashboard from "./TeamDashboard";
import {fetchTeamById, removeTeamMember, resetTeam, updateTeamMember} from "../../store/actions/teams";
import {findIndex} from "lodash";
import {fetchUsers} from "../../store/actions/users";
import {fetchTeamGoals} from "../../store/actions/goals";

class TeamDashboardContainer extends React.Component {

  onTeamMemberRemove = async(e, user) => {
    e.preventDefault();
    this.props.dispatch(removeTeamMember(this.props.team_id, user._id))
  }

  fetchAndSelectTeam = async () => {
    try {
      if (this.props.team_id)
        await this.props.dispatch(resetTeam());
        this.props.dispatch(fetchTeamById(this.props.team_id));
        this.props.dispatch(fetchTeamGoals(this.props.team_id));
    } catch (e) {
      console.log(e);
    }
  }

  onTeamMemberAdd = async (e, user)=>{
    e.preventDefault();
    this.props.dispatch(updateTeamMember(this.props.team_id, {
      user_id: user._id,
      role: "member"
    }))
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
    const hideEdit = !this.props.authUser || findIndex(this.props.team.team_roles, (role)=>{return role.user_id === this.props.authUser._id && role.role === 'leader'}) < 0;
    return (
      <TeamDashboard {...this.props} onTeamMemberRemove={this.onTeamMemberRemove} onTeamMemberAdd={this.onTeamMemberAdd} hideEdit={hideEdit}/>
    );
  }
}

function mapStateToProps(state) {

  return {
    team: state.teams.team,
    users: state.users.userList,
    authUser: state.auth.user
  };
}

export default connect(mapStateToProps)(TeamDashboardContainer);
