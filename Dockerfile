FROM node:alpine
MAINTAINER Carlos Nunez <dev@carlosnunez.me>

COPY . /app
WORKDIR /app
RUN npm install && npm install -g react-scripts

USER nobody
ENTRYPOINT npm start