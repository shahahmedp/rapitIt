# rapid_it coding assignment

This project contains the backend code for the rapid_it coding assigment.

## Features covered

- Used Typescript in the project
- Implemented Sequelize
- Used Node, Express, Sequelize, JWT, ESlint, Winston Logger, express-validator, module aliasing, postrgres
- Used Express validation middleware to demonstrate basic payload validation
- Used Express middleware  for authorising to enforce authorisation,user,
(foreign key to Companies), email, phone
- User DB table (Additional table to enforce log in as admin functionality)

## Important Instructions
- This Repo is used to generate requirement basis tools and configuration set up with user cmd interface. 
- This Repo is built with multiple tools of choice. Please setup based on your requirement in the system before installing and running the project.
- After selecting all the necessary tools and db's in the system, create a database inside names of your choice.

Please update the env with following info
**src/configs/config.ts file**

| key        | Type     | Description                       |
| :--------- | :------- | :---------------------------------|
| `database` | `string` | **Your  database name**.  |
| `username` | `string` | **Your username**                 |
| `password` | `string` | **Your password**.                |
| `redis_URL` | `string` | **Your redis url**.              |
| `redis_password` | `string` | **Your redis password**.    |

- All api reference is given in bellow and to ease API testing there is a POSTMAN api JSON file added in the root of the project **(/postman/rapid_it-apis.postman_collection.json)** directory. Import this file in the POSTMAN application and test the API with pre-loaded data. More info about API's is given in the API Reference section.

- you can find the server logs under consoleLogs folder under the src directory.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET="shah@123"`

## Run Locally

Clone the project

```bash
  git clone -b main https://github.com/shahahmedp/rapid_it-.git
```

Go to the project directory

```bash
  cd rapid_itBackedn
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
