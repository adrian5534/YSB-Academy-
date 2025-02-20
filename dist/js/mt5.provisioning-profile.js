"use strict";

var apiToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhZGRmZWQ4NGViNzk1YzY5ZmU1NTRhMDJkMTUwYmQ4NyIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1ycGMtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoicmlzay1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsicmlzay1tYW5hZ2VtZW50LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6ImJpbGxpbmctYXBpIiwibWV0aG9kcyI6WyJiaWxsaW5nLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19XSwiaWdub3JlUmF0ZUxpbWl0cyI6ZmFsc2UsInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiJhZGRmZWQ4NGViNzk1YzY5ZmU1NTRhMDJkMTUwYmQ4NyIsImlhdCI6MTc0MDA4MDA0NSwiZXhwIjoxNzY3MTU1NjQ1fQ.hOdFo4N9fxtTGWey3-AZzNI08lWGweRO_4nHU5UYKR8lTSzYHiehXNequqVW34Fmva4qURE55PTVR2dEvKCdd5aHxaMKxttxiIuD5Jhu5yuLAphyf23JjbYb878GOCx56yu1SRTryPmQZXis7YTu8WbcdQVihsxteY2oIUJmqgPMmBinYmPYoRYC2O3YHKd5aSB6TjIj7DSo6KAtBej_k9-_vx4qOEX9qSqpoy-TjlTOcVDBRjzJoyrxKkZqYNb7Sl_Ei8tR6hCH27r2Yxh9WB9mp3vzT6mU4cFEpRW1ZtHHMlbhOvBhsbEtZLOxPm9iOvFg2jGFOq8zgIxBySy4PPJvC8Qf_xr5mJ2bpYOfe2cXmq5hHPY2YAlvA_gvRj9tfKPkI1hZnLS1Z91nQcQdL-8DCGUkz5GmaBYPGjJPW5XNPIFHB8MCohFrd_MJcdOEGeCGO2rLrKVXmwH_HCMxEa3GQ5pvrCRI8R3NRxNW4EPxS14u3rm4BUA10i45mRvVWbnVNUc2RRcfNEnyRimIqgok-QY0WpuhCQZ4rWdDgKcQaBtKyHtI5ySollM0bp4V0idhd2i3pXJzRMVesxWnELW_FXtqA5frSYcQS9BmVa1DMANlYoOLmE-QODTmxh15u4uNXaQHD_HMsYWBLV-sQahNDeuOAQ5pC3Duct_6AXE';

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