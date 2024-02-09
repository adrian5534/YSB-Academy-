let apiToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhZGRmZWQ4NGViNzk1YzY5ZmU1NTRhMDJkMTUwYmQ4NyIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiJhZGRmZWQ4NGViNzk1YzY5ZmU1NTRhMDJkMTUwYmQ4NyIsImlhdCI6MTcwNzQ5MTk0OCwiZXhwIjoxNzE1MjY3OTQ4fQ.ACpTrNwncHGrqE3IZXxE-IcxRXDvw6hv4wKhqDbi58q-8cqiM7Cw-YED4E4eeJ-Pa8Lu72DD150i6SGyMlCm_S8UOPk7NoliX1jtk3xS4V3UmTnzAD1qcl8LGk1BCNBz8h5gJqs5KLzrVx3wNYtwb3wIT8l_GTgECgOzdXaLtPUxPYsNBGf-zY-sTLTc2Cc-I6-4PL_MsPRVWpXY_cV1rztEAqqKr21o4solQajIAD_GqBoseZdVe8-UJBivasXnwS61gn2pan_uDjVzVNAZ2vnHAUTKNzbKmVtV_7q29V30WhfqugWkLrrxf959QmrtQGoWlrosvX9wipDDACX-9L8S_nSZNvjjCWcvg0Hxkxqk57EYfRi1kVZZRNHvaW_Nxqx_ewwcfq7bSI5eYGyolMRMuqpBrmdFCWUgPsk-uPhd465vG4d1tGyuYrixwYUDMOzO69zeOEiiL3MwGKnyYEaxtB77tgMV9yzYZdvW5feGk7q9K-HXkcgISG9Gd2akAs1pbxg14MKrsxybglR65_jYgJiPIkWZMY0lMJGRKQYxgR0ohXhqJFWjmp1mg2CtwP0ADMacrVZYhF5lx2Bkbj0pXBmk8-GXFaxDfzyt5vaNpVWbDhW-MI5uMLsdrib9gEpjyI95_qppON4JPSW2VAitCLpJoGDTE878oBY_hGs';

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