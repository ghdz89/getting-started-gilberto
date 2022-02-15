# README

### Get familiar

This is a minimal app that implements Plaid using a very basic HTML and vanilla JS front end with an Express/Node backend. After linking a financial account, this app will retrieve transactions information and render it on the home page. Here's a short description of the key files in this repo:

- **index.html** – A basic HTML page with a nav bar and button. Successfully linking an account via Link will render results on this page.

- **index.js** – Configures the Plaid client and defines endpoints that call Plaid endpoints.

- **oauth.html** – Link is re-initialized here during the OAuth flow. After re-initializing Link with a few key parameters, the end user is redirect back home.


### Run the app

This app uses the latest stable version of Node. At the time of this writing, that was Node v16.14.0. It's recommend you use this version of Node. `nvm` is a useful tool that helps you manage Node versions easily.

After confirming that you're using the recommended Node version, install the necessary modules:

```bash
npm install
```

Next, start the app:

```bash
npm start
```

The app will run on port XXXX. Ensure this port is available on your local machine.

#### 

##### Non-OAuth banks

