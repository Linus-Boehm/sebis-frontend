import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { fetchUsers } from "../../../store/actions/users";
import Link from "next/link";

import Icon from "@mdi/react";
import { mdiEmoticonSadOutline, mdiPlusCircleOutline } from "@mdi/js";
import * as actions from "../../../store/actions/auth";
import Router from "next/router";
import BaseButton from "../../../components/utils/buttons/BaseButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import ShowButton from "../../../components/utils/buttons/ShowButton";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import ConfirmModal from "../../../components/utils/modal/ConfirmModal";
import { deleteUser } from "../../../store/actions/users";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      selectedUser: {}
    };
  }
  async componentDidMount() {
    await this.props.dispatch(fetchUsers());

    return {};
  }

  closeModal = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      modalActive: false
    });
  };

  confirmDelete = async (e, user) => {
    console.log("onDelete");
    e.preventDefault();
    this.setState({
      modalActive: true,
      user
    });
  };
  onDeleteConfirm = async e => {
    try {
      await this.props.dispatch(deleteUser(this.state.user._id));
    } catch (e) {
      console.error(e);
      //TODO add fancy notification
    }
    this.setState({
      ...this.state,
      modalActive: false
    });
  };

  render() {
    const userItems =
      Object.values(this.props.users.userList).length === 0 ? (
        <tr />
      ) : (
        Object.values(this.props.users.userList).map(user => (
          <tr key={user._id}>
            <td>{user.email}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>
              <ButtonGroup>
                <Link href={"/admin/users/edit?id=" + user._id}>
                  <EditButton />
                </Link>
                <DeleteButton
                  onClick={e => {
                    this.confirmDelete(e, user);
                  }}
                />
              </ButtonGroup>
            </td>
          </tr>
        ))
      );
    return (
      <DefaultLayout forceAuth={true}>
        <div className="container">
          <Link prefetch href="/admin/users/new">
            <button className="button is-primary">
              <Icon color="#fff" size="1em" path={mdiPlusCircleOutline} />
              <span className="pl-1"> Add User</span>
            </button>
          </Link>
          <div className="content">
            <h1>Users</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{userItems}</tbody>
            </table>
          </div>
          <ConfirmModal
            title="Attention!"
            active={this.state.modalActive}
            confirmButtonType="is-danger"
            confirmButtonText="Delete"
            onCloseModal={this.closeModal}
            onConfirm={this.onDeleteConfirm}
          >
            Do you realy like to delete this user?
          </ConfirmModal>
        </div>
      </DefaultLayout>
    );
  }
}

export default connect(state => state)(Index);
