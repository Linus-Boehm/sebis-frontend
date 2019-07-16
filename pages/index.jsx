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
        <DefaultLayout>
          <img src="/static/homepage.png" className="imageCover" />
        </DefaultLayout>

        <style jsx>
          {`
          .imageCover {
            margin-top: -8%;
            margin-bottom: 20%;
            z-index:50000
            margin-left: 30%
      
          }

          
            .backgroundImage {
             background-image: url("/static/homepage.png");
              z-index:1
              background-size:cover;
              width:100px
              height: 150%;
              position: relative;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Home;
