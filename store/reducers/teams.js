import {FETCH_TEAMS,NEW_TEAM} from '../types/team'

const initialState = {
    team: {},
    teams: []
};
export default (state = initialState, {type, data}) => {
    console.log("reducer:teams:"+type);
    switch (type) {
        case FETCH_TEAMS:
            return {
                ...state,
                teams: data
            };
        case NEW_TEAM:
        default:
            return state;
    }

}