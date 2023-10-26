// import Listing from "./components/listing"

// function App() {

//   return (
//     <>
//       <Listing />
//     </>
//   )
// }

// export default App
// App.js
// App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [visitedURLs, setVisitedURLs] = useState([]);
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    // Get visited URLs from storage
    chrome.storage.local.get({ visitedURLs: [] }, (data) => {
      setVisitedURLs(data.visitedURLs);
    });

    // Get the current URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const handleDelete = (url) => {
    const updatedURLs = visitedURLs.filter((visited) => visited !== url);
    setVisitedURLs(updatedURLs);

    // Update the storage with the updated list
    chrome.storage.local.set({ visitedURLs: updatedURLs });
  };

  return (
    <div>
      <h1>Visited URLs</h1>
      <ul>
        {visitedURLs.map((url, index) => (
          <li key={index}>
            {url}
            <button onClick={() => handleDelete(url)}>Delete</button>
          </li>
        ))}
      </ul>
      {visitedURLs.includes(currentURL) && <p>Already Visited</p>}
    </div>
  );
}

export default App;
