import React from "react";
import Link from "next/link";
import AgreementTitle from "./common/AgreementTitle";
import UserAvatar from "../utils/user/UserAvatar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import AgreementGoalsList from "../goals/list/AgreementGoalsList";
import TextareaAutosize from "react-autosize-textarea";
import { updateAgreement } from "../../store/actions/agreements";
import CommentBox from "../layout/Comment/CommentBox";
import CurrencyInput from "react-currency-input";
import { isNull } from "util";

import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { connect } from "react-redux";
import AgreementUserDropdown from "./AgreementUserDropdown";

const AvatarWithName = ({ user, title }) =>
  user && user._id ? (
    <div className="flex items-center">
      <div>
        <UserAvatar user={user} />
      </div>
      <div className="flex flex-col justify-center ml-2">
        <div style={{ lineHeight: "1.5rem" }}>
          <span className="is-size-6 text-gray-400">{title}</span>
        </div>
        <div style={{ lineHeight: "1.5rem" }}>
          <span className="is-size-5 font-bold">
            {user.firstname} {user.lastname}
          </span>
        </div>
      </div>
    </div>
  ) : null;

class AgreementInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = async changes => {
    await this.props.onChangeInput(changes);
  };

  getAssignee() {
    const { selectedAgreement = {}, userList = {} } = this.props;

    const assignee = userList[selectedAgreement.assignee];
    if (assignee !== undefined && assignee !== null) {
      return <AvatarWithName user={assignee} title="Employee" />;
    } else {
      return (
        <div className="pl-4">
          <AgreementUserDropdown
            onChangeInput={this.props.onChangeInput}
            onUpdateAgreement={this.props.onUpdateAgreement}
          />
        </div>
      );
    }
  }

  render() {
    const { selectedAgreement = {}, userList = {} } = this.props;

    const {
      _id,
      start_date,
      end_date,
      description,
      bonus,
      max_bonus
    } = selectedAgreement;

    const assignee = userList[selectedAgreement.assignee];
    const reviewer = userList[selectedAgreement.reviewer];

    const startDate = start_date ? new Date(start_date) : null;
    const endDate = end_date ? new Date(end_date) : null;

    return (
      <div>
        <div>
          <Link href="/app/agreements">
            <div className="cursor-pointer hover:text-blue-300 flex">
              <span className="pt-1">
                <Icon size="1em" path={mdiChevronLeft} />
              </span>
              <span className=""> Back to List</span>
            </div>
          </Link>
        </div>
        <div className="mt-3">
          <span className="is-size-4 font-bold">
            <AgreementTitle agreement={selectedAgreement} assignee={assignee} />
          </span>
        </div>
        <div className="columns p-0 pt-3">
          <div className="column">{this.getAssignee()}</div>

          <div className="column">
            <div>
              <span className="is-size-6 text-gray-400">Start date</span>
            </div>
            <div className="day-picker-input">
              <DayPickerInput
                placeholder="None"
                value={startDate}
                style={{ fontWeight: "bold" }}
                dayPickerProps={{
                  selectedDays: [startDate, { from: startDate, to: endDate }],
                  disabledDays: { after: endDate },
                  toMonth: endDate,

                  modifiers: { start: startDate, end: endDate }

                  //onDayClick: () => this.endDatePicker.getInput().focus(),
                }}
                hideOnDayClick={false}
                onDayChange={async date => {
                  await this.onChange({ start_date: date });
                  this.props.onUpdateAgreement();
                }}
              />
            </div>
          </div>
          <div className="column">
            <div>
              <span className="is-size-6 text-gray-400">End date</span>
            </div>
            <div className="day-picker-input">
              <DayPickerInput
                placeholder="None"
                value={endDate}
                dayPickerProps={{
                  selectedDays: [endDate, { from: startDate, to: endDate }],
                  disabledDays: { before: startDate },

                  modifiers: { start: startDate, end: endDate },

                  fromMonth: startDate,
                  month: startDate
                }}
                onDayChange={async date => {
                  await this.onChange({ end_date: date });
                  this.props.onUpdateAgreement();
                }}
                hideOnDayClick={false}
                ref={el => (this.endDatePicker = el)}
              />
            </div>
          </div>
          <div className="column">
            <AvatarWithName user={reviewer} title="Manager" />
          </div>
        </div>

        <div>
          <span
            className="s-size-6 text-gray-400 "
            style={{ marginLeft: "55px" }}
          >
            Description
          </span>
        </div>

        <div>
          <TextareaAutosize
            rows={4}
            style={{ marginLeft: "55px", width: "80%" }}
            className="input editable-input-and-show-value"
            name="description"
            placeholder="Additonal details..."
            onBlur={this.props.onUpdateAgreement}
            onChange={e => this.onChange({ [e.target.name]: e.target.value })}
            value={description ? description : ""}
          />
        </div>
        <div className="columns p-0 pt-3">
          <div className="column is-2" style={{ marginLeft: "55px" }}>
            <span className="s-size-6 text-gray-400 ">
              Bonus at 100% fulfillment
            </span>
          </div>
          <div className="column is-2" style={{ marginLeft: "35px" }}>
            <CurrencyInput
              precision="0"
              prefix="$"
              style={{ fontWeight: "bold" }}
              name="bonus"
              className="input editable-input-and-show-value"
              onBlur={this.props.onUpdateAgreement}
              onChangeEvent={(e, maskedvalue, floatvalue) =>
                this.onChange({ bonus: floatvalue })
              }
              value={bonus ? bonus : ""}
            />
          </div>

          <div className="column is-2 is-offset-1 ">
            <span className="s-size-6 text-gray-400 ">Maximum Bonus</span>
          </div>

          <div className="column is-2 is-offset-1">
            <CurrencyInput
              precision="0"
              prefix="$"
              className="input editable-input-and-show-value"
              style={{ fontWeight: "bold" }}
              name="max_bonus"
              onBlur={this.props.onUpdateAgreement}
              onChangeEvent={(e, maskedvalue, floatvalue) =>
                this.onChange({ max_bonus: floatvalue })
              }
              value={max_bonus ? max_bonus : ""}
            />
          </div>
        </div>
        <div>
          <AgreementGoalsList agreement={selectedAgreement} />
        </div>
        <br />
        <div className="flex w-full ">
          <button className="button is-primary ml-auto">
            Confirm Agreement
          </button>
        </div>

        <CommentBox relatedTo={selectedAgreement._id} />
      </div>
    );
  }
}

export default connect(state => state)(AgreementInfo);
