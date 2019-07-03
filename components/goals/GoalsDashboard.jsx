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
      fetches,

      fetchAssignedGoals,
      fetchTeamGoals,
      fetchOrganizationGoals,

      teams,
      user = {}
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
            fetchItems={fetchAssignedGoals}

            filter={(goal) => (
              goal.assignedAt >= (fetches[ "assigned" ] || {}).assignedAt &&
              goal.assignee && user && goal.assignee._id === user._id
            )}

            newGoalTemplate={{
              assignee: user ? user._id : null
            }}

            searchFilter={searchFilter}
            fetchInterval={30000}

            shouldRenderSubgoals
          />
          {teams && teams.map(team => (
            <GoalList
              key={"team-" + team._id}
              title={"Team Goals - " + team.name}

              fetchItems={() => {
                fetchTeamGoals(team._id)
              }}

              filter={(goal) => (
                goal.assignedAt >= (fetches[ "team-" + team._id ] || {}).assignedAt &&
                goal.related_to === team._id
              )}

              newGoalTemplate={{
                related_model: 'Team',
                related_to: team._id
              }}

              searchFilter={searchFilter}
              fetchInterval={30000}
            />))
          }
          <GoalList
            key="organization"
            title="Organization Goals"

            fetchItems={fetchOrganizationGoals}

            filter={(goal) => (
              goal.assignedAt >= (fetches[ "organization" ] || {}).assignedAt &&
              goal.related_model === 'Organization'
            )}

            newGoalTemplate={{
              related_model: 'Organization',
              related_to: (user || {}).organization_id
            }}
            searchFilter={searchFilter}
            fetchInterval={30000}

          />
        </div>
      </div>
    )
  }
}

export default GoalsDashboard