import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
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

const Swiperslider = ({ items, url }) => {
  return (
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
        {items.map((element, key) => {
          return (
            <SwiperSlide key={key}>
              <Link
                as={`/${url}/${element.id}`}
                href={{ pathname: `/${url}/[id]` }}
              >
                <a>
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
              </Link>
            </SwiperSlide>
          );
        })}
        <div className="swiper-scrollbar"></div>
      </Swiper>
      {items.length === 0 && <p className="small">No items available</p>}
    </div>
  );
};

export default Swiperslider;
