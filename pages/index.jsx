import React from "react";
import DefaultLayout from "../components/layout/DefaultLayout";

class Home extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return (
      <div>
        <DefaultLayout className={"homepage"} hideSidebar>
          <div>
            <div
              className="top-hero"
            >
              <img className={"image"} src="/static/homepage.png" alt={""} />
              <p className="slogan">
                {" "}
                Get your company goals towards key results
              </p>
            </div>
            <div
              className="features"
            >
              <h2>Features</h2>
              <img className={"image"} src="/static/home_page_offer2.png" alt={"Digitize Goalsheet"} />
            </div>

            <div className="container is-fullhd">
              <p className="slogan">Pricing </p>
              <div className="columns">
                <div className="column is-offset-2 is-4">
                  <div className="box box-format shadow">
                    <p className="pricing-title">FREE PLAN</p>
                    <p className="inner-text"> Up to 6 members for free</p>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="box box-format">
                    <p className="pricing-title">PRO PLAN</p>
                    <p> Licence per user</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </div>
    );
  }
}

export default Home;
