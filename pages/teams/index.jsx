import React from 'react';
import {connect} from "react-redux";
import DefaultLayout from "../../components/layout/DefaultLayout";
import {fetchTeams} from "../../store/actions/teams";
import Link from 'next/link'
import * as actions from "../../store/actions/auth";
import Router from 'next/router'
class Index extends React.Component {

    async componentDidMount() {
        await this.props.dispatch(fetchTeams());

        return {};
    }
    

    render() {
        const teamItems = Object.values(this.props.teams.teamList).map(team => (
            <div key={team.id}>
                <h3>{team.name}</h3>
            </div>
        ));
        return <DefaultLayout forceAuth={true}>
            <div className="container">
                <Link prefetch href="/teams/new">
                    <button className="button is-primary">Neu erstellen</button>
                </Link>
                <div className="content">
                    <h1>Teams</h1>
                    {teamItems}
                </div>
            </div>

        </DefaultLayout>;
    }
}
export default connect(state => state)(Index);