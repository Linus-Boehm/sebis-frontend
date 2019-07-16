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
        <DefaultLayout hideSidebar>
          <div>
            <div
              className="backgroundImage"
              style={{
                marginTop: "-6%",
                marginLeft: "-3%",
                marginRight: "-3%"
              }}
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className="slogan">
                {" "}
                Get your company goals towards key results
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>

            <br />
            <br />
            <br />
            <div
              className="backgroundImage2"
              style={{
                marginTop: "-6%",
                marginLeft: "-3%",
                marginRight: "-3%"
              }}
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>

            <div className="container is-fullhd ">
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
        <style jsx>
          {`
          .inner-text {
            margin-left:40%
            margin-right:40%
          }

          .box-format {
            transition: box-shadow 0.5s;
            box-shadow:10px 10px 5px 0px 
            -webkit-box-shadow: 4px 0px 24px -5px rgba(184,180,184,1);
            -moz-box-shadow: 4px 0px 24px -5px rgba(184,180,184,1);
            box-shadow: 4px 0px 24px -5px rgba(184,180,184,1);
            border-radius:3px;
            border: 0.1px solid #ccc;
            background: #FAFAFA;

          }
          .box:hover {
            box-shadow: 0 0 11px rgba(33,33,33,.2); 
          }
          .pricing-title {
            color: #465775;
            text-align:center;
            font-size:20px;
            font-weight:bold;
          }
          .slogan {
            font-size: 50px;
            font-weight: bold;
           text-align: center;
           color: #465775;
          }
            .backgroundImage {
              background: url("/static/homepage.png") no-repeat center center
                fixed;
              widht: 100%
              height: 130%
            }
            .backgroundImage2 {
              background: url("/static/home_page_offer2.png") no-repeat center center
                fixed;
                height:10%;
                background-size:100%;
            }
        
          `}
        </style>
      </div>
    );
  }
}

export default Home;
