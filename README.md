# sebis-frontend

## Setup
* Clone project
* cd into project folder and run the `yarn install` command
* With `yarn dev` you can start the dev Server (Hotreloading per default)

## Local usage without Server
The redux actions expects a API running at the `API_URL` specified in the `config.js` (default `http://localhost:3001`)
To mock the API you can use the provide `db.json` with the [json-server](https://github.com/typicode/json-server) package

### Setup json-server  
* Run `yarn global add json-server` to globally add json-server as a tool
* cd into sebis-frontend project and run `json-server --watch db.json -p 3001`

This provides a full REST API under `http://localhost:3001`