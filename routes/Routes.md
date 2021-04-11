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

## Table of Contents

- [User Routes](#user-routes)
  - [Create](<#create-user-(Signup)---POST-`/user/signup`>)
  - [Get](#Get-User---POST-`/user`)
  - [Update](#Update-User---PUT-`/user`)
  - [Delete](#Delete-User---DEL-`/user`)
- [Workout Routes](#Workout-Routes)
  - [Create](#Create-Workout---POST-`/workout`)
  - [Get](#Get-Workout---POST-`/workout/get`)
  - [Update](#Update-Workout---PUT-`/workout`)
  - [Delete](#Delete-Workout---DEL-`/workout`)

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

JSON request body with value indicating `user_id` value to search by

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

Argument(s):

JSON request body with value indicating `user_id` value to search by and updated field values. Can update one, some, or all values. Ex:

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

JSON request body with value indicating `user_id` value to search by

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

## Workout Routes

### Create Workout - POST `/workout`

Argument(s):

JSON request body representing a workout object

```
{
    "user_id": "<user_id>",
    "name": "Name for workout i.e. Chest Day",
    "description": "workout description",
    "workout_type": "Enum value of: Distance, Weight Lifting, or Rest",
    "date": "2021-09-03"
    "plan": [
        {
            "name": "bench",
            "weight": "225",
            "units": "lbs",
            "num_sets": 5,
            "num_reps": 5
        },
        {
            "name": "tricep extensions",
            "weight": "50",
            "units": "lbs",
            "num_sets": 3,
            "num_reps": 12
        }
    ]
}
```

Returns:

```
{
    "success": true,
    "msg": "New workout for user with ID <user_id> created",
    "workout": {
        <Returned JSON document as stored in MongoDB>
    }
}
```

### Get Workout - POST `/workout/get`

Argument(s):

JSON request body with values indicating `user_id` value to search by (mandatory), and three optional variables: `completed`, `days`, and `past`. If `completed` is `true` will find all completed workouts. Both `days` and `past` must be used together, where `past` is a boolean that when `true` will find all the completed workouts in the past n days, where n is the integer value of `days`; when `past` is `false`, it will retrieve all the future workouts for the next n days, where n is the integer value of `days`.

```
{
    "user_id": "<user_id>"
}
```

Returns:

```
{
    "success": true,
    "msg": "Found workout(s) for user with ID 604ec6262586462a620c3a92",
    "workout": [
        <Array of found workout objects>
    ]
}
```

### Update Workout - PUT `/workout`

Argument(s):

JSON request body with values indicating `user_id` value to search by, and updated field values. Can update one, some, or all values. Ex:

```
{
	"user_id": "<user_id>",
    "workout_id": "<workout_id>
	"update_fields": {
		<fields you want to update>
	}
}
```

Returns:

```
{
    "success": true,
    "msg": "Workout with ID <workout_id> updated",
    "workout": {
        <Returned updated JSON document as stored in MongoDB>
    }
}
```

### Delete Workout - DEL `/workout`

Argument(s):

JSON request body with values indicating the `user_id` and `workout_id` to search by

```
{
    "user_id": "<user_id>",
    "workout_id": "<workout_id>
}
```

Returns:

```
{
    "success": true,
    "msg": "Workout with ID <workout_id> deleted",
    "workout": {
        <Returned deleted JSON document as stored in MongoDB>
    }
}
```
