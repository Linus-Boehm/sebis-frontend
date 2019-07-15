import React from "react";
import DatePicker from "react-datepicker";
import { FaAlignLeft, FaCalendarAlt } from "react-icons/fa"
import BaseButton from "../../utils/buttons/BaseButton";
import GoalAvatar from "../../utils/user/GoalAvatar";
import Link from 'next/link'
import UserAvatar from "../../utils/user/UserAvatar";
import AgreementTitle from "../../agreements/common/AgreementTitle";
import moment from "moment";
import {mdiChevronLeft} from "@mdi/js";
import Icon from "@mdi/react";
import GoalProgress from "./GoalProgress";
import {getCurrentOverallProgress, getMaximumProgress} from "../../../services/Goal/GoalProgressService";

class ProgressInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }

  onChangeAndSave = async (changes) => {
    await this.onChange(changes);
    await this.props.onUpdateGoal()
  };

  onChange = async (changes) => {
    await this.props.onChangeInput(changes);
  };

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  getAgreementById(agreement) {
    if(this.props.agreements[agreement] != null) {
      return this.props.agreements[agreement]
    }
    return null
  }

  render() {
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description } = selectedGoal;

    const agreement = selectedGoal.related_model === "ObjectiveAgreement" && this.getAgreementById(selectedGoal.related_to);
    const reviewer = agreement ? this.props.userList[agreement.reviewer] : null;
    const assignee = agreement ? this.props.userList[agreement.assignee] : null;

    const maxBonus = agreement != null ? parseFloat(agreement.bonus) * parseFloat(selectedGoal.oa_weight) / 100 : 0;
    const all_progress = getCurrentOverallProgress(selectedGoal);
    const maximum_progress = getMaximumProgress(selectedGoal);
    const bonus = all_progress / maximum_progress * maxBonus;

    return (
      <div>
        <div className={"ProgressHeader"}>
          <div className="flex h-full">
            <h2 className="has-text-grey-darker column title">
              {selectedGoal.title}
            </h2>

            <div className="actions column justify-end text-right actions">
              <BaseButton className={"mr-2"}>Confirm Progress</BaseButton>
              <BaseButton type={"is-dark"}>End Review</BaseButton>
            </div>
          </div>

          <div className={"flex flex-wrap h-full"}>
            {selectedGoal.assignee &&
              <div className={"flex-none w-2/6 field"}>
                <GoalAvatar className="m-1 float-left" selectedGoal={selectedGoal}/>
                <h4 className={"field-info text-gray-400"}>Assigned to</h4>
                <h4 className={"field-value"}>{selectedGoal.assignee.firstname} {selectedGoal.assignee.lastname}</h4>
                <div className={"clearfix"}/>
              </div>
            }

            {agreement &&
              <>
                <div className={"flex-none w-2/6 field"}>
                  <FaCalendarAlt size={45} className={"float-left"} />
                  <h4 className={"field-info text-gray-400"}>End date</h4>
                  <h4 className={"field-value"}>{moment(agreement.end_date).format("YYYY-MM-DD")}</h4>
                  <div className={"clearfix"}/>
                </div>

                <div className={"flex-none w-2/6 field"}>
                  <h4 className={"field-info text-gray-400"}>Related to</h4>
                  <h4 className={"field-value"}>
                    <Link href={`/app/agreement-info?id=${agreement._id}`}>
                      <a>
                        <AgreementTitle agreement={agreement} assignee={assignee} />
                      </a>
                    </Link>
                  </h4>
                </div>

                <div className={"flex-none w-2/6 field"}>
                  <UserAvatar className="m-1 float-left" size={45} user={reviewer}/>
                  <h4 className={"field-info text-gray-400"}>Reviewed by</h4>
                  <h4 className={"field-value"}>{reviewer.firstname} {reviewer.lastname}</h4>
                  <div className={"clearfix"}/>
                </div>

                <div className={"flex-none w-2/6 field"}>
                  <h4 className={"field-info text-gray-400"}>Bonus</h4>
                  <h4 className="field-value">{bonus}$ / {maxBonus}$</h4>
                </div>
              </>
            }

            <div className={"flex-none w-2/6 field"}>
              <h4 className={"field-info text-gray-400"}>Progress</h4>
              <GoalProgress className="field-value" goal={selectedGoal}/>
            </div>
          </div>

          {selectedGoal.description &&
            <div className={"description"}>
              <FaAlignLeft className={"float-left mt-1"}/>
              <p className={"whitespace-pre-line ml-8"}>{selectedGoal.description}</p>
              <div className={"clearfix"}/>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default ProgressInfo;
