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
import BaseModal from "../../../components/utils/modal/BaseModal";
import ConfirmModal from "../../../components/utils/modal/ConfirmModal";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            selectedTeam: {}
        };
    }
    async componentDidMount() {
        await this.props.dispatch(fetchTeams());

        return {};
    }
    closeModal = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            modalActive: false
        })
    }
    confirmDelete = (e) => {
        console.log("onDelete")
        e.preventDefault();
        this.setState({
            ...this.state,
            modalActive: true
        })
    }

    render() {
        const teamItems = Object.values(this.props.teams.teamList).map(team => (
            <tr key={team._id}>
                <td>{team.name}</td>
                <td></td>
                <td>0</td>
                <td>
                    <ButtonGroup>
                            <ShowButton />
                            <Link href={'/admin/teams/edit?id='+team._id}>
                            <EditButton/>
                            </Link>
                            <DeleteButton onClick={this.confirmDelete}/>


                    </ButtonGroup>
                </td>
            </tr>
        ));
        return <DefaultLayout forceAuth={true}>
            <div className="container">

                <div className="content">
                    <div className="flex">
                        <h1>Teams</h1>
                        <div className="ml-auto">
                            <Link prefetch href="/admin/teams/new">
                                <button className="button is-primary">
                                    <Icon color="#fff" size="1em" path={mdiPlusCircleOutline}/>
                                    <span className="pl-1"> Add Team</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th># Members</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teamItems}
                        </tbody>
                    </table>

                </div>
                <ConfirmModal title="Attention!" active={this.state.modalActive} confirmButtonType="is-danger" confirmButtonText="Delete" onCloseModal={this.closeModal}>Do you realy like to delete this team?</ConfirmModal>
            </div>

        </DefaultLayout>;
    }
}

export default connect(state => state)(Index);