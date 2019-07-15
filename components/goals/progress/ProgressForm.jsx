import * as React from "react";
import DatePicker from "react-datepicker";
import {GOAL_QUALITATIVE_ICONS, GOAL_QUALITATIVE_ICONS_CLASS_NAMES, GOAL_TYPE} from "../../../store/types/goal";

class ProgressForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange() {

  }

  render() {
    const {
      progress,
      selectedGoal
    } = this.props;

    return <div className={"progress-form flex flex-wrap h-full"}>
      <div className={"flex-1 control border-t border-dashed border-gray-300 mt-4 pt-8"}>
        <h4 className={"field-info"}><label htmlFor="progress-form-date-picker">Date</label></h4>
        <DatePicker
          className={"input"}
          id={"progress-form-date-picker"}
          selected={new Date(progress.date)}
          onChange={this.handleChange.bind(this)}
        />
      </div>

      <div className={"flex-1 border-t border-dashed border-gray-300 mt-4 pt-8 control"}>
        <label><h4 className={"field-info"}>Progress</h4>
          {selectedGoal.progress_type === GOAL_TYPE.COUNT &&
          <input className="input" type="number" placeholder="0"/>
          }

          {selectedGoal.progress_type === GOAL_TYPE.BOOLEAN &&
          <input type="checkbox"/>
          }

          {selectedGoal.progress_type === GOAL_TYPE.QUALITATIVE &&
            /*_.map(GOAL_QUALITATIVE_ICONS, (index, class_name) => {
              return React.createElement(
                class_name,
                {
                  className: GOAL_QUALITATIVE_ICONS_CLASS_NAMES[index]
                },
                {}
              )
            })*/
            TODO
          }
        </label>
      </div>
    </div>
  }
}

export default ProgressForm
