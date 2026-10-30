FROM node:22.23.4-bookworm@sha256:18a6d90fd60542269850c80ca03b29b1d9b14d6b221ac7ee8e35b0d33ef904bd


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