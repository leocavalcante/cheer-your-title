FROM node:10.10-alpine

RUN apk add --no-cache make

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --also=dev