import { RESET_SELECTED_GOAL, ASSIGN_SELECTED_GOAL, ASSIGN_GOALS, DELETE_GOAL} from '../types/goal'
import api from '~/services/BackendApi';

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

export const fetchGoalById = (id, useCache = true) => async (dispatch, getState) => {

  const cachedData = getState().goals.goals[ id ]

  if (!cachedData || !useCache) {
    try {
      let { data, status } = await api.goals.fetchById(id)

      if (status === 200) {
        return dispatch({
          type: ASSIGN_GOALS,
          data: [ data ]
        });
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    return
  }

  throw new Error("error in action fetchGoalById")
};

export const fetchAllAssignedGoals = () => async (dispatch) => {
  try {
    let { data, status } = await api.goals.fetchAllAssignedGoals()

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data,
        fetchKey: 'assigned'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action fetchAllAssignedGoals")
};

export const fetchTeamGoals = (teamId) => async (dispatch) => {
  try {
    let { data, status } = await api.goals.fetchTeamGoals(teamId)

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data,
        fetchKey: `team-${teamId}`
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action fetchTeamGoals")
};

export const fetchAllOrganizationGoals = () => async (dispatch) => {
  try {
    let { data, status } = await api.goals.fetchAllOrganizationGoals()

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data,
        fetchKey: 'organization'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action fetchAllOrganizationGoals")
};

export const createGoal = (goal) => async (dispatch) => {
  try {
    let { data, status } = await api.goals.createGoal(goal)

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data: [ data ],
        fetchKey: 'lastCreated'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action createGoal")
};

export const updateGoal = (goal) => async (dispatch) => {
  try {
    let { data, status } = await api.goals.updateGoal(goal)

    if (status === 200) {
      return dispatch({
        type: ASSIGN_GOALS,
        data: [ data ],
        fetchKey: 'lastUpdated'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action updateGoal")
};

export const deleteGoal = (goal) => async (dispatch) => {
  try {
    let { data, status } = await api.goals.updateGoal({ _id: goal._id, deleted_at: new Date() })

    if (status === 200) {
      return dispatch({
        type: DELETE_GOAL,
        data,
        fetchKey: 'lastDeleted'
      });
    }

  } catch (e) {
    console.log(e)
  }

  throw new Error("error in action deleteGoal")
};





