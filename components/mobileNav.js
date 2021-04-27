import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const mobileNav = ({ open }) => {
  const [show, setShow] = useState(open ? open : false);
  const router = useRouter();

  return (
    <div className="mobile-nav-fixed">
      <div className="mobile-nav-logo">
        <a href="/">
          <img
            src="/assets/logo-w.png"
            alt="Logo of Ant Productions in white"
            width="200"
            className="mobile-logo"
          />
        </a>
      </div>
      <div className="mobile-nav-trigger">
        <img
          src="/assets/icons/menu.svg"
          width="30"
          alt=""
          className="modal-open"
          onClick={() => setShow(true)}
        />
      </div>

      {show && (
        <div className="fullscreen">
          <div className="mobile-nav-open-logo">
            <a href="/">
              <img
                src="/assets/logo-w.png"
                alt="Logo of Ant Productions in white"
                width="200"
                className="mobile-logo"
              />
            </a>
          </div>
          <div className="mobile-nav-trigger">
            <img
              src="/assets/icons/cancel.svg"
              width="20"
              alt=""
              className="modal-open"
              onClick={() => setShow(false)}
            />
          </div>
          <Nav className="flex-column">
            <Nav.Item className="nav-link-title">
              <Nav.Link href="" className="accent">
                Menu
              </Nav.Link>
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
