# MicropostsApp

This is twitter-like app. It is using next components:

* Front-End - Angular2 + Bootstrap 4
* Back-End - NodeJS + Express
* Database - Sequelize + PostgreSQL
* Authentication - Third-party JWT Authentication (auth0)

## Getting Started

To install it to your local machine do this:
```
git clone git://github.com/deugene/microposts-app.git
```
Installing dependencies:
```
cd microposts-app && npm install
```
Create .env file in root folder and set next env variables:
```
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
DEV_DATABASE_URL=link_to_your_sql_dev_database
TEST_DATABASE_URL=link_to_your_sql_test_database
PROD_DATABASE_URL=link_to_your_sql_prod_database
MANAGEMENT_TOKEN=your_auth0_management_token

```
you may need to create auth0 account here - [auth0](https://auth0.com).

## Commands

Starting app under development env with nodemon:
```
npm run dev
```
Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

# Angular2 info

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Enjoy!

