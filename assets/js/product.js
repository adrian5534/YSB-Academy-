// Set your Deriv API endpoint and token
const apiEndpoint = 'INSERT_API_ENDPOINT_HERE';
const apiToken = 'INSERT_API_TOKEN_HERE';

const replayButton = document.querySelector('.replay-button');
const timeRange = document.querySelector('.time-range');
const currentTime = document.querySelector('.current-time');

let historicalData = [];

// Fetch historical data using the Deriv API
function fetchHistoricalData() {
  const apiUrl = `${apiEndpoint}/candles/history`;
  const symbol = 'symbol_name'; // Replace with the desired symbol
  const timeframe = 'timeframe_value'; // Replace with the desired timeframe

  fetch(`${apiUrl}?symbol=${symbol}&timeframe=${timeframe}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
  })
    .then((response) => response.json())
    .then((data) => {
      historicalData = data.candles;
      initializeReplayBar();
    })
    .catch((error) => {
      console.error('Error fetching historical data:', error);
    });
}

// Initialize the replay bar functionality
function initializeReplayBar() {
  const totalDataPoints = historicalData.length;
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
let replayInterval;

function startReplay() {
  const startingIndex = parseInt(timeRange.value, 10);
  replayInterval = setInterval(() => {
    const currentIndex = parseInt(timeRange.value, 10);

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
  const currentIndex = parseInt(timeRange.value, 10);
  const currentDataPoint = historicalData[currentIndex];
  
  // Adjust the timestamp format based on the historical data structure
  const timestamp = currentDataPoint.timestamp;
  currentTime.textContent = timestamp;
}

// Fetch historical data and initialize the replay bar
fetchHistoricalData();