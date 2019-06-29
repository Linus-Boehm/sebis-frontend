import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import { pick } from 'lodash';
import GoalsDashboard from './GoalsDashboard';

class GoalsDashboardContainer extends React.Component {

  selectGoal = async (id) => {
    await this.props.dispatch(GoalActions.fetchGoalById(id))
    const goal = pick(this.props.goals, id);
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

        selectGoal={this.selectGoal}
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