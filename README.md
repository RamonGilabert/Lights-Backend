# Lights Backend

This is the backend for the Lights project that will be build in NodeJS.

The link for the server is: [Backend](https://lights-backend.herokuapp.com).

The server side of the project will provide basic functionality to:

- `GET` an object called `light` that will contain information about if it's on, off, the intensity and RGB value.
- `PUT` new information about any of the topics stated above, so intensity, level, etc.

- The server will also talk with the Raspberry Pi and will get information and post information to the LEDs.
- The server will also have memory, so you'll be able to program the lights to open and close at a given time.

## Documentation

### Lights

The server's main part is to control the values of the lights, intensity, status, red, green and blue values.

### Controllers

The controllers in this case are going to be the hubs controlled by Raspberry Pi's. Every controller will be able to have multiple lights.

### Schedules

The schedules is just another part of a light, but as an extension. You can have multiple schedules at once.
