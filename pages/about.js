import Layout from "../components/layout";
import { getAboutInfo } from "../lib/api";
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

export default function About({ aboutInfo }) {
  return (
    <Layout
      pageTitle="Ant Productions About"
      description="Some more info about Ant Productions"
    >
      <div className="container-mine">
        <div className="grid small-grid-reverse m-b100">
          <div className="grid__item large--one-third rp_grid__item">
            <h2 className="m-b40">{aboutInfo.Title}</h2>
            <ReactMarkdown source={aboutInfo.Description} />
          </div>
          <div className="grid__item large--two-thirds m-b40">
            <video
              autoPlay
              playsInline
              controls
              width="872"
              className="about-video"
            >
              <source src="assets/about.mp4" type="video/mp4" />
              <source src="assets/about.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="container-mine">
        <div className="dflex-j-center m-40-0">
          <h3>Our clients</h3>
        </div>

        <div className="show-desktop">
          <Swiper
            spaceBetween={7}
            slidesPerView={5}
            speed={500}
            mousewheel={true}
            scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true
            }}
            breakpoints={{
              1440: {
                slidesPerView: 7,
                spaceBetween: 5
              },
              1024: {
                slidesPerView: 10,
                spaceBetween: 5
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 5
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
            {aboutInfo.ClientLogos.length > 0 &&
              aboutInfo.ClientLogos.map((m, i) => (
                <SwiperSlide key={i} className="overlay-cont">
                  <Image
                    src={m.url}
                    alt={m.url}
                    width={450}
                    height="auto"
                    className="obj-contain clients client-logos"
                  />
                </SwiperSlide>
              ))}
            <div className="swiper-scrollbar"></div>
          </Swiper>
        </div>
        <div className="show-mobile">
          <div className="grid">
            {aboutInfo.ClientLogos.length > 0 &&
              aboutInfo.ClientLogos.map((m, i) => (
                <div key={i} className="grid__item one-half">
                  <Image
                    src={m.url}
                    alt={m.url}
                    width={450}
                    height="auto"
                    className="obj-contain clients client-logos"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const aboutInfo = (await getAboutInfo()) || [];

  return {
    props: { aboutInfo },
    revalidate: 1
  };
}
