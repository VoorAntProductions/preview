import Layout from "../components/layout";
import Swiperslider from "../components/swiperslider";
import { getProductions } from "../lib/api";
import React from "react";
import { withRouter } from "next/router";
import GalleryMobile from "../components/galleryMobile";

function Productions({ productions }) {
  return (
    <Layout
      pageTitle="Ant Productions Productions"
      description="A collection of the productions by Ant Productions"
    >
      <div className="container">
        <h2 className="m-b40 show-mobile">productions</h2>
      </div>
      <div className="show-desktop">
        <Swiperslider items={productions} url="production" />
      </div>
      <div className="show-mobile">
        <GalleryMobile items={productions} url="production" />
      </div>
    </Layout>
  );
}

export default withRouter(Productions);

export async function getStaticProps() {
  const productions = (await getProductions()) || [];

  return {
    props: { productions },
    revalidate: 1
  };
}
