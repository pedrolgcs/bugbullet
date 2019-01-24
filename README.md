# BugBullet

Aplicação desenvolvida utilizando o [AdonisJs - Node.js web framework](https://adonisjs.com/)

## Setup

1. Install **AdonisJS**: `npm i -g @adonisjs/cli`
2. Open project and use: `npm install` or `yarn install`
3. Generate application key and create .env: `adonis key:generate`
4. Config database access in: *.env* file
5. create tables into database: `adonis migration:run`
6. create seeds: `adonis seed`
7. Run aplication: `adonis serve --dev`

## Routes Documentation

#### Prefix for all routes -> api/v1

---
### User Router
- ( /user ) - POST - Create a new User
- ( /user ) - GET - Show logged user => **Middleware** [auth]
- ( /user ) - PUT - Update user logged => **Middleware** [auth]
---
### Users Moderator
> **Middlewares** => [ auth, can:(users) ]
- ( /users ) - GET - List all users
- ( /users ) - POST - Create a new User
- ( /users:id ) - GET - Show a user by ID
- ( /users:id ) - PUT - Update user by ID
- ( /users:id ) - DELETE - Delete user by ID
---
### Notices Moderator
- ( /notices ) - GET - List all notices order by last notices
- ( /notices ) - POST - Create a new Notice => **Middleware** [auth, can:(notices)]
- ( /notices:id ) - GET - Show a notice by ID
- ( /notices:id ) - PUT - Update notice by ID => **Middleware** [auth, can:(notices)]
- ( /notices:id ) - DELETE - Delete notice by ID => **Middleware** [auth, can:(notices)]
