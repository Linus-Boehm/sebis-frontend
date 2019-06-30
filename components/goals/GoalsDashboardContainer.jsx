import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import { pick } from 'lodash';
import GoalsDashboard from './GoalsDashboard';

class GoalsDashboardContainer extends React.Component {

  onAddNewGoal = (context, parentGoal) => {
    // TODO context = my|team|organization ; parentGoal=set if subgoal --> Update selectedGoal
    this.props.dispatch(GoalActions.assignSelectedGoal({
      _id: 'new-uuid', // TODO generate
      title: 'New ' + context + ' Goal',
      parent_goal: parentGoal ? parentGoal._id : undefined
    }))
  }

  onSelectGoal = async (id) => {
    this.props.dispatch(GoalActions.assignSelectedGoal({ _id: id, isFetching: true }))

    await this.props.dispatch(GoalActions.fetchGoalById(id));

    const goal = Object.values(pick(this.props.goals, id))[ 0 ];
    return this.props.dispatch(GoalActions.assignSelectedGoal(goal))
  };

  fetchAssignedGoals = async () => {
    return this.props.dispatch(GoalActions.fetchAllAssignedGoals())
  };

  fetchTeamGoals = async () => {
    return this.props.dispatch(GoalActions.fetchAllTeamGoals())
  };

  fetchOrganizationGoals = async () => {
    return this.props.dispatch(GoalActions.fetchAllOrganizationGoals())
  };

  render() {
    return (
      <GoalsDashboard
        {...this.props}

        fetchAssignedGoals={this.fetchAssignedGoals}
        fetchTeamGoals={this.fetchTeamGoals}
        fetchOrganizationGoals={this.fetchOrganizationGoals}

        onSelectGoal={this.onSelectGoal}
        onAddNewGoal={this.onAddNewGoal}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    goals,
    selectedGoal,
    assignedGoals,
    teamGoals,
    organizationGoals
  } = state.goals;

  return {
    goals,
    selectedGoal,

    // views
    assignedGoals: Object.values(pick(goals, assignedGoals.ids)),
    teamGoals: Object.values(pick(goals, teamGoals.ids)),
    organizationGoals: Object.values(pick(goals, organizationGoals.ids))
  };
}

export default connect(mapStateToProps)(GoalsDashboardContainer);