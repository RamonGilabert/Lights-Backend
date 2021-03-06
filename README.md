# Lights Backend

This is the backend for the Lights project that will be build in NodeJS. The link for the server is: [Backend](https://lights-backend.herokuapp.com).

Here you can get the basic documentation to talk to the server.

## Documentation

- [Lights](https://github.com/RamonGilabert/Lights-Backend#lights)
  - [Get](https://github.com/RamonGilabert/Lights-Backend#get---lights)
  - [Put](https://github.com/RamonGilabert/Lights-Backend#put---lightsid)
  - [Post](https://github.com/RamonGilabert/Lights-Backend#post---lights)
  - [Delete](https://github.com/RamonGilabert/Lights-Backend#delete---lightsid)
- [Controllers](https://github.com/RamonGilabert/Lights-Backend#controllers)
  - [Get](https://github.com/RamonGilabert/Lights-Backend#get---controllers)
  - [Post](https://github.com/RamonGilabert/Lights-Backend#post---controllers)
  - [Delete](https://github.com/RamonGilabert/Lights-Backend#delete---controllersid)
- [Schedules](https://github.com/RamonGilabert/Lights-Backend#schedules)
  - [Get](https://github.com/RamonGilabert/Lights-Backend#get---scheduleslight_id)
  - [Post](https://github.com/RamonGilabert/Lights-Backend#post---scheduleslight_id)
  - [Delete](https://github.com/RamonGilabert/Lights-Backend#delete---schedulesid)

## Headers

The server will handle three types of data, lights, controllers and schedules. The header of each will be the same:

```json
Content-Type: application/json
controller_id: id
```

As an optional, you might want to put a value of `true` in an `admin` parameter to be able to post and delete stuff.

## Lights

The server's main part is to control the values of the lights, intensity, status, red, green and blue values.

#### GET - /lights

With the possibility of extend the get request with an specific ID, this request will return the following json.

```json
[
  {
    "id": 5,
    "created": "2016-01-28T00:00:00.000Z",
    "updated": "2016-01-28T00:00:00.000Z",
    "status": false,
    "intensity": 1,
    "red": 1,
    "green": 1,
    "blue": 1,
    "controller_id": 1
  }
]
```

#### PUT - /lights/:id

This request will be to change a value of a specific light, the request will look like the following.

```json
{
  "id": 1,
  "controller_id": 1,
  "status": true,
  "intensity": 1,
  "red": 1,
  "green": 1,
  "blue": 1
}
```

The request's answer will be the following.

```json
{
  "message": "Cool story!",
  "light": {
    "id": 1,
    "created": "2016-01-24T00:00:00.000Z",
    "updated": "2016-01-24T00:00:00.000Z",
    "status": false,
    "intensity": 1,
    "red": 1,
    "green": 1,
    "blue": 1,
    "controller_id": 1
  }
}
```

#### POST - /lights

As an easy way to create lights without having to mess around with a database we have a post of lights.

```json
{
  "status": true,
  "intensity": 1,
  "red": 1,
  "green": 1,
  "blue": 1
}
```

And the response will be.

```json
{
  "message": "Cool story!",
  "light": {
    "id": 10,
    "controller_id": 1,
    "created": "2016-01-28T21:56:42.139Z",
    "updated": "2016-01-28T21:56:42.139Z",
    "status": false,
    "intensity": 1,
    "red": 1,
    "blue": 1,
    "green": 1
  }
}
```

#### DELETE - /lights/:id

When deleting a light, if the validation is correct, the client will receive a message back.

```json
{
  "message": "Success!"
}
```

Needs to be said that, to be able to `POST` and `DELETE` lights you need to be an admin.

## Controllers

The controllers in this case are going to be the hubs controlled by Raspberry Pi's. Every controller will be able to have multiple lights.

The controllers' API looks exactly the same way the lights API does. The only thing the client won't have is the access to `PUT` values in the controller, nothing needs to change there. The request will be the following.

#### GET - /controllers

With one controller id as an option to check how the controller looks like. The answer will look like the following.

```json
[
  {
    "id": 1,
    "created": "2016-01-24T00:00:00.000Z",
    "updated": "2016-01-24T00:00:00.000Z"
  }
]
```

#### POST - /controllers

The client will get the following response.

```json
{
  "message": "Created!",
  "controller": {
    "id": 4,
    "created": "2016-01-28T20:44:23.842Z",
    "updated": "2016-01-28T20:44:23.842Z"
  }
}
```

#### DELETE - /controllers/:id

The answer will be the following.

```json
{
  "message": "Destroyed!"
}
```

## Schedules

The schedules is just another part of a light, but as an extension. You can have multiple schedules at once.

#### GET - /schedules/:light_id

The response to the request will be the following.

```json
{
  "message": "Cool story!",
  "schedules": [
    {
      "light_id": 0,
      "created": "2016-01-28T00:00:00.000Z",
      "schedule": "2016-03-10T00:00:00.000Z",
      "status": false,
      "intensity": 1,
      "red": 1,
      "green": 1,
      "blue": 1,
      "id": 0
    }
  ]
}
```

#### POST - /schedules/:light_id

With a body like the following.

```json
{
  "schedule": "2016-03-10 17:16:18",
  "status": true,
  "intensity": 1,
  "red": 1,
  "green": 1,
  "blue": 1
}
```

We are going to have a response that will look like this one.

```json
{
  "message": "Success!",
  "schedule": {
    "id": 6,
    "light_id": 0,
    "created": "2016-01-29T15:39:05.697Z",
    "schedule": "2016-03-10T16:16:18.000Z",
    "status": true,
    "intensity": 1,
    "red": 1,
    "green": 1,
    "blue": 1
  }
}
```

#### DELETE - /schedules/:id

In this case the body will be just the `light_id`.

```json
{
	"light_id": 0
}
```

The response will be the following.

```json
{
  "message": "Schedule destroyed!"
}
```
