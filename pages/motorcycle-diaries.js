import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Layout from "../components/layout";
import {
  getMotorcycleDiariesInfo,
  getMotorcycleDiariesVideos
} from "../lib/api";
import ReactMarkdown from "react-markdown";
// Import Swiper React components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);
import FsLightbox from "fslightbox-react";

export default function MotorcycleDiaries({
  motorcycleDiariesInfo,
  motorcycleDiariesVideos
}) {
  // const [toggler, setToggler] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const galleryArray = [];

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  function openLightboxOnSlide(number) {
    const indexVideo = number + 1;
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: indexVideo
    });
  }

  if (motorcycleDiariesVideos) {
    motorcycleDiariesVideos.map((image, key) => {
      const vimeoNumber = image.VimeoNumber;
      galleryArray.push(
        <iframe
          src={`https://player.vimeo.com/video/${vimeoNumber}?api=1&autoplay=1&autopause=1;`}
          width="1920px"
          height="1080px"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      );
    });
  }

  return (
    <Layout
      pageTitle="Ant Productions Motorcycle Diaries"
      description="A page that explains another company from Ant Productions"
    >
      <div className="show-mobile">
        <div className="d-flex justify-center">
          <video
            className="video-motorcycle-screen"
            autoPlay
            playsInline
            muted
            loop
          >
            <source src="assets/motorcycle-diaries.mp4" type="video/mp4" />
            <source src="assets/motorcycle-diaries.ogg" type="video/ogg" />
            <source src="assets/motorcycle-diaries.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="d-flex justify-center">
          <a
            href={motorcycleDiariesInfo.websiteLink}
            target="_blank"
            className="button"
          >
            view website
          </a>
        </div>
        <div className="container-mine">
          <h2 className="m-b40 small--m-t60">motorcycle diaries</h2>
          <ReactMarkdown source={motorcycleDiariesInfo.Description} />
        </div>
      </div>
      <div className="container-mine">
        <div className="grid m-b40">
          <div className="grid__item large--two-thirds d-flex rm-padding">
            <div className="align-column-center p-relative">
              <div className="show-desktop-flex">
                <video
                  className="video-motorcycle-screen"
                  autoPlay
                  playsInline
                  muted
                  loop
                >
                  <source
                    src="assets/motorcycle-diaries.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="assets/motorcycle-diaries.ogg"
                    type="video/ogg"
                  />
                  <source
                    src="assets/motorcycle-diaries.webm"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>
                <a
                  href={motorcycleDiariesInfo.websiteLink}
                  target="_blank"
                  className="button m-tn25"
                >
                  view website
                </a>
              </div>
            </div>
          </div>
          <div className="grid__item grid__item-special large--one-third">
            <div className="d-flex sm-flex-col">
              <div className="show-desktop">
                <h2 className="m-b40 small--m-t60">motorcycle diaries</h2>
                <ReactMarkdown source={motorcycleDiariesInfo.Description} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-gallery m-b40">
        <div className="show-desktop">
          <Swiper
            spaceBetween={5}
            slidesPerView={5}
            speed={500}
            mousewheel={true}
            scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true
            }}
            breakpoints={{
              1440: {
                slidesPerView: 5,
                spaceBetween: 5
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 4
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 3
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 2
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 1
              }
            }}
          >
            {motorcycleDiariesVideos.length > 0 &&
              motorcycleDiariesVideos.map((m, i) => (
                <SwiperSlide key={i} className="overlay-cont">
                  <div
                    onClick={() => openLightboxOnSlide(i)}
                    className="overlay"
                    data-class="fslightbox-source test"
                    data-fslightbox="lightbox"
                  ></div>
                  <iframe
                    src={`https://player.vimeo.com/video/${m.VimeoNumber}`}
                    frameBorder="0"
                    allowFullScreen
                    className="vimeo"
                  ></iframe>
                </SwiperSlide>
              ))}
            <div className="swiper-scrollbar"></div>
          </Swiper>
        </div>
        <div className="show-mobile">
          <div className="container-mine">
            <div className="grid">
              {motorcycleDiariesVideos.length > 0 &&
                motorcycleDiariesVideos.map((m, i) => (
                  <div
                    key={i}
                    className="grid__item one-whole medium--one-half"
                  >
                    <div
                      onClick={() => openLightboxOnSlide(i)}
                      className="overlay"
                      data-class="fslightbox-source test"
                      data-fslightbox="lightbox"
                    ></div>
                    <iframe
                      src={`https://player.vimeo.com/video/${m.VimeoNumber}`}
                      frameBorder="0"
                      allowFullScreen
                      className="vimeo"
                    ></iframe>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={galleryArray}
        slide={lightboxController.slide}
        type="video"
        loadOnlyCurrentSource={true}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const motorcycleDiariesInfo = (await getMotorcycleDiariesInfo()) || [];
  const motorcycleDiariesVideos = (await getMotorcycleDiariesVideos()) || [];

  return {
    props: { motorcycleDiariesInfo, motorcycleDiariesVideos },
    revalidate: 1
  };
}
