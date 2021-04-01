import React, { useState } from "react";
import { getEvents, getEvent } from "../../lib/api";
import Layout from "../../components/layout";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import FsLightbox from "fslightbox-react";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import Loading from "../../components/loading";
import moment from "moment";

const Event = ({ event, events }) => {
  const router = useRouter();
  const galleryArray = [];
  const eventsArrayIds = [];
  let quantityVideos = 0;
  const [toggler, setToggler] = useState(false);

  let previousId;
  let nextId;
  let eventsLength;
  let eventPosition;

  if (router.isFallback) {
    return (
      <Layout pageTitle="Loading" description="Loading screen">
        <Loading />
      </Layout>
    );
  } else {
    if (events) {
      events.map(event => {
        eventsArrayIds.push(event.id);
      });

      eventPosition = eventsArrayIds.indexOf(event.id);
      eventsLength = events.length;

      if (eventPosition + 1 < eventsLength) {
        nextId = events[eventPosition + 1].id;
      }
      if (eventPosition - 1 >= 0) {
        previousId = events[eventPosition - 1].id;
      }
    }

    if (event.HeadImage) {
      galleryArray.push(event.HeadImage.url);
    }
    if (event.VimeoVideoIDSeparateWithComma) {
      const array = event.VimeoVideoIDSeparateWithComma.split(", ");
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
    if (event.Gallery) {
      event.Gallery.map(image => {
        const url = image.url;
        if (image.provider_metadata) {
          galleryArray.push(url);
        }
      });
    }

    return (
      <Layout pageTitle={event.Title} description={event.Description}>
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
                {event.Title}
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
                  {event.Gallery && event.Gallery.length > 0 && (
                    <div className="align-center gallery-block">
                      <img
                        src="../assets/icons/gallery.svg"
                        alt="No image found"
                        width="25"
                        className="mr-15"
                      />
                      ({event.Gallery.length + 1}) photos
                    </div>
                  )}
                </div>
                {event.HeadImage && event.HeadImage.provider_metadata ? (
                  <Image
                    dpr="auto"
                    crop="scale"
                    responsiveUseBreakpoints="true"
                    cloudName="dx8wgl3t3"
                    publicId={event.HeadImage.provider_metadata.public_id}
                    loading="lazy"
                    alt={event.HeadImage.url}
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
              <h2 className="small--m-t30">{event.Title}</h2>
              <p className="m-t30">
                {event.Client}
                <br></br>
                {event.Location}
                <br></br>
                {event.Date && moment(event.Date).format("MMMM YYYY")}
              </p>
              <ReactMarkdown source={event.Description} />
            </div>
          </div>

          {/* <div className="w-25">
            <h2>{event.Title}</h2>
            <p className="m-t30">
              {event.Client}
              <br></br>
              {event.Location}
              <br></br>
              {event.Date && moment(event.Date).format("MMMM YYYY")}
            </p>
            <ReactMarkdown source={event.Description} />
          </div> */}
        </div>
        <FsLightbox toggler={toggler} sources={galleryArray} />
      </Layout>
    );
  }
};

export async function getStaticPaths() {
  const events = (await getEvents()) || [];

  return {
    paths: events.map(event => ({
      params: {
        id: toString(event.id)
      }
    })),
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const event = (await getEvent(params.id)) || [];
  const events = (await getEvents()) || [];

  return {
    props: { event, events },
    revalidate: 1
  };
}

export default Event;
