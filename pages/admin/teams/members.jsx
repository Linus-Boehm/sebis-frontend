import React from 'react';
import {connect} from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {
    assignTeam,
    createTeam,
    fetchTeam,
    fetchTeamById,
    fetchTeams,
    resetTeam,
    updateTeam
} from "../../../store/actions/teams";
import Router from 'next/router'
import TeamsForm from "../../../components/teams/TeamsForm";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import Link from 'next/link'
import Icon from "./index";
import {mdiPlusCircleOutline} from "@mdi/js";
class Members extends React.Component {

    static async getInitialProps ({query}) {


        return { currentId: query.id }
    }
    async componentDidMount() {
        console.log("Init Teams")
        await this.props.dispatch(resetTeam());
        await this.props.dispatch(fetchTeamById(this.props.currentId));

    }
    handleOnSubmit = async (e) =>{
        e.preventDefault()
        try{
            await this.props.dispatch(updateTeam(this.props.currentId, this.props.teams.team))
            //Notification.success("Team update successfull")
            Router.push('/admins/teams')
        }catch (e) {
            console.error(e)
            //Notification.error("Error on saving Team")
            //TODO add fancy notification
        }
    }


    render() {
        return <DefaultLayout forceAuth={true}>
            <div className="container">
                <div className="content">
                    <h1>Teammembers for {this.props.teams.team.name}</h1>
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
            </div>

        </DefaultLayout>;
    }
}
export default connect(state => state)(Members);