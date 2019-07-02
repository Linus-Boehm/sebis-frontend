import {
  ASSIGN_TEAMS,
  ASSIGN_TEAM,
  RESET_TEAM,
  DELETE_TEAM, ASSIGN_TEAM_MEMBERS
} from "../types/team";
import {findIndex, keyBy} from "lodash";

const initialState = {
  team: {
    name: "",
    team_roles: []
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

