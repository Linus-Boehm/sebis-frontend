import React from "react";
import {connect} from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {
    assignTeam,
    createTeam,
    fetchTeam,
    fetchTeamById,
    fetchTeams, removeTeamMember,
    resetTeam,
    updateTeam,
    updateTeamMember
} from "../../../store/actions/teams";
import Router from "next/router";
import TeamsForm from "../../../components/teams/TeamsForm";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import Link from "next/link";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import ConfirmModal from "../../../components/utils/modal/ConfirmModal";
import UserSearchSelect from "../../../components/user/UserSearchSelect";
import {filter, indexOf} from "lodash";
import UserAvatar from "../../../components/utils/user/UserAvatar";
import {fetchUsers} from "../../../store/actions/users";


class EditTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            selectedTeamUser: {},
            filteredUsers: [],
            userSearchInput: "",
            addForm: {
                user: false,
                role: "member"
            },

        };
    }

    onAddTeamMember = async (e) => {
        e.preventDefault()
        this.props.dispatch(updateTeamMember(this.props.currentId, {
            user_id: this.state.addForm.user._id,
            role: this.state.addForm.role
        }))
        this.setState({
            ...this.state,
            userSearchInput: "",
            addForm: {
                user: false,
                role: "member"
            },
        })

    }

    onSearchInput = (e) => {
        //TODO debounce Requests
        e.preventDefault()
        let val = e.target.value
        let rgxp = new RegExp(val, "gi")
        let team = this.props.teams.teamList[this.props.teamId] || this.props.teams.team;
        let userIds = team.team_roles.map(user => {
            return user.user_id
        })
        let res = filter(Object.values(this.props.users.userList), (user) => {
            return (user.firstname.match(rgxp) || user.lastname.match(rgxp)) && indexOf(userIds, user._id) === -1
        })
        this.setState({
            ...this.state,
            userSearchInput: val,
            filteredUsers: res
        })


    }
    handleAdd = (e, user) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            addForm: {
                ...this.state.addForm,
                user: user
            }
        });
    }
    closeModal = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            modalActive: false
        });
    };

    openModal = (e, role) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            modalActive: true,
            selectedTeamUser: role
        });
    };

    static async getInitialProps({query}) {
        return {currentId: query.id};
    }

    async componentDidMount() {
        console.log("Init Teams");
        await this.props.dispatch(resetTeam());
        await this.props.dispatch(fetchTeamById(this.props.currentId));
        await this.props.dispatch(fetchUsers());
    }


    handleOnSubmit = async e => {
        e.preventDefault();
        try {
            await this.props.dispatch(
                updateTeam(this.props.currentId, this.props.teams.team)
            );
            //Notification.success("Team update successfull")
            Router.push("/admins/teams");
        } catch (e) {
            console.error(e);
            //Notification.error("Error on saving Team")
            //TODO add fancy notification
        }
    };


    renderMemberTable() {
        const userItems = this.props.teams.team.team_roles.map(role => {
            let user = this.props.users.userList[role.user_id];
            return (
                <tr key={role.user_id}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                        {role.role === "leader" ?
                            (
                                <span className="tag is-info">Team Leader</span>
                            ) : (
                                <span className="tag is-light">Member</span>
                            )
                        }
                    </td>
                    <td>
                        <ButtonGroup>

                            <EditButton type="button" onClick={e => {
                                this.openModal(e, role)
                            }}/>

                            <DeleteButton type="button" onClick={e => {
                                e.preventDefault()
                                this.props.dispatch(removeTeamMember(this.props.currentId,role.user_id))
                            }}/>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        });
        return (
            <div className="w-full mt-8">
                <h4>Team Members</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{userItems}</tbody>
                </table>
            </div>
        )
    }

    render() {

        return (
            <DefaultLayout forceAuth={true}>
                <div className="container">
                    <div className="content">
                        <div className="flex">
                            <h1>Edit Team</h1>
                        </div>
                        <form onSubmit={this.handleOnSubmit}>
                            <TeamsForm/>


                            <ButtonGroup className="mt-8">
                                <Link href={"/admin/teams"}>
                                    <a className="button is-warning">Cancel</a>
                                </Link>
                                <button type="submit" className="button is-primary">
                                    Save
                                </button>
                            </ButtonGroup>
                        </form>
                        {this.props.teams.team && this.props.teams.team.team_roles && this.props.teams.team.team_roles.length > 0 ? (
                            <div className="w-full">
                                {this.renderMemberTable()}
                            </div>
                        ) : (
                            <div>
                                No Teammembers yet
                            </div>
                        )}
                        <div className="mt-8">
                            <h4>Add New Team Member</h4>
                            <div className="flex">
                                {this.state.addForm.user ? (
                                    <div className="flex pr-4">
                                        <UserAvatar user={this.state.addForm.user}/>
                                        <span
                                            className="pl-4 pt-2">{this.state.addForm.user.firstname} {this.state.addForm.user.lastname}</span>
                                    </div>
                                ) : (
                                    <UserSearchSelect value={this.state.userSearchInput}
                                                      onChange={this.onSearchInput}
                                                      onSelect={this.handleAdd}
                                                      filteredUsers={this.state.filteredUsers}/>
                                )}

                                <div className="select">
                                    <select name="role" onChange={(e) => {
                                        this.setState({
                                            ...this.state,
                                            addForm: {...this.state.addForm, role: e.target.value}
                                        })
                                    }} value={this.state.addForm.role}>
                                        <option value="member">Team Member</option>
                                        <option value="leader">Team Leader</option>
                                    </select>
                                </div>
                                <button className="button is-link ml-4" disabled={!this.state.addForm.user}
                                        onClick={this.onAddTeamMember}>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmModal
                    title="Edit User Role"
                    active={this.state.modalActive}
                    confirmButtonType="is-success"
                    confirmButtonText="Save"
                    onCloseModal={this.closeModal}
                >
                    <div className="select">
                        <select>
                            <option value="member">Team Member</option>
                            <option value="leader">Team Leader</option>
                        </select>
                    </div>
                </ConfirmModal>
            </DefaultLayout>
        );
    }
}

export default connect(state => state)(EditTeam);
