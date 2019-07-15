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
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import ConfirmModal from "../utils/modal/ConfirmModal";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { connect } from "react-redux";
import AgreementUserDropdown from "./AgreementUserDropdown";
import * as AgreementActions from "../../store/actions/agreements";
import Router from "next/router";

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
    this.state = {
      isDeleteModalVisible: false
    };
  }

  onChange = async changes => {
    await this.props.onChangeInput(changes);
  };

  handleDelete = async () => {
    await this.props.dispatch(
      AgreementActions.deleteAgreement(this.props.selectedAgreement)
    );
    Router.push("/app/agreements");
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
  setDeleteModalVisibility = (isDeleteModalVisible = false) => {
    this.setState({ isDeleteModalVisible });
  };
  getMyConfirmState = () => {
    if (
      this.props.auth.user &&
      this.props.auth.user._id === this.props.selectedAgreement.reviewer
    ) {
      return this.props.selectedAgreement.reviewer_confirmed;
    } else {
      return this.props.selectedAgreement.assignee_confirmed;
    }
  };
  updateConfirm = async () => {
    if (this.props.auth.user._id === this.props.selectedAgreement.reviewer) {
      await this.onChange({
        reviewer_confirmed: !this.props.selectedAgreement.reviewer_confirmed
      });
    } else {
      await this.onChange({
        assignee_confirmed: !this.props.selectedAgreement.assignee_confirmed
      });
    }
    this.props.onUpdateAgreement();
  };

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
        <div className="flex">
          <Link href="/app/agreements">
            <div className="cursor-pointer hover:text-blue-300 flex">
              <span className="pt-1">
                <Icon size="1em" path={mdiChevronLeft} />
              </span>
              <span className=""> Back to List</span>
            </div>
          </Link>
          <button
            className="button is-danger ml-auto"
            title={"Delete Objective Agreement"}
            disabled={!this.props.isEditable}
            onClick={() => {
              this.setDeleteModalVisibility(true);
            }}
          >
            <FaTrashAlt />
          </button>
          <ConfirmModal
            title="Confirm Delete"
            active={this.state.isDeleteModalVisible}
            confirmButtonType="is-danger"
            confirmButtonText="Delete"
            onCloseModal={() => {
              this.setDeleteModalVisibility(false);
            }}
            onConfirm={this.handleDelete}
          >
            Are you sure to delete the Objective Agreement?
          </ConfirmModal>
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
                inputProps={{ disabled: !this.props.isEditable }}
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
                inputProps={{ disabled: !this.props.isEditable }}
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
            disabled={!this.props.isEditable}
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
              disabled={!this.props.isEditable}
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
              disabled={!this.props.isEditable}
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
          <AgreementGoalsList
            disableGoalAdd={!this.props.isEditable}
            agreement={selectedAgreement}
          />
        </div>
        <br />
        <div className="flex w-full ">
          <button
            disabled={
              selectedAgreement.assignee_confirmed &&
              selectedAgreement.reviewer_confirmed
            }
            className={
              "button ml-auto " +
              (this.getMyConfirmState() ? "is-light" : "is-primary")
            }
            onClick={e => {
              this.updateConfirm();
            }}
          >
            {this.getMyConfirmState()
              ? "Cancel Confirmation"
              : "Confirm Agreement"}
          </button>
        </div>

        <CommentBox relatedTo={selectedAgreement._id} />
      </div>
    );
  }
}

export default connect(state => state)(AgreementInfo);
