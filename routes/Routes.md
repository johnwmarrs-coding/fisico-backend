# Routes Docs

## Basic Info

The basic return payload for each route is a JSON payload of the following form:

```
{
    success: true, // or false
    msg: "A simple statement about the success or failure of the request",
    <object>: {
        // JSON of the model or token_hash
    }
}
```

## User Routes

### Create User (Signup) - POST `/user/signup`

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
    "data": {
        "token_hash": "<hash for user's auth token>",
        "user_id": "<user_id>"
    }
}
```

### Get User - POST `/user`

Argument(s):

JSON request body parameter indicating `user_id` value to search by

```
{
    "user_id": "<user_id>"
}
```

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

### Update User - PUT `/user`

Arguments(s):

JSON request body parameter indicating `user_id` value to search by and updated field values. Can update one, some, or all values. Ex:

```
{
	"user_id": "<user_id>",
	"update_fields": {
		"username": "nicky21"
	}
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

### Delete User - DEL `/user`

Argument(s):

JSON request body parameter indicating `user_id` value to search by

```
{
    "user_id": "<user_id>"
}
```

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
