import Layout from "../components/layout";
import Footer from "../components/footer";
import { getContactInfo } from "../lib/api";

export default function Contact({ contactInfo }) {
  return (
    <>
      <Layout
        pageTitle="Ant Productions Contact"
        description="Contact info for Ant Productions"
      >
        <div className="container container-XX ">
          <div className="dflex-j-center">
            <div className="XX-bg">
              <h2 className="monospace-h2">Contact</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="dflex-j-center m-tb-40">
            <div className="w-50">
              <div className="grid m-auto">
                <div className="grid__item medium--one-whole small-m-b20">
                  <div className="grid">
                    <div className="grid__item one-third">
                      <img
                        src="/assets/icons/mobile.svg"
                        alt=""
                        width="36"
                        height="36"
                        className="icon m-r40 fill-secondary"
                      />
                    </div>
                    <div className="grid__item two-thirds">
                      <a
                        href={`tel:${contactInfo.PhoneNumber1}`}
                        className="m-t5"
                      >
                        {contactInfo.PhoneNumber1}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid__item medium--one-whole small-m-b20">
                  <div className="grid">
                    <div className="grid__item one-third">
                      <img
                        src="/assets/icons/phone-call.svg"
                        alt=""
                        width="36"
                        height="36"
                        className="icon m-r40"
                      />
                    </div>
                    <div className="grid__item two-thirds">
                      <a
                        href={`tel:${contactInfo.PhoneNumber2}`}
                        className="m-t5"
                      >
                        {contactInfo.PhoneNumber2}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid__item medium--one-whole small-m-b20">
                  <div className="grid">
                    <div className="grid__item one-third">
                      <img
                        src="/assets/icons/email.svg"
                        alt=""
                        width="36"
                        height="36"
                        className="icon m-r40"
                      />
                    </div>
                    <div className="grid__item two-thirds">
                      <a href={`mailto:${contactInfo.Email}`} className="m-t5">
                        {contactInfo.Email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid__item medium--one-whole small-m-b20">
                  <div className="grid">
                    <div className="grid__item one-third">
                      <img
                        src="/assets/icons/map.svg"
                        alt=""
                        width="36"
                        height="36"
                        className="icon m-r40 fill-secondary"
                      />
                    </div>
                    <div className="grid__item two-thirds">
                      <a
                        href={contactInfo.GoogleMapsLink}
                        target="_blank"
                        className="m-t5"
                      >
                        {contactInfo.Adress}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-center">
            <h3 className="row m-b40">Follow the Ants</h3>
          </div>
          <div className="m-tb-20">
            <div className="grid m-auto">
              <div className="grid__item medium--one-third small-m-b20">
                <div className="grid">
                  <div className="grid__item one-third">
                    <img
                      src="/assets/icons/fb.svg"
                      alt=""
                      width="36"
                      className="m-r40"
                    />
                  </div>
                  <div className="grid__item two-thirds">
                    <a
                      href="https://www.facebook.com/AntProductionsBelgium/"
                      target="_blank"
                    >
                      Ant Productions
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid__item medium--one-third small-m-b20">
                <div className="grid">
                  <div className="grid__item one-third">
                    <img
                      src="/assets/icons/inst.svg"
                      alt=""
                      width="36"
                      className="m-r40"
                    />
                  </div>
                  <div className="grid__item two-thirds">
                    <a
                      href="https://www.instagram.com/ant_productions_xx/"
                      target="_blank"
                    >
                      ant_productions_xx
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid__item medium--one-third">
                <div className="grid">
                  <div className="grid__item one-third">
                    <img
                      src="/assets/icons/linkedin.svg"
                      alt=""
                      width="36"
                      className="fill-secondary m-r40"
                    />
                  </div>
                  <div className="grid__item two-thirds">
                    <a
                      href="https://www.linkedin.com/company/ant-productions-xx/"
                      target="_blank"
                    >
                      ant-productions-xx
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const contactInfo = (await getContactInfo()) || [];

  return {
    props: { contactInfo },
    revalidate: 1
  };
}
