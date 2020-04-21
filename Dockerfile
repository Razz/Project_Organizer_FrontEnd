FROM carlosnunez/sre_wa_frontend:base
MAINTAINER Carlos Nunez <dev@carlosnunez.me>

COPY . /app
WORKDIR /app
RUN npm set progress=false && \
  npm install --prefer-offline && \
  npm install -g react-scripts

ENTRYPOINT npm start
