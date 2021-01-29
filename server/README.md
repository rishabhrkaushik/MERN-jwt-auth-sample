# Setting up server
Note: 'project' is the path of the git clone directory in your machine

## Compatibility instruction:
NodeJS version used: V12.18.2
NPM version used: 6.14.5

## Setup

1. Change directory to `project/server` directory
2. Install npm packages by running `npm install`
3. Change directory back to `project`
4. Change directory to `project/client` directory
5. Install npm packages by running `npm install`
6. Change directory back to `project`
7. Install npm packages by running `npm install`

## Testing server

1. Run `npm run dev` from the command line in the `project` directory
2. This starts the client on port `3000` and server on port `5001`
3. Use postman to validate the functionalities as follow

### Checking if the server is running
1. Send get request to `http://localhost:5001/`
2. Response will be json object with message
    ```
    {
        "message": "Authentication Server Running"
    }
    ```

### Signing up user
1. Send post request to `http://localhost:5001/api/auth/signup` with the following content in body
```
{
    "username": "whateverusernamehere",
    "password": "randompasswordhere"
}
```
2. Response will be
```
{
    "message": "User was registered successfully!"
}
```
if username didn't already exist

else response will be
```
{
    "message": "Failed! Username is already in use!"
}
```

### Signing in
1. Send post request to `http://localhost:5001/api/auth/signin` with the following content in body
```
{
    "username": "whateverusernamehere",
    "password": "randompasswordhere"
}
```
2. Response will be
```
{
    "id": "some id here",
    "username": "username here",
    "accessToken": "some access token here"
}
```
if sign in was successful

else response will be
```
{
    "accessToken": null,
    "message": "Invalid Password!"
}
```
3. You can use default username password as following to do the operation
```
{
    "username": "rishabh",
    "password": "password1"
}
```


### Getting the list of cities
1. Copy the access token received in last request.
2. Send get request to `http://localhost:5001/api/test/cities` with the following copied access token recieved in last request as `x-access-token` property in header.
3. Response will be list of cities in json if token was validated successfully
4. Response will be following if token not provided in header
```
{
    "message": "No token provided!"
}
```
5. Response will be following if invalid token provided
```
{
    "message": "Unauthorized!"
}
```
