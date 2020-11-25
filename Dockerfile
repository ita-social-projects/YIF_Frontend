FROM node:latest

COPY . /var/frond-end/react-app
WORKDIR /var/frond-end/react-app

RUN npm install

ENTRYPOINT [ "npm", "start" ]
