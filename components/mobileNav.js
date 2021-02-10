import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const mobileNav = ({ open }) => {
  const [show, setShow] = useState(open ? open : false);
  const router = useRouter();

  return (
    <div className="container pt-2rem mobile-nav">
      <a href="/">
        <img
          src="/assets/logo-w.svg"
          alt="Logo of Ant Productions in white"
          width="220"
          className="mobile-logo"
        />
      </a>
      <img
        src="/assets/icons/menu.svg"
        width="30"
        alt=""
        className="modal-open"
        onClick={() => setShow(true)}
      />

      {show && (
        <div className="fullscreen">
          <Nav className="flex-column">
            <Nav.Item className="flex">
              <Nav.Link href="/">
                <img
                  src="/assets/logo-w.svg"
                  alt="Logo of Ant Productions in white"
                  width="220"
                />
              </Nav.Link>
              <img
                src="/assets/icons/cancel.svg"
                width="20"
                onClick={() => setShow(false)}
                className="modal-close"
              />
            </Nav.Item>
            <Nav.Item
              className={
                router.route === "/events" || router.route === "/events/[id]"
                  ? "nav-item-underline-active"
                  : "nav-item-underline"
              }
            >
              <Nav.Link href="/events">events</Nav.Link>
            </Nav.Item>
            <Nav.Item
              className={
                router.route === "/productions" ||
                router.route === "/productions/[id]"
                  ? "nav-item-underline-active"
                  : "nav-item-underline"
              }
            >
              <Nav.Link href="/productions">productions</Nav.Link>
            </Nav.Item>
            <Nav.Item
              className={
                router.route === "/locations"
                  ? "nav-item-underline-active"
                  : "nav-item-underline"
              }
            >
              <Nav.Link href="/locations">locations</Nav.Link>
            </Nav.Item>

            <Nav.Item
              className={
                router.route === "/motorcycle-diaries"
                  ? "nav-item-underline-active"
                  : "nav-item-underline"
              }
            >
              <Nav.Link href="/motorcycle-diaries">motorcycle diaries</Nav.Link>
            </Nav.Item>
            <Nav.Item
              className={
                router.route === "/about"
                  ? "nav-item-underline-active mobile-nav-about-contact"
                  : "nav-item-underline mobile-nav-about-contact"
              }
            >
              <Nav.Link href="/about">about</Nav.Link>
            </Nav.Item>
            <Nav.Item
              className={
                router.route === "/contact"
                  ? "nav-item-underline-active mobile-nav-about-contact"
                  : "nav-item-underline mobile-nav-about-contact"
              }
            >
              <Nav.Link href="/contact">contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      )}
    </div>
  );
};

export default mobileNav;
