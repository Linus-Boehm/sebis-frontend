import * as React from "react";
import DatePicker from "react-datepicker";
import {GOAL_QUALITATIVE_ICONS, GOAL_QUALITATIVE_ICONS_CLASS_NAMES, GOAL_TYPE} from "../../../store/types/goal";
import BaseButton from "../../utils/buttons/BaseButton";
import TextareaAutosize from "react-autosize-textarea";

class ProgressForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = async changes => {
    await this.props.onChangeProgress(changes);
  };

  onSave = async() => {

  };

  selectEmoji = async (key) => {
    await this.onChange({
      value: key
    })
  };

  render() {
    const {
      progress,
      selectedGoal
    } = this.props;

    const icon_arr = Object.keys(GOAL_QUALITATIVE_ICONS).map(key => ({ key, value: GOAL_QUALITATIVE_ICONS[key] }));

    const classNames = require('classnames');

    return <div className={"progress-form flex flex-wrap h-full border-t border-b border-dashed border-gray-300 mt-4 pt-8 pb-8 mb-4"}>
      <div className={"flex-1 control mr-4"}>
        <h4 className={"field-info"}><label htmlFor="progress-form-date-picker">Date</label></h4>
        <DatePicker
          className={"input"}
          id={"progress-form-date-picker"}
          selected={new Date(progress.date)}
          onChange={ (date) =>
            this.onChange({ "date": date.toDateString() })
          }
        />
      </div>

      <div className={"flex-1 mr-4"}>
        <label><h4 className={"field-info"}>Progress</h4>
          {selectedGoal.progress_type === GOAL_TYPE.COUNT &&
          <input className="input" name="value" type="number" placeholder="0" value={progress.value} onChange={e =>
            this.onChange({ [e.target.name]: e.target.value })
          }/>
          }

          {selectedGoal.progress_type === GOAL_TYPE.BOOLEAN &&
          <select name={"value"} value={progress.value} onChange={e =>
            this.onChange({ [e.target.name]: e.target.value })
          }>
            <option value={1}>Reached</option>
            <option value={0}>Not reached, yet</option>
          </select>
          }

          {selectedGoal.progress_type === GOAL_TYPE.QUALITATIVE &&
            <div className={"emoji-selector"}>
              {
                icon_arr.map((element) => {
                  return React.createElement(
                    element.value,
                    {
                      className: classNames(GOAL_QUALITATIVE_ICONS_CLASS_NAMES[element.key], element.key === progress.value ? "emoji active" : "emoji disabled"),
                      onClick: this.selectEmoji.bind(this, element.key)
                    },
                    []
                  )
                })
              }
            </div>
          }
        </label>
      </div>

      <div className={"flex-1 mr-4"}>
        <label><h4 className={"field-info"}>Status</h4>
          <div className="select">
            <select name={"is_reviewed"} value={progress.is_reviewed} onChange={e =>
              this.onChange({ [e.target.name]: e.target.value })
            }>
              <option value={true}>Reviewed</option>
              <option value={false}>Unreviewed</option>
            </select>
          </div>
        </label>
      </div>

      <div className={"p-8 flex-0 justify-end"}>
        <BaseButton onClick={this.onSave}>Save</BaseButton>
      </div>

      <div className={"flex-0 w-full pt-2 pr-8"}>
        <TextareaAutosize
          className="input progress-comment"
          name="comment"
          placeholder="Comment the progress of this date"
          value={progress.comment}
          onChange={e =>
            this.onChange({ [e.target.name]: e.target.value })
          }
        />
      </div>
    </div>
  }
}

export default ProgressForm
