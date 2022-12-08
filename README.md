## LAB - Class 2

### Project: Basic Express Server 
### Author: Stacy Yu
### Links and Resources
- [Server Cat Endpoint](https://server-deployment-practice-wug4.onrender.com/cat)
- [Server Dog Endpoint](https://server-deployment-practice-wug4.onrender.com/dog)
- [Pull Request](https://github.com/stacyyuu/server-deployment-practice/pull/1)
- [Actions](https://github.com/stacyyuu/server-deployment-practice/actions/runs/3610784160)

### Setup
- None

### How to initialize/run your application (where applicable)
- npm start

### How to use your library (where applicable)
- Use endpoints /cat, /dog

### Tests
- Jest
- Supertest
- Node.yml on GitHub

### UML
- N/A

### Notes
12/3/22
- Node: JS in the server, single thread and event driven. 
- CI: Continuous integration… tools that make your programming more effective and efficient. 
- First step in CI is formatting (style guide). The best way to achieve that is with a consistent style guide (using single quotes vs double)
- This is the linter’s job. Formatter: .prettierrc. Linter: ESlint. 

### Today’s Lab:
- Having a single route that does a single thing 
- Need Eslint and Prettier 
- Copy eslint and prettier files from config class folder 
- Type “module” in package.json, under scripts “scripts”, “lint” “prettier –check src/ && eslint src/”, “test” “jest”, “start” “src/index.js”
- Npx prettier –check src, npx jest, npx eslint src/
- Npm install –save-dev eslint prettier 
- Npm install express dot env
- Import express from ‘express’ – use require instead when using node code, express. When using react, use import. 
- Import { config } from “dotenv”
- Automated test: showing if success or fail, makes sure that your app is still working when being updated 
- Npm install -D jest supertest
- Deploy to render 

- Branch protection: GitHub, settings - branches -  add protection rule - require pull requests before merging - require tests 
- New folder: .github - workflows folder - at same level git is at, root - inside folder create node.yml file 