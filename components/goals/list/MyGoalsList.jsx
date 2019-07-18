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

    const userId = (user || {})._id;

    // Used to filter outdated/stale goals in store
    const lastFetchTime = (fetches[ "my" ] || {}).assignedAt;

    return (
      <GoalList
        title="My Goals"
        fetchItems={this.fetchMyGoals}

        filter={(goal) => (
          goal.assignedAt >= (lastFetchTime || 0) &&
          user &&  goal.assignee && goal.assignee._id === userId
          )}

        newGoalTemplate={{
          assignee: userId,
          is_private: true
        }}

        fetchInterval={5000}

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
  } = state.auth;

  return {
    fetches,
    user
  };
}

export default connect(mapStateToProps)(MyGoalsList);