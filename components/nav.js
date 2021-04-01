import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";

const mainNav = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  return (
    <Nav className="justify-content-center desktop-nav">
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
      <Nav.Item>
        <Nav.Link href="/">
          <img
            src="/assets/logo-w.png"
            alt="Logo of Ant Productions in white"
            width="300"
          />
        </Nav.Link>
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
            ? "nav-item-underline-active desktop-nav-about-contact"
            : "nav-item-underline desktop-nav-about-contact"
        }
      >
        <Nav.Link href="/about">about</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className={
          router.route === "/contact"
            ? "nav-item-underline-active desktop-nav-about-contact"
            : "nav-item-underline desktop-nav-about-contact"
        }
      >
        <Nav.Link href="/contact">contact</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default mainNav;
