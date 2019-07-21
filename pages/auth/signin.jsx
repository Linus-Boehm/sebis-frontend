import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";
import LoginButton from "../../components/utils/buttons/LoginButton";
import Router from "next/router";
import Link from "next/link";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      isLoading: false
    };
  }

  static async getInitialProps({ store, query }) {
    return {reset: !!query.reset}
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({
        error: null,
        isLoading: true
      });
      await this.props.login({
        email: this.state.email,
        password: this.state.password
      });
    } catch (e) {
      if (typeof e == "string") {
        this.setState({
          error: e
        });
      }
      console.error(e);
    }

    this.setState({
      isLoading: false
    });
  };

  onChange = e => {
    this.setState({ [ e.target.name ]: e.target.value });
  };

  render() {
    const auth = this.props.auth ? this.props.auth : {};
    if (auth.token) {
      Router.push("/app/dashboard");
    }

    return (
      <Layout title="Sign In" hideSidebar>
        <div className="p-1 pt-5 pb-5">
          <h3 className="text-center title-sign is-3">Sign In</h3>
        </div>
        {!auth.token && (
          <div className="p-1 pt-5">
            <form
              onSubmit={this.handleSubmit}
              className="container"
              style={{ maxWidth: "540px" }}
            >
              {this.props.reset && (
                  <article className="message is-info">
                    <div className="message-body">
                      Password reset was successful
                    </div>
                  </article>
              )}
              {this.state.error && (
                <div className={"message is-danger"}>
                  <div className="message-header">
                    <p>Error</p>
                  </div>
                  <div className="message-body">{this.state.error}</div>
                </div>
              )}
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </p>
                <Link prefetch href={"/auth/forgotPw"}>
                  <a className="is-link">Forgot password</a>
                </Link>
              </div>

              <div className="field pt-2">
                <p className="control has-text-centered">
                  <LoginButton type="submit" loading={this.state.isLoading}>
                    Login
                  </LoginButton>
                </p>
              </div>
            </form>
          </div>
        )}
        {auth.token && (
          <div>
            <div className="message m-4 is-success">
              <div className="message-header">
                <p>Logged in</p>
              </div>
              <div className="message-body">
                You're redirected to the dashboard...
              </div>
            </div>
          </div>
        )}
        <style jsx>
          {`
            .title-sign {
              font-size: 50px;
              font-weight: bold;
              text-align: center;
              color: #465775;
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  actions
)(Signin);
