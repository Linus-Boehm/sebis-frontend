import React, { Fragment } from "react";
import Link from "next/link";
import AgreementTitle from "./common/AgreementTitle";
import UserAvatar from "../utils/user/UserAvatar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import AgreementGoalsList from "../goals/list/AgreementGoalsList";
import TextareaAutosize from "react-autosize-textarea";
import { updateAgreement } from "../../store/actions/agreements";
import CommentBox from "../utils/comment/CommentBox";
import CurrencyInput from "react-currency-input";
import { isNull } from "util";
import { FaTrashAlt, FaTimes, FaPrint } from "react-icons/fa";
import ConfirmModal from "../utils/modal/ConfirmModal";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { connect } from "react-redux";
import AgreementUserDropdown from "./AgreementUserDropdown";
import * as AgreementActions from "../../store/actions/agreements";
import Router from "next/router";
import * as GoalActions from "../../store/actions/goals";

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
      isDeleteModalVisible: false,
      isConfirmModalVisible: false,
      startDateMissing: false,
      endDateMissing: false
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

  setConfirmModalVisibility = (isConfirmModalVisible = false) => {
    this.setState({ isConfirmModalVisible });
  };
  getMyConfirmState = () => {
    if (
      this.props.currentUser &&
      this.props.currentUser._id === this.props.selectedAgreement.reviewer
    ) {
      return this.props.selectedAgreement.reviewer_confirmed;
    } else {
      return this.props.selectedAgreement.assignee_confirmed;
    }
  };

  updateControlConfirm = () => {
    if (
      this.props.selectedAgreement.start_date == null &&
      this.props.selectedAgreement.end_date == null
    ) {
      this.setState({ startDateMissing: true });
      this.setState({ endDateMissing: true });
    }
    if (this.props.selectedAgreement.start_date == null) {
      this.setState({ startDateMissing: true });
    } else if (this.props.selectedAgreement.end_date == null) {
      this.setState({ endDateMissing: true });
    } else {
      this.setConfirmModalVisibility(true);
    }
  };
  updateConfirm = async () => {
    if (this.props.currentUser._id === this.props.selectedAgreement.reviewer) {
      await this.onChange({
        reviewer_confirmed: !this.props.selectedAgreement.reviewer_confirmed
      });
    } else {
      await this.onChange({
        assignee_confirmed: !this.props.selectedAgreement.assignee_confirmed
      });
    }

    await this.props.onUpdateAgreement();
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
      <div className="p-3">
        <div className="flex hide-print">
          <Link href={"/app/agreements"}>
            <div className="cursor-pointer hover:text-blue-300 flex">
              <span className="pt-1">
                <Icon size="1em" path={mdiChevronLeft} />
              </span>
              <span className=""> My Agreements</span>
            </div>
          </Link>
          <div className="justify-end flex ml-auto">
            <button
              className="button is-light mr-2"
              title={"Print Objective Agreement"}
              onClick={() => {
                window.print();
              }}
            >
              <FaPrint />
            </button>
            <button
              className="button is-danger "
              title={"Delete Objective Agreement"}
              disabled={!this.props.isEditable}
              onClick={() => {
                this.setDeleteModalVisibility(true);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
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
            Objective Agreement for
            <AgreementTitle agreement={selectedAgreement} assignee={assignee} />
          </span>
        </div>
        <br />
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
                value={startDate || ""}
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
                  this.setState({ startDateMissing: false });
                  await this.onChange({ start_date: date });
                  this.props.onUpdateAgreement();
                }}
              />
              {this.state.startDateMissing && (
                <p style={{ color: "#A81416" }}>This field is required</p>
              )}
            </div>
          </div>
          <div className="column">
            <div>
              <span className="is-size-6 text-gray-400">End date</span>
            </div>
            <div className="day-picker-input">
              <DayPickerInput
                className="input"
                placeholder="None"
                value={endDate || ""}
                inputProps={{ disabled: !this.props.isEditable }}
                dayPickerProps={{
                  selectedDays: [endDate, { from: startDate, to: endDate }],
                  disabledDays: { before: startDate },

                  modifiers: { start: startDate, end: endDate },

                  fromMonth: startDate,
                  month: startDate
                }}
                onDayChange={async date => {
                  this.setState({ endDateMissing: false });
                  await this.onChange({ end_date: date });
                  this.props.onUpdateAgreement();
                }}
                hideOnDayClick={false}
                ref={el => (this.endDatePicker = el)}
              />
              {this.state.endDateMissing && (
                <p style={{ color: "#A81416" }}>This field is required</p>
              )}
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
            style={{
              marginLeft: "55px",
              width: "80%"
            }}
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
          <div className="column is-3">
            <CurrencyInput
              disabled={!this.props.isEditable}
              precision="0"
              prefix="$"
              style={{ fontWeight: "bold" }}
              name="bonus"
              className="input editable-input-and-show-value"
              onBlur={this.props.onUpdateAgreement}
              onChangeEvent={(e, maskedvalue, floatvalue) => {
                const changes = { bonus: floatvalue };
                if (floatvalue > max_bonus || 0)
                  changes["max_bonus"] = floatvalue;
                this.onChange(changes);
              }}
              value={bonus ? bonus : ""}
            />
          </div>

          <div className="column is-2 ">
            <span className="s-size-6 text-gray-400 ">Maximum Bonus</span>
          </div>

          <div className="column is-3 mr-2">
            <CurrencyInput
              disabled={!this.props.isEditable}
              precision="0"
              prefix="$"
              className="input editable-input-and-show-value"
              style={{ fontWeight: "bold" }}
              name="max_bonus"
              onBlur={async () => {
                if (max_bonus < bonus || 0)
                  await this.onChange({ max_bonus: bonus });

                this.props.onUpdateAgreement();
              }}
              onChangeEvent={(e, maskedvalue, floatvalue) => {
                this.onChange({ max_bonus: floatvalue });
              }}
              value={max_bonus ? max_bonus : ""}
            />
          </div>
        </div>
        {assignee && (
          <Fragment>
            <div>
              <AgreementGoalsList
                disableGoalAdd={!this.props.isEditable}
                agreement={selectedAgreement}
              />
              <p className="text-gray-400 pr-2 flex  mr-16 justify-end pt-0 pb-2">
                {" "}
                Total: {this.props.goalWeightsSum} %
              </p>
            </div>
            {this.props.goalWeightsSum !== 100 && (
              <div className="flex w-full justify-end pt-2 pb-2">
                <span style={{ color: "#A81416" }}>
                  The goal weights must sum up to 100 %
                </span>
              </div>
            )}
            <div className="flex w-full pt-2 ">
              <button
                disabled={
                  (selectedAgreement.assignee_confirmed &&
                    selectedAgreement.reviewer_confirmed) ||
                  this.props.goalWeightsSum !== 100
                }
                className={
                  "button ml-auto hide-print " +
                  (this.getMyConfirmState() ? "is-light" : "is-primary")
                }
                onClick={e => {
                  this.updateControlConfirm();
                }}
              >
                {this.getMyConfirmState()
                  ? "Cancel Confirmation"
                  : "Confirm Agreement"}
              </button>
            </div>
            <ConfirmModal
              title="Confirm before proceeding"
              active={this.state.isConfirmModalVisible}
              confirmButtonType="is-primary"
              confirmButtonText="Proceed"
              onCloseModal={() => {
                this.setConfirmModalVisibility(false);
              }}
              onConfirm={async (e) => {
                this.setConfirmModalVisibility(false);
                await this.updateConfirm();
              }}
            >
              {!this.getMyConfirmState() ?
                "Are you sure you want to proceed confirming the agreement?" :
                "Are you sure you want to proceed cancelling the agreement confirmation?"
              }
            </ConfirmModal>
          </Fragment>
        )}
        <div className="show-in-print columns pt-20 ">
          <div className="  column is-4 ">
            <div style={{ borderBottom: "0.5px solid black" }} />
            <p style={{ textAlign: "center" }}> Place, date </p>
          </div>
          <div className=" column is-offset-2 is-4">
            <div style={{ borderBottom: "0.5px solid black" }}> </div>
            <p style={{ textAlign: "center" }}>Employee's Signature</p>
          </div>
        </div>
        <CommentBox relatedTo={selectedAgreement._id} />
      </div>
    );
  }
}

export default (state => state)(AgreementInfo);
