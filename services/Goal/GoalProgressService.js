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

export function markAllProgressAsReviewed(goal) {
  let goalCopy = {...goal};
  goalCopy.progress = getProgressPoints(goalCopy).map(
    progress => {
      return  {
        ...progress,
        is_reviewed: true
      }
    }
  );
  return goalCopy;
}


export function isProgressToReview(goal) {
  if(goal.progress !== undefined) {
    return goal.progress.reduce((acc, current) => {
      return acc || !current.is_reviewed
    }, false)
  } else {
    return []
  }
}

export function getProgressPoints(goal) {
  if(goal.progress !== undefined) {
    return goal.progress.filter(progressInst => progressInst != null && progressInst.value != null).sort(
      (p1, p2) => {
        const date1 = new Date(p1.date);
        const date2 = new Date(p2.date);
        if(date1.getTime() > date2.getTime()) {
          return 1;
        } else if(date1.getTime() < date2.getTime()) {
          return -1;
        }

        return 0;
      }
    )
  } else {
    return []
  }
}
