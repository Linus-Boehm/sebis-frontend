
import React from "react";
import {GOAL_TYPE} from "../../../store/types/goal";
import GoalProgressBar from "./GoalProgressBar";

class GoalProgress extends React.Component {
  render() {
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

    return (
      progress_type === GOAL_TYPE.COUNT ?
        <GoalProgressBar className={this.props.className} progress={all_progress / parseFloat(maximum_progress) * 100} value={all_progress + " / " + maximum_progress} /> : progress_type
    )

  }

}

export default GoalProgress;
