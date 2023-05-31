# Social Media App

## Features:

- Authentication
- Authorization
- JWT Token
- Hash Password
- Create Post
- Like Post
- Follow User
- Unfollow User

## Tech Stack:

**NPM Modules:** Express.js,Mongoose.js,bcrypt,jwt.

**Database:** MonogDB

## For Running Locally

- clone the project
```bash
git clone https://github.com/raj8888/food_delievey.git
```

- Go to the Repo
```bash
cd food_delievey
```
- For Install Modules
```bash
npm i
```

- For download nodemon globally
```bash
npm install -g nodemon
```

- For start server
```bash
nodemon index.js
```
## Enviroment Variables

`MongoURL`

`seckey`

`port`

## API Refference


### For Users
- for user register
```http
POST/api/users/register
```

- for user login
```http
POST/api/users/login
```

- for create new password
```http
PATCH/api/users/:userID/reset
```

**Authentication required for next all routes**

### For Restaurants

- for getting all Restaurants
```http
GET/api/restaurants/
```

- for getting particular Restaurants
```http
GET/api/restaurants/:id
```

- for getting particular Restaurants Menu
```http
GET/api/restaurants/:id/menu
```

- for creating restaurants
```http
POST/api/restaurants/
```

- for creating menu for restaurants
```http
POST/api/restaurants/:id/menu
```

- for delete menu for restaurants
```http
DELETE/api/restaurants/:resid/menu/:menuid
```

### For Orders

- for create order
```http
POST/orders/:resid/:menuid
```

- for getting particular order details
```http
GET/orders/:id
```

- for change the status of id
```http
PATCH/orders/:id
```

## Backend Deployed Link
[https://rich-plum-butterfly-sari.cyclic.app/](https://rich-plum-butterfly-sari.cyclic.app/)

## Video Presantation
[presantation link](https://drive.google.com/file/d/1N-ZkFwU599jWHKEZnFlV0p36ha1H12q-/view?usp=share_link)
