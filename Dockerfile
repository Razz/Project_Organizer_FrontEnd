FROM carlosnunez/sre_wa_frontend
MAINTAINER Carlos Nunez <dev@carlosnunez.me>

COPY . /app
WORKDIR /app
RUN npm install && npm install -g react-scripts

ENTRYPOINT npm start
