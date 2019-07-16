import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {
  fetchUserById,
  resetUser,
  updateUser
} from "../../../store/actions/users";
import Router from "next/router";
import UsersForm from "../../../components/users/UsersForm";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import Link from "next/link";
import AccountMultipleIcon from "mdi-react/AccountMultipleIcon";
import BaseButton from "../../../components/utils/buttons/BaseButton";

class EditUser extends React.Component {
  static async getInitialProps({ query }) {
    return { currentId: query.id };
  }
  async componentDidMount() {
    console.log("Init Users");
    await this.props.dispatch(resetUser());
    await this.props.dispatch(fetchUserById(this.props.currentId));
    //console.log(this.props);
  }
  handleOnSubmit = async e => {
    e.preventDefault();
    try {
      //console.log(this.props);
      await this.props.dispatch(
        updateUser(this.props.currentId, this.props.users.user)
      );
      //Notification.success("User update successfull")
      Router.push("/admin/users");
    } catch (e) {
      console.error(e);
      //Notification.error("Error on saving User")
      //TODO add fancy notification
    }
  };

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="container">
          <div className="content">
            <div className="flex">
              <h1>Edit User</h1>
              <div />
            </div>
            <form onSubmit={this.handleOnSubmit}>
              <UsersForm />
              <ButtonGroup className="mt-8">
                <Link href={"/admin/users"}>
                  <a className="button is-warning">Cancel</a>
                </Link>
                <button type="submit" className="button is-primary">
                  Save
                </button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
export default connect(state => state)(EditUser);
