import React from "react";
import SearchInput from "../../components/utils/inputs/SearchInput";
import GoalList from "../goals/list/GoalListContainer";
import * as UserActions from "../../store/actions/teams";
import { fetchTeams } from "../../store/actions/teams";
import { connect } from "react-redux";

class TeamDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ""
    };
  }
  async componentDidMount() {
    await this.props.dispatch(fetchTeams());
  }

  render() {
    const { fetches, fetchTeamGoals } = this.props;

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
          <GoalList
            key={"team-" + this.props.team_id}
            title={"Team Goals - " + this.props.teams.team.name}
            fetchItems={() => {
              fetchTeamGoals(this.props.team_id);
            }}
            newGoalTemplate={{
              related_model: "Team",
              related_to: this.props.team_id
            }}
            filter={goal =>
              goal.assignedAt >=
                (fetches["team-" + this.props.team_id] || {}).assignedAt &&
              goal.related_to === this.props.team_id
            }
            searchFilter={searchFilter}
            fetchInterval={30000}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => state)(TeamDashboard);
