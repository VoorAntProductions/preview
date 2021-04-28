import Head from "next/head";
import Nav from "./nav";
import MobileNav from "./mobileNav";
import moment from "moment";
import React from "react";

const inputEl = React.createRef();

const handleMouseMove = e => {
  const Ytest = e.pageY + 55;
  const Xtest = e.pageX + 5;
  inputEl.current.style.top = `${Ytest}px`;
  inputEl.current.style.left = `${Xtest}px`;
};

const Layout = ({ children, pageTitle, description, pageClass }) => (
  <>
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
    </Head>
    <div onMouseMove={handleMouseMove} className={pageClass}>
      <div className="cursorTrailing" ref={inputEl} />
      <Nav />
      <MobileNav />
      <div className="main-content">{children}</div>
    </div>
  </>
);

export default Layout;
