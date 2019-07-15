import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import AgreementInfoContainer from "../../components/agreements/AgreementInfoContainer";
import GoalInfoContainer from "../../components/goals/GoalInfoContainer";

class Dashboard extends React.Component {
  static async getInitialProps({ query }) {
    return {
      queryId: query.id
    };
  }

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <AgreementInfoContainer queryId={this.props.queryId} />
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  const { selectedGoal } = state.goals;

  return {
    selectedGoal: selectedGoal
  };
}

export default connect(mapStateToProps)(Dashboard);
