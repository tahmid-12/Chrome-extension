// document.addEventListener('DOMContentLoaded', function() {
//     const urlList = document.getElementById('url-list');
  
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       const tab = tabs[0];
//       const url = tab.url;
  
//       const li = document.createElement('li');
//       li.textContent = url;
//       urlList.appendChild(li);
//     });
//   });
  

document.addEventListener('DOMContentLoaded', function() {
    const urlList = document.getElementById('url-list');
  
    // Function to add a URL to the list and store it in storage
    function addURL(url) {
      const li = document.createElement('li');
      li.textContent = url;
      urlList.appendChild(li);
  
      // Store the URL in browser storage
      chrome.storage.local.get({ visitedURLs: [] }, function(data) {
        const { visitedURLs } = data;
        visitedURLs.push(url);
        chrome.storage.local.set({ visitedURLs });
      });
    }
  
    // Get the current tab's URL and add it to the list
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      const url = tab.url;
      addURL(url);
    });
  
    // Retrieve and display previously visited URLs
    chrome.storage.local.get({ visitedURLs: [] }, function(data) {
      const { visitedURLs } = data;
      visitedURLs.forEach(function(url) {
        addURL(url);
      });
    });
  });
  