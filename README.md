# TELEGATE

A very simple typescript telegram gateway via expressjs REST API using gramjs

## Contribution

Any features request and contribution are welcome! ^\_^

## Installation & Configuration

### Configuration

1. Make sure you clone this repo first
2. Copy `.env.example` and rename it to `.env`
3. Change the configuration there including your apiId, apiHash and phone number

### Get the ApiId and ApiHash

1. Register and go to https://my.telegram.org/auth

### Generate session string

1. Make sure you fill out the apiId, apiHash and phone number in your `.env' file.
2. Run: `npm run generate`, enter the OTP or Password
3. Copy the session string and place it in .env

### Installation

1. Node.js v20+ , I've setups to 20 in package.json, you can change it but generally it works in Node.js v12 higher
2. npm package manager
3. You can go for docker for an easy setups

4. `cd` into the project directory
5. run `npm install`
6. run `npm run build`
7. run `npm run start`
8. After that you will need to scan the QR that is printed to the terminal
9. You're basically done, or if you want to be more robust, you can use `pm2` for a better process management

## Endpoints

- [GET] /api/v1/

Response:

```json
{
  "message": "REST API is working"
}
```

- [POST][Multipart/form-data] /api/v1/send/

| name    | value                        |
| ------- | ---------------------------- |
| id      | 123123 or @username          |
| content | your message                 |
| async?  | true or false, default false |

Response:

```json
{
  "status": "success",
  "code": 200,
  "message": "Message sucessfully sent",
  "data": {
    "id": "12312...",
    "content": "Hi, mom!",
    "type": "text"
  }
}
```

- [POST][Multipart/form-data] /api/v1/send/media

| name    | value                        |
| ------- | ---------------------------- |
| id      | 123123 or @username          |
| content | your message                 |
| file    | binary file                  |
| async?  | true or false, default false |

Response:

```json
{
  "status": "success",
  "code": 200,
  "message": "Message sucessfully sent",
  "data": {
    "id": "12321...",
    "content": "this is your media caption",
    "type": "media"
  }
}
```

### Error response

```json
{
  "status": "error",
  "code": 400,
  "message": "Bad Image"
}
```

#### Error code

| Code | Status                |
| ---- | --------------------- |
| 200  | SUCCESS               |
| 201  | CREATED               |
| 204  | NO CONTENT            |
| 400  | BAD REQUEST           |
| 401  | UNAUTHORIZED          |
| 403  | FORBIDDEN             |
| 404  | NOT FOUND             |
| 408  | TIME OUT              |
| 429  | TOO MANY REQUEST      |
| 500  | INTERNAL SERVER ERROR |
| 503  | SERVICE UNAVAILABLE   |
