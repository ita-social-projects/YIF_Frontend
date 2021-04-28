FROM node:latest

COPY . /frond-end/react-app
WORKDIR /frond-end/react-app

RUN npm install

ENTRYPOINT [ "npm", "start" ]
