"use strict";

var apiToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhZGRmZWQ4NGViNzk1YzY5ZmU1NTRhMDJkMTUwYmQ4NyIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1ycGMtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoicmlzay1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsicmlzay1tYW5hZ2VtZW50LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6ImJpbGxpbmctYXBpIiwibWV0aG9kcyI6WyJiaWxsaW5nLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19XSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6ImFkZGZlZDg0ZWI3OTVjNjlmZTU1NGEwMmQxNTBiZDg3IiwiaWF0IjoxNzI2MTc1NzE2LCJleHAiOjE3MzM5NTE3MTZ9.JBMWvhgO6BfwsYJP70r1j3egphqY8vybhPcmt1D4-h-3DqvlDsvTc48fvQgALT7tzsfv7dsczRsrubrWidNOCi3aB_gpbCsMPtU5LytCm5a8WbAqK7IUZ2_A0EGXrO3NB7rK-gJnjQbpsrVhUUK4LGHYP0jmY4I3S6nuhleUB-xjOJeLcqgq0tBbZ-OS91ENV-97BarWNA_mbLZRPuH66bg7rybRKtHNb9CHgEwbhhmdnlicvYeS0EzRHPuSy3Ue2XTB-GKwlMdgvopQIYZbO666T_YYk_3QrtK1KkCm5oq7ocfe-A2FdLqQCPoCQTfbu0PZvyDwXSa8f_JlGfb-DmSm15IS6J7Wo1D84KOGSo4KVkDh8yWCNyU7g3xlz8TiX6KXGkSsGCj9tS7FWEFUQvXPBn92GKma5vANn-OmaSm0HsjCKz57yeP3aHgsWdgpSwFt1-iarUAYLeJHy1hhGbagf3ATpxlkxMua2_B4j4kv-sDluU6LL3Ex1qUqID0wHjQF1xYbzbsxIv6SSIZAA1BLKKFZ2Fe-4Wf10btUx7C9n0tKnrmO2ll55xTHbYXwkskDs0-x4OiL50Rm8btnI7k4PGrvv_OYstwJe7fUniQjBTY0EjFM-E49y_m9QRxL-PHozGyAJGOEegsPcUC27clIbeU3OOyQ78PnVyP9wok';

// Use To Generate UUID for Transaction ID
function generateUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

// Use the function
var transactionId = generateUUID();
console.log(transactionId); // Outputs a UUID

// MT5 Provisioning Profile
document.getElementById('mt5-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var quoteStreamingIntervalInSeconds = parseInt(document.getElementById('quoteStreamingIntervalInSeconds').value);
  var data = {
    name: document.getElementById('name').value,
    type: document.getElementById('type').value,
    login: document.getElementById('login').value,
    password: document.getElementById('password').value,
    server: document.getElementById('server').value,
    platform: document.getElementById('platform').value,
    // Generate a random integer between 100000 and 999999 for the magic field
    magic: Math.floor(Math.random() * 900000) + 100000,
    keywords: document.getElementById('keywords').value.split(','),
    quoteStreamingIntervalInSeconds: quoteStreamingIntervalInSeconds,
    reliability: document.getElementById('reliability').value
  };
  fetch('https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      // Add your authorization token here
      'auth-token': apiToken
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // Assuming `data` is the response from the API
    var messageDiv = document.getElementById('message');
    messageDiv.innerHTML = ''; // Clear any previous messages

    if (data.error) {
      // If there's an error, re-enable the submit button
      document.getElementById('submit-button').disabled = false;

      // If there's an error, display the error message
      var errorMessage = data.message;

      // If the error message is "You are allowed to create no more than 1 trading account", change it
      if (errorMessage === "You are allowed to create no more than 2 trading account") {
        errorMessage = "You are allowed to create no more than 1 trading account"; // Replace with your desired error message
      }
      messageDiv.textContent = errorMessage;

      // If there are detailed error messages, display them
      if (data.details && Array.isArray(data.details)) {
        data.details.forEach(function (detail) {
          var detailMessage = document.createElement('p');
          detailMessage.textContent = detail.message;
          messageDiv.appendChild(detailMessage);
        });
      }
    } else {
      // If there's no error, display the success message
      messageDiv.textContent = 'Success! Your ID is: ' + data.id;
      alert('Success! Your ID is: ' + data.id); // This will create a popup message

      // Disable the submit button to prevent multiple submissions
      document.getElementById('submit-button').disabled = true;
    }
  })["catch"](function (error) {
    // If there's an error, re-enable the submit button
    document.getElementById('submit-button').disabled = false;
    console.error('Error:', error);
  });
});