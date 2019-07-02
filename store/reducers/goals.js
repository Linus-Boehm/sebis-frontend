import {
  ASSIGN_GOALS,
  ASSIGN_SELECTED_GOAL,
  RESET_SELECTED_GOAL
} from '../types/goal'
import { keyBy, map } from 'lodash';

const initialState = {
  selectedGoal: {},
  isSelectedGoalLoading: false,

  goals: {},

  // fetches on goals
  assignedGoals: {
    ids: []
  },

  teamGoals: {
    ids: []
  },

  organizationGoals: {
    ids: []
  }
};

export default (state = initialState, { type, data, fetchKey }) => {
  console.log("reducer:goals:" + type);

  switch (type) {
    case RESET_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: initialState.selectedGoal
      };

    case ASSIGN_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: { ...initialState.selectedGoal, ...data }
      };

    case ASSIGN_GOALS:
      const currentTime = new Date();

      let dataToAssign = map(data, el => ({ ...el, assignedAt: currentTime }));
      dataToAssign = keyBy(dataToAssign, '_id');

      const viewData = fetchKey ? {
        ...state[ fetchKey ],
        ids: Object.keys(dataToAssign),

        assignedAt: currentTime
      } : undefined;

      return {
        ...state,
        goals: { ...state.goals, ...dataToAssign },
        [ fetchKey ]: viewData
      };

    default:
      return state;
  }

}