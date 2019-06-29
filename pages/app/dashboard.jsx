import React from 'react';
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import GoalsDashboardContainer from "~/components/goals/GoalsDashboardContainer";

class Dashboard extends React.Component {


  static async getInitialProps({ store }) {

    return {};
  }


  render() {

    return (
      <DefaultLayout forceAuth={true}>
        <div className="container">
          <div className="content">
            <GoalsDashboardContainer />
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

export default connect(state => state, {})(Dashboard);