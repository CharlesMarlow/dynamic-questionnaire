## Running this project

- Pre-requisites: 
  * Node (>=18)
  
  If you need to change Node versions, `nvm` allows for installing and managing 
  different versions. Installtion is available here: 
  [text](https://github.com/nvm-sh/nvm)
  
  Then, for example: 
  `nvm install 18`
  `nvm use 18`

  This project encapsulates both front and backend flows and has corresponding
  folders for that purpose. In order to interact with the app please follow:
  1. Go to root-level and run `npm install`
  2. Go to `/backend` and run `npm install`
  3. Go to `/frontend` and run `npm install`

  Once all the dependencies are installed, you can head back to the root-level
  and run: 
  `npm run start`

  This should start the app in the stated URL address, running both the front and the backend.

  ## Backend Structure

  The backend leverages Node.js as a JS runtime enviornment and sets up a 
  mock database and a server, using LowDB and the Express framework. 
  The functionality follows a flow of:
  route => middleware (when needed) => controller. 

  This provides the opportunity to easily modify and extend the flow. 

  In projects with more functionality, it's better to further break handling 
  the flow through model files and a dbClient file. In this spcific case I 
  decided to keep things with a route and a controller. 
  The code is modularised when possible and needed and tries to keep a clean
  structure and increase readability and understanding. 

  The Schema is strucutured in a way that would allow the frontend to sample it in chunks and not receive it whole and deal it with on the frontend, rather have the backend deliver the frontend a starter, non-dependent, chunk of questions to allow the frontend send responses and receive corresponding further questions. 

  This is done by placing a `position` and `dependsOn` fields on each question. Moving logic through these allows for proper checks and gives the backend a chance to reply according to what is happening on the frontend in a dynamic way. 

  This lowers the burden on the frontend to handle logic which is better suited for the backend, leaving the frontend to care about what's important, without "being aware" to what will come next from the backend. 

  ## Frontend architecture
  The frontend section of the app was boostrapped with Vite + TS + React (a snippet from Vite about that just below). Vite is a modern bundler with certain optimisation features which allow for a reduced build-time. 

  Using static types with typescript makes the app more robust as runtime errors are reduced, errors are caught faster and the general code quality is improved. 

  The app's architecture when it comes to React follows 2 patterns: 
  1. Modular and re-usable representational components: For example, having a separate component for each form element and other UI components that can be 
  moved outside a main screen, reducing its complexity and allowing to focus on necessary functionality. 
  
  2. Custom hooks: when logic can potentially be re-used, and it uses React's different hooks features, it can be a good option to extract that functionality
  to an external custom hook and have it deal with it. This helps to separate concerns and assign each part of the app to its own responsibility and increases readability. 

  Further modularisation is done by separating types and utility functions. 

  As an app grows, so does its handling of styles. With this contained assignment I kept the styles in one file but it would also be beneficial to separate those and decide on a strategy: CSS modules, a utility-first tool (Tailwind, for instance), a component library (shadcn/Chakra) or a full-encapsulation tool such as Bootstrap. 

  Using this approach on the frontend gives it consistentcy and further development as extending the main flow is straightforward and updating behaviour and functionality can be done without major refactors. 

  # Final thoughts

  - The same project structure is possible by using `Next.js`, handling React with `Next`'s features and leveraging `server actions` as backend code which is "closer" to the database. I decided to separate the two as I think that while using `server actions` can be beneficial for auth processes and other jobs it's still not suited for a complete app where custom logic is needed on the backend, or form submissions (the main flow) and database communication are necessary.
  One more consideration has to do with state management: if this app grows (adds a separate flow for a logged-in user, for instance) the data flow between front and back is not as smooth as it is within regular React components and custom hooks and the state management tool. 

  For these reasons I decided to introduce Node.js and have a clear separation of concerns between front and back end logic and functionality. 

  - State management: If this app grows, adds another flow/flows, etc, it'd be better handled through a full-scale state-management such as Redux/RTL. Saving responses and dealing with their values would be consistent and not dependent on local state, and would help to reduce complexity from hooks/components. Such a tool provides a strucutured and very clear way of extending and modifying the flow, and confines future development to the specific process, acts as a single-source-of-truth and furthers clarity, even through it introduces some complexity. 

  - I didn't add any validations for the different interactions but in a real-world app certain validations are necessary: non-empty values, disallow special characters, etc.  
  

  # React + TypeScript + Vite

  This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

  Currently, two official plugins are available:

  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh