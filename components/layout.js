import Head from "next/head";
import Nav from "./nav";
import MobileNav from "./mobileNav";
import moment from "moment";
import React from "react";

const inputEl = React.createRef();

const handleMouseMove = e => {
  const Ytest = e.pageY + 50;
  const Xtest = e.pageX + 5;
  inputEl.current.style.top = `${Ytest}px`;
  inputEl.current.style.left = `${Xtest}px`;
};

const Layout = ({ children, pageTitle, description }) => (
  <>
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:url" content="https://ant-productions.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Ant Productions" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={"/assets/share.svg"} />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
    </Head>
    <div onMouseMove={handleMouseMove}>
      <div className="cursorTrailing" ref={inputEl} />
      <Nav />
      <MobileNav />
      <div className="main-content">{children}</div>
      <footer className="small copywright-text">
        <div className="container">
          <div className="row justify-content-md-center justify-content-end">
            © {moment().format("YYYY")} Eva Denys
          </div>
        </div>
      </footer>
    </div>
  </>
);

export default Layout;
