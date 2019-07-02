import {
  ASSIGN_TEAMS,
  ASSIGN_TEAM,
  RESET_TEAM,
  DELETE_TEAM, ASSIGN_TEAM_MEMBERS
} from "../types/team";
import {findIndex, keyBy} from "lodash";

const initialState = {
  team: {
    name: ""
  },
  teamList: {}
};
export default (state = initialState, { type, data }) => {
  console.log("reducer:teams:" + type);
  switch (type) {
    case ASSIGN_TEAMS:
      return {
        ...state,
        teamList: { ...state.teamList, ...keyBy(data, "_id") }
      };

    case ASSIGN_TEAM:
      return {
        ...state,
        team: { ...state.team, ...data }
      };
    case RESET_TEAM:
      return {
        ...state,
        team: { ...initialState.team }
      };
    case DELETE_TEAM:
      let teamListCopy = { ...state.teamList };
      delete teamListCopy[data];
      return {
        ...state,
        teamList: teamListCopy
      };

    default:
      return state;
  }
};

const assignTeamMember = (state, data) => {
  let teammembers = state.team.team_roles
  let i = findIndex(teammembers,(role)=>{return role.user_id === data.user_id})
  if(i >= 0){
    teammembers[i] = data
  }else{
    teammembers.push(data)
  }
  return {
    ...state,
    team: { ...state.team, team_roles: teammembers}
  };
}
