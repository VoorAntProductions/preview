import Layout from "../components/layout";
import { getImages } from "../lib/api";
import Carousel, { Modal, ModalGateway } from "react-images";
import React, { useState } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import Lightbox from "react-image-lightbox";

export default function Locations({ images }) {
  const items = images; //… your array, filled with values

  const n = 3;
  const result = [[], [], []]; //we create it, then we'll fill it
  const imageResults1 = [];
  const imageResults2 = [];
  const imageResults3 = [];

  const wordsPerLine = Math.ceil(items.length / 3);

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = items[i + line * wordsPerLine];
      if (!value) continue; //avoid adding "undefined" values
      result[line].push(value);
    }
  }

  result[0].forEach(r => {
    imageResults1.push({
      publicId: r.Gallery[0].provider_metadata.public_id,
      src: r.Gallery[0].url,
      width: r.Gallery[0].width,
      height: r.Gallery[0].height
    });
  });
  result[1].forEach(r => {
    imageResults2.push({
      publicId: r.Gallery[0].provider_metadata.public_id,
      src: r.Gallery[0].url,
      width: r.Gallery[0].width,
      height: r.Gallery[0].height
    });
  });
  result[2].forEach(r => {
    imageResults3.push({
      publicId: r.Gallery[0].provider_metadata.public_id,
      src: r.Gallery[0].url,
      width: r.Gallery[0].width,
      height: r.Gallery[0].height
    });
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewerIsOpen2, setViewerIsOpen2] = useState(false);
  const [viewerIsOpen3, setViewerIsOpen3] = useState(false);

  const openLightbox = index => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };
  const openLightbox2 = index => {
    setCurrentImage(index);
    setViewerIsOpen2(true);
  };
  const openLightbox3 = index => {
    setCurrentImage(index);
    setViewerIsOpen3(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
    setViewerIsOpen2(false);
    setViewerIsOpen3(false);
  };

  return (
    <Layout
      pageTitle="Ant Productions Locations"
      description="With years of travel and expertise in the automotive field, we
    have a giant knowlege about location all over the world: roads,
    architectures, city and landscapes, unusual locations, hotels and
    more. Get inspired with few of them!"
    >
      <div className="container container-XX ">
        <div className="content-align-center">
          <div className="XX-bg">
            <h2 className="monospace-h2">Locations</h2>
            <p>
              With years of travel and expertise in the automotive field, we
              have a giant knowlege about location all over the world: roads,
              architectures, city and landscapes, unusual locations, hotels and
              more. Get inspired with few of them!
            </p>
          </div>
        </div>
      </div>
      <div className="container--large container-image">
        <div className="grid">
          <div className="grid__item medium--one-half large--one-third m-t40 image-margin-top">
            {imageResults1.length > 0 &&
              imageResults1.map((el, key) => (
                <div key={key}>
                  <Image
                    cloudName="dx8wgl3t3"
                    publicId={el.publicId}
                    loading="lazy"
                    alt={el.url}
                    onClick={() => openLightbox(key)}
                    height={186}
                    width={310}
                  >
                    <Transformation height={186} crop="scale" />
                    <Transformation quality="auto" fetchFormat="auto" />
                    <Placeholder type="pixelate" />
                  </Image>
                </div>
              ))}
          </div>
          <div className="grid__item medium--one-half large--one-third m-t90-medium image-margin-top">
            {imageResults2.length > 0 &&
              imageResults2.map((el, key) => (
                <div key={key}>
                  <Image
                    cloudName="dx8wgl3t3"
                    publicId={el.publicId}
                    loading="lazy"
                    alt={el.url}
                    onClick={() => openLightbox2(key)}
                    height={186}
                    width={310}
                  >
                    <Transformation height={186} crop="scale" />
                    <Transformation quality="auto" fetchFormat="auto" />
                    <Placeholder type="pixelate" />
                  </Image>
                </div>
              ))}
          </div>
          <div className="grid__item medium--one-half large--one-third image-margin-top">
            {imageResults3.length > 0 &&
              imageResults3.map((el, key) => (
                <div key={key}>
                  <Image
                    cloudName="dx8wgl3t3"
                    publicId={el.publicId}
                    loading="lazy"
                    alt={el.url}
                    onClick={() => openLightbox3(key)}
                    height={186}
                    width={310}
                  >
                    <Transformation height={186} crop="scale" />
                    <Transformation quality="auto" fetchFormat="auto" />
                    <Placeholder type="pixelate" />
                  </Image>
                </div>
              ))}
          </div>
          {viewerIsOpen && (
            <Lightbox
              mainSrc={imageResults1[currentImage].src}
              nextSrc={
                imageResults1[(currentImage + 1) % imageResults1.length].src
              }
              prevSrc={
                imageResults1[
                  (currentImage + imageResults1.length - 1) %
                    imageResults1.length
                ].src
              }
              onCloseRequest={closeLightbox}
              onMovePrevRequest={() =>
                setCurrentImage(
                  (currentImage + imageResults1.length - 1) %
                    imageResults1.length
                )
              }
              onMoveNextRequest={() =>
                setCurrentImage(
                  (currentImage + imageResults1.length + 1) %
                    imageResults1.length
                )
              }
            />
          )}
          {viewerIsOpen2 && (
            <Lightbox
              mainSrc={imageResults2[currentImage].src}
              nextSrc={
                imageResults2[(currentImage + 1) % imageResults2.length].src
              }
              prevSrc={
                imageResults2[
                  (currentImage + imageResults2.length - 1) %
                    imageResults2.length
                ].src
              }
              onCloseRequest={closeLightbox}
              onMovePrevRequest={() =>
                setCurrentImage(
                  (currentImage + imageResults2.length - 1) %
                    imageResults2.length
                )
              }
              onMoveNextRequest={() =>
                setCurrentImage(
                  (currentImage + imageResults2.length + 1) %
                    imageResults2.length
                )
              }
            />
          )}
          {viewerIsOpen3 && (
            <Lightbox
              mainSrc={imageResults3[currentImage].src}
              nextSrc={
                imageResults3[(currentImage + 1) % imageResults3.length].src
              }
              prevSrc={
                imageResults3[
                  (currentImage + imageResults3.length - 1) %
                    imageResults3.length
                ].src
              }
              onCloseRequest={closeLightbox}
              onMovePrevRequest={() =>
                setCurrentImage(
                  (currentImage + imageResults3.length - 1) %
                    imageResults3.length
                )
              }
              onMoveNextRequest={() =>
                setCurrentImage(
                  (currentImage + imageResults3.length + 1) %
                    imageResults3.length
                )
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const images = (await getImages()) || [];

  return {
    props: { images },
    revalidate: 1
  };
}
