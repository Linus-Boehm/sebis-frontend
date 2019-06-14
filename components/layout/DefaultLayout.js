import '../../assets/css/bulma.scss';
import '../../assets/css/tailwind.css';
import Link from 'next/link'
import {connect} from "react-redux";
import React from "react";
import Router from 'next/router';
import * as actions from "../../store/actions/auth";
import {fetchTeams} from "../../store/actions/teams";

class DefaultLayout extends React.Component{
  async componentDidMount() {
    if(this.props.forceAuth && !await this.props.isAutheticated("")){
        Router.push("/auth/signin")
    }

    return {};
  }
  toggleStyles(e) {
    //document.querySelector('#burger').classList.toggle('is-active')
    //document.querySelector('#navbarmenu').classList.toggle('is-active')
  }
  render() {
    return (
        <div>
          <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <a className="navbar-item">
                  <img src="/static/logo.png"/>
                </a>
                <a id="burger" onClick={this.toggleStyles()}
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
                <div className="navbar-end">
                  <div className="navbar-item">
                    {
                      !this.props.auth.isAuthenticated?(
                          <div className="buttons">
                            <Link prefetch href="/auth/signup">
                              <a className="button is-primary">Sign Up</a>
                            </Link>
                            <Link prefetch href="/auth/signin">
                              <a className="button is-link">Sign In</a>
                            </Link>
                          </div>
                      ): (
                          <div className="buttons">
                            <Link prefetch href="/app/dashboard">
                              <a className="button is-primary">Hi {this.props.auth.user.firstname}</a>
                            </Link>
                            <a onClick={this.props.logout} className="button is-warning">Logout</a>
                          </div>
                      )
                    }

                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div className="section">
            {this.props.children}
          </div>
          <footer className="footer">
            <div className="content has-text-centered">
              <span> I'm the footer</span>
            </div>
          </footer>
        </div>
    );
  }

}
export default connect(state => state,actions)(DefaultLayout);
