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

  onUserClick = async id => {
    console.log(this.props);
    await this.props.onChangeInput({ assignee: id });
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
    return "team-member-dropdown z-5 absolute ";
  }

  onSearchInput = e => {
    //TODO debounce Requests
    e.preventDefault();

    let currentUser = this.props.auth.user;
    let val = e.target.value;
    let rgxp = new RegExp(val, "g");

    let res = filter(Object.values(this.props.users.userList), user => {
      return (
        (user.firstname.match(rgxp) || user.lastname.match(rgxp)) &&
        user._id !== currentUser._id
      );
    });
    this.setState({
      ...this.state,
      userSearchInput: val,
      filteredUsers: res
    });
  };
  renderAssignee() {
    return;
  }
  render() {
    return (
      <div className="dropdown-wrapper relative" onClick={this.props.onClick}>
        <div className="dropdown-trigger" onClick={this.toggleDropdown}>
          {this.props.children}
        </div>
        <div className={this.getDropDownClass()}>
          <UserSearchSelect
            className="w-64 z-5"
            value={this.state.userSearchInput}
            onChange={this.onSearchInput}
            filteredUsers={this.state.filteredUsers}
            onSelect={(e, user) => {
              this.onUserClick(user._id);
            }}
          />
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
