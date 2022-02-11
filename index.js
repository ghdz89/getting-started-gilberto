require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const path = require('path');

const app = express();

app.use(
  // TODO: use a real secret key
  session({ secret: "keyboard cat", saveUninitialized: true, resave: true })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/oauth', async (req, res) => {
//   res.sendFile(path.join(__dirname, 'oauth.html'));
// });

// app.get('/oauth-link', async (req, res) => {
//   // res.redirect('oauth-link.html');
//   // console.log(req.query);
//   let oauth_state_id = req.query.oauth_state_id;
//   res.redirect('/oauth-link?oauth_state_id=' + req.query.oauth_state_id);
// });

// app.get('/oauth-link', async (req, res) => {
//   let oauth_state_id = req.query.oauth_state_id;
//   res.redirect('/oauth-link?oauth_state_id=' + req.query.oauth_state_id);
// });
  
// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});
  
//Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);

//Create a Link token and return it
app.get("/api/create-link-token", async (req, res, next) => {
  const tokenResponse = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "Plaid Hello World",
    language: "en",
    products: ["transactions"],
    country_codes: ["US", "CA"],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  res.json(tokenResponse.data);
});

// Exchange the public_token from Plaid Link for an access_token, 
// then fetch some transactions data from the Plaid API
app.post("/api/exchange-public-token", async (req, res, next) => {
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // TODO: store access_token in DB instead of session storage
  req.session.access_token = exchangeResponse.data.access_token;
  const access_token = req.session.access_token;
  
  const transactionsResponse = await client.transactionsGet({
    start_date: '2021-05-03',
    end_date: '2021-05-13',
    access_token,
  });

  res.json({
    Transactions: transactionsResponse.data,
  });
});

app.listen(process.env.PORT || 3001);