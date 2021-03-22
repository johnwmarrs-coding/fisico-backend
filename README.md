# fisico-backend

Repo for backend of fisico app (capstone)

## Getting Started

Clone project

Run `npm install` to install dependencies

To run the server run `npm start` which listens at `localhost:3000`

## Docs

The basic return payload for each route is a JSON object of the following form:

```
{
    success: true, // or false
    msg: "A simple statement about the success or failure of the request",
    <object>: {
        // JSON object of the model or token_hash
    }
}
```

### User Routes

#### Create User (Signup) - POST `/user`

Argument(s):

JSON request body representing a user object

```
{
    "username": "timmy123",
    "email": "timmy@gmail.com",
    "password_hash": "<hashed password from the front-end>"
}
```

Returns:

```
{
    "success": true
    "msg": "New user <user.username> created",
    "token_hash": "<hash for user's auth token>"
}
```

#### Get User - GET `/user/?user_id=<user_id>`

Argument(s):

Query parameter indicating `user_id` value to search by

Returns:

```
{
    "success": true,
    "msg": "Found user <user.username>",
    "user": {
        "_id": "<MongoDB ID>,
        "username": "<username>",
        "email": "<email>"
    }
}
```

#### Update User - PUT `/user/?user_id=<user_id>`

Arguments(s):

Query parameter indicating `user_id` value to search by

JSON Body with updated field values. Can update one, some, or all values. Ex:

```
{
    "email": "new.email@gmail.com"
}
```

Returns:

```
{
    "success": true,
    "msg": "User <user.username> updated",
    "user": {
        "_id": "<MongoDB ID>,
        "username": "<username>",
        "email": "new.email@gmail.com"
    }
}
```

#### Delete User - DEL `/user/?user_id=<user_id>`

Argument(s):

Query parameter indicating `user_id` value to search by

Returns:

```
{
    "success": true,
    "msg": "User <user.username> deleted",
    "user": {
        "_id": "<User's MongoDB ID>,
        "username": "<username>",
        "email": "<email>"
    }
}
```

### Token Routes
