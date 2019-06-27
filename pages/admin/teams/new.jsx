import React from 'react';
import {connect} from "react-redux";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {assignTeam, createTeam, fetchTeams, resetTeam} from "../../../store/actions/teams";
import TeamsForm from "../../../components/teams/TeamsForm";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import Link from 'next/link'
class New extends React.Component {


    static async getInitialProps({store}) {
        console.log("Init Teams")
        await store.dispatch(resetTeam());
        return {};
    }
     handleOnSubmit = async (e) =>{
        e.preventDefault()
        try{
            await this.props.dispatch(createTeam(this.props.teams.team))
        }catch (e) {
            console.error(e)
            //TODO add fancy notification
        }
    }


    render() {
        return <DefaultLayout forceAuth={true}>
            <div className="container">

                <div className="content">
                    <h1>New Team</h1>
                    <form onSubmit={this.handleOnSubmit}>
                        <TeamsForm/>
                        <ButtonGroup className="mt-8">
                            <Link href={'/admin/teams'}>
                                <a className="button is-warning">Cancel</a>
                            </Link>
                            <button type="submit" className="button is-primary">Create</button>
                        </ButtonGroup>

                    </form>

                </div>
            </div>

        </DefaultLayout>;
    }
}
export default connect(state => state)(New);