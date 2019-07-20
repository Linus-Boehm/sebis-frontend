import React from 'react';
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import AgreementsDashboardContainer from "~/components/agreements/AgreementsDashboardContainer";

class Dashboard extends React.Component {


  static async getInitialProps({ store }) {
    return {};
  }


  render() {

    return (
      <DefaultLayout forceAuth={true}>
        <div className="w-full h-full pt-4">
          <div className="column">
            <div className="content">
              <AgreementsDashboardContainer/>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  const {
    selectedGoal,
  } = state.goals;

  return {
    selectedGoal: selectedGoal,
  };
}


export default connect(mapStateToProps)(Dashboard);