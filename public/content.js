// content.js

// Get the current URL of the visited site
const currentURL = window.location.href;

// Function to check if the site has been visited
function isVisitedSite(url, callback) {
  chrome.storage.local.get({ visitedURLs: [] }, function (data) {
    const { visitedURLs } = data;
    const isVisited = visitedURLs.includes(url);
    callback(isVisited);
  });
}

// Function to add the URL to the list of visited URLs
function addToVisitedURLs(url) {
  chrome.storage.local.get({ visitedURLs: [] }, function (data) {
    const { visitedURLs } = data;

    if (!visitedURLs.includes(url)) {
      visitedURLs.push(url);
      chrome.storage.local.set({ visitedURLs });
    }
  });
}

// Check if the site has been visited and inject the message
isVisitedSite(currentURL, function (isVisited) {
  if (isVisited) {
    // The site has been visited, so inject a message or modify the DOM here
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "Already Visited";
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "0";
    messageDiv.style.left = "0";
    messageDiv.style.backgroundColor = "red";
    messageDiv.style.color = "white";
    messageDiv.style.padding = "10px";
    messageDiv.style.zIndex = "9999";
    document.body.appendChild(messageDiv);
  } else {
    // If the site is not visited, add it to the list of visited URLs
    addToVisitedURLs(currentURL);
  }
});
