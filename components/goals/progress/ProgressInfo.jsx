import React from "react";
import { FaAlignLeft, FaCalendarAlt } from "react-icons/fa";
import BaseButton from "../../utils/buttons/BaseButton";
import GoalAvatar from "../../utils/user/GoalAvatar";
import Link from "next/link";
import UserAvatar from "../../utils/user/UserAvatar";
import AgreementTitle from "../../agreements/common/AgreementTitle";
import moment from "moment";
import GoalProgress from "./GoalProgress";
import {
  getCurrentOverallProgress,
  getMaximumProgress, isProgressToReview
} from "../../../services/Goal/GoalProgressService";
import ProgressForm from "./ProgressForm";

class ProgressInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeProgress = async changes => {
    await this.props.onChangeProgressInput(changes);
  };

  onSaveProgress = async () => {
    await this.props.onSaveProgress();
  };

  addNewProgress = async () => {
    await this.props.addNewProgress();
  };

  reviewFull = async() => {
    await this.props.reviewFull();
  };

  getAgreementById(agreement) {
    if (this.props.agreements[agreement] != null) {
      return this.props.agreements[agreement];
    }
    return null;
  }

  render() {
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description } = selectedGoal;

    const agreement =
      selectedGoal.related_model === "ObjectiveAgreement" &&
      this.getAgreementById(selectedGoal.related_to);
    const reviewer = agreement ? this.props.userList[agreement.reviewer] : {};
    const assignee = agreement ? this.props.userList[agreement.assignee] : {};
    const currentUser = this.props.user ? this.props.user : {};
    const canReview = reviewer == null || currentUser._id === reviewer._id;

    const weight = selectedGoal.oa_weight
      ? parseFloat(selectedGoal.oa_weight)
      : 0;
    const maxBonus =
      agreement != null && agreement.bonus ? (parseFloat(agreement.bonus) * weight) / 100 : 0;
    const all_progress = getCurrentOverallProgress(selectedGoal);
    const maximum_progress = getMaximumProgress(selectedGoal);
    const bonus = (all_progress / maximum_progress) * maxBonus;
    const shouldReviewAll = isProgressToReview(selectedGoal);

    return (
      <div>
        <div className={"ProgressHeader cursor-default"}>
          <div className="flex w-full pb-4 -mx-1">
            <h2 className="has-text-grey-darker flex-1 title mt-3 mx-1 ">
              {title}
            </h2>

            {canReview &&
              <div className="ml-auto text-right">
                <BaseButton disabled={!shouldReviewAll} onClick={this.reviewFull} className={"mx-1"}>Confirm full Progress</BaseButton>
              </div>
            }
          </div>

          <div className={"flex flex-wrap h-full"}>
            {selectedGoal && selectedGoal.assignee && (
              <div className={"flex-none w-2/6 field"}>
                <GoalAvatar
                  className="m-1 float-left"
                  selectedGoal={selectedGoal}
                />
                <h4 className={"field-info text-gray-400"}>Assigned to</h4>
                <h4 className={"field-value"}>
                  {selectedGoal.assignee.firstname}{" "}
                  {selectedGoal.assignee.lastname}
                </h4>
                <div className={"clearfix"} />
              </div>
            )}

            {agreement && (
              <>
                <div className={"flex-none w-2/6 field"}>
                  <FaCalendarAlt
                    size={30}
                    color={"#718096"}
                    className={" float-left ml-8"}
                  />
                  <h4 className={"field-info text-gray-400"}>End date</h4>
                  <h4 className={"field-value"}>
                    {moment(agreement.end_date).format("YYYY-MM-DD")}
                  </h4>
                  <div className={"clearfix"} />
                </div>

                <div className={"flex-none w-2/6 field"}>
                  <h4 className={"field-info text-gray-400"}>Related to</h4>
                  <h4 className={"field-value"}>
                    <Link href={`/app/agreement-info?id=${agreement._id}`}>
                      <a>
                        <AgreementTitle
                          agreement={agreement}
                          assignee={assignee}
                        />
                      </a>
                    </Link>
                  </h4>
                </div>

                <div className={"flex-none w-2/6 field"}>
                  <UserAvatar
                    className="m-1 float-left"
                    size={45}
                    user={reviewer}
                  />
                  <h4 className={"field-info text-gray-400"}>Reviewed by</h4>
                  <h4 className={"field-value"}>
                    {reviewer.firstname} {reviewer.lastname}
                  </h4>
                  <div className={"clearfix"} />
                </div>

                <div className={"flex-none w-2/6 field"}>
                  <h4 className={"field-info text-gray-400"}>Bonus</h4>
                  <h4 className="field-value">
                    {Math.round(bonus * 100) / 100.0}$ / {Math.round(maxBonus * 100) / 100.0}$
                  </h4>
                </div>
              </>
            )}

            <div className={"flex-none w-2/6 field"}>
              <h4 className={"field-info text-gray-400"}>Progress</h4>
              <GoalProgress className="field-value" goal={selectedGoal} />
            </div>
          </div>

          {description && (
            <div className={"description"}>
              <FaAlignLeft className={"float-left mt-1"} />
              <p className={"whitespace-pre-line ml-8"}>{description}</p>
              <div className={"clearfix"} />
            </div>
          )}

          <ProgressForm
            canReview={canReview}
            progress={this.props.selectedGoalProgress}
            onChangeProgress={this.onChangeProgress}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default ProgressInfo;
