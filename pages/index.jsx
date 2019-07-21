import React from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import ActiveLink from "../components/layout/ActiveLink";

class Home extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }

  componentDidMount() {
    AOS.init();
  }

  render() {
    return (
      <DefaultLayout className={"homepage"} hideSidebar>
        <div>
          <div className="top-hero">
            <img className={"image"} src="/static/homepage.png" alt={""} />
            <p
              className="slogan"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-offset="200"
              data-aos-easing="ease-out-quart"
            >
              {" "}
              Get your company goals towards key results
            </p>
          </div>
        </div>
        <div className="container">
          <div className="content-wrapper index-section is-medium my-8 py-8">
            <div className="columns is-vcentered">
              <div className="column is-4">
                <div
                  className="feature"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-offset="200"
                  data-aos-easing="ease-out-quart"
                >
                  <img
                    src="/static/images/chained.svg"
                    alt=""
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-offset="200"
                    data-aos-easing="ease-out-quart"
                  />
                  <h4
                    className="title is-6 is-tight is-light"
                    style={{ textAlign: "center" }}
                  >
                    Digitize goalsheets
                  </h4>
                  <p style={{ textAlign: "center" }}>
                    Manage, create and review in a collaborative way
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div
                  className="feature"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-offset="200"
                  data-aos-easing="ease-out-quart"
                >
                  <img
                    src="/static/images/cubes2.svg"
                    alt=""
                    data-aos="fade-up"
                    data-aos-delay="300"
                    data-aos-offset="200"
                    data-aos-easing="ease-out-quart"
                  />

                  <h4
                    className="title is-6 is-tight is-light"
                    style={{ textAlign: "center" }}
                  >
                    Holistic overview of all goals
                  </h4>
                  <p style={{ textAlign: "center" }}>
                    Manage Personal, Team and Company Goals
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div
                  className="feature"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-offset="200"
                  data-aos-easing="ease-out-quart"
                >
                  <img
                    src="/static/images/cubes3.svg"
                    alt=""
                    data-aos="fade-up"
                    data-aos-delay="500"
                    data-aos-offset="200"
                    data-aos-easing="ease-out-quart"
                  />
                  <h4
                    className="title is-6 is-tight is-light"
                    style={{ textAlign: "center" }}
                  >
                    Track your progress
                  </h4>
                  <p style={{ textAlign: "center" }}>
                    Enabled through three different metrics
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 content index-section pricing-section">
            <h2 className="text-center mt-16">Pricing </h2>
            <div className="columns w-full justify-around">
              <div className="column px-4 is-4">
                <div
                  className="box box-format shadow"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-offset="200"
                  data-aos-easing="ease-out-quart"
                >
                  <p className="pricing-title">FREE PLAN</p>
                  <p className="inner-text"> Up to 6 members for free</p>
                  <div className="flex w-full justify-center">
                    <ActiveLink href={"/auth/signup"}>
                      <button className="button is-primary mt-4">
                        Start Now
                      </button>
                    </ActiveLink>
                  </div>
                </div>
              </div>
              <div className="column px-4 is-4">
                <div
                  className="box box-format"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-offset="200"
                  data-aos-easing="ease-out-quart"
                >
                  <p className="pricing-title">PRO PLAN</p>
                  <p> Licence per user</p>
                  <div className="flex w-full justify-center">
                    <ActiveLink href={"/auth/signup"}>
                      <button className="button is-primary mt-4">
                        Start Now
                      </button>
                    </ActiveLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*language=CSS*/}
        <style jsx>{`
          .feature img {
            display: block;
            margin: 0 auto;
            max-height: 120px;
          }

          .index-section {
            min-height: 600px;
            height: 70vh;
            padding-top: 200px;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default Home;
