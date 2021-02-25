import Layout from "../components/layout";
import Swiperslider from "../components/swiperslider";
import { getProductions } from "../lib/api";
import React from "react";
import { withRouter } from "next/router";

function Productions({ productions }) {
  return (
    <Layout
      pageTitle="Ant Productions Productions"
      description="A collection of the productions by Ant Productions"
    >
      <div className="container">
        <h2 className="m-b40 show-mobile">productions</h2>
      </div>
      <Swiperslider items={productions} url="production" />
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
