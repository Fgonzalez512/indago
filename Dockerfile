FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 80 5432
CMD [ "npm","run","pm2", "start","./src/server/server.js"]
