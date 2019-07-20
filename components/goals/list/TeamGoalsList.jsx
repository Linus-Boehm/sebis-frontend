import React from 'react';
import { connect } from "react-redux";
import GoalListContainer from "./GoalListContainer";
import * as GoalActions from "../../../store/actions/goals";

class TeamGoalsList extends React.Component {

  fetchTeamGoals = async (teamId) => {
    try {
      await this.props.dispatch(GoalActions.fetchTeamGoals(teamId))
    } catch (e) {
      console.log(e);
    }
  };

  render() {

    const {
      fetches,

      team = {},

      hideHeader
    } = this.props;

    // Used to filter outdated/stale goals in store
    const lastFetchTime = (fetches[ `team-${team._id}` ] || {}).assignedAt;

    return (
      team._id ?
        <GoalListContainer
          title={"Team Goals - " + team.name}

          fetchItems={() => {
            this.fetchTeamGoals(team._id)
          }}

          filter={(goal) => (
            goal.assignedAt >= (lastFetchTime || 0) &&
            goal.related_to && goal.related_to === team._id
          )}

          newGoalTemplate={{
            related_model: 'Team',
            related_to: team._id
          }}

          hideHeader={hideHeader}

          fetchInterval={10000}

          {...this.props}

        /> : null
    )
  }
}

function mapStateToProps(state) {
  const {
    fetches
  } = state.goals;

  return {
    fetches
  };
}

export default connect(mapStateToProps)(TeamGoalsList);