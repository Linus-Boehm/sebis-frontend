import React from 'react';
import Link from 'next/link'
import AgreementTitle from '../common/AgreementTitle'


class AgreementItem extends React.Component {

  render() {
    const {
      agreement = {},
      reviewer = {},
      assignee = {}
    } = this.props;


    return (
      <Link href={`/app/agreement-info?id=${agreement._id}`}>
        <div
          className={`flex items-center bg-gray-200 hover:bg-gray-300 mb-3 p-3 cursor-pointer`}
        >
          <div className="ml-1 flex-grow select-none">
            <span className={this.props.size_class !== undefined ? this.props.size_class : "is-size-5"}>
            <AgreementTitle
              agreement={agreement}
              assignee={assignee}
            />
            </span>
          </div>
          <div>
            <span className="is-size-7 text-gray-600">Id: {agreement._id}</span>
          </div>
        </div>
      </Link>
    )
  }
}

export default AgreementItem
