import React from 'react';
import { connect } from "react-redux";
import GoalList from "./GoalListContainer";
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

      team = {}
    } = this.props;

    // Used to filter outdated/stale goals in store
    const lastFetchTime = (fetches[ `team-${team._id}` ] || {}).assignedAt;

    return (
      <GoalList
        hideHeader={true}
        fetchItems={() => {
          this.fetchTeamGoals(team._id)
        }}

        filter={(goal) => (
          goal.assignedAt >= lastFetchTime &&
          goal.related_to && goal.related_to === team._id
        )}

        newGoalTemplate={{
          related_model: 'Team',
          related_to: team._id
        }}

      />
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