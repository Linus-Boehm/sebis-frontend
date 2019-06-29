import React from 'react';
import SearchInput from '../../components/utils/inputs/SearchInput'
import GoalList from "./GoalList";

class GoalsDashboard extends React.Component {

  render() {
    const {
      assignedGoals,
      teamGoals,
      organizationGoals,

      fetchAssignedGoals,
      fetchTeamGoals,
      fetchOrganizationGoals,

    } = this.props;


    return (
      <div>
        <div className="flex w-full justify-end">
          <SearchInput
            value=""
            onChange={() => {
            }}
          />
        </div>
        <div>
          <GoalList key="my_goals" title="My Goals" goals={assignedGoals} fetchItems={fetchAssignedGoals}/>
          <GoalList key="team_goals" title="Team Goals" goals={teamGoals} fetchItems={fetchTeamGoals}/>
          <GoalList key="organization_goal" title="Organization Goals" goals={organizationGoals} fetchItems={fetchOrganizationGoals}/>
        </div>
      </div>
    )
  }
}

export default GoalsDashboard