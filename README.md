# README

### Get familiar

This is a minimal app that implements Plaid using a very basic HTML and vanilla JS front end with an Express/Node backend. After linking a financial account, this app will retrieve transactions information and render it on the home page. Here's a short description of the key files in this repo:

- **index.html** – A basic HTML page with a nav bar and button. Clicking the button will commence the Link flow. Successfully linking an account via Link will render results on this page.

- **index.js** – Configures the Plaid client and defines endpoints that call Plaid endpoints. Utilizes the offical [node.js client library](#https://github.com/plaid/plaid-node) for the Plaid API.

- **oauth.html** – Link is re-initialized on this page during the OAuth flow. After successfully re-initializing Link and completing the Link flow, the end user is redirected back home.


### Run the app

#### Set up your environment

This app uses the latest stable version of Node. At the time of writing, that was Node v16.14.0. It's recommend you use this version of Node to run this app. `nvm` is a useful tool that helps you manage Node versions easily.

#### Clone the app

Clone the app:

```bash
git clone ...
```

#### Install dependencies

After confirming that you're using the recommended Node version, navigate to the root of the project directory and install the necessary dependencies:

```bash
npm install
```

#### Equip yourself with credentials

To make calls to the Plaid API, you'll need to equip the app with the necessary credentials. You can obtain the necessary credentials by following these steps:

1. [Create a Plaid account](#https://dashboard.plaid.com/signup?email=&referrer_url=)

2. After successfully creating your account, navigate to **Team Settings > Keys**. Here, you'll find your client ID and secrets. You'll need these to make calls to the Plaid API.

3. Next, create a **.env** in the root of the project directory. Fill it with the following:

```
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
```

4. Finally, set these variables to the corresponding credentials provided in your Plaid account. Don't place any quotes (`"`) around the credentials. Use the "Sandbox" secret when setting the `PLAID_SECRET` variable.


Next, start the app:

```bash
npm start
```

The app will run on port XXXX. Ensure this port is available on your local machine.

### Connecting accounts

#### Non-OAuth banks

This app uses Plaid's sandbox environment for demonstrative purposes. When connecting a non-OAuth bank account via Link, use the following sample credentials:

User name: `user_good`
Password: `pass_good`

If you encounter a bank that requires multi-factor authentication ("MFA"), enter the following code to proceed:

`1234`

#### OAuth banks

For banks that use OAuth, end users temporarily leave Link to authenticate and permission data using the institution's website or mobile app instead. Afterward, they're redirected back to Link to complete the Link flow and return control to the application.

For an OAuth


