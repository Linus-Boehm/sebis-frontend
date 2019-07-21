import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { assignUsers } from "../../../store/actions/users";
import UsersForm from "../../../components/users/UsersForm";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import Link from "next/link";
import Router from "next/router";
import { createUser } from "../../../store/actions/users";
class New extends React.Component {
  static async getInitialProps({ store }) {
    console.log("Init User");
    //await store.dispatch(resetUser());
    return {};
  }
  handleOnSubmit = async e => {
    e.preventDefault();
    try {
      await this.props.dispatch(createUser(this.props.users.user));
      Router.push("/admin/users");
    } catch (e) {
      console.error(e);
      //TODO add fancy notification
    }
  };

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="mt-8">
          <div className="content">
            <h1>New User</h1>
            <form onSubmit={this.handleOnSubmit}>
              <UsersForm />
              <ButtonGroup className="mt-8">
                <Link href={"/admin/users"}>
                  <a className="button is-warning">Cancel</a>
                </Link>
                <button type="submit" className="button is-primary">
                  Create
                </button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
export default connect(state => state)(New);
