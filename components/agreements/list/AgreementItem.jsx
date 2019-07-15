import React from "react";
import Link from "next/link";
import AgreementTitle from "../common/AgreementTitle";

class AgreementItem extends React.Component {
  getTag = () => {
    const agreement = this.props.agreement;
    if (agreement.reviewer_confirmed && agreement.assignee_confirmed) {
      return <span class="tag is-success w-32">Running</span>;
    } else if (agreement.end_date < new Date()) {
      return <span class="tag is-light w-32">Finished</span>;
    } else if (agreement.reviewer_confirmed) {
      return (
        <span
          class="tag w-32"
          style={{ backgroundColor: "#61E8E1", color: "#ffff" }}
        >
          Open Confirmation
        </span>
      );
    } else if (agreement.assignee_confirmed) {
      return (
        <span
          class="tag w-32"
          style={{ backgroundColor: "#61E8E1", color: "#ffff" }}
        >
          Open Confirmation
        </span>
      );
    } else {
      return <span class="tag is-info w-32">Open</span>;
    }
  };

  render() {
    const { agreement = {}, reviewer = {}, assignee = {} } = this.props;

    return (
      <Link href={`/app/agreement-info?id=${agreement._id}`}>
        <div
          className={`flex items-center bg-gray-200 hover:bg-gray-300 mb-3 p-3 cursor-pointer`}
        >
          <div className="ml-1 flex-grow select-none">
            <span
              className={
                this.props.size_class !== undefined
                  ? this.props.size_class
                  : "is-size-5"
              }
            >
              <AgreementTitle
                agreement={agreement}
                assignee={assignee}
                reviewer={reviewer}
              />
            </span>
          </div>
          {this.getTag()}
        </div>
      </Link>
    );
  }
}

export default AgreementItem;
