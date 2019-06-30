import React from 'react';
import SearchInput from '../../components/utils/inputs/SearchInput'
import GoalList from "./list/GoalList";

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

      selectedGoal,
      onSelectGoal,
      onAddNewGoal
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
            onSelectGoal={onSelectGoal}
            selectedGoal={selectedGoal}
            onAddNewGoal={(parentGoal) => {
              return onAddNewGoal('my', parentGoal)
            }}
            searchFilter={searchFilter}
            shouldRenderSubGoals
          />
          <GoalList
            key="team_goals"
            title="Team Goals"
            goals={teamGoals}
            onSelectGoal={onSelectGoal}
            selectedGoal={selectedGoal}
            onAddNewGoal={(parentGoal) => {
              return onAddNewGoal('team', parentGoal)
            }}
            searchFilter={searchFilter}
            fetchItems={fetchTeamGoals}/>
          <GoalList
            key="organization_goal"
            title="Organization Goals"
            goals={organizationGoals}
            selectedGoal={selectedGoal}
            onSelectGoal={onSelectGoal}
            onAddNewGoal={(parentGoal) => {
              return onAddNewGoal('organization', parentGoal)
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