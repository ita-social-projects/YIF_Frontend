FROM node:latest

WORKDIR /
COPY . /


RUN npm install

ENTRYPOINT [ "npm", "start" ]
