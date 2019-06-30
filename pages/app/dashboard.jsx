import React from 'react';
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import GoalsDashboardContainer from "~/components/goals/GoalsDashboardContainer";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";

class Dashboard extends React.Component {


  static async getInitialProps({ store }) {
    return {};
  }


  render() {

    return (
      <DefaultLayout forceAuth={true}>
        <div className="flex">
          <div className="column">
            <div className="content">
              <GoalsDashboardContainer/>
            </div>
          </div>
          {this.props.selectedGoal._id && <div className="column is-one-third">
            <GoalInfoContainer/>
          </div>}
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