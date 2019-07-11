import React from 'react';
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
        <div className="flex h-full">
          <div className="container">
            <div className="content">
              <AgreementInfoContainer queryId={this.props.queryId}/>
            </div>
          </div>
          {this.props.selectedGoal._id && (
            <div className="column is-one-third border-l-2 border-gray-200">
              <GoalInfoContainer/>
            </div>
          )}
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