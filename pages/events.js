import Layout from "../components/layout";
import { getEvents } from "../lib/api";
import React from "react";
import { withRouter } from "next/router";
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

function Events({ events }) {
  return (
    <Layout
      pageTitle="Ant Productions EVENTS"
      description="A collection of the events by Ant Productions"
    >
      <div className="container">
        <h2 className="m-b40 show-mobile">events</h2>
      </div>
      <div className="swiper-container-xx">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          speed={500}
          centeredSlides={true}
          mousewheel={true}
          scrollbar={{
            el: ".swiper-scrollbar",
            draggable: true
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 50
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }}
        >
          {events.length > 0 &&
            events.map((element, key) => {
              return (
                <SwiperSlide key={key}>
                  <a href={`/event/${element.id}`}>
                    <div className="mask-box-shadow">
                      <Image
                        src={element.HeadImage.url}
                        alt={element.HeadImage.url}
                        layout="fill"
                        className="mask"
                      />
                    </div>

                    <div className="text-center">
                      <p className="bold small text-shadow">{element.Title}</p>
                      <p className="small">{element.Client}</p>
                    </div>
                  </a>
                </SwiperSlide>
              );
            })}
          <div className="swiper-scrollbar"></div>
        </Swiper>
      </div>
    </Layout>
  );
}

export default withRouter(Events);

export async function getStaticProps() {
  const events = (await getEvents()) || [];

  return {
    props: { events },
    revalidate: 1
  };
}
