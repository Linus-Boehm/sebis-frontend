import "../../assets/css/tailwind.css";
import "../../assets/css/bulma.scss";
import "../../assets/css/forms.scss";
import "../../assets/css/goal-info.scss";
import "../../assets/css/day-picker.scss";
import "../../assets/css/progress-info.scss";
import "react-datepicker/dist/react-datepicker.css";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Link from "next/link";
import { connect } from "react-redux";
import React from "react";
import Router from "next/router";
import * as actions from "../../store/actions/auth";
import { fetchTeams } from "../../store/actions/teams";
import { fetchUsers } from "../../store/actions/users";
import MenuSidebar from "./MenuSIdebar";
import UserAvatar from "../utils/user/UserAvatar";
import { logout } from "../../store/actions/auth";
import ActiveLink from "./ActiveLink";
import uuidv4 from "uuid/v4";
import * as AgreementActions from "../../store/actions/agreements";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
  }

  logOut = async e => {
    e.preventDefault();
    await this.props.dispatch(logout());
    //Router.push("/auth/signin")
  };

  async componentDidMount() {
    if (!(await this.props.dispatch(actions.isAutheticated()))) {
      if (this.props.forceAuth) {
        Router.push("/auth/signin");
      }
    } else {
      //Dispatch this store actions if user is logged in
      //this.props.dispatch()
      this.props.dispatch(fetchTeams());
      this.props.dispatch(fetchUsers());
    }
  }
  onCreateAgreement = async () => {
    const _id = uuidv4();

    const agreement = {
      _id,
      reviewer: this.props.auth.user._id
    };

    await this.props.dispatch(AgreementActions.createAgreement(agreement));
    Router.push(`/app/agreement-info?id=${_id}`);
  };

  renderHeader = () => (
    <header>
      <nav
        className="navbar border-b-2 border-gray-200"
        role="navigation"
        aria-label="main navigation"
      >
        {!this.props.auth.isAuthenticated ? (
          <div className="navbar-brand" href={"/"}>
            <a className="navbar-item">
              <img src="/static/logo.png" width="35" />
            </a>
            <a className="navbar-item" href={"/"}>
              <img
                src="/static/logo_name.png"
                width="80"
                style={{ marginLeft: "-20px" }}
              />
            </a>

            <a
              id="burger"
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarmenu"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="navbar-brand" href={"/app/dashboard"}>
            <a className="navbar-item">
              <img src="/static/logo.png" width="35" />
            </a>
            <a className="navbar-item" href={"/app/dashboard"}>
              <img
                src="/static/logo_name.png"
                width="80"
                style={{ marginLeft: "-20px" }}
              />
            </a>

            <a
              id="burger"
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarmenu"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
        )}

        <div
          id="navbarmenu"
          className="navbar-menu"
          style={{ marginLeft: "60px" }}
        >
          {!this.props.auth.isAuthenticated ? (
            <div className="navbar-start" />
          ) : (
            <div className="navbar-start">
              <ActiveLink
                activeClassName="is-tab is-active"
                href={"/app/dashboard"}
              >
                <a className="navbar-item">My Goals</a>
              </ActiveLink>
              <div className="ml-6 mt-2">
                <button
                  className="button is-primary is-small "
                  style={{ marginTop: "7%" }}
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
                  <Link prefetch href="/auth/signup">
                    <a className="button is-primary">Sign Up</a>
                  </Link>
                  <Link prefetch href="/auth/signin">
                    <a className="button is-link">Sign In</a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  <div className="pl-12">
                    <UserAvatar
                      user={this.props.auth.user}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <div className="navbar-dropdown">
                  <span className="navbar-item">
                    Hi {this.props.auth.user.firstname}
                  </span>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">My Account</a>
                  <hr className="navbar-divider" />
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

  render() {
    return (
      <div className="main-wrapper w-full">
        {this.renderHeader()}
        <section
          className={
            "main-content columns" +
            (this.props.mainContentClasses || "")
          }
        >
          {this.props.auth.isAuthenticated && !this.props.hideSidebar && (
            <MenuSidebar />
          )}
          <div className="column">
            {this.props.children}
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <span> © 2019 Goalify i. G.</span>
          </div>
        </footer>
        <ReactNotification ref={this.notificationDOMRef} />
        <style jsx global>{`
          html,
          body,
          #__next,
          .main-wrapper {
            min-height: 100vh;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(state => state)(DefaultLayout);
