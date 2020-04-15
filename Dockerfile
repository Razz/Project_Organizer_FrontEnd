FROM node:alpine
MAINTAINER Carlos Nunez <dev@carlosnunez.me>

COPY . /app
WORKDIR /app
RUN npm set progress=false && \
  npm install --prefer-offline && \
  npm install -g react-scripts

USER nobody
ENTRYPOINT npm start
