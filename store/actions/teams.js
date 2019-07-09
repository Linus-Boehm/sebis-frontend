import {
  ASSIGN_TEAM,
  ASSIGN_TEAMS,
  RESET_TEAM,
  DELETE_TEAM, ASSIGN_TEAM_MEMBERS
} from "../types/team";
import api from "~/services/BackendApi";
import {ASSIGN_USERS} from "../types/user";

export const resetTeam = () => async dispatch => {
  dispatch({
    type: RESET_TEAM
  });
};
export const assignTeam = team => async dispatch => {
  dispatch({
    type: ASSIGN_TEAM,
    data: team
  });
  return team;
};

export const updateTeamMember = (team_id, team_member) => async dispatch => {
  console.log("action:team:addMember");
  try {
    let {data, status} = await api.teams.updateTeamMember(team_id, team_member)
    if (status === 200) {
      dispatch({
        type: ASSIGN_TEAM,
        data: data
      });
      return data;
    }
  }catch (e) {
    console.error(e)
  }
  throw new Error("error on adding team member");
}

export const removeTeamMember = (team_id, user_id) => async dispatch => {
  console.log("action:team:removeMember");
  try {
    let {data, status} = await api.teams.removeTeamMember(team_id, user_id)
    if (status === 200) {
      dispatch({
        type: ASSIGN_TEAM,
        data: data
      });
      return data;
    }
  }catch (e) {
    console.error(e)
  }
  throw new Error("error on removing team member");
}

export const createTeam = team => async dispatch => {
  try {
    console.log("action:team:create");
    console.log(team);
    let { data, status } = await api.teams.create(team);
    if (status === 200) {
      dispatch({
        type: ASSIGN_TEAMS,
        data: [data]
      });
      dispatch({
        type: ASSIGN_TEAM,
        data: data
      });
      return data;
    }
  } catch (e) {
    console.error(e);
  }
  throw new Error("error on creating teams");
};
export const updateTeam = (id, team) => async dispatch => {
  try {
    console.log("action:team:update");
    console.log(team);
    let { data, status } = await api.teams.update(id, team);
    if (status === 200) {
      dispatch({
        type: ASSIGN_TEAM,
        data: data
      });
      dispatch({
        type: ASSIGN_TEAMS,
        data: data
      });
      return data;
    }
  } catch (e) {
    console.error(e);
  }
  throw new Error("error on updating teams");
};

export const deleteTeam = id => async dispatch => {
  try {
    console.log("action:team:delete");
    let { data, status } = await api.teams.deleteById(id);
    if (status === 200) {
      dispatch({
        type: DELETE_TEAM,
        data: id
      });
      return data;
    }
  } catch (e) {
    console.error(e);
  }
  throw new Error("error on deleting teams");
};

export const fetchTeams = () => async dispatch => {
  try {
    console.log("FetchTeams...");
    let { data, status } = await api.teams.fetchAll();

    console.log(status);
    if (status === 200) {
      dispatch({
        type: ASSIGN_TEAMS,
        data
      });
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  throw new Error("error on loading teams");
};

export const fetchTeamById = (id, force = false) => async (
  dispatch,
  getState
) => {
  //IF Team is alredy present in teamList

  //Disabled Team caching for users
  /*if (!!getState().teams.teamList[id] && !force) {
    dispatch({
      type: ASSIGN_TEAM,
      data: getState().teams.teamList[id]
    });
  } else {*/
    try {
      let { data, status } = await api.teams.fetchById(id);
      if (status === 200) {
        await dispatch({
          type: ASSIGN_USERS,
          data: data.users
        });
        await dispatch({
          type: ASSIGN_TEAM,
          data: data.team
        });

        return data;
      }
    } catch (e) {
      console.error(e);
    }
    throw new Error("error on loading teams");
  //}
};
