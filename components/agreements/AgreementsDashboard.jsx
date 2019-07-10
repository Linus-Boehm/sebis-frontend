import React from 'react';
import AgreementsList from "./list/AgreementsList";

class AgreementsDashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      agreements
    } = this.props;

    return (
      <div>
        <AgreementsList
          title="My Agreements"

          agreements={agreements}
        />
      </div>
    )
  }
}

export default AgreementsDashboard