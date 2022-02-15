# README

### Overview

This is a minimal app that implements Plaid using a very basic HTML/vanilla JS front end with an Express/Node backend. The "Link account" button in the app allows you to link a sample bank account. After linking the account, the app retrieves balance information associated with the account and renders it on the home page. Here's a short description of the key files in this repo:

- **index.html** – A basic HTML page with a button that allows the user to link a sample account. Clicking the button will start the Plaid Link flow. Successfully linking an account via Link will render results on this page.

- **server.js** – Configures the Plaid client and uses Express to defines routes that call Plaid endpoints in the [Sandbox environment](https://plaid.com/docs/quickstart/glossary/#environments). Utilizes the official [Plaid node.js client library](https://github.com/plaid/plaid-node) to make calls to the Plaid API.

- **oauth.html** – Link is re-initialized on this page during the OAuth flow. After successfully re-initializing Link and completing the Link flow, the end user is redirected back home.


### Running the app

#### Set up your environment

This app uses the latest stable version ("LTS") of Node. At the time of writing, the LTS of Node is v16.14.0. It's recommended you use this version of Node to run this app. 

nvm is a useful tool that helps you manage Node versions easily. To determine whether you have it installed, simply type `nvm` into your terminal. If you encounter an error (i.e., "command not found", etc.), you likely do not have nvm installed. You can install nvm by following the [instructions in the nvm-sh/nvm repo](https://github.com/nvm-sh/nvm#installing-and-updating). Once you have nvm installed, you can use the following command to set up your environment:

```bash
nvm install --lts && nvm use --lts
```

#### Clone the app

Clone the app to your machine and cd into the project directory:

```bash
git clone https://github.com/plaid/FIX ME] && cd FIX ME
```

#### Install dependencies

Install the necessary dependencies:

```bash
npm install
```

#### Equip the app with credentials

To make calls to the Plaid API, you'll need keys to the API. You can obtain API keys by following these steps:

1. [Create a Plaid account](https://dashboard.plaid.com/signup?email=&referrer_url=).

2. After successfully creating your account, navigate to [**Team Settings > Keys**](https://dashboard.plaid.com/team/keys) in your account. Here, you'll find your client ID and secrets. These are the keys you'll need to make calls to the Plaid API.

[screenshot]

3. Create a file called **.env** in the project directory.
```bash
touch .env
```

Add the following lines of code to the **.env** file:

```
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
```

4. Next, set the variables in the **.env** file to the corresponding credentials provided in your Plaid account. Don't place any quotes (`"`) around the credentials (i.e., `PLAID_CLIENT_ID=adn08a280hqdaj0ad`). Use the "Sandbox" secret when setting the `PLAID_SECRET` variable.


5. Finally, start the app:

```bash
npm start
```

The app will run on port 8080. To use the app, navigate to `localhost:8080` in your browser. 

### Using the app

The app allows you to link a sample bank account at an OAuth bank or a non-OAuth bank. For more information on how to link accounts at both types of banks, see the sections below.

#### Non-OAuth banks

Most banks returned by Link in the app are non-OAuth banks. When connecting a non-OAuth bank account, use the following sample credentials:

- Username: `user_good`
- Password: `pass_good`

If you select a bank that requires multi-factor authentication ("MFA"), enter the following code to proceed: `1234`

#### OAuth banks

With OAuth banks, end users temporarily leave Link to authenticate and permission data using the bank's website (or mobile app) instead. Afterward, they're redirected back to Link to complete the Link flow and return control to the application where the account is being linked. In this app, "Platypus OAuth Bank" is an OAuth bank.

To experience an OAuth flow in this app:

1. Navigate to [**Team Settings > API**](https://dashboard.plaid.com/team/api) in your Plaid account.

2. In the **Allowed redirect URIs** section, click "Configure".

3. Add `http://localhost:8080/oauth` as a redirect URI and save your changes.

4. Navigate to the **.env** file in your project directory. Add the following line of code to the end of the file:

```bash
PLAID_SANDBOX_REDIRECT_URI=http://localhost:8080/oauth
```

5. Save your changes to the file and restart your local server (i.e., end the current server process and run `npm start` again).

6. Navigate to `localhost:8080`. Click the **Link account** button to link an account.

7. On the subsequent screen, type "oauth" in Link's search bar. Select "Platypus OAuth Bank".

[screenshot]

8. On the next screen, select the first instance of "Platypus OAuth Bank". 

[screenshot]

9. Click "Continue" when prompted. You'll be redirected to the login page for "First Platypus Bank". **Important**: Credentials are not necessary for this bank. Simply click "Sign in" to proceed.

[screenshot]

10. On the next page, you won't need to enter any information. Simply click "Get code" to proceed.

11. On the next page, you won't need to enter any information. Simply click "Submit" to proceed.

12. On the next page, check at least 1 account. Click "Continue" to proceed.

13. On the next page, check the terms and conditions checkbox. Click "Connect account information."

14. Link will connect the account at the OAuth bank, prompt you to continue, and then redirect you back to the home page.

### Troubleshooting

tbd