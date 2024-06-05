# rapid_it coding assignment

The Auto Repo backend setup tool is a command-line interface (CLI) designed to automate the configuration of a development environment. It simplifies the process by guiding the user through selecting and configuring various tools and services, reducing setup time from hours to minutes.

## Features covered

- Used TypeScript in the project
- Implemented Sequelize
- Used Node.js, Express, Sequelize, JWT, ESLint, Winston  Logger, express-validator, module aliasing, PostgreSQL
- Used Express validation middleware to demonstrate basic payload validation
- Used Express middleware for authorizing and enforcing authorization for users, including admin functionality
- User DB table to enforce login as admin functionality

## Important Instructions
- This Repo is used to generate requirement basis tools and configuration set up with user cmd interface. 
- This Repo is built with multiple tools of choice. Please setup based on your requirement in the system before installing and running the project.
- After selecting all the necessary tools and db's in the system, create a database inside names of your choice.

**src/configs/config.ts file**

| Key                  | Type     | Description                       |
| :------------------- | :------- | :---------------------------------|
| `PORT`               | `string` | **Your server port**.             |
| `PG_DB_USER`         | `string` | **Your PostgreSQL username**.     |
| `PG_DB_PASSWORD`     | `string` | **Your PostgreSQL password**.     |
| `DB_NAME`            | `string` | **Your database name**.           |
| `MONGO_URI`          | `string` | **Your MongoDB URI**.             |
| `REDIS_URL`          | `string` | **Your Redis URL**.               |
| `REDIS_PASSWORD`     | `string` | **Your Redis password**.          |
| `IMAGE_UPLOAD`       | `string` | **Your AWS S3 bucket name**.      |
| `INCLUDE_PORT_IN_NODE_DOMAIN` | `string` | **Include port in node domain**. |
| `DEFAULT_NODE_PROTOCOL` | `string` | **Default node protocol**.       |
| `SERVER_URL`         | `string` | **Your server URL**.              |
| `NODE_DOMAIN_NAME`   | `string` | **Your node domain name**.        |
| `SMTP_HOST`          | `string` | **Your SMTP host**.               |
| `SMTP_PORT`          | `string` | **Your SMTP port**.               |
| `MAILING_USERNAME`   | `string` | **Your mailing username**.       |
| `MAILING_PASSWORD`   | `string` | **Your mailing password**.       |
| `SENDER_INFO`        | `string` | **Your sender info**.             |
| `APP_SECRET`         | `string` | **Your application secret**.      |
| `EXPIRES_IN`         | `string` | **Token expiration time**.        |

- you can find the server logs under /db/logs.

## Environment Variables
- Please update the .env files inside env folder  with the following information (refer to src/configs/config.ts):

- You need to create and files in folder name as env and inside of it need to create files based on environment and add this key value such as in .env.example in root directory and files should be properly named such as  
  - .env
  - development.env
  - stage.env
  - testing.env

## Run Locally

Clone the project

```bash
  #npx run rapiit
  git clone -b develop "https://github.com/shahahmedp/rapitIt.git"

```

Go to the project directory

```bash
  cd rapiit
```

Install dependencies

```bash
  yarn install
```
Auto setup the repo

```bash
  yarn Repo:setup
```

Set-up your repo 

```bash
git init
```
## Run

Run the server locally in development

```bash
  yarn serve:test
  yarn serve:dev
  yarn 
```
## Testing
 Test the api's with this cmds

 ```bash
  yarn test:devENV
  yarn test:testENV
  yarn test:watch
 ```
## Build

```bash
  yarn build
```

## Start

Run the server after running the build.

```bash
    yarn serve:prod
```

## Tech Stack

**Server:** Node, Express, Sequelize, JWT, Eslint, prettier, Winston

## Author

- XXXXXXXX ()
