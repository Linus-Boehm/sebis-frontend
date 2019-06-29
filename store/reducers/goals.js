import { ASSIGN_GOALS, ASSIGN_SELECTED_GOAL, RESET_SELECTED_GOAL } from '../types/goal'
import { keyBy, map } from 'lodash';

const initialState = {
  selectedGoal: {},

  goals: [],

  // views on goals
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
export default (state = initialState, { type, data, viewKey }) => {
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
        selectedGoal: data
      };

    case ASSIGN_GOALS:
      const currentTime = new Date();

      let dataToAssign = map(data, el => ({ ...el, redux_assigned_at: currentTime }));
      dataToAssign = keyBy(dataToAssign, '_id');

      const viewData = viewKey ? {
        ...state[ viewKey ],
        ids: Object.keys(dataToAssign),
        redux_assigned_at: currentTime
      } : undefined;

      return {
        ...state,
        goals: { ...state.goals, ...dataToAssign },
        [ viewKey ]: viewData
      };

    default:
      return state;
  }

}