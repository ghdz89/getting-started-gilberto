# README

### Get familiar

This is a minimal app that implements Plaid using a very basic HTML and vanilla JS front end with an Express/Node backend. After linking a financial account, this app will retrieve transactions information and render it on the home page. Here's a short description of the key files in this repo:

- **index.html** – A basic HTML page with a nav bar and button. Clicking the button will commence the Link flow. Successfully linking an account via Link will render results on this page.

- **index.js** – Configures the Plaid client and defines endpoints that call Plaid endpoints. Utilizes the offical [node.js client library](#https://github.com/plaid/plaid-node) for the Plaid API.

- **oauth.html** – Link is re-initialized on this page during the OAuth flow. After successfully re-initializing Link and completing the Link flow, the end user is redirected back home.


### Run the app

This app uses the latest stable version of Node. At the time of writing, that was Node v16.14.0. It's recommend you use this version of Node to run this app. `nvm` is a useful tool that helps you manage Node versions easily.

After confirming that you're using the recommended Node version, install the necessary dependencies:

```bash
npm install
```

Next, start the app:

```bash
npm start
```

The app will run on port XXXX. Ensure this port is available on your local machine.

#### The OAuth flow

##### Non-OAuth banks

