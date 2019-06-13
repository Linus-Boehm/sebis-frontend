import { FETCH_TEAMS, NEW_TEAM } from '../types/team'
import axios from 'axios';
import { API_URL } from '../../config'

export const fetchTeams = () => async (dispatch) => {
  try {
    console.log("FetchTeams...");
    let { data, status } = await axios.get(`${API_URL}/teams`)

    console.log(status);
    console.log(data);
    if (status === 200) {
      dispatch({
        type: FETCH_TEAMS,
        data
      });
      return data
    }

  } catch (e) {
    console.error(e)
  }
  throw new Error("error on loading teams")
};


