import { RESET_SELECTED_GOAL, ASSIGN_SELECTED_GOAL, ASSIGN_GOALS } from '../types/goal'
import api from '~/services/BackendApi';
import { ASSIGN_TEAM } from "../types/team";

export const resetSelectedGoal = () => async (dispatch) => {
  dispatch({
    type: RESET_SELECTED_GOAL
  });
};

export const assignSelectedGoal = (data) => async (dispatch) => {
  dispatch({
    type: ASSIGN_SELECTED_GOAL,
    data
  });
};

export const fetchGoalById = (id, forceApiCall) => async (dispatch) => {

  const cachedData = getState().goals.goals[ id ]

  let dataToAssign;
  if (!cachedData || forceApiCall) {
    try {
      let { data, status } = await api.goals.fetchById(id)

      if (status === 200) {
        dataToAssign = data
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    dataToAssign = cachedData
  }

  if (dataToAssign)
    return dispatch({
      type: ASSIGN_TEAM,
      data: dataToAssign
    });

  throw new Error("error in action fetchAllAssignedGoals")
};

export const fetchAllAssignedGoals = () => async (dispatch) => {
  try {
    let { data, status } = await api.goals.fetchAllAssignedGoals()

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data,
        viewKey: 'assignedGoals'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action fetchAllAssignedGoals")
};

export const fetchAllTeamGoals = () => async (dispatch) => {
  try {
    let { data, status } = await api.goals.fetchAllTeamGoals()

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data,
        viewKey: 'teamGoals'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action fetchAllAssignedGoals")
};

export const fetchAllOrganizationGoals = () => async (dispatch) => {
  try {
    let { data, status } = await api.goals.fetchAllOrganizationGoals()

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data,
        viewKey: 'organizationGoals'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action fetchAllAssignedGoals")
};



