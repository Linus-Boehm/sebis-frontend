import React from 'react';
import Router from 'next/router'

class AgreementInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedAgreement = {}
    } = this.props;

    const {
      _id
    } = selectedAgreement;

    return (
      <div>
        <div className="cursor-pointer hover:text-blue-300" onClick={() => Router.back()}>Go Back</div>
        <div>{_id}</div>
      </div>
    )
  }
}

export default AgreementInfo