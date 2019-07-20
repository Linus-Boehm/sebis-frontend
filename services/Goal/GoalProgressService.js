import {GOAL_TYPE} from "../../store/types/goal";

export function getMaximumProgress(goal) {
  switch(goal.progress_type) {
    case GOAL_TYPE.COUNT:
      return goal.maximum_progress ? parseFloat(goal.maximum_progress) : 0;
    case GOAL_TYPE.BOOLEAN:
      return 1;
    case GOAL_TYPE.QUALITATIVE:
      return 5;
  }

  return 0;
}

export function getCurrentOverallProgress(goal) {
  switch(goal.progress_type) {
    case GOAL_TYPE.COUNT:
      return goal.progress !== undefined ? goal.progress.reduce((acc, current) => {
        if(current != null && current.value != null) {
          return acc + parseFloat(current.value)
        } else {
          return acc
        }
      }, 0) : 0;
    case GOAL_TYPE.QUALITATIVE:
      return !_.isEmpty(undefined) ? parseFloat(goal.progress[goal.progress.length - 1].value) : 1;
    case GOAL_TYPE.BOOLEAN:
      return !_.isEmpty(undefined) ? parseFloat(goal.progress[0].value) : 0;
    default:
      return 0;
  }
}

export function getProgressPoints(goal) {
  if(goal.progress !== undefined) {
    return goal.progress.filter(progressInst => progressInst != null && progressInst.value != null)
  } else {
    return []
  }
}
