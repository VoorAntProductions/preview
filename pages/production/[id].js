import React, { useState } from "react";
import { getProductions, getProduction } from "../../lib/api";
import Layout from "../../components/layout";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import Lightbox from "react-image-lightbox";
import { Image, Transformation, Placeholder } from "cloudinary-react";

const Production = ({ production, productions }) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewerIsOpenHeadImage, setViewerIsOpenHeadImage] = useState(false);
  const galleryArray = [];
  const videoArray = [];
  const productionsArrayIds = [];

  let previousId;
  let nextId;
  let productionsLength;
  let productionPosition;

  if (router.isFallback) {
    return (
      <Layout pageTitle="Loading" description="Loading screen">
        <Loading />
      </Layout>
    );
  } else {
    if (productions) {
      productions.map(production => {
        productionsArrayIds.push(production.id);
      });

      productionPosition = productionsArrayIds.indexOf(production.id);
      productionsLength = productions.length;

      if (productionPosition + 1 < productionsLength) {
        nextId = productions[productionPosition + 1].id;
      }
      if (productionPosition - 1 >= 0) {
        previousId = productions[productionPosition - 1].id;
      }
    }

    const openLightbox = index => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    };

    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };

    if (production.Gallery) {
      production.Gallery.map(image => {
        if (image.provider_metadata) {
          galleryArray.push({
            publicId: image.provider_metadata.public_id,
            url: image.url
          });
        }
      });
    }

    if (production.VimeoVideoIDsSeparateWithComma) {
      const array = production.VimeoVideoIDsSeparateWithComma.split(", ");
      array.map(item => {
        videoArray.push(item);
      });
    }
    return (
      <Layout pageTitle={production.Title} description={production.Description}>
        <div className="container-mine">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small pt-4">
              <li className="breadcrumb-item active">
                <a href="/productions">PRODUCTIONS</a>
              </li>
              <li className="breadcrumb-item non-active" aria-current="page">
                {production.Title}
              </li>
            </ol>
          </nav>
          <div className="text-right">
            {previousId && (
              <a href={`/production/${previousId}`}>
                <img
                  src="/assets/icons/arrow-white.svg"
                  alt=""
                  width="30"
                  className="left arrow"
                />
              </a>
            )}
            {nextId && (
              <a href={`/production/${nextId}`}>
                {" "}
                <img
                  src="/assets/icons/arrow-white.svg"
                  alt=""
                  width="30"
                  className="right arrow"
                />
              </a>
            )}
          </div>
        </div>
        {production.HeadImage && production.HeadImage.provider_metadata ? (
          <Image
            dpr="auto"
            crop="scale"
            responsiveUseBreakpoints="true"
            cloudName="dx8wgl3t3"
            publicId={production.HeadImage.provider_metadata.public_id}
            loading="lazy"
            alt={production.HeadImage.url}
            onClick={() => setViewerIsOpenHeadImage(true)}
            width={1041}
            height={670}
            className="video detail-head-image"
          >
            <Transformation quality="auto" fetchFormat="auto" />
            <Placeholder type="pixelate" />
          </Image>
        ) : (
          <img
            src="../assets/no-image.svg"
            alt="No image found"
            width="1041"
            height="670"
            className="video detail-head-image"
          />
        )}
        <div className="w-25 text-container">
          <h2>{production.Title}</h2>
          <p className="m-t30">
            {production.Location} on {production.Date}
          </p>
          <ReactMarkdown source={production.Description} />
          {production.Gallery && production.Gallery.length > 0 && (
            <div className="mouse-scroll-div">
              <a className="mouse-scroll" href="#gallery">
                <span className="mouse">
                  <span className="mouse-movement"></span>
                </span>
                <span className="mouse-message fadeIn">scroll</span>
              </a>
            </div>
          )}
        </div>
        <div className="container-mine">
          <div className="grid equal-h m-t90" id="gallery">
            {galleryArray &&
              galleryArray.length > 0 &&
              galleryArray.map((el, key) => (
                <div
                  className="grid__item one-half medium--one-third large--one-fifth"
                  key={key}
                >
                  <Image
                    cloudName="dx8wgl3t3"
                    publicId={el.publicId}
                    loading="lazy"
                    alt={el.url}
                    onClick={() => openLightbox(key)}
                    className="detail-image-gallery"
                    height={171}
                    width={171}
                  >
                    <Transformation height={171} crop="scale" />
                    <Transformation quality="auto" fetchFormat="auto" />
                    <Placeholder type="pixelate" />
                  </Image>
                </div>
              ))}
            {videoArray &&
              videoArray.length > 0 &&
              videoArray.map((el, key) => (
                <div
                  className="grid__item one-half medium--one-third large--one-fifth"
                  key={key}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${el}`}
                    frameBorder="0"
                    allowFullScreen
                    className="detail-image-gallery"
                  ></iframe>
                </div>
              ))}
          </div>
          {viewerIsOpen && (
            <Lightbox
              mainSrc={galleryArray[currentImage].url}
              nextSrc={
                galleryArray[(currentImage + 1) % galleryArray.length].url
              }
              prevSrc={
                galleryArray[
                  (currentImage + galleryArray.length - 1) % galleryArray.length
                ].url
              }
              onCloseRequest={closeLightbox}
              onMovePrevRequest={() =>
                setCurrentImage(
                  (currentImage + galleryArray.length - 1) % galleryArray.length
                )
              }
              onMoveNextRequest={() =>
                setCurrentImage(
                  (currentImage + galleryArray.length + 1) % galleryArray.length
                )
              }
            />
          )}
          {viewerIsOpenHeadImage && (
            <Lightbox
              mainSrc={production.HeadImage.url}
              onCloseRequest={() => setViewerIsOpenHeadImage(false)}
            />
          )}
        </div>
      </Layout>
    );
  }
};

export async function getStaticPaths() {
  const productions = (await getProductions()) || [];

  return {
    paths: productions.map(production => ({
      params: {
        id: toString(production.id)
      }
    })),
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const production = (await getProduction(params.id)) || [];
  const productions = (await getProductions()) || [];

  return {
    props: { production, productions },
    revalidate: 1
  };
}

export default Production;
