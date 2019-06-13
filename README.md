# sebis-frontend

## Setup
* Clone project
* cd into project folder
* Install nodejs and yarn (If installed locally skip next two steps)
* Install Docker (Link for mac: https://docs.docker.com/v17.12/docker-for-mac/install/)
* Run `./exec_in_docker.sh` (Linux subsystem required on windows; If not executeable run `chmod +x ./exec_in_docker.sh` before)
* Run the `yarn install` command
* With `yarn dev` you can start the dev Server (Hotreloading per default)

## Local usage without Server
The redux actions expects a API running at the `API_URL` specified in the `config.js` (default `http://localhost:3001`)
To mock the API you can use the provide `db.json` with the [json-server](https://github.com/typicode/json-server) package

### Setup json-server  
* Run `yarn global add json-server` to globally add json-server as a tool
* cd into sebis-frontend project and run `json-server --watch db.json -p 3001`

This provides a full REST API under `http://localhost:3001`

### Setup using docker
* Run `./exec_in_docker.sh` (Only if not running yet)
* Run `docker exec -it sebis-frontend-buildimage yarn start-json-server`