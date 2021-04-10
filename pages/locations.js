import Layout from "../components/layout";
import { getImages } from "../lib/api";
import React, { useState } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import FsLightbox from "fslightbox-react";

export default function Locations({ images }) {
  const items = images; //… your array, filled with values

  const n = 3;
  const result = [[], [], []]; //we create it, then we'll fill it
  const imageResults1 = [];
  const imageResults2 = [];
  const imageResults3 = [];

  const imageResultsLightbox1 = [];
  const imageResultsLightbox2 = [];
  const imageResultsLightbox3 = [];

  let newimageResultsLightbox1,
    newimageResultsLightbox2,
    newimageResultsLightbox3;

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
    imageResultsLightbox1.push(r.Gallery[0].url);
  });
  result[1].forEach(r => {
    imageResults2.push({
      publicId: r.Gallery[0].provider_metadata.public_id,
      src: r.Gallery[0].url,
      width: r.Gallery[0].width,
      height: r.Gallery[0].height
    });
    imageResultsLightbox2.push(r.Gallery[0].url);
  });
  result[2].forEach(r => {
    imageResults3.push({
      publicId: r.Gallery[0].provider_metadata.public_id,
      src: r.Gallery[0].url,
      width: r.Gallery[0].width,
      height: r.Gallery[0].height
    });
    imageResultsLightbox3.push(r.Gallery[0].url);
  });
  if (
    imageResultsLightbox1.length === result[0].length &&
    imageResultsLightbox2.length === result[1].length &&
    imageResultsLightbox3.length === result[2].length
  ) {
    newimageResultsLightbox1 = imageResultsLightbox1.concat(
      imageResultsLightbox2,
      imageResultsLightbox3
    );
    newimageResultsLightbox2 = imageResultsLightbox2.concat(
      imageResultsLightbox3,
      imageResultsLightbox1
    );
    newimageResultsLightbox3 = imageResultsLightbox3.concat(
      imageResultsLightbox1,
      imageResultsLightbox2
    );
  }

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

  const [lightboxController2, setLightboxController2] = useState({
    toggler: false,
    slide: 1
  });

  function openLightboxOnSlide2(number) {
    const indexVideo = number + 1;
    setLightboxController2({
      toggler: !lightboxController2.toggler,
      slide: indexVideo
    });
  }

  const [lightboxController3, setLightboxController3] = useState({
    toggler: false,
    slide: 1
  });

  function openLightboxOnSlide3(number) {
    const indexVideo = number + 1;
    setLightboxController3({
      toggler: !lightboxController3.toggler,
      slide: indexVideo
    });
  }

  return (
    <Layout
      pageTitle="Ant Productions Locations"
      description="With years of travel and expertise in the automotive field, we
    have a giant knowlege about location all over the world: roads,
    architectures, city and landscapes, unusual locations, hotels and
    more. Get inspired with few of them!"
    >
      <div className="container container-XX">
        <div className="dflex-j-center content-align-center content-locations">
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
      <div className="container-mine">
        <div className="grid pt-50">
          <div className="grid__item medium--one-half large--one-third m-t40 image-margin-top">
            {imageResults1.length > 0 &&
              imageResults1.map((el, key) => (
                <div key={key}>
                  <Image
                    cloudName="dx8wgl3t3"
                    publicId={el.publicId}
                    loading="lazy"
                    alt={el.url}
                    onClick={() => openLightboxOnSlide(key)}
                    // height="auto"
                    // width={430}
                    className="locations-image"
                  >
                    <Transformation crop="fill" width="430" />
                    <Transformation
                      quality="auto"
                      fetchFormat="auto"
                      flag="lossy"
                      format="jpg"
                    />
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
                    onClick={() => openLightboxOnSlide2(key)}
                    // height="auto"
                    // width={430}
                    className="locations-image"
                  >
                    <Transformation crop="fill" width="430" />
                    <Transformation
                      quality="auto"
                      fetchFormat="auto"
                      flag="lossy"
                      format="jpg"
                    />
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
                    onClick={() => openLightboxOnSlide3(key)}
                    // height="auto"
                    // width={430}
                    className="locations-image"
                  >
                    <Transformation crop="fill" width="430" />
                    <Transformation
                      quality="auto"
                      fetchFormat="auto"
                      flag="lossy"
                      format="jpg"
                    />
                    <Placeholder type="pixelate" />
                  </Image>
                </div>
              ))}
          </div>
          <FsLightbox
            toggler={lightboxController.toggler}
            sources={newimageResultsLightbox1}
            slide={lightboxController.slide}
          />
          <FsLightbox
            toggler={lightboxController2.toggler}
            sources={newimageResultsLightbox2}
            slide={lightboxController2.slide}
          />
          <FsLightbox
            toggler={lightboxController3.toggler}
            sources={newimageResultsLightbox3}
            slide={lightboxController3.slide}
          />
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
