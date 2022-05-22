# Clean Architecture Model JS

version: 'v1.0.0'

## Description
This is my attempt to implement Uncle Bob Martin's clean architecture in JavaScript. However, according to Bob Martin's clean architechture diagram, both the use case outport/input ports are implemented with interfaces, which do not exist in JavaScript. Therefore, I try to satify this need with dependency injection.

*Note: This version does NOT follows proper RESTful architecture.*

* Runs on port 5000
* Database Repositories
    * In-memory
    * Sequelize
        * Mariadb 
* External Services
    * jsonplaceholder (example)


## Uncle Bob's Clean Architecture Diagram

I tried to organize the application's files and folders according to this diagram:

[![Clean Architecture - By Uncle Bob](https://bl3302files.storage.live.com/y4mW9gccE03kr2tBTyqM-5NVT6uzZK0XZJpZff4jeKZIAJXRTN72oziMhtO1B8wv1NO0nQvCv9oGe5PRlH1OdRVSxGIBF0n5txGYQVP-eQs1wpFDb8WJICZ981zO2XC3Ho5_38QQOoDtn0qMUIy_3jEWyQ8iyS9JkNPJd2VuuzWFwwBFw7BC8zUNy2q7mRJRSDa?width=668&height=491)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

# Routes

These are the routes this API uses:

### Users

|`/users`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/users/:id`|get one user|
|DELETE|`/api/v1/users`|delete one user|
|PUT|`/api/v1/users`|update one user|
|POST|`/api/v1/users`|create one user|

### Products

|`/products`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/products/:id`|get one product|
|DELETE|`/api/v1/products`|delete one product|
|PUT|`/api/v1/products`|update one product|
|POST|`/api/v1/products`|create one product|

### Orders

|`/orders`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/orders/:id`|get one order|
|DELETE|`/api/v1/orders`|delete one order|
|PUT|`/api/v1/orders`|update one order|
|POST|`/api/v1/orders`|create one order|

### Images

|`/images`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/images/:id`|get one image|
|DELETE|`/api/v1/images`|delete one image|
|PUT|`/api/v1/images`|update one image|
|POST|`/api/v1/images`|create one image|

## Run Locally

#### Prerequisites
* Node.js
* Sequelize
* Mariadb


#### 1. Clone the repo and install dependencies
```bash
git clone 
cd clean-architecture-model-ts
npm install
```

#### 2. Modify the .env file
In the `.env` file, update the following environment variables for sequelize to work correctly.

* DB_DIALECT
    * (Enter "inMemory" to use the in-memory database)
* DB_NAME
* DB_USERNAME
* DB_PASSWORD
* DB_HOST
* DB_PORT

#### 3. Start the server
To run in production mode where code is transpiled into a `dist` folder and run directly in `node`:
```bash
npm start
```

To run in development mode where code is run by ts-node-dev and re-transpiled any time there is a change:
```bash
npm run dev:watch
```
