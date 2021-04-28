import React from "react";
import Image from "next/image";
import Link from "next/link";

const GalleryMobile = ({ items, url }) => {
  return (
    <div className="swiper-container-xx">
      {items.map((element, key) => {
        return (
          <div key={key}>
            <Link
              as={`/${url}/${element.id}`}
              href={{ pathname: `/${url}/[id]` }}
            >
              <a>
                <div className="mask-box-shadow text-center">
                  <Image
                    src={element.HeadImage.url}
                    alt={element.HeadImage.url}
                    className="mask"
                    width="375"
                    height="375"
                  />
                </div>

                <div className="text-center text-max-width m-auto mtn-45">
                  <p className="bold small text-shadow">{element.Title}</p>
                  <p className="small">{element.Client}</p>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
      {items.length === 0 && <p className="small">No items available</p>}
    </div>
  );
};

export default GalleryMobile;
