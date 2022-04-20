# LOB Address Search Engine - LIGHT 

## Introduction
> This is a simple search engine for LOB addresses executed in a Node.js runtime
> and stood on top of a PostgreSQL database.

## Endpoints
- /addresses
- Query parameters:
    - `line1`: The main address line
    - `line2`: Optional address line i.e apt #700
    - `city`: The city name
    - `state`: The state abbreviation
    - `zip`: The zip code

## Architecture
- Language: Typescript es2017 modules
- Runtime: Node.js inside a Docker container
- Database: PostgreSQL inside postgres container
- Versioned routes and RESTful API methodology
- Containers communicate on a network

>server.ts is the entrypoint for the application. It loads the express framework, imports the database, and the versioned routing middleware.
>The v1Router imports the logging, cors, apiValidator, errorHandler, and the application routes.

### What Is Missing ?
- Full RESTful API CRUD operations
- API Authentication
- Post / Patch / PUT Request body validation
- Full error logging
- A more comprehensive implementation of search parameters
- A docker configuration file that defines the runtime environment, and the location of this service on a network for production runtime

### Features
This simple search engine can take partial address parameters and return a list of matching addresses if they exist in data store.
- A user can add an address into data store.  
- The system will return an exception If the address already exists in the data store.

### Startup
Copy the .env.sample file to .env and update the postgres database connection values
```terminal
cp .env.sample .env
```

>The below command will start postgres and the node container.
```terminal
 docker compose up -d
```

### Link to the Postman collection
https://www.getpostman.com/collections/df3b95097c236d6313d0
