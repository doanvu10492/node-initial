# Specify a base image
FROM node:alpine

#Install some dependencies

WORKDIR /src

COPY package*.json /

RUN npm ci

COPY . / 

RUN npm install -g nodemon && npm install

RUN apk update && apk add bash

EXPOSE $PORT

# Set up a default command
CMD [ "npm", "start", "dev"]