import React from "react";
import SearchInput from "../../components/utils/inputs/SearchInput";
import TeamGoalsList from "../goals/list/TeamGoalsList";
import TeamMemberDropdown from "./TeamMemberDropdown";
import Avatar from 'react-avatar';
import { take } from "lodash";
import UserAvatar from "../utils/user/UserAvatar";

class TeamDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ""
    };
  }

  renderTeamMembers() {
    let members = take(this.props.team.team_roles, 3);
    return members.map((m) => (
        <div className="mr-1">
          <UserAvatar size={35} user={this.props.users[ m.user_id ]}/>
        </div>
      )
    )
  }

  render() {
    const { team } = this.props;

    const { searchFilter } = this.state;

    return (
      <div>
        <div className="flex w-full justify-end">
          <h4 className="pt-1 is-size-4 font-bold">
            Team Goals - {team.name}
          </h4>
          <div className="mx-2">
            <div className="flex">
              {this.renderTeamMembers()}
              <TeamMemberDropdown hideEdit={this.props.hideEdit} onSelect={this.props.onTeamMemberAdd}
                                  onRemove={this.props.onTeamMemberRemove}>
                <Avatar className="cursor-pointer" value="..." round={true} size={35}/>
              </TeamMemberDropdown>
            </div>
          </div>
          <div className="ml-auto">
            <SearchInput
              value={this.state.searchFilter}
              onChange={e => {
                this.setState({ searchFilter: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <TeamGoalsList
            team={team}
            searchFilter={searchFilter}
            hideHeader={true}
          />
        </div>
      </div>
    );
  }
}

export default TeamDashboard;
