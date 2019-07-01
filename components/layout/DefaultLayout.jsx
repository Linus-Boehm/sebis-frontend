import '../../assets/css/tailwind.css';
import '../../assets/css/bulma.scss';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Link from 'next/link'
import { connect } from "react-redux";
import React from "react";
import Router from 'next/router';
import * as actions from "../../store/actions/auth";
import { fetchTeams } from "../../store/actions/teams";
import MenuSidebar from "./MenuSIdebar";
import UserAvatar from "../utils/user/UserAvatar";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: [ "animated", "fadeIn" ],
      animationOut: [ "animated", "fadeOut" ],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  async componentDidMount() {
    if (!await this.props.dispatch(actions.isAutheticated())) {
      if (this.props.forceAuth) {
        Router.push("/auth/signin")
      }
    } else {
      //Dispatch this store actions if user is logged in
      //this.props.dispatch()

    }
  }

  renderHeader = () => (
    <header>
      <nav className="navbar border-b-2 border-gray-200" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="/static/logo.svg"/>
          </a>
          <a id="burger"
             role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
             data-target="navbarmenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarmenu" className="navbar-menu">
          <div className="navbar-start">
            <Link prefetch href="/">
              <a className="navbar-item">Home</a>
            </Link>
            <Link prefetch href="/teams">
              <a className="navbar-item">Teams</a>
            </Link>
          </div>
          <div className="navbar-end pr-4">
            {
              !this.props.auth.isAuthenticated ? (
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
                      <UserAvatar user={this.props.auth.user}
                                  className="cursor-pointer"/>
                    </div>
                  </div>

                  <div className="navbar-dropdown">
                    <span className="navbar-item">
                        Hi {this.props.auth.user.firstname}
                    </span>
                    <hr className="navbar-divider"/>
                    <a className="navbar-item">
                      My Account
                    </a>
                    <hr className="navbar-divider"/>
                    <a className="navbar-item has-text-danger" onClick={this.props.logout}>
                      Logout
                    </a>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </nav>
    </header>
  )

  render() {
    return (
      <div className="main-wrapper flex flex-col">
        {this.renderHeader()}
        <section className="main-content columns flex-1">
          {
            this.props.auth.isAuthenticated && !this.props.hideSidebar &&
            <MenuSidebar/>
          }
          <div className="column section">

            {this.props.children}
          </div>

        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <span> I'm the footer</span>
            <button onClick={this.addNotification} className="btn btn-primary">
              Add Awesome Notification
            </button>
          </div>
        </footer>
        <ReactNotification ref={this.notificationDOMRef}/>
        <style jsx global>{`
                  html, body, #__next, .main-wrapper {
                    min-height: 100vh;
                  }
                `}</style>
      </div>
    );
  }

}

export default connect(state => state)(DefaultLayout);
