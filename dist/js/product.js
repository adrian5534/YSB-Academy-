"use strict";

// Set your Deriv API endpoint and token
var apiEndpoint = 'INSERT_API_ENDPOINT_HERE';
var apiToken = 'INSERT_API_TOKEN_HERE';
var replayButton = document.querySelector('.replay-button');
var timeRange = document.querySelector('.time-range');
var currentTime = document.querySelector('.current-time');
var historicalData = [];

// Fetch historical data using the Deriv API
function fetchHistoricalData() {
  var apiUrl = "".concat(apiEndpoint, "/candles/history");
  var symbol = 'symbol_name'; // Replace with the desired symbol
  var timeframe = 'timeframe_value'; // Replace with the desired timeframe

  fetch("".concat(apiUrl, "?symbol=").concat(symbol, "&timeframe=").concat(timeframe), {
    headers: {
      Authorization: "Bearer ".concat(apiToken)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    historicalData = data.candles;
    initializeReplayBar();
  })["catch"](function (error) {
    console.error('Error fetching historical data:', error);
  });
}

// Initialize the replay bar functionality
function initializeReplayBar() {
  var totalDataPoints = historicalData.length;
  timeRange.min = '0';
  timeRange.max = (totalDataPoints - 1).toString();
  timeRange.value = '0';
  replayButton.addEventListener('click', toggleReplay);
  timeRange.addEventListener('input', updateCurrentTime);
}

// Toggle play/pause functionality
function toggleReplay() {
  if (replayButton.textContent === 'Play') {
    replayButton.textContent = 'Pause';
    startReplay();
  } else {
    replayButton.textContent = 'Play';
    pauseReplay();
  }
}

// Start the replay
var replayInterval;
function startReplay() {
  var startingIndex = parseInt(timeRange.value, 10);
  replayInterval = setInterval(function () {
    var currentIndex = parseInt(timeRange.value, 10);
    if (currentIndex < historicalData.length - 1) {
      timeRange.value = (currentIndex + 1).toString();
      updateCurrentTime();
    } else {
      pauseReplay();
    }
  }, 1000); // Adjust the replay speed as desired (e.g., 1000ms = 1 second)
}

// Pause the replay
function pauseReplay() {
  clearInterval(replayInterval);
}

// Update the current time display
function updateCurrentTime() {
  var currentIndex = parseInt(timeRange.value, 10);
  var currentDataPoint = historicalData[currentIndex];

  // Adjust the timestamp format based on the historical data structure
  var timestamp = currentDataPoint.timestamp;
  currentTime.textContent = timestamp;
}

// Fetch historical data and initialize the replay bar
fetchHistoricalData();