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
        <DefaultLayout mainContentClasses="bg-image" hideSidebar>
          {false && <img src="/static/homepage.png" className="imageCover" />}
        </DefaultLayout>
      </div>
    );
  }
}

export default Home;
