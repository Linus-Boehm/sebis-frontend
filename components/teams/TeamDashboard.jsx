import React from "react";
import SearchInput from "../../components/utils/inputs/SearchInput";
import TeamGoalsList from "../goals/list/TeamGoalsList";

class TeamDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ""
    };
  }

  render() {
    const { team } = this.props;

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
          <TeamGoalsList
            team={team}
            searchFilter={searchFilter}
          />
        </div>
      </div>
    );
  }
}

export default TeamDashboard;
