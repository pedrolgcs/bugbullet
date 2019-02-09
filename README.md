# BugBullet

Aplicação desenvolvida utilizando o [AdonisJs - Node.js web framework](https://adonisjs.com/)

## Setup

1. Install **AdonisJS**: `npm i -g @adonisjs/cli`
2. Open project and use: `npm install`
3. Generate application key and create .env: `adonis key:generate`
4. Config database access in: *.env* file
5. create tables into database: `adonis migration:run`
6. create seeds: `adonis seed`
7. Run aplication: `adonis serve --dev`

## Routes Documentation

#### Prefix for all routes -> api/v1

---
### User
- ( /user ) - POST - Create a new User
- ( /user ) - GET - Show logged user => **Middleware** [auth]
- ( /user ) - PUT - Update user logged => **Middleware** [auth]
---
### Users
- ( /users ) - GET - List all users => **Middleware** [auth, can:(read_users)]
- ( /users ) - POST - Create a new user => **Middleware** [auth, can:(create_users)]
- ( /users:id ) - GET - Show a user by ID => **Middleware** [auth, can:(read_users)]
- ( /users:id ) - PUT - Update user by ID => **Middleware** [auth, can:(update_users)]
- ( /users:id ) - DELETE - Delete user by ID => **Middleware** [auth, can:(delete_users)]
---
### Notices
- ( /notices ) - GET - List all notices order by last notices
- ( /notices ) - POST - Create a new notice => **Middleware** [auth, can:(create_notice)]
- ( /notices:id ) - GET - Show a notice by ID
- ( /notices:id ) - PUT - Update notice by ID => **Middleware** [auth, can:(update_notice)]
- ( /notices:id ) - DELETE - Delete notice by ID => **Middleware** [auth, can:(delete_notice)]
---
### Sectors
- ( /sectors ) - GET - List all sectors => **Middleware** [auth, can:(read_sectors)]
- ( /sectors ) - POST - Create a new sector => **Middleware** [auth, can:(create_sectors)]
- ( /sectors:id ) - GET - Show a sector by ID => **Middleware** [auth, can:(read_sectors)]
- ( /sectors:id ) - PUT - Update sector by ID => **Middleware** [auth, can:(update_sectors)]
- ( /sectors:id ) - DELETE - Delete sector by ID => **Middleware** [auth, can:(delete_sectors)]
---
### Roles
- ( /roles ) - GET - List all roles => **Middleware** [auth, can:(read_roles)]
- ( /roles ) - POST - Create a new roles => **Middleware** [auth, can:(create_roles)]
- ( /roles ) - GET - Show a roles by ID => **Middleware** [auth, can:(read_roles)]
- ( /roles ) - PUT - Update roles by ID => **Middleware** [auth, can:(update_roles)]
- ( /roles ) - DELETE - Delete roles by ID => **Middleware** [auth, can:(delete_roles)]
