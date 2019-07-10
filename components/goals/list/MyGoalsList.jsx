import React from 'react';
import { connect } from "react-redux";
import GoalList from "./GoalListContainer";
import * as GoalActions from "../../../store/actions/goals";

class MyGoalsList extends React.Component {

  fetchMyGoals = async () => {
    try {
      await this.props.dispatch(GoalActions.fetchMyGoals())
    } catch (e) {
      console.log(e);
    }
  };

  render() {

    const {
      user,
      fetches
    } = this.props;

    // Used to filter outdated/stale goals in store
    const lastFetchTime = (fetches[ "my" ] || {}).assignedAt || new Date();

    return (
      <GoalList
        title="My Goals"
        fetchItems={this.fetchMyGoals}

        filter={(goal) => (
          goal.assignedAt >= lastFetchTime &&
          user && goal.assignee === user._id
        )}

        newGoalTemplate={{
          assignee: user ? user._id : null,
          is_private: true
        }}

        shouldRenderSubgoals

        {...this.props}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    fetches
  } = state.goals;

  const {
    user
  } = state.users;

  return {
    fetches,
    user
  };
}

export default connect(mapStateToProps)(MyGoalsList);