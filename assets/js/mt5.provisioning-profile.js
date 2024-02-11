let apiToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MjA1NmNiMjg0N2RhZjEwMjE3NGM5YTIxNDljNTBkNCIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1ycGMtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoicmlzay1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsicmlzay1tYW5hZ2VtZW50LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6ImJpbGxpbmctYXBpIiwibWV0aG9kcyI6WyJiaWxsaW5nLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19XSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6IjcyMDU2Y2IyODQ3ZGFmMTAyMTc0YzlhMjE0OWM1MGQ0IiwiaWF0IjoxNzA3NjY0NTgwLCJleHAiOjE3MDgyNjkzODB9.CV6SRvIZRM8lGLbKQO7owPazEtkbRe9_2gZyMASp9V4Cx7-_wvXYlDvrK8OxEhN_3HdZWtPpGsaR6FavBGIZ2cFDL9hmjYuKskjapdci-Z3WuV9u-VGdXTVcbZMxzZrmw5ypz6rgvaO8KwiYYFBznaTL2h_BZDmlqcLcWYHEjm88V1w5hqj5VzKs2BKs-j5Pi972IrEbtmRXMgmlUUktm3lZdXeTyaJAkP9LsSVGbtVmPgcMkILFONHSdwTRgZPFEWhbxFjOtn6hsIQQqpWpuvPeQKOlbspw59lRtOhCkhlHR_gANxRX8a2YKv3IEWrhCUfzA5l3ybn59LPaFGU69hBXBJKWZkET3bAHdpXng0_LuYm3nse7bytpHBWPxEQ2qfMxKmCSi1gbSkWeKrIOyo-u0OhRy8K9vFK1cs0yG8Kn9Zlgp4_YwponD7fhtKFOaCrk42IQLwOuYRx0ECMDxZsSgXAaJjHrrsBiN4l3IMKV2VSl35Zgh00ljJ5NLt5XLFyYAxXsFxq1KBw-hYdkHPzF7TBmieYTazmKGRCnuwUfXjVK6vdjx8Z10KGoFasqSbC1iGBtrU6pQhY1M7ej1gj98mCEUnWhEur8CO-79t82UDh8DYUW1VH7uXNdEq6FKSHxxw5MgZAwuyArrVqIGp7cRAuOFJFYoEornVBrAtE';

// Use To Generate UUID for Transaction ID
function generateUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

// Use the function
const transactionId = generateUUID();
console.log(transactionId); // Outputs a UUID

// MT5 Provisioning Profile
document.getElementById('mt5-form').addEventListener('submit', function(e) {
  e.preventDefault()

  const quoteStreamingIntervalInSeconds = parseInt(document.getElementById('quoteStreamingIntervalInSeconds').value);

  const data = {
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
      'Content-Type': `application/json`,
      // Add your authorization token here
      'auth-token': apiToken
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // Assuming `data` is the response from the API
var messageDiv = document.getElementById('message');
messageDiv.innerHTML = ''; // Clear any previous messages

if (data.error) {
  // If there's an error, display the error message
  var errorMessage = data.message;

  // If the error message is "You are allowed to create no more than 1 trading account", change it
  if (errorMessage === "You are allowed to create no more than 2 trading account") {
    errorMessage = "You are allowed to create no more than 1 trading account"; // Replace with your desired error message
  }

  messageDiv.textContent = errorMessage;

  // If there are detailed error messages, display them
  if (data.details && Array.isArray(data.details)) {
    data.details.forEach(function(detail) {
      var detailMessage = document.createElement('p');
      detailMessage.textContent = detail.message;
      messageDiv.appendChild(detailMessage);
    });
  }
} else {
  // If there's no error, display the success message
  messageDiv.textContent = 'Success! Your ID is: ' + data.id;
}
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})

