import * as userApi from './routes/users';
import * as auth from './routes/auth';
import * as teams from './routes/teams';

export default {
  user: userApi,
  auth: auth,
  teams: teams
};
