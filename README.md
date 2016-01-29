# Lights Backend

This is the backend for the Lights project that will be build in NodeJS.

The link for the server is: [Backend](https://lights-backend.herokuapp.com).

The server side of the project will provide basic functionality to:

- `GET` an object called `light` that will contain information about if it's on, off, the intensity and RGB value.
- `PUT` new information about any of the topics stated above, so intensity, level, etc.

- The server will also talk with the Raspberry Pi and will get information and post information to the LEDs.
- The server will also have memory, so you'll be able to program the lights to open and close at a given time.

## Documentation

The server will handle three types of data, lights, controllers and schedules. The header of each will be the same:

```json
Content-Type: application/json
controller_id: id
```

### Lights

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
  },
  {
    "id": 6,
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

When deleting a light, if the validation is correct, the client will recive a message back.

```json
{
  "message": "Success!"
}
```

### Controllers

The controllers in this case are going to be the hubs controlled by Raspberry Pi's. Every controller will be able to have multiple lights.

### Schedules

The schedules is just another part of a light, but as an extension. You can have multiple schedules at once.
