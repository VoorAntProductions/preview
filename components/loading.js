import React from "react";

const Loading = () => {
  return (
    <div className="container">
      <div className="content-loading">
        <video autoPlay muted loop playsInline className="loading-animation">
          <source src="../assets/loading.mov" type="video/mov" />
          <source src="../assets/loading.mp4" type="video/mp4" />
          <source src="../assets/loading.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Loading;
