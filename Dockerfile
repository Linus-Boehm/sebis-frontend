FROM node:10


#ENV APP_ROOT /usr/app

ENV NODE_ENV production

# Setting working directory. All the path (ADD, COPY, CMD, RUN) will be relative to WORKDIR
WORKDIR /usr/app
# Installing dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn build

EXPOSE 8080
# Running the app
CMD [ "yarn", "start" ]