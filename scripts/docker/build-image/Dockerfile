FROM ubuntu:16.04

# BUILD BASE IMAGE --> Contains:
# - DOCKER
# - AWS CLI

RUN apt-get update && apt-get install -qqy --no-install-recommends \
    build-essential \
    curl wget \
    zip unzip \
    python python-pip \
    sudo iputils-ping \
    jq \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

# Add Docker’s official GPG key
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

RUN apt-get update && apt-get install docker-ce="18.06.1~ce~3-0~ubuntu" -y --allow-downgrades

RUN service docker start

# ----

# Node version 11
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install -y nodejs

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install yarn

# Create app directory
RUN mkdir -p /usr/app

WORKDIR /usr/app
COPY . /usr/app