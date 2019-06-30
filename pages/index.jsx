import React from 'react';
import DefaultLayout from "../components/layout/DefaultLayout";

class Home extends React.Component {

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers[ 'user-agent' ] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return (
      <DefaultLayout>
        <div className="container">
          <div>Welcome to Goalify!</div>
        </div>
      </DefaultLayout>
    )
  }
}

export default Home;