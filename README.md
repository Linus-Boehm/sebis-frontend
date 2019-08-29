# sebis-frontend
Our MVP of a University Project for a digital Objective Agreement
University Course- Web App Engineering of SS19 TU Munich - https://wwwmatthes.in.tum.de/pages/1mqqqoqe7gapz/SEBA-Master-Web-Application-Engineering

Backend Project: https://github.com/Linus-Boehm/goalify-backend
## Setup
* Clone project
* cd into project folder
* Install nodejs and yarn (If installed locally skip next two steps)
* Install Docker (Link for mac: https://docs.docker.com/v17.12/docker-for-mac/install/)
* Run `./exec_in_docker.sh` (Linux subsystem required on windows; If not executeable run `chmod +x ./exec_in_docker.sh` before)
* Run the `yarn install` command
* With `yarn dev` you can start the dev Server (Hotreloading per default)


### Setup using docker
* Run `./exec_in_docker.sh` (Only if not running yet)
* Run `docker exec -it sebis-frontend-buildimage`

##Run in production
* Use `yarn seed` to seed the database
* Use `yarn build` to build for production
* Use `yarn start` to run the production build
