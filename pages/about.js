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
      <div className="container m-t60">
        <div className="grid small-grid-reverse m-b100">
          <div className="grid__item large--one-half rp_grid__item">
            <h2 className="m-b40">{aboutInfo.Title}</h2>
            <ReactMarkdown source={aboutInfo.Description} />
          </div>
          <div className="grid__item grid__item-special large--one-half">
            {aboutInfo.VimeoVideoID && (
              <iframe
                src={`https://player.vimeo.com/video/${aboutInfo.VimeoVideoID}`}
                frameBorder="0"
                allowFullScreen
                className="vimeo full-w-h"
              ></iframe>
            )}
          </div>
        </div>
        <div className="dflex-j-center m-40-0">
          <h3>Our client</h3>
        </div>
        <div className="grid">
          {aboutInfo.ClientLogos.length > 0 &&
            aboutInfo.ClientLogos.map((m, i) => (
              <div
                className="grid__item one-half medium--one-third large--one-quarter"
                key={i}
              >
                <Image
                  src={m.url}
                  alt={m.url}
                  width={200}
                  height={100}
                  className="obj-contain clients"
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
