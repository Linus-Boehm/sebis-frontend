import React from 'react';
import {connect} from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import {fetchTeams} from "~/store/actions/teams";

class Dashboard extends React.Component {


    static async getInitialProps({store}) {

        return {};
    }



    render() {

        return <DefaultLayout forceAuth={true}>
            <div className="container">

                <div className="content">
                    <h1>My Goals</h1>
                </div>
            </div>

        </DefaultLayout>;
    }
}
export default connect(state => state,{})(Dashboard);