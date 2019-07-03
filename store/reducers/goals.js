import {
  ASSIGN_GOALS,
  ASSIGN_SELECTED_GOAL, DELETE_GOAL,
  RESET_SELECTED_GOAL
} from '../types/goal'
import { keyBy, map } from 'lodash';

const initialState = {
  selectedGoal: {},

  goals: {},

  fetches: {}
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

      const fetchData = {
        ids: Object.keys(dataToAssign),

        assignedAt: currentTime
      };

      return {
        ...state,
        goals: { ...state.goals, ...dataToAssign },

        fetches: {
          ...state.fetches,
          [ fetchKey ]: fetchData
        }
      };

    case DELETE_GOAL:
      const goals = { ...state.goals };
      delete goals[ data._id ];

      return {
        ...state,
        goals
      };

    default:
      return state;
  }

}