<h1 align="center"><picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.gif" alt="🍿" width="32" height="32">
</picture><a href="https://degs-o-kev-bacon.vercel.app/" target="_blank">6&deg; of Kevin Bacon</a><picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.gif" alt="🍿" width="32" height="32">
</picture></h1>

## Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)
6&deg; of Kevin Bacon is a sleek UI built using React. It's designed to challenge users on their knowledge of movie trivia. Using an input device or a touchscreen, a user can drag and drop movies or movie stars while trying to create a valid puzzle. A puzzle is only valid if a star is between 2 movies they starred in vice versa.

## Preview of App:
[//]: <> (Provide ONE gif or screenshot of your application - choose the "coolest" piece of functionality to show off.)
<div align="center">
  <img src="/src/assets/images/site-nav.gif" alt="preview of app navigation" width="400px" height="auto">
</div>

## Installation Instructions:
[//]: <> (What steps does a person have to take to get your app cloned down and running?)

> [!WARNING]
> **[Node.js](https://nodejs.org/en) & [npm](https://www.npmjs.com/) are required to run this app.**<br>
> _Please ensure you have both installed on your machine before proceeding._

- _(optional) *Fork this project to your own Github account._
- Clone the repository to your local machine.
- `cd` into the project folder.
- Use the `npm install` command to install the project dependencies.
- Use the `npm run dev` command to run a preview version of the app.
- Check the console for the `PORT` & copy/paste `localhost:PORT` into your web browser.
- If you would like to work with your own version of the API, fork [this repo](https://github.com/seth-way/degs-o-kev-bacon-api) & follow the instructions in the README.

## Context:
[//]: <> (Give some context for the project here. How long did you have to work on it? How far into the Turing program are you?)
6&deg;-o-Kev Bacon was a solo project completed during my 5th month at Turing. I spent roughly 30 hours writing the application, including creating a custom API to store & serve the unique puzzles.

## Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)
This app was a concept created, built & deployed by <a href="https://github.com/seth-way">Seth Way</a>.

## Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)
- The goal of this app was to reinforce skills in React, React Router, Async JS & E2E-Testing with [Cypress](https://www.cypress.io/).
- Additionally, I challenged myself with a few new technologies...
  - To host this apps data, I build my own API endpoint using Node's Express.js library.
  - The UI takes advantage of React's [DnD-Kit](https://dndkit.com/) library to make drag/drop seamless across most devices.

[//]: <> (What are 2-3 wins you have from this project? What were some challenges you faced - and how did you get over them?)
## WINS:
- The game ties together several new concepts I wasn't sure I could pull off. My idea required using a drag-n-drop interface, creating SVG paths to clip images to various shapes & using [framer-motion](https://www.framer.com/motion/) to create smooth animations. All these new concepts came together nicely & I'm happy with the final UI.
- The app's various pieces of state became cumbersome to work with & so I made a decision to refactor all state to use a [ZuStand](https://zustand.docs.pmnd.rs/getting-started/introduction) store. It took time away from developing new features, but overall it was worth it. After the refactor, managing state became much more cut & dry and I was able to work with a useful new library in the process.
 
## CHALLENGES:
- The DnD-Kit Library comes with several useful new hooks. However, my use case was unique and so finding relevant examples was an issue. It required patience, trial & error & lots of debugging to integrate into my app.
- Cypress's drag-n-drop tools did not natively work with my chosen library, so that also took some research. I was able to find a useful 3rd party library that made it possible to use DnD-Kit with Cypress's testing suite.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB]" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
</p>
