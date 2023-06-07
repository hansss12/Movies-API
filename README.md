# REST API Movie by Raihan Aqil Fadillah 

## LIST ROUTER

# login / register route

## POST /

# description

add a value to register form

body

```json
{
    "email": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string",
    "email": "string"
}
```

## POST /register

# description

add new user to database

-   body

```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

-   status 201 Created

```json
{
    "message": "Success Register",
    "username": "string",
    "email": "string",
    "role": "string"
}
```

# response error

-   400

```json
{
    "message": "string"
}
```

## POST /sign-in

# description

login to get access_token for next features

-   body

```json
{
    "email": "string",
    "password": "string"
}
```

# response

-   status 200 OK

```json
{
    "message": "Success Register",
    "access_token": "string"
}
```

# response error

-   400

```json
{
    "message": "string"
}
```

-   401

```json
{
    "message": "string"
}
```

# Movies route

## GET /movies

# description

get all movies data

-   require headers

```json
{
    "access_token": "string"
}
```

## Global movie attributes

```js
const movie = {
    id: "integer",
    name: "string",
    duration: "string",
    minimumAge: "integer",
    rating: "integer",
    actress: "string",
    description: "string",
    genre: "string",
    tags: "string",
    trailer: "string",
    season: "string",
    image: "string",
    location: "string",
    like: "integer",
    releasedYear: "integer",
    createdAt: "date",
    updatedAt: "date",
};
```

# response

-   200 OK

```json
{
    "movie": [
        movie
    ],
    "slider": [
        movie
    ],
    "favorite": [
        movie
    ],
    "popular": [
        movie
    ],
    "trending": [
        movie
    ],
    "sport": [
        movie
    ],
    "parallax": [
        movie
    ],
    "wishList": [
        {
            "id": "integer",
            "UserId": "integer",
            "MovieId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "Movie": movie
        }
    ],
    "membership": [
        {
            "id": "integer",
            "name": "string",
            "price": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        },
    ]
}
```

## GET /movies/:id

# description

get movie data

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "data": movie,
    "user": {
        "id": 1,
        "username": "string",
        "email": "string",
        "password": "string",
        "role": "string",
        "MemberId": 3,
        "createdAt": "date",
        "updatedAt": "date"
    },
        "wishList": {
            "id": "integer",
            "UserId": "integer",
            "MovieId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
        }
}
```

-   404 not found

```json
{
    "message": "string"
}
```

## Route account detail

## GET /movies/account

# description

get detail account data

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string",
    "data": {
        "id": 1,
        "username": "string",
        "email": "string",
        "password": "string",
        "role": "string",
        "MemberId": 3,
        "createdAt": "date",
        "updatedAt": "date",
        "Detail": { "type": "object" },
        "Card": { "type": "object" },
        "Member": { "type": "object" }
    }
}
```

## POST /movies/account

# description

post / create detail account

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   201 Created

```json
{
    "message": "string"
}
```

## PUT /movies/account

# description

update detail account

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string"
}
```

## PATCH /movies/update/:id

# description

update membership user

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string"
}
```

## POST /movies/payment/:id

# description

create midtrans token

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   201 Created

```json
{
    "token": "string",
    "redirect_url": "string"
}
```

## POST /movies/:id/wishlist

# description

Add and remove wishlist

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string"
}
```

-   201 Created

```json
{
    "message": "string"
}
```

## Route card

## GET /card

# description

Get data card by user

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string",
    "data": {
        "id": "integer",
        "cardNumber": "string",
        "holder": "string",
        "month": "string",
        "year": "string",
        "cvv": "integer",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

## POST /card

# description

create data card by login user

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   201 Created

```json
{
    "message": "string"
}
```

-   400 error

```json
{
    "message": "string"
}
```

## GET /card/:membership

# description

get data card and membership for payment

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string",
    "data": {
        "id": "integer",
        "cardNumber": "string",
        "holder": "string",
        "month": "string",
        "year": "string",
        "cvv": "integer",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    },
    "membership": "integer"
}
```

-   404 error not found

```json
{
    "message": "string"
}
```

## POST /card/:membership

# description

get data card and membership for payment

-   require headers

```json
{
    "access_token": "string"
}
```

# response

-   200 OK

```json
{
    "message": "string",
    "card_token": "string"
}
```

-   404 error not found

```json
{
    "message": "string",
    "card_token": "string"
}
```

-   400 error

```json
{
    "message": "string"
}
```

## Global error

-   401 error

```json
{
    "message": "string"
}
```

-   500 error server

```json
{
    "message": "string"
}
```
