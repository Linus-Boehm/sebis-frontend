import React from 'react';
import Link from 'next/link'


class AgreementItem extends React.Component {

  render() {
    const {
      agreement

    } = this.props;

    const title = 'Objective Agreement - ' + agreement._id

    return (
      <Link href={`/app/agreement-info?id=${agreement._id}`}>
        <div
          className={`flex items-center bg-gray-200 hover:bg-gray-300 mb-2 p-2 cursor-pointer`}
        >
          <div className="flex-grow ml-3 select-none">
            {title}
          </div>
          <div className="pr-2">
            AS
          </div>
        </div>
      </Link>
    )
  }
}

export default AgreementItem