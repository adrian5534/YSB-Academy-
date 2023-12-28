let apiToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MjA1NmNiMjg0N2RhZjEwMjE3NGM5YTIxNDljNTBkNCIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1ycGMtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoicmlzay1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsicmlzay1tYW5hZ2VtZW50LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX1dLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiNzIwNTZjYjI4NDdkYWYxMDIxNzRjOWEyMTQ5YzUwZDQiLCJpYXQiOjE3MDM1NDgzMDN9.OeiZTqLAOiErzGU2eFN-bBK7DMZ_GQHa3QZQRiZks2UYPvrUEtou_BI11bLpqBeOVFFPD5m31DrTcImMoNlc8R2I4qfR_017TFi1MlfeZipP4gdtDVFafbktYQ_2DS_hvte6azrvWgwCF2Gl6moUK353DA3y0JrebFUsQYERW0FN8P2p7yF_o-CeSTtm2esmYiKdt6IjGt4xGAPKTK7_kB0Yjt4kib5DeY-MfQMDCxHS6jCGs2dzCyToASSt8rvXG-q-mqn69gGcjj56SK9S6rxcBh3_uMF8yBlLuw9z_CVwV8Ig-6p1nTV5_xKu-oP9YmBRY4JJFv7G9YjobsAcxdpSyfuUPsQikZHB36ImrBmbJvpHm7s1erV-q3PrdLh9etdCkvjzJ8dTqLLK-2IKlK8JHWY5cdjyzl1yYonx-WlInyCv8cUJk8T113t8JVxa8E-6nzbw9P1tgQ3D-PcRHP1kF9LLjdjh3C690SgVsJg3wW1jI-Qo86z27-S24cRZ4Xw39qVenPZY5muudCm6sRunTPdLvZ2RgH625V_keoFQ8-ijT0ribjUFj9FeN1vz7PGchXBnF1z3mDZ9RPuRjYRkt9RawRCkrH0dDPiROf8HibLSt7DKtHfHpEdMfHKXs3uhbVdp72nF6CgdTnB5KumVcJk4VnMBrd5Ga_cWnU8';

let quoteStreamingIntervalInSeconds = document.getElementById('quoteStreamingIntervalInSeconds').value;
quoteStreamingIntervalInSeconds = parseInt(quoteStreamingIntervalInSeconds);

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

  // If the error message is "You are allowed to create no more than 2 trading account", change it
  if (errorMessage === "You are allowed to create no more than 2 trading account") {
    errorMessage = "Forbidden ErrorYou are allowed to create no more than 1 trading account"; // Replace with your desired error message
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