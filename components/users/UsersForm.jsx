import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/users";

class UsersForm extends React.Component {
  handleOnChange = e => {
    this.props.dispatch(
      actions.assignUser({ [e.target.name]: e.target.value })
    );
  };

  render() {
    return (
      <div>
        <div className="field">
          <label className="label">First name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="firstname"
              value={this.props.users.user.firstname}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="lastname"
              value={this.props.users.user.lastname}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">E-Mail</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="email"
              value={this.props.users.user.email}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => state)(UsersForm);
