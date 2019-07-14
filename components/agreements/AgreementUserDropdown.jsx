import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/teams";
import UserAvatar from "../utils/user/UserAvatar";
import UserSearchSelect from "../user/UserSearchSelect";
import { fetchTeams } from "../../store/actions/teams";
import { fetchUsers } from "../../store/actions/users";
import { filter, indexOf } from "lodash";
import Link from "next/link";

class AgreementUserDropdown extends React.Component {
  constructor(props) {
    super(props);

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
    let res = filter(Object.values(this.props.users.userList), user => {
      return user.firstname.match(rgxp) || user.lastname.match(rgxp);
    });
    this.setState({
      ...this.state,
      userSearchInput: val,
      filteredUsers: res
    });
  };

  onUserClick = async _id => {
    let user = Object.values(this.props.users.userList).filter(
      user => user._id === _id
    )[0];
    console.log(this.props);
    await this.props.onChangeInput({ assignee: user });
    this.props.onUpdateAgreement();
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
    return "team-member-dropdown z-50 absolute ";
  }

  render() {
    let hideEdit = this.props.hideEdit || false;
    let users = this.props.users.userList;
    let currentUser = this.props.auth.user;
    users = Object.values(users);
    let userList = <span>No Users</span>;
    if (users && currentUser) {
      users = users.filter(user => user._id !== currentUser._id);
      userList =
        users && users.length > 0 ? (
          users.map(user => (
            <div
              className="flex justify-between my-2"
              key={user._id}
              onClick={() => this.onUserClick(user._id)}
            >
              <UserAvatar user={user} />
              <span className="pt-2">
                {user.firstname} {user.lastname}
              </span>
            </div>
          ))
        ) : (
          <span>No Users</span>
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
              {userList}
              {!hideEdit}
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

export default connect(state => state)(AgreementUserDropdown);
