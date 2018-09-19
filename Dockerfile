FROM node:8.12-alpine
RUN apk update && apk add vim
RUN mkdir /myapp
WORKDIR /myapp