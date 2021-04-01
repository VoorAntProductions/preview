import React, { useState } from "react";
import { getProductions, getProduction } from "../../lib/api";
import Layout from "../../components/layout";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import FsLightbox from "fslightbox-react";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import moment from "moment";

const Production = ({ production, productions }) => {
  const router = useRouter();
  const galleryArray = [];
  let quantityVideos = 0;
  const productionsArrayIds = [];
  const [toggler, setToggler] = useState(false);

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

    if (production.HeadImage) {
      galleryArray.push(production.HeadImage.url);
    }
    if (production.VimeoVideoIDSeparateWithComma) {
      const array = production.VimeoVideoIDSeparateWithComma.split(", ");
      quantityVideos = array.length;
      array.map(item => {
        galleryArray.push(
          <iframe
            src={`https://player.vimeo.com/video/${item}?api=1;`}
            width="1920px"
            height="1080px"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        );
      });
    }
    if (production.Gallery) {
      production.Gallery.map(image => {
        const url = image.url;
        if (image.provider_metadata) {
          galleryArray.push(url);
        }
      });
    }
    return (
      <Layout pageTitle={production.Title} description={production.Description}>
        {previousId && (
          <a href={`/production/${previousId}`}>
            <img
              src="/assets/icons/previous.svg"
              alt=""
              width="60"
              height="60"
              className="icon icon-previous"
            />
          </a>
        )}
        {nextId && (
          <a href={`/production/${nextId}`}>
            <img
              src="/assets/icons/next.svg"
              alt=""
              width="60"
              height="60"
              className="icon icon-next"
            />
          </a>
        )}
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
          <div className="grid">
            <div className="grid__item large--two-thirds rm-padding">
              <div className="head_image">
                <div className="head_image_overlays">
                  {quantityVideos > 0 && (
                    <div className="align-center gallery-block">
                      <img
                        src="../assets/icons/video.svg"
                        width="25"
                        alt="No image found"
                        className="mr-15"
                      />
                      ({quantityVideos}) videos
                    </div>
                  )}
                  {production.Gallery && production.Gallery.length > 0 && (
                    <div className="align-center gallery-block">
                      <img
                        src="../assets/icons/gallery.svg"
                        alt="No image found"
                        width="25"
                        className="mr-15"
                      />
                      ({production.Gallery.length + 1}) photos
                    </div>
                  )}
                </div>
                {production.HeadImage &&
                production.HeadImage.provider_metadata ? (
                  <Image
                    dpr="auto"
                    crop="scale"
                    responsiveUseBreakpoints="true"
                    cloudName="dx8wgl3t3"
                    publicId={production.HeadImage.provider_metadata.public_id}
                    loading="lazy"
                    alt={production.HeadImage.url}
                    onClick={() => setToggler(!toggler)}
                    width={925}
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
              </div>
            </div>
            <div className="grid__item large--one-third mb-60">
              <h2 className="small--m-t30">{production.Title}</h2>
              <p className="m-t30">
                {production.Client}
                <br></br>
                {production.Location}
                <br></br>
                {production.Date && moment(production.Date).format("MMMM YYYY")}
              </p>
              <ReactMarkdown source={production.Description} />
            </div>
          </div>

          {/* <div className="w-25">
            <h2>{production.Title}</h2>
            <p className="m-t30">
              {production.Client}
              <br></br>
              {production.Location}
              <br></br>
              {production.Date && moment(production.Date).format("MMMM YYYY")}
            </p>
            <ReactMarkdown source={production.Description} />
          </div> */}
        </div>
        <FsLightbox toggler={toggler} sources={galleryArray} />
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
