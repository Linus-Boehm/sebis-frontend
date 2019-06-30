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
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={this.props.users.user.name}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => state)(UsersForm);
