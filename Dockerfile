FROM node:latest

WORKDIR /var/www
COPY . /var/www


RUN npm install

ENTRYPOINT [ "npm", "start" ]
