import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/teams";
import UserAvatar from "../utils/user/UserAvatar";
import UserSearchSelect from "../user/UserSearchSelect";
import { fetchTeams } from "../../store/actions/teams";
import { fetchUsers } from "../../store/actions/users";
import { filter, indexOf } from "lodash";
import Link from "next/link";

class TeamMemberDropdown extends React.Component {
  constructor(props) {
    super(props);
    let team =
      this.props.teams.teamList[this.props.teamId] || this.props.teams.team;

    this.state = {
      isToggled: true,
      showUserAdd: false,
      filteredUsers: [],
      userSearchInput: ""
    };
  }

  toggleDropdown = e => {
    //e.preventDefault()
    this.setState({
      ...this.state,
      isToggled: !this.state.isToggled
    });
  };

  onSearchInput = e => {
    //TODO debounce Requests
    e.preventDefault();
    let val = e.target.value;
    let rgxp = new RegExp(val, "g");
    let team =
      this.props.teams.teamList[this.props.teamId] || this.props.teams.team;
    let userIds = team.team_roles.map(user => {
      return user.user_id;
    });
    let res = filter(Object.values(this.props.users.userList), user => {
      return (
        (user.firstname.match(rgxp) || user.lastname.match(rgxp)) &&
        indexOf(userIds, user._id) === -1
      );
    });
    this.setState({
      ...this.state,
      userSearchInput: val,
      filteredUsers: res
    });
  };
  toggleUserAdd = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      showUserAdd: !this.state.showUserAdd,
      filteredUsers: [],
      userSearchInput: ""
    });
  };

  async componentDidMount() {
    await this.props.dispatch(fetchUsers());

    return {};
  }

  getDropDownClass() {
    return (
      "team-member-dropdown z-50 absolute " +
      (this.state.isToggled ? "hidden" : "show")
    );
  }
  renderInviteUsers() {
    return !this.state.showUserAdd ? (
      <button className="button is-link mt-4" onClick={this.toggleUserAdd}>
        Invite
      </button>
    ) : (
      <div className="flex flex-col">
        <button className="button is-warning mt-4" onClick={this.toggleUserAdd}>
          Cancel
        </button>
        <UserSearchSelect
          value={this.state.userSearchInput}
          className="mt-4"
          onChange={this.onSearchInput}
          onSelect={(e, team) => {
            this.toggleUserAdd(e);
            this.toggleDropdown(e);
            this.props.onSelect(e, team);
          }}
          filteredUsers={this.state.filteredUsers}
        />
      </div>
    );
  }
  render() {
    let hideEdit = this.props.hideEdit || false;
    let team =
      this.props.teams.teamList[this.props.teamId] || this.props.teams.team;
    let teamMemberList = <span>No Users in Team</span>;
    if (team && team.team_roles) {
      let teamUsers = team.team_roles.map(user => {
        return this.props.users.userList[user.user_id];
      });
      console.log(teamUsers);
      teamMemberList =
        teamUsers && teamUsers.length > 0 ? (
          teamUsers.map(user => (
            <div className="flex justify-between my-2" key={user._id}>
              <UserAvatar user={user} />
              <span className="pt-2">
                {user.firstname} {user.lastname}
              </span>

              {!hideEdit && (
                <div className="pt-2">
                  <a
                    className="delete"
                    onClick={e => {
                      this.props.onRemove(e, user);
                    }}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <span>No Users in Team</span>
        );
    }
    return (
      <div className="dropdown-wrapper relative" onClick={this.props.onClick}>
        <div className="dropdown-trigger" onClick={this.toggleDropdown}>
          {this.props.children}
        </div>
        <div className={this.getDropDownClass()}>
          <div className="team-member-dropdown-inner bg-white p-4 rounded-lg shadow-md relative">
            <div className="flex flex-col">
              <h4>Members</h4>
              {teamMemberList}
              {!hideEdit && this.renderInviteUsers()}
            </div>
          </div>
        </div>
        {/*language=CSS*/}
        <style jsx>
          {`
            .team-member-dropdown-inner {
              z-index: 40;
              min-width: 280px;
            }

            .team-member-dropdown {
              left: 50%;
              transform: translateX(-50%);
              margin-top: 8px;
            }

            .team-member-dropdown::before {
              display: none;
              position: absolute;
              z-index: 5;
              content: "";
              top: 0%;
              right: 50%;
              background-color: #fff;
              width: 15px;
              height: 15px;

              -webkit-transform: translateY(-50%) translateX(50%) rotate(-45deg);
              transform: translateY(-50%) translateX(50%) rotate(-45deg);
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }

            .team-member-dropdown.show::before {
              display: block;
            }
          `}
        </style>
      </div>
    );
  }
}

export default connect(state => state)(TeamMemberDropdown);
