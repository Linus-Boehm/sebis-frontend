
import React from "react";
import {GOAL_QUALITATIVE_ICONS, GOAL_QUALITATIVE_ICONS_CLASS_NAMES, GOAL_TYPE} from "../../../store/types/goal";
import GoalProgressBar from "./GoalProgressBar";
import { FaCheckSquare, FaMehBlank, FaSquare } from "react-icons/fa";
import moment from "moment";

class GoalProgress extends React.Component {
  render() {
    const classNames = require('classnames');

    const {
      goal
    } = this.props;

    const {
      progress_type,
      maximum_progress,
      progress
    } = goal;

    const all_progress = progress !== undefined ? progress.reduce((acc, current) => {
      return acc + parseFloat(current.value)
    }, 0) : 0;

    switch (progress_type) {
      case GOAL_TYPE.COUNT:
        return <GoalProgressBar
          className={this.props.className}
          progress={all_progress / parseFloat(maximum_progress) * 100}
          value={all_progress + " / " + maximum_progress} />;
      case GOAL_TYPE.BOOLEAN:
        return progress !== undefined && progress.length > 0 && progress[0].value === "1" ?
          <label className={classNames("checkbox", this.props.className)}><input type={"checkbox"} checked={true} disabled={true} /> Reached</label> :
          <label className={classNames("checkbox", this.props.className)}><input type={"checkbox"} disabled={true} /> Not Reached, yet</label>;
      case GOAL_TYPE.QUALITATIVE:
        if(_.isEmpty(progress)) {
          return <FaMehBlank className={this.props.className} />
        } else {
          return <div className={classNames(this.props.className, "flex")}>
            {
              progress.map((info) => {
                const goal_icon = parseInt(info.value);
                const icon_component = GOAL_QUALITATIVE_ICONS.hasOwnProperty(goal_icon) ?
                  GOAL_QUALITATIVE_ICONS[goal_icon] : FaMehBlank;
                const icon_component_class_name = GOAL_QUALITATIVE_ICONS_CLASS_NAMES.hasOwnProperty(goal_icon) ?
                  GOAL_QUALITATIVE_ICONS_CLASS_NAMES[goal_icon] : "";
                return React.createElement(icon_component, {
                  className: classNames("p-1 text-4xl", icon_component_class_name),
                  title: "Progress of " + moment(info.date).format("YYYY-MM-DD")
                }, {})
              })
            }
          </div>
        }
      default:
        return "";
    }
  }

}

export default GoalProgress;
