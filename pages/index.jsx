import React from 'react';
import DefaultLayout from "../components/layout/DefaultLayout";

class Home extends React.Component {

    static async getInitialProps({req}) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        return {userAgent};
    }
    testStore(e){
        e.preventDefault();

    }
    render() {
        return <DefaultLayout>
            <div>Welcome to Goalify!</div>
            <button className="button is-primary" onClick={this.testStore.bind(this)}> Test</button>
        </DefaultLayout>;
    }
}

export default Home;