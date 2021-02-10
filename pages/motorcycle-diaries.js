import Layout from "../components/layout";
import {
  getMotorcycleDiariesInfo,
  getMotorcycleDiariesVideos
} from "../lib/api";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
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

export default function MotorcycleDiaries({
  motorcycleDiariesInfo,
  motorcycleDiariesVideos
}) {
  return (
    <Layout
      pageTitle="Ant Productions Motorcycle Diaries"
      description="A page that explains another company from Ant Productions"
    >
      <div className="container-mine m-t60">
        <div className="grid m-b40">
          <div className="grid__item large--one-half align-column-end">
            <div className="align-column-center p-relative">
              <video className="video-motorcycle-screen" autoPlay controls loop>
                <source src="assets/screencap.mov" type="video/mov" />
                <source src="assets/screencap.mp4" type="video/mp4" />
                <source src="assets/screencap.webm" type="video/webm" />
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
          <div className="grid__item grid__item-special large--one-half content-motorcycle">
            <div className="d-flex sm-flex-col">
              <div>
                <h2 className="m-b40">motorcycle diaries</h2>
                <ReactMarkdown source={motorcycleDiariesInfo.Description} />
              </div>
              <div className="dflex-j-center m-40-0">
                {motorcycleDiariesInfo.logo && (
                  <Image
                    src={motorcycleDiariesInfo.logo.url}
                    alt={motorcycleDiariesInfo.logo.url}
                    width={130}
                    height={130}
                    className="obj-contain clients"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-gallery m-b40">
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
              spaceBetween: 5
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
              <SwiperSlide key={i}>
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
