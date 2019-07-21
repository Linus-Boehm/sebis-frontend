import {
  ASSIGN_GOALS,
  ASSIGN_SELECTED_GOAL, ASSIGN_SELECTED_GOAL_PROGRESS, DELETE_GOAL,
  RESET_SELECTED_GOAL, RESET_SELECTED_GOAL_PROGRESS
} from '../types/goal'
import { keyBy, map } from 'lodash';
import uuidv4 from "uuid/v4";

const initialState = {
  selectedGoal: {},

  selectedGoalProgress: {
    date: new Date().toDateString(),
    value: undefined,
    is_reviewed: false,
    isEditMode: false
  },
  selectedProgressIndex: -1,

  goals: {},

  fetches: {}
};

export default (state = initialState, { type, data, fetchKey }) => {
  console.log("reducer:goals:" + type);

  switch (type) {
    case RESET_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: initialState.selectedGoal,
        selectedProgressIndex: -1,
        selectedGoalProgress: {...initialState.selectedGoalProgress}
      };
    case RESET_SELECTED_GOAL_PROGRESS:
      return {
        ...state,
        selectedProgressIndex: -1,
        selectedGoalProgress: {...initialState.selectedGoalProgress}
      };


    case ASSIGN_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: {...data }
      };

    case ASSIGN_SELECTED_GOAL_PROGRESS:
      const {progress,index} = data;
      const initialId = {"_id": uuidv4()};
      const initial = {
        ...initialState.selectedGoalProgress,
        ...initialId
      };
      return {
        ...state,
        selectedGoalProgress: {
          ...initial,
          ...progress
        },
        selectedProgressIndex: index
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