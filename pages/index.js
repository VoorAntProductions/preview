import Layout from "../components/layout";
import Footer from "../components/footer";
import MusicBar from "../components/musicBar";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isTimer, setIsTimer] = useState(true);

  useEffect(() => {
    const getSessionData = sessionStorage.getItem("start-screen");
    if (getSessionData) {
      setIsTimer(false);
    }
    if (isMuted) {
      const timer = setTimeout(() => {
        setIsTimer(false);
        sessionStorage.setItem("start-screen", true);
      }, 6000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsTimer(false);
        sessionStorage.setItem("start-screen", true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMuted]);

  const inputEl = React.createRef();
  const handleMouseMove = e => {
    const Ytest = e.pageY + 50;
    const Xtest = e.pageX + 5;
    inputEl.current.style.top = `${Ytest}px`;
    inputEl.current.style.left = `${Xtest}px`;
  };

  if (isTimer) {
    return (
      <div className="full-overlay" onMouseMove={handleMouseMove}>
        <div className="cursorTrailing" ref={inputEl} />
        <div className="container container-XX ">
          <div className="start-screen-align">
            <div className="XX-bg detect-screen">
              <MusicBar muted={isMuted} id="equalizer-start-screen" />

              <div className="w-50 justify-around on-off-buttons">
                <p
                  className={isMuted === false ? "bold pf-25" : "pf-25"}
                  onClick={() => setIsMuted(false)}
                >
                  ON
                </p>
                <p
                  className={isMuted === true ? "bold pf-25" : "pf-25"}
                  onClick={() => setIsMuted(true)}
                >
                  OFF
                </p>
              </div>

              <p>
                Music affects your mood <br />
                To have the best experience, turn it on <br />
                <span className="show-device">at the bottom of the page</span>
                <span className="smaller">
                  You can always turn it on / off at the bottom of the page
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout
        pageTitle="Ant Productions"
        description="Ant Productions home page"
        pageClass="home"
      >
        <style jsx global>{`
          body {
            background: transparent;
          }
          .nav {
            background: transparent;
          }
          .mobile-nav {
            background: transparent;
          }
          #equalizer {
            height: 50px;
          }
          .bar {
            cursor: url("/assets/icons/cursor/cursor-hover.svg"), auto;
          }
          .mobile-nav-fixed {
            background: transparent;
          }
        `}</style>
        <video autoPlay muted={isMuted} playsInline loop className="test">
          <source src="assets/tre.mp4" type="video/mp4" />
          <source src="assets/tre.ogg" type="video/ogg" />
          <source src="assets/tre.webm" type="video/webm" />
          Your browser does not support HTML video.
        </video>
        <div className="container-mine align-end">
          <div>
            <h1>
              Our <span className="highlight">ants</span> move mountains
            </h1>
            <div className="home-buttons">
              <a href="/events" className="btn-outline btn-1">
                events
              </a>
              <a href="/productions" className="btn-outline btn-2">
                Productions
              </a>
            </div>
          </div>
        </div>
        <div onClick={() => setIsMuted(!isMuted)}>
          <MusicBar muted={isMuted} id="equalizer" />
        </div>
      </Layout>
      <div className="home">
        <Footer />
      </div>
    </>
  );
}
