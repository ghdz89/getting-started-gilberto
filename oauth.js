
function handleReturningFromOAuth() {
  const link_token = localStorage.getItem("link_token");
  console.log(link_token);
  const handler = Plaid.create({
    token: link_token,
    onSuccess: async (public_token, metadata) => {
    console.log(
      `I have a public token: ${public_token} I should exchange this`
  );
  const response = await fetch('/api/exchange-public-token', {
    method: 'POST',
    body: JSON.stringify({ "public_token": publicToken }),
    headers: {
    'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
  },
  onExit: (err, metadata) => {
    console.log(
      `I'm all done. Error: ${JSON.stringify(
      err
      )} and metadata ${JSON.stringify(metadata)}`
  );
  if (err !== undefined) {
    console.log("something went wrong");
  }
  },
  onEvent: (eventName, metadata) => {
    console.log(`Event ${eventName}: Data ${JSON.stringify(metadata)}`);
  },
    receivedRedirectUri: window.location.href,
  });
  handler.open();
}
handleReturningFromOAuth();


// (function ($) {
// var linkToken = localStorage.getItem("link_token");
// console.log(linkToken);
// console.log(typeof(linkToken));

// var handler = Plaid.create({
//     token: linkToken,
//     receivedRedirectUri: window.location.href,
//     onSuccess: function (public_token, metadata) {
//     $.post(
//         "/api/exchange-public-token",
//         { public_token: public_token },
//         function (data) {
//         location.href = "http://localhost:3005/oauth-link";
//         }
//     );
//     },
// });

// handler.open();
// })(jQuery);



// (($) => {
// const linkToken = localStorage.getItem("link_token");

// const handler = Plaid.create({
// token: linkToken,
// receivedRedirectUri: window.location.href,
// onSuccess: (publicToken, metadata) => {
// fetch('/api/exchange-public-token', {
//     method: 'POST',
//     body: JSON.stringify({ "public_token": publicToken }),
//     headers: {
//     'Content-Type': 'application/json',
//     },
//     (data) => {
//     location.href = "http://localhost:3005"
//     }
// });
// .then(response => response.json())
// .then(data => console.log(data));
// console.log(JSON.stringify(data));
// console.log("hello:", metadata);
// },
// });

// window.location.replace = "http://localhost:3005";
// handler.open();
// })(jQuery);

