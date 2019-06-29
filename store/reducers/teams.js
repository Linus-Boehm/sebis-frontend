import {ASSIGN_TEAMS, ASSIGN_TEAM, RESET_TEAM} from '../types/team'
import {keyBy} from "lodash";

const initialState = {
    team: {
        name: ""
    },
    teamList: {}
};
export default (state = initialState, {type, data}) => {
    console.log("reducer:teams:"+type);
    switch (type) {
        case ASSIGN_TEAMS:
            return {
                ...state,
                teamList: {...state.teamList, ...keyBy(data, '_id')}
            };
        case ASSIGN_TEAM:
            return {
                ...state,
                team: {...state.team, ...data}
            };
        case RESET_TEAM:
            return {
                ...state,
                team: {...initialState.team}
            }
        default:
            return state;
    }

}