import React, { useState, useEffect } from "react";

const Listing = () => {
  const [visitedURLs, setVisitedURLs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedURLs = JSON.parse(localStorage.getItem("visitedURLs") || "[]");
    setVisitedURLs(storedURLs);

    const currentURL = window.location.href;

    if (storedURLs.includes(currentURL)) {
      setMessage("Already Visited the Site");
    } else {
      storedURLs.push(currentURL);
      localStorage.setItem("visitedURLs", JSON.stringify(storedURLs));
      console.log("Not Included");
      setMessage("");
      return;
    }
  }, []);

  const selectURL = (index) => {
    const updatedURLs = [...visitedURLs];
    updatedURLs.splice(index, 1);

    setVisitedURLs(updatedURLs);
    localStorage.setItem("visitedURLs", JSON.stringify(updatedURLs));

  }

  return (
    <>
      <h1>Url Listing</h1>
      <p>{message}</p>
      <div>
        {visitedURLs.map((url, index) => (
          <div style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
            padding: "5px"
          }} key={index}>
            <div key={index}>{url}</div>
            <div onClick={() => selectURL(index)} style={{
              cursor: "pointer"
            }}>x</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Listing;
