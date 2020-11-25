#Your IT Future

---

## About the project

This is a project that provides applicants with an opportunity to get acquainted with the list of educational institutions that provide education in our region. Applicants can get detailed information about the available specialties that are required for admission, training materials, etc.

##Main parts of the project and technologies

This project contains 4 main parts: client frontend, backend and database. All parts of the project are at https://github.com/ita-social-projects/YIF_Frontend

Let's take a closer look at the technologies of each part.

Client Frontend - We are using React

Backend - ASP.NET Core 3.1, Doker, FluentValidation, Swagger, Automaper

Database - Entity Framework and hosted on Microsoft Azure

Code quality - SonarCloud

Testing - xUnit

SDLC - Scrum/Kanban

React app file structure - Grouping by features

Src should have, at less, those folders: components, pages, services, store, hoc, errorBoundry, errorIndicator. Also index.txs and app.tsx.

## Component test/style files should be located in the folder of this component. Store located in the root folder and should contain actions and reducers folders.

## How to start the project locally.

Clone or download the project from https://github.com/ita-social-projects/YIF_Frontend

- Install ASP.NET Core 3.1

- Install Entity Framework

- Install Node.js v10.19.0+

- Create local database from https://github.com/ita-social-projects/YIF_Frontend

---

## How to run the project with docker-compose locally

The instructions below will allow you to run application locally in the containers for developing and testing purpose.

### Installation Prerequisites:

- Docker version 17.05 or higher, [Docker Compose] (https://docs.docker.com/compose). If you are running Microsoft Windows family OS, it is better to use docker-desktop.
- Access to the Azure Storage.

- Clone repository from GitHub with:
  git clone https://github.com/ita-social-projects/YIF_Frontend

- Move to the https://github.com/ita-social-projects/YIF_Frontend and run "docker build -t "

- Next run "docker run -d -p [port]:[port] --name web https://github.com/ita-social-projects/YIF_Frontend

- Run the FronEnd and BackEnd of the application by executing the "docker-compose up" command.

- Now you can access your application at http://localhost.

---

## Team

> Or Contributors/People

![@team](https://avatars2.githubusercontent.com/u/64921184?s=200&v=4)
![@team](https://avatars0.githubusercontent.com/u/62026523?s=200&u=c5ffa62223d32312a6f3592c66e4c791eb4c7343&v=4)
![@team](https://avatars1.githubusercontent.com/u/60184096?s=200&u=354406f2bcd0522f17e5c94d2b7c6d34596f0ec9&v=4)
![@team](https://avatars0.githubusercontent.com/u/58741436?s=200&u=ffc14f01ed18eab531f52e6b06865ee410b57965&v=4)
![@team](https://avatars2.githubusercontent.com/u/60231618?s=200&u=5a15300a5626ca41ca26910dc1660a74d3dc4847&v=4)

- You can just grab their GitHub profile image URL
- You should probably resize their picture using `?s=200` at the end of the image URL.

---

### FAQ

- **How do I do _specifically_ so and so?**
  - No problem! Just do this.

---

- Copyright 2020 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.
