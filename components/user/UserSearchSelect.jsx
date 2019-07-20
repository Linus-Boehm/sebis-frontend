import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/teams";
import UserAvatar from "../utils/user/UserAvatar";
import AddButton from "../utils/buttons/AddButton";

class UserSearchSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: true
    };
  }



  render() {
    const userItems =
      this.props.filteredUsers && this.props.filteredUsers.length > 0 ? (
        this.props.filteredUsers.map(user => (
          <div className=" flex justify-between my-2" key={user._id}>
            <UserAvatar user={user} />
            <span className="pt-2">
              {user.firstname} {user.lastname}
            </span>
            <AddButton
              className="mt-1"
              onClick={e => {
                this.props.onSelect(e, user);
              }}
            />
          </div>
        ))
      ) : (
        <span>No User found</span>
      );
    return (
      <div
        className={"user-search-wrapper relative z-100 " + this.props.className}
        onClick={this.props.onClick}
      >
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Search for name"
              value={this.props.value}
              onInput={this.props.onInput}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        {this.props.value && (
          <div className=" w-full bg-white">
            <div className="flex flex-col">{userItems}</div>
          </div>
        )}

        {/*language=CSS*/}
        <style jsx>{``}</style>
      </div>
    );
  }
}

export default connect(state => state)(UserSearchSelect);
