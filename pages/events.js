import Layout from "../components/layout";
import Swiperslider from "../components/swiperslider";
import { getEvents } from "../lib/api";
import React from "react";
import { withRouter } from "next/router";
import GalleryMobile from "../components/galleryMobile";

function Events({ events }) {
  return (
    <Layout
      pageTitle="Ant Productions EVENTS"
      description="A collection of the events by Ant Productions"
    >
      <div className="container">
        <h2 className="m-b40 show-mobile">events</h2>
      </div>
      <div className="show-desktop">
        <Swiperslider items={events} url="event" />
      </div>
      <div className="show-mobile">
        <GalleryMobile items={events} url="event" />
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
