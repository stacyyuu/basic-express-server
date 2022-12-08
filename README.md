## LAB - Class 2

### Project: Basic Express Server 
### Author: Stacy Yu
### Links and Resources
- [Server Home Endpoint](https://basic-express-server-08gc.onrender.com/)
- [Server Person 500 Error Endpoint](https://basic-express-server-08gc.onrender.com/person)
- [Server Person Name Endpoint](https://basic-express-server-08gc.onrender.com/person?name=Stacy)
- [Server 404 Error Endpoint](https://basic-express-server-08gc.onrender.com/meow)
- [Pull Request](https://github.com/stacyyuu/basic-express-server/pull/2)
- [Actions](https://github.com/stacyyuu/server-deployment-practice/actions/runs/3610784160)

### Setup
- None

### How to initialize/run your application (where applicable)
- npm start

### How to use your library (where applicable)
- Use endpoints /person for 500 error
- Use /anyroute for 404 error
- Use /person?name=anyname for name object
- Use / for home route 

### Tests
- Jest
- Supertest
- Node.yml on GitHub

### UML
- N/A

### Notes
12/3/22
- Expect to have testing in 401 
- Expect toBe uses === (strings or integers)
- Expect to equal evals property to property (objects or arrays)
- Smallest interesting thing
- Middleware in express - .use((req, res, next))
- For every handler we got, call it in order
- ‘*’ any route
