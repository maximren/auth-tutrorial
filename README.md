# express-jwt practice
learning for authorization flow (jwt)

# Start server

```
yarn && yarn start
```

# Signup

`POST` `/signup`

*request*

```
{
  "name": "John",
  "email": "testuser@gmail.com"
  "password": "lolkek123"
}
```

*response*

```
{
    "date": "2020-04-21T11:09:07.061Z",
    "_id": "5e9ed4564eb3b58646964c5a",
    "name": "John",
    "email": "testuser@gmail.com",
    "password": "$2b$10$2rdvYMqBjUn3OebHOkPguelRmDXmyOOw0O8B6Hx8BUVt4fszQ.JNe",
    "__v": 0
}
```


#Signin

`POST` `/signin`

*request*

```
{
  "email": "testuser@gmail.com"
  "password": "lolkek123"
}
```

*response*

```
{
    status: 200,
    message: "Success"
}
```

#Posts

*testing endpoint*
`GET` `/posts`

*response*

```
{
    "title": "kek",
    "description": "lolkek"
}
```
