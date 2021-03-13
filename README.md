# Sample CRUD app using NodeJS

## Use case

- Create/Read/Update/Delete Users
- Login/Signup Authentication

## Config

  Configurations are saved in `config.js` which includes

  - `Database` URI and Collection
  - Authentication rules

## Authentication

- enable email/password sign-in method

## Run

- Install dependencies using `yarn` or `npm i`
- `npm start` will run the app at port `3000`

## Test

- `npm test` or `yarn test`

## API Endponits

| Endpoint | Description             | Type | Data                  | Response |
|----------|-------------------------|------|-----------------------|----------|
| `/signup`  | Create User             | `POST` | `{email,password,name}` |          |
| `/login`   | Login with created user | `POST` | `{email,password}`      | `{token}`  |
| `/users`   | Get all Users           | `GET`  |                       | `[users]`  |
| `/user?email=<email>` | Get a specific User | `GET` | | `{user}` |
| `/update` | Update User details(require login `Token`) | `POST` | `{token, email/password/name}` | |
