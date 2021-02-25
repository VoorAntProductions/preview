import Layout from "../components/layout";
import Swiperslider from "../components/swiperslider";
import { getEvents } from "../lib/api";
import React from "react";
import { withRouter } from "next/router";

function Events({ events }) {
  return (
    <Layout
      pageTitle="Ant Productions EVENTS"
      description="A collection of the events by Ant Productions"
    >
      <div className="container">
        <h2 className="m-b40 show-mobile">events</h2>
      </div>
      <Swiperslider items={events} url="event" />
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
