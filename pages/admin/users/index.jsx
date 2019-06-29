import React from 'react';
import {connect} from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {fetchTeams} from "../../../store/actions/teams";
import Link from 'next/link'

import Icon from '@mdi/react';
import {mdiEmoticonSadOutline, mdiPlusCircleOutline} from '@mdi/js';
import * as actions from "../../../store/actions/auth";
import Router from 'next/router'
import BaseButton from "../../../components/utils/buttons/BaseButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import ShowButton from "../../../components/utils/buttons/ShowButton";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";

class Index extends React.Component {

    async componentDidMount() {
        //await this.props.dispatch(fetchUsers());

        return {};
    }


    render() {
        const userItems = Object.values(this.props.users.userList).map(user => (
            <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>
                    <ButtonGroup>
                        <ShowButton/>
                        <EditButton/>
                        <DeleteButton/>
                    </ButtonGroup>
                </td>
            </tr>
        ));
        return <DefaultLayout forceAuth={true}>
            <div className="container">
                <Link prefetch href="/users/new">
                    <button className="button is-primary">
                        <Icon color="#fff" size="1em" path={mdiPlusCircleOutline}/>
                        <span className="pl-1"> Add User</span>
                    </button>
                </Link>
                <div className="content">
                    <h1>Teams</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teamItems}
                        </tbody>
                    </table>

                </div>
            </div>

        </DefaultLayout>;
    }
}

export default connect(state => state)(Index);