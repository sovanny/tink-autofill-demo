const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv/types');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/get-accounts/:code', (req, res, next) => {
  const code = req.params.code;
  if (code) {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    axios
      .post('https://api.tink.com/api/v1/oauth/token', params)
      .then(response => {
        const authstr = 'Bearer '.concat(response.data.access_token);
        return axios.get('https://api.tink.com/api/v1/accounts/list', {
          headers: { Authorization: authstr }
        });
      })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error('statusText :  ', error.statusText);
        console.error('error.response.data :  ', error.response.data);
        next(error.statusText);
      });
  } else {
    next();
  }
});
