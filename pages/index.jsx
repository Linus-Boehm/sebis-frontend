import React from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import ActiveLink from "../components/layout/ActiveLink";

class Home extends React.Component {
    static async getInitialProps({req}) {
        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
        return {userAgent};
    }

    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <DefaultLayout className={"homepage "} hideSidebar>
                <div className="-mx-4">
                    <div className="">
                        <div className="top-hero header-seaction relative">
                            <div className="slogan flex flex-col"
                                 style={{fontWeight: "bold", color: "#344258"}}>
                                <div data-aos="fade-up"
                                     data-aos-delay="800"
                                     data-aos-offset="0"
                                     data-aos-easing="ease-out-quart"
                                     data-aos-once="true" className="flex justify-center pb-4 aos-init">
                                    <img src="/static/goalify_final.png" style={{maxWidth: "70%", maxHeight: "120px"}}/>

                                </div>
                                <p data-aos="fade-up"
                                   data-aos-delay="1000"
                                   data-aos-offset="0"
                                   data-aos-easing="ease-out-quart"
                                   data-aos-once="true"
                                   className="aos-init">Get your company goals towards key results
                                </p>
                                <div data-aos="fade-up"
                                     data-aos-delay="1200"
                                     data-aos-offset="0"
                                     data-aos-easing="ease-out-quart"
                                     data-aos-once="true"
                                     className="flex flex-col justify-center pb-4 sm:flex-row mt-8 aos-init">
                                    <ActiveLink href={"/auth/signin"}>
                                        <button className="button is-primary mx-4 my-2">
                                            Sign In
                                        </button>
                                    </ActiveLink>
                                    <ActiveLink href={"/auth/signup"}>
                                        <button className="button is-link mx-4 my-2">
                                            Sign Up
                                        </button>
                                    </ActiveLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="content content-wrapper index-section is-medium my-8 py-8 flex flex-col">

                            <div className="flex-1 flex flex-col justify-center items-center">
                                <h4 className="text-center">Features</h4>
                                <div className="flex flex-col sm:flex-row w-full h-auto">
                                    <div className="sm:w-1/3 w-full p-4">
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
                                                className="title is-6 is-tight is-light index-heading text-center"
                                            >
                                                Digitize goalsheets
                                            </h4>
                                            <p style={{textAlign: "center"}}>
                                                Manage, create and review in a collaborative way
                                            </p>
                                        </div>
                                    </div>
                                    <div className="sm:w-1/3 w-full p-4">
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
                                                className="title is-6 is-tight is-light index-heading text-center"

                                            >
                                                Holistic overview of all goals
                                            </h4>
                                            <p style={{textAlign: "center"}}>
                                                Manage Personal, Team and Company Goals
                                            </p>
                                        </div>
                                    </div>
                                    <div className="sm:w-1/3 w-full p-4">
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
                                                className="title is-6 is-tight is-light index-heading text-center"
                                            >
                                                Track your progress
                                            </h4>
                                            <p style={{textAlign: "center"}}>
                                                Enabled through three different metrics
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-gray-100">
                        <div className="container">
                            <div className="content content-wrapper index-section pricing-section is-medium flex flex-col">
                                <div className="flex-1 flex flex-col justify-center items-center">
                                    <h2 className="text-center mt-16 pb-4" style={{color: "#344258"}}>
                                        Pricing
                                    </h2>
                                    <div className="flex flex-col sm:flex-row w-full justify-around pb-16">
                                        <div className=" px-4 is-4 mx-2 my-8">
                                            <div
                                                className="feature-box rounded-lg box-format shadow-xl p-4 bg-white flex-1 flex flex-col"
                                                data-aos="fade-up"
                                                data-aos-delay="200"
                                                data-aos-offset="220"
                                                data-aos-easing="ease-out-quart"
                                            >
                                                <p
                                                    className="pricing-title text-center"
                                                    style={{fontWeight: "bold", color: "#344258"}}
                                                >
                                                    FREE PLAN
                                                </p>
                                                <p className="inner-text text-center">
                                                    {" "}
                                                    Up to 6 members for free
                                                </p>
                                                <div className="flex w-full justify-center">
                                                    <ActiveLink href={"/auth/signup"}>
                                                        <button className="button is-primary mt-4">
                                                            Start Now
                                                        </button>
                                                    </ActiveLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" px-4 is-4 mx-2 my-8 flex">
                                            <div
                                                className="feature-box rounded-lg box-format shadow-xl p-4 bg-white flex-1 flex flex-col"
                                                data-aos="fade-up"
                                                data-aos-delay="250"
                                                data-aos-offset="220"
                                                data-aos-easing="ease-out-quart"
                                            >
                                                <p
                                                    className="pricing- text-center"
                                                    style={{fontWeight: "bold", color: "#344258"}}
                                                >
                                                    PRO PLAN
                                                </p>
                                                <p className="text-center"> Licence per user 6$</p>
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
                        </div>
                    </div>
                </div>

                {/*language=CSS*/}
                <style jsx>{`
                    .slogan {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        color: #000;
                        transform: translateX(-50%) translateY(-50%);
                        font-size: 20px;
                        text-align: center;
                    }

                    @media screen and (min-width: 600px) {
                        .slogan {
                            font-size: 28px;
                        }
                    }

                    @media screen and (min-width: 1023px) {
                        .slogan {
                            font-size: 40px;
                        }
                    }

                    .header-seaction {
                        width: 100%;
                        min-height: 100vh;
                        background-image: url('/static/homepage.png');
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }

                    .index-heading {
                        color: #344258;
                    }

                    .feature-box {
                        min-width: 250px;
                    }

                    .feature img {
                        display: block;
                        margin: 0 auto;
                        max-height: 120px;
                        margin-bottom: 25px;
                    }

                    .pricing-section {
                    }

                    .index-section {
                        min-height: 100vh;
                        height: auto;
                    }


                `}</style>
            </DefaultLayout>
        );
    }
}

export default Home;
