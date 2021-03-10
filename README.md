# Your IT Future

---

## About the project

This is a project that gives applicants the opportunity to get acquainted with the list of educational institutions that provide education in our region. Here they can get detailed information about available specialities and detailed information required for admission to the university.

## Main parts of the project and technologies

This project contains 3 main parts: client frontend, backend and database. Parts of the project backend are at https://github.com/ita-social-projects/YIF_Backend

Let's take a closer look at the technologies of each part.

Client Frontend - We are using React, React-redux, Typescript

Code quality - SonarCloud

Testing - Jest

SDLC - Scrum/Kanban

Project Management platform - ClickUp

React app file structure - “Grouping by features/functionality”

Src should have, at less, those folders: components, pages, services, store, hoc, errorBoundry. Also index.tsx and app.tsx.

Component test/style files should be located in the folder of this component.

Store located in the root folder and should contain actions and reducers folders.

Component test/style files should be located in the folder of this component. Store located in the root folder and should contain actions and reducers folders.

## How to start the project locally

Clone or download the project from https://github.com/ita-social-projects/YIF_Frontend

- install Node.js v10.19.0+

- install npm packages: npm install

- run local : open terminal, write to start: npm start

---

## How to deploy the project with docker-compose locally

The instructions below will allow you to run application locally in the containers for developing and testing purpose.

### Installation Prerequisites:

- Docker version 17.05 or higher, [Docker Compose] (https://docs.docker.com/compose).

- Install Docker app on your system!

  - Download install from official site
  - Run install app In BIOS -> enable Hyper V
  - Follow the link in error message

- In MS Visual Studio Code (or other IDE) in terminal:
  - If you have compose-file then run: [name of the compose file] up -> exp: docker-compose up
    If you DO NOT have compose-file then: - create Dockerfile - create .dockerignore - run in terminal: docker run -t [name of your docker image] . - run in terminal: docker build -d --restart=always -p [port]:[port] [name of docker image] - after successful execution of command type in terminal: docker ps.
    Check up time of your container. If this time only increments itself, then your application is working fine. If you see that the time value is constantly set up to 0(zero) try to fix issues with your app(docker image if be more specific).
    - To stop our container:
      - docker-compose down
      - docker stop [container id(first 3 chars)]

---

### Team

> Or Contributors/People

![@team](https://avatars2.githubusercontent.com/u/64921184?s=200&v=4)
![@team](https://avatars0.githubusercontent.com/u/62026523?s=200&u=c5ffa62223d32312a6f3592c66e4c791eb4c7343&v=4)
![@team](https://avatars1.githubusercontent.com/u/60184096?s=200&u=354406f2bcd0522f17e5c94d2b7c6d34596f0ec9&v=4)
![@team](https://avatars0.githubusercontent.com/u/58741436?s=200&u=ffc14f01ed18eab531f52e6b06865ee410b57965&v=4)
![@team](https://avatars2.githubusercontent.com/u/60231618?s=200&u=5a15300a5626ca41ca26910dc1660a74d3dc4847&v=4)
![@team](https://avatars.githubusercontent.com/u/62015447?s=400&u=9fe9b41f285d57ee1925b1ff266f2f02046bbb26&v=4)
![@team](https://avatars.githubusercontent.com/u/30364013?s=400&v=4)
![@team](https://avatars.githubusercontent.com/u/78432338?s=400&u=71dc67ff658babe90269e13a2e0fdd0a5ccdb43a&v=4)
![@team](https://avatars.githubusercontent.com/u/43788876?s=460&u=fa99cc6199ff97d5a09d777af8e03524b742f836&v=4)
![@team](https://avatars.githubusercontent.com/u/25075314?s=400&u=3342f20428dabeb39db6f86854844b8a9efa36c9&v=4)

- You can just grab their GitHub profile image URL
- You should probably resize their picture using `?s=200` at the end of the image URL.

---

### FAQ

- **How do I do _specifically_ so and so?**
  - No problem! Just do this.

---

- Copyright 2020 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.
