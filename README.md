### Tink Autofill Demo

This demo app illustrates the Tink Autofill feature documented [here](https://docs.tink.com/resources/solutions/autofill).

The frontend is built with Create React App and the backend is a Node server using [express](https://expressjs.com/). [Axios](https://github.com/axios/axios) is used for communication with backend and Tink API.

Create two `.env` files, one in client directory and one in backend directory. Set enviroment variables for you Tink app (can be found in [Tink Console](https://console.tink.com/)),

client/.env

```
REACT_APP_TINK_LINK=app_tink_link
```

server/.env

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

Run server and client to run app:

```
cd server
yarn
yarn start
```

```
cd client
yarn
yarn start
```
