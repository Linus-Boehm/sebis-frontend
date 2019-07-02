import React from 'react';
import SearchInput from '../../components/utils/inputs/SearchInput'
import GoalList from "./list/GoalListContainer";

class GoalsDashboard extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ''
    };
  }

  render() {
    const {
      assignedGoals,
      teamGoals,
      organizationGoals,

      fetchAssignedGoals,
      fetchTeamGoals,
      fetchOrganizationGoals,

      teams,
      user
    } = this.props;

    const {
      searchFilter
    } = this.state;


    return (
      <div>
        <div className="flex w-full justify-end">
          <SearchInput
            value={this.state.searchFilter}
            onChange={(e) => {
              this.setState({ searchFilter: e.target.value })
            }}
          />
        </div>
        <div>
          <GoalList
            key="my_goals"
            title="My Goals"
            goals={assignedGoals}
            fetchItems={fetchAssignedGoals}

            newGoalTemplate={{
              assignee: user ? user._id : null
            }}
            searchFilter={searchFilter}

            shouldRenderSubgoals
          />
          <GoalList
            key="team_goals"
            title="Team Goals"
            goals={teamGoals}

            newGoalTemplate={{
              related_model: 'Team',
              related_to: teams && teams.length > 0 ? teams[ 0 ]._id : null
            }}

            fetchItems={fetchTeamGoals}

            searchFilter={searchFilter}
          />
          <GoalList
            key="organization_goal"
            title="Organization Goals"
            goals={organizationGoals}

            newGoalTemplate={{
              related_model: 'Organization',
              related_to: user ? user.organization_id : null
            }}
            searchFilter={searchFilter}

            fetchItems={fetchOrganizationGoals}
          />
        </div>
      </div>
    )
  }
}

export default GoalsDashboard