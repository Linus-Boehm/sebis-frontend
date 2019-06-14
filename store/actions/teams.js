import { FETCH_TEAMS, NEW_TEAM } from '../types/team'
import api from '~/services/BackendApi';

 export const fetchTeams = () => async(dispatch) => {
  try {
    console.log("FetchTeams...");
    let { data, status } = await api.teams.fetchAll()

    console.log(status);
    if (status === 200) {
      dispatch({
        type: FETCH_TEAMS,
        data
      });
      return data
    }

  } catch (e) {

  }
  throw new Error("error on loading teams")
};


