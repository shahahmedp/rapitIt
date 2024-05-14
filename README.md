# EngageXr coding assignment

This project contains the backend code for the EngageXr coding assigment.

## Features covered

- Used Typescript in the project
- Implemented Sequelize
- ROle based access JWT authentication for admin, company and user 
- Used Node, Express, Sequelize, JWT, ESlint, Winston Logger, express-validator, module aliasing, postrgres
- Created Express routing to demonstrate CRUD functionality (Create / Read / Update / Delete) for two API items: Companies and Employees
- Used Express validation middleware to demonstrate basic payload validation
- Used Express middleware  for authorising to enforce authorisation,company or user,
- Companies DB table consists of these fields: Name (required), email, phone, website
- Employees DB table consists of these fields: First name (required), last name (required), Company (foreign key to Companies), email, phone
- User DB table (Additional table to enforce log in as admin functionality)

## Important Instructions

- This project is built with postgres as database choice. Please setup postgres in the system before installing and running the project.
- After installing postgres in the system, create a database inside names ad metaseq.
- Once you setup your postgres database you need to set the database name, username, password in **src/configs/sequelizeconfig.ts file**

| key        | Type     | Description                       |
| :--------- | :------- | :---------------------------------|
| `database` | `string` | **Your postgres database name**.  |
| `username` | `string` | **Your username**                 |
| `password` | `string` | **Your password**.                |

- All api reference is given in bellow and to ease API testing there is a POSTMAN api JSON file added in the root of the project **(/postman/engagexr-apis.postman_collection.json)** directory. Import this file in the POSTMAN application and test the API with pre-loaded data. More info about API's is given in the API Reference section.

- you can find the server logs under consoleLogs folder under the src directory.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET="shah@123"`

## Run Locally

Clone the project

```bash
  git clone -b main https://github.com/shahahmedp/engageXR-.git
```

Go to the project directory

```bash
  cd engageXRBackedn
```

Install dependencies

```bash
  yarn install
```

Run the server locally in development

```bash
  yarn run dev
```

## Build

```bash
  yarn run build
```

## Start

Run the server after running the build.

```bash
  yarn start
```

## Tech Stack

**Server:** Node, Express, Sequelize, JWT, Eslint, prettier, Winston

## API Reference

### Auth API

#### Signup user

```http
  POST http://localhost:3000/api/auth/signup
```

| Body Payload | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `username`  | `string` | **Required**.                              |
| `email`      | `string` | **Required**.                              |
| `password`   | `string` | **Required**.                              |
| `role`       | `array of strings` | **OPTIONAL: Admin/Company/user**. Defaults. GUEST |

#### Signin user

```http
  POST http://localhost:3000/api/auth/signin
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `username`      | `string` | **Required**. |
| `password`   | `string` | **Required**. |

### Company API

All the company API requires Authorisation header containing Bearer Token(x-access-token)

- use the Signin API shown above to generate the token.
  | Headers | Type | value |
  | :-------- | :------- | :------------------------- |
  | `Content-Type` | `string` | **application/json**. |
  | `Authorization` | `string` | **Bearer [x-access-token]**. |

#### Create a new company

```http
  POST http://localhost:3000/api/post/cmpy
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `name`       | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `phone`      | `string` | **OPTIONAL**. |
| `website`    | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get all companies

```http
  GET http://localhost:3000/api/get/cmpy
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get company by company id.

```http
  GET http://localhost:3000/api/getbyid/cmpy/:name
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Update company by company id.

```http
  PUT http://localhost:3000/api/putbyid/cmpy/:companyId
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `name`       | `string` | **OPTIONAL**. |
| `email`      | `string` | **OPTIONAL**. |
| `phone`      | `string` | **OPTIONAL**. |
| `website`    | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Delete company by company id.

```http
  DELETE http://localhost:3000/api/deleteById/cmpy:companyId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

### Employee API

All the employee API requires Authorisation header containing Bearer Token and Content-Type header

- use the Signin API shown above to generate the token.
  | Headers | Type | value |
  | :-------- | :------- | :------------------------- |
  | `Content-Type` | `string` | **application/json**. |
  | `Authorization` | `string` | **Bearer [x-access-token]**. |

#### Create a new employee

```http
  POST http://localhost:3000/api/post/emp
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `cmpID`        | `string` | **Required**. |
| `firstName`  | `string` | **Required**. |
| `lastName`   | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `phone`      | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get all employees

```http
  GET http://localhost:3000/api/get/emp
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get employee by employee id.

```http
  GET http://localhost:3000/api/getbyid/emp/:employeeId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get employee by company id.

```http
  GET http://localhost:3000/api/company/:companyId/employees
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Update employee by employee id.

```http
  put http://localhost:3000/api/putbyid/emp/:employeeId
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `firstName`  | `string` | **OPTIONAL**. |
| `lastName`   | `string` | **OPTIONAL**. |
| `email`      | `string` | **OPTIONAL**. |
| `phone`      | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Delete employee by employee id.

```http
  DELETE http://localhost:3000/api/deleteById/emp/:employeeId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

## Author

- XXXXXXXX ()
