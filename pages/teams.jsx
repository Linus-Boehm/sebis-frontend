import React from 'react';
import {connect} from "react-redux";
import DefaultLayout from "../components/layout/DefaultLayout";
import {fetchTeams} from "../store/actions/teams";

class Teams extends React.Component {


    static async getInitialProps({store}) {
        console.log("Init Teams")
        await store.dispatch(fetchTeams());
        return {};
    }



    render() {
        console.log("State",this.props);
        const teamItems = this.props.teams.teams.map(team => (
            <div key={team.id}>
                <h3>{team.name}</h3>
            </div>
        ));
        return <DefaultLayout>
            <div className="container">

                <div className="content">
                    <h1>Teams</h1>
                    {teamItems}
                </div>
            </div>

        </DefaultLayout>;
    }
}
export default connect(state => state,{})(Teams);