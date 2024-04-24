// JavaScript to toggle the botsonic iframe and close button
const botsonicIframe = document.querySelector('.botsonic-iframe');
const closeButton = document.querySelector('.close-button');

// Add event listener to close button
closeButton.addEventListener('click', () => {
  botsonicIframe.classList.toggle('minimized');
});

// Initially show the close button if bot is open
document.addEventListener("DOMContentLoaded", function () {
  if (window.scrollY > 100) {
    closeButton.style.display = 'block';
  } else {
    closeButton.style.display = 'none';
  }
});

// Event listener for scroll to toggle close button visibility
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    closeButton.style.display = 'block';
  } else {
    closeButton.style.display = 'none';
  }
});
