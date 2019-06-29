import { ASSIGN_TEAMS, ASSIGN_TEAM, RESET_TEAM } from '../types/team'
import { keyBy } from "lodash";

const initialState = {
  goal: {},
  goals: [],

  myGoals: {
    ids: [],
    isFetching: false
  },
  teamGoals: {
    ids: [],
    isFetching: false
  },
  organizationGoals: {
    ids: [],
    isFetching: false
  }
};
export default (state = initialState, { type, data }) => {
  console.log("reducer:goals:" + type);
  switch (type) {
    default:
      return state;
  }

}