import React from 'react';
import Link from 'next/link'
import AgreementTitle from "./common/AgreementTitle";
import UserAvatar from "../utils/user/UserAvatar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import AgreementGoalsList from "../goals/list/AgreementGoalsList";
import TextareaAutosize from "react-autosize-textarea";
import { updateAgreement } from "../../store/actions/agreements";

const AvatarWithName = ({ user, title }) => (
  user && user._id ? (
    <div className="flex items-center">
      <div>
        <UserAvatar
          user={user}
        />
      </div>
      <div className="flex flex-col justify-center ml-2">
        <div style={{ lineHeight: '1.5rem' }}>
          <span className="is-size-6 text-gray-400">
            {title}
          </span>
        </div>
        <div style={{ lineHeight: '1.5rem' }}>
          <span className="is-size-5 font-bold">
            {user.firstname} {user.lastname}
          </span>
        </div>
      </div>
    </div>
  ) : null
);

class AgreementInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = async (changes) => {
    await this.props.onChangeInput(changes);
  };

  render() {
    const {
      selectedAgreement = {},
      userList = {}
    } = this.props;

    const {
      _id,
      start_date,
      end_date,
      description
    } = selectedAgreement;

    const assignee = userList[ selectedAgreement.assignee ];
    const reviewer = userList[ selectedAgreement.reviewer ];

    const startDate = start_date ? new Date(start_date) : null;
    const endDate = end_date ? new Date(end_date) : null;

    return (
      <div>
        <div>
          <Link href="/app/agreements">
            <span className="cursor-pointer hover:text-blue-300">{'< Back to List'}</span>
          </Link>
        </div>
        <div className="mt-3">
            <span className="is-size-4 font-bold">
              <AgreementTitle
                agreement={selectedAgreement}
                assignee={assignee}
              />
            </span>
        </div>
        <div className="columns p-0 pt-3">
          <div className="column">
            <AvatarWithName
              user={assignee}
              title="Employee"
            />
          </div>
          <div className="column">
            <div>
              <span className="is-size-6 text-gray-400">
                Start date
             </span>
            </div>
            <div className="day-picker-input">
              <DayPickerInput
                placeholder="None"

                value={startDate}

                dayPickerProps={{
                  selectedDays: [ startDate, { from: startDate, to: endDate } ],
                  disabledDays: { after: endDate },
                  toMonth: endDate,

                  modifiers: { start: startDate, end: endDate },

                  //onDayClick: () => this.endDatePicker.getInput().focus(),
                }}

                hideOnDayClick={false}
                onDayChange={async (date) => {
                  await this.onChange({ start_date: date })
                  this.props.onUpdateAgreement()

                }}
              />
            </div>
          </div>
          <div className="column">
            <div>
              <span className="is-size-6 text-gray-400">
                End date
             </span>
            </div>
            <div className="day-picker-input">
              <DayPickerInput
                placeholder="None"
                value={endDate}

                dayPickerProps={{
                  selectedDays: [ endDate, { from: startDate, to: endDate } ],
                  disabledDays: { before: startDate },

                  modifiers: { start: startDate, end: endDate },

                  fromMonth: startDate,
                  month: startDate
                }}
                onDayChange={async (date) => {
                  await this.onChange({ end_date: date })
                  this.props.onUpdateAgreement()
                }}

                hideOnDayClick={false}
                ref={el => (this.endDatePicker = el)}
              />
            </div>
          </div>
          <div className="column">
            <AvatarWithName
              user={reviewer}
              title="Reviewer"
            />
          </div>
        </div>
        <div>
          <TextareaAutosize
            rows={4}
            className="input editable-input-and-show-value"
            name="description"
            placeholder="Additonal details..."
            onBlur={this.props.onUpdateAgreement}
            onChange={(e) => this.onChange({ [ e.target.name ]: e.target.value })}
            value={description ? description : ""}
          />
        </div>
        <div>
          <AgreementGoalsList agreement={selectedAgreement}/>
        </div>
        {JSON.stringify(selectedAgreement)}
      </div>
    )
  }
}

export default AgreementInfo