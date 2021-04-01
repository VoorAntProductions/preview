import Layout from "../components/layout";
import { getAboutInfo } from "../lib/api";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function About({ aboutInfo }) {
  return (
    <Layout
      pageTitle="Ant Productions About"
      description="Some more info about Ant Productions"
    >
      <div className="container-mine">
        <div className="grid small-grid-reverse m-b100">
          <div className="grid__item large--one-third rp_grid__item">
            <h2 className="m-b40">{aboutInfo.Title}</h2>
            <ReactMarkdown source={aboutInfo.Description} />
          </div>
          <div className="grid__item grid__item-special large--two-thirds">
            <video controls width="872" className="about-video">
              <source src="assets/about.mp4" type="video/mp4" />
              <source src="assets/about.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="dflex-j-center m-40-0">
          <h3>Our clients</h3>
        </div>
        <div className="grid">
          {aboutInfo.ClientLogos.length > 0 &&
            aboutInfo.ClientLogos.map((m, i) => (
              <div className="grid__item one-half medium--one-eighth" key={i}>
                <Image
                  src={m.url}
                  alt={m.url}
                  width={450}
                  height="auto"
                  className="obj-contain clients client-logos"
                />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const aboutInfo = (await getAboutInfo()) || [];

  return {
    props: { aboutInfo },
    revalidate: 1
  };
}
