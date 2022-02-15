# README

### Overview

This is a minimal app that implements Plaid using a very basic HTML/vanilla JS front end with an Express/Node backend. After linking an account, the app retrieves balance information associated with the account and renders it on the home page. Here's a short description of the key files in this repo:

- **index.html** – A basic HTML page with a button that allows the user to link an account. Clicking the button will start the Link flow. Successfully linking an account via Link will render results on this page.

- **index.js** – Configures the Plaid client and uses Express to defines routes that call Plaid endpoints. Utilizes the official [Plaid node.js client library](https://github.com/plaid/plaid-node) to make calls to the Plaid API.

- **oauth.html** – Link is re-initialized on this page during the OAuth flow. After successfully re-initializing Link and completing the Link flow, the end user is redirected back home.


### Running the app

#### Set up your environment

This app uses the latest stable version ("LTS") of Node. At the time of writing, the LTS is Node v16.14.0. It's recommended you use this version of Node to run this app. 

nvm is a useful tool that helps you manage Node versions easily. To determine whether you have it installed, simply type `nvm` into your terminal. If you encounter an error (i.e., "command not found", etc.), you likely do not have nvm installed. You can install nvm by following the [instructions in the nvm-sh/nvm](https://github.com/nvm-sh/nvm#installing-and-updating) repo. Once you have nvm installed, you can use the following command to set up your environment:

```bash
nvm install --lts && nvm use --lts
```

#### Clone the app

Clone the app to your machine:

```bash
git clone https://github.com/ghdz89/getting-started-gilberto.git
```

#### Install dependencies

Navigate to the root of the project directory and install the necessary dependencies:

```bash
npm install
```

#### Equip the app with credentials

To make calls to the Plaid API, you'll need to equip the app with the necessary credentials. You can obtain the necessary credentials by following these steps:

1. [Create a Plaid account](https://dashboard.plaid.com/signup?email=&referrer_url=).

2. After successfully creating your account, navigate to **Team Settings > Keys**. Here, you'll find your client ID and secrets. You'll need these to make calls to the Plaid API.

[screenshot]

3. Navigate to the project directory and create a **.env** file. Fill it with the following:

```bash
cd repo-name && touch .env
```

```
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
```

4. Set these variables to the corresponding credentials provided in your Plaid account. Don't place any quotes (`"`) around the credentials. Use the "Sandbox" secret when setting the `PLAID_SECRET` variable. For information the `PLAID_SANDBOX_REDIRECT_URI` variable, see [section](...).


5. Finally, start the app:

```bash
npm start
```

The app will run on port 3002. Ensure this port is available for use on your local machine. Navigate to `localhost:3002`. 

### Connecting accounts

#### Non-OAuth banks

This app uses Plaid's sandbox environment for demonstrative purposes. When connecting a non-OAuth bank account via Link, use the following sample credentials:

User name: `user_good`
Password: `pass_good`

If you encounter a bank that requires multi-factor authentication ("MFA"), enter the following code to proceed:

`1234`

#### OAuth banks

For banks that use OAuth, end users temporarily leave Link to authenticate and permission data using the institution's website or mobile app instead. Afterward, they're redirected back to Link to complete the Link flow and return control to the application.

To experience an OAuth flow in this app:

1. Click the button to link an account.

2. In the subsequent screen, type "oauth" in the search bar. 

3. Select the first search result returned ("Platypus OAuth Bank"). Click "Continue" when prompted.

4. You'll be redirected to the login page for "First Platypus Bank". There are no sample credentials necessary for this bank. Simply click "Sign in" to proceed.

5. On the next page, you don't need to enter any information. Simply click "Get code" to proceed.

6. On the next page, simply click "Submit" to proceed.

7. On the next page, check at least 1 account. Click "Continue".

8. On the next page, check the terms and conditions checkbox. Click "Connect account information."

### Troubleshooting