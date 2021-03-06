import React from "react";
import {connect} from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {fetchTeams} from "../../../store/actions/teams";
import Link from "next/link";

import Icon from "@mdi/react";
import {mdiEmoticonSadOutline, mdiPlusCircleOutline} from "@mdi/js";
import * as actions from "../../../store/actions/auth";
import Router from "next/router";
import BaseButton from "../../../components/utils/buttons/BaseButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import ShowButton from "../../../components/utils/buttons/ShowButton";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import BaseModal from "../../../components/utils/modal/BaseModal";
import ConfirmModal from "../../../components/utils/modal/ConfirmModal";
import AccountMultipleIcon from "mdi-react/AccountMultipleIcon";
import {deleteTeam} from "../../../store/actions/teams";
import TeamMemberDropdown from "../../../components/teams/TeamMemberDropdown";

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

    closeModal = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            modalActive: false
        });
    };
    confirmDelete = async (e, team) => {
        console.log("onDelete");
        e.preventDefault();
        this.setState({
            modalActive: true,
            team
        });
    };
    onDeleteConfirm = async e => {
        try {
            await this.props.dispatch(deleteTeam(this.state.team._id));
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
        const teamItems = Object.values(this.props.teams.teamList).map(team => (
            <tr key={team._id}>
                <td>{team.name}</td>
                <td/>
                <td>{team.team_roles.length}</td>
                <td>
                    <ButtonGroup>
                        <Link href={"/admin/teams/edit?id=" + team._id}>
                            <EditButton/>
                        </Link>
                        <DeleteButton
                            onClick={e => {
                                this.confirmDelete(e, team);
                            }}
                        />
                    </ButtonGroup>
                </td>
            </tr>
        ));
        return (
            <DefaultLayout forceAuth={true}>
                <div className="w-full mt-8">
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
                            <tbody>{teamItems}</tbody>
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
                        Do you really like to delete the team{this.state.team && <strong className={"break-all"}> {this.state.team.name}</strong> }?
                    </ConfirmModal>
                </div>
            </DefaultLayout>
        );
    }
}

export default connect(state => state)(Index);
