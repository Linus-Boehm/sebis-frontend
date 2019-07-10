import React from 'react';
import AgreementsList from "./list/AgreementsList";

class AgreementsDashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      fetches,

      fetchMyAgreements,

      user
    } = this.props;

    const userId = (user || {})._id;

    // Used to filter outdated/stale agreements in store
    const lastFetchTime = (fetches[ "my" ] || {}).assignedAt || new Date();

    return (
      <div>
        <AgreementsList
          title="My Agreements"
          fetchItems={fetchMyAgreements}

          filter={(agreement) => (
            agreement.assignedAt >= lastFetchTime &&
            (agreement.assignee === userId || agreement.reviewer === userId)
          )}
        />
      </div>
    )
  }
}

export default AgreementsDashboard