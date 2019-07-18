import React from "react";
import SearchInput from "../../components/utils/inputs/SearchInput";
import MyGoalsList from "./list/MyGoalsList";
import TeamGoalsList from "./list/TeamGoalsList";
import OrganizationGoalsList from "./list/OrganizationGoalsList";

class GoalsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ""
    };
  }

  render() {
    const { teams } = this.props;

    const { searchFilter } = this.state;

    return (
      <div>
        <div className="flex w-full justify-end">
          <SearchInput
            value={this.state.searchFilter}
            onChange={e => {
              this.setState({ searchFilter: e.target.value });
            }}
          />
        </div>
        <div>
          <MyGoalsList searchFilter={searchFilter} />
          {teams &&
            teams.map(team => (
              <TeamGoalsList
                key={"team-" + team._id}
                title={team.name}
                team={team}
                searchFilter={searchFilter}
              />
            ))}
          <OrganizationGoalsList searchFilter={searchFilter} />
        </div>
      </div>
    );
  }
}

export default GoalsDashboard;
