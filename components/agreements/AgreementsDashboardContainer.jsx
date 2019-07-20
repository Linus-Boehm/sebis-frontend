import React from "react";
import { connect } from "react-redux";
import * as AgreementActions from "../../store/actions/agreements";
import AgreementsDashboard from "./AgreementsDashboard";
import { orderBy } from "lodash";

class AgreementsDashboardContainer extends React.Component {
  fetchMyAgreements = async () => {
    try {
      await this.props.dispatch(AgreementActions.fetchMyAgreements());
    } catch (e) {
      console.log(e);
    }
  };

  // ---

  async componentDidMount() {
    this.fetchMyAgreements();
    this.interval = setInterval(() => {
      this.fetchMyAgreements()
    }, 10000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    return <AgreementsDashboard {...this.props} />;
  }
}

function filterMyAgreements({ agreements, user, fetches }) {
  const userId = (user || {})._id;

  // Used to filter outdated/stale agreements in store
  const lastFetchTime = (fetches[ "my" ] || {}).assignedAt || new Date();

  return orderBy(
    agreements.filter(
      agreement =>
        agreement.assignedAt >= lastFetchTime &&
        (agreement.assignee === userId || agreement.reviewer === userId)
    ),
    [ "start_date" ],
    [ "desc" ]
  );
}


function mapStateToProps(state) {
  const { agreements, fetches } = state.agreements;

  const { user } = state.auth;

  const { userList } = state.users;


  const myAgreements = filterMyAgreements({
    agreements: Object.values(agreements),
    user,
    fetches
  });


  return {
    agreements: myAgreements,
    userList,
  };
}

export default connect(mapStateToProps)(AgreementsDashboardContainer);
