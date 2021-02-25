import React, { useState } from "react";
import { useRouter } from "next/router";

const MusicBar = params => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(params.muted);

  return (
    <div
      id={params.id}
      onClick={() => setIsMuted(!isMuted)}
      className={isMuted ? "paused" : ""}
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default MusicBar;
