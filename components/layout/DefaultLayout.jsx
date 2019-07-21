import "../../assets/css/tailwind.css";
import "../../assets/css/bulma.scss";
import "../../assets/css/forms.scss";
import "../../assets/css/print.scss";

//TODO move into the pages/components as import or into the styled jsx section to avoid conflicts
import "../../assets/css/goal-info.scss";
import "../../assets/css/day-picker.scss";
import "../../assets/css/progress-info.scss";
import "../../assets/css/goal-item.scss";

import "../../assets/css/sidebar.scss";
import "react-datepicker/dist/react-datepicker.css";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Link from "next/link";
import {connect} from "react-redux";
import React from "react";
import Router from "next/router";
import * as actions from "../../store/actions/auth";
import {fetchTeams} from "../../store/actions/teams";
import {fetchUsers} from "../../store/actions/users";
import MenuSidebar from "./MenuSIdebar";
import UserAvatar from "../utils/user/UserAvatar";
import {logout} from "../../store/actions/auth";
import ActiveLink from "./ActiveLink";
import uuidv4 from "uuid/v4";
import * as AgreementActions from "../../store/actions/agreements";
import LoadingIcon from "mdi-react/LoadingIcon";
import Head from 'next/head';

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
        this.state = {
            sideBarToggled: false
        };
    }

    logOut = async e => {
        e.preventDefault();
        await this.props.dispatch(logout());
        //Router.push("/auth/signin")
    };

    fetchData = async () => {
        //These should not cause a fail if there are network issues
        try {
            await this.props.dispatch(fetchUsers());
            await this.props.dispatch(fetchTeams());
        } catch (e) {
        }
    };

    async componentDidMount() {
        if (!(await this.props.dispatch(actions.isAutheticated()))) {
            if (this.props.forceAuth) {
                Router.push("/auth/signin");
            }
        } else {
            //Dispatch this store actions if user is logged in

            this.fetchData();
            // fetch Teams and users every 5 seconds In order to get Updates
            // - if someone was added/removed from team
            // - User's name has changed
            this.interval = setInterval(() => {
                this.fetchData();
            }, 10000);
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    toggleSidebar = () => {
        this.setState({
            sideBarToggled: !this.state.sideBarToggled
        });
    };

    onCreateAgreement = async () => {
        const _id = uuidv4();

        const agreement = {
            _id,
            reviewer: this.props.auth.user._id
        };

        await this.props.dispatch(AgreementActions.createAgreement(agreement));
        Router.push(`/app/agreement-info?id=${_id}`);
    };

    renderHeader = () => {
        let logoUrl = !this.props.auth.isAuthenticated ? "/" : "/app/dashboard";
        return (
            <header className="hide-print">
                <nav
                    className="navbar border-b-2 border-gray-200"
                    role="navigation"
                    aria-label="main navigation"
                >
                    <div className="navbar-brand">
                        <a className="navbar-item ml-4" href={logoUrl}>
                            <img src="/static/goalify_final.png" className={"h-full"}/>

                        </a>

                        <a
                            id="burger"
                            role="button"
                            className="navbar-burger burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarmenu"
                            onClick={this.toggleSidebar}
                        >
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                        </a>
                    </div>

                    <div
                        id="navbarmenu"
                        className="navbar-menu"
                    >
                        {this.props.auth.isAuthenticated && (
                            <div className="navbar-start">
                                <ActiveLink
                                    activeClassName="is-tab is-active my-goals-item"
                                    href={"/app/dashboard"}
                                >
                                    <a className="navbar-item ">My Goals</a>
                                </ActiveLink>
                                <div className="ml-6 mt-1">
                                    <button
                                        className="button is-primary is-small "
                                        style={{marginTop: "7%"}}
                                        onClick={this.onCreateAgreement}
                                    >
                                        <span className="pl-1"> Create Agreement</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="navbar-end pr-4">
                            {!this.props.auth.isAuthenticated ? (
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <Link prefetch href={"/auth/signup"}>
                                            <a className="button is-primary">Sign Up</a>
                                        </Link>
                                        <Link prefetch href={"/auth/signin"}>
                                            <a className="button is-link">Sign In</a>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <div className="navbar-link">
                                        <div className="pl-12">
                                            <UserAvatar
                                                size={35}
                                                user={this.props.auth.user}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="navbar-dropdown">
                    <span className="navbar-item">
                      Hi {this.props.auth.user.firstname} {this.props.auth.user.lastname}
                    </span>
                                        <hr className="navbar-divider"/>
                                        <a
                                            className="navbar-item has-text-danger"
                                            onClick={this.logOut}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        );
    };

    render() {
        return (
            <div className={"main-wrapper w-full " + (this.props.className ? this.props.className : "")}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
                </Head>
                {this.renderHeader()}
                {(this.props.auth.isAuthenticated || !this.props.forceAuth) && (
                    <div
                        className={
                            "main-content flex w-full h-full pt-0 relative items-stretch " +
                            (this.props.mainContentClasses || "")
                        }
                    >
                        {this.props.auth.isAuthenticated && !this.props.hideSidebar && (
                            <MenuSidebar sideBarToggled={this.state.sideBarToggled}/>
                        )}
                        <div className="flex flex-col flex-1 mx-4">{this.props.children}</div>
                    </div>
                )}
                {!this.props.auth.isAuthenticated && this.props.forceAuth && (
                    <div>
                        <div className="message m-4 is-dark">
                            <div className="message-header">
                                <p>Loading...</p>
                            </div>
                            <div className="message-body">
                                <p>
                                    <LoadingIcon className="spinner float-left" size="1em"/> The
                                    application is loading...
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <footer className="footer hide-print">
                    <div className="content has-text-centered">
                        <span> © 2019 Goalify i. G.</span>
                    </div>
                </footer>
                <ReactNotification ref={this.notificationDOMRef}/>

                {/*language=CSS*/}

                <style jsx global>{`
                    .my-goals-item {
                        visibility: hidden;
                    }

                    .homepage .my-goals-item {
                        visibility: visible;
                    }

                    .homepage .burger {
                        visibility: hidden;
                    }

                    html,
                    body,
                    #__next,
                    .main-wrapper {
                        min-height: 100vh;
                    }

                    .main-content {
                        min-height: 80vh;
                    }
                `}</style>
            </div>
        );
    }
}

export default connect(state => state)(DefaultLayout);
