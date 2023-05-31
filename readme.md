# Social Media App Backend

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

**NPM Modules:** Express.js,Mongoose.js,bcrypt,jwt,dotenv.

**Database:** MonogDB

## For Running Locally

- clone the project
```bash
git clone https://github.com/raj8888/Assignment_86Agency
```

- Go to the Repo
```bash
cd 89AGENT_ASSIGNMENT
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

`port`

## API Refference

### For Users (Signup and Login)
- for user register
```http
POST/api/users/auth/signup
```

- for user login
```http
POST/api/users/auth/login
```


**Authentication required for next all routes**
- Make sure you are passing JWT token from headers
- Ex.
```
headers:{
    authorization:`bearer ${token}`
}
```

### For Follow and Unfollow

**:id reffer to the userID**

- for follow User
```http
POST/api/users/follow/:id
```

- for unfollow User
```http
POST/api/users/unfollow/:id
```


### For Posts 

**:id reffer to the postID**

- for create post
```http
POST/api/posts/
```

- for get all post of followed userd
```http
GET/api/posts/
```

- for getting particular post
```http
GET/api/posts/:id
```

- for like the post
```http
POST/api/posts/like/:id
```

- for make comment on the post
```http
POST/api/posts/comment/:id
```

- for Edit the Post
```http
PUT/api/posts/:id
```

- for Delete the Post
```http
DELETE/api/posts/:id
```

## Backend Deployed Link
[https://alert-dove-culottes.cyclic.app](https://alert-dove-culottes.cyclic.app)


