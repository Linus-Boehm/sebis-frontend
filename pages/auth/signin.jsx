import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static async getInitialProps({ store, req }) {}

  async handleSubmit(e) {
    e.preventDefault();
    try {
      this.setState({
        error: null
      });
      await this.props.login({
        email: this.state.email,
        password: this.state.password
      });
    } catch (e) {
      if(typeof e == "string") {
        this.setState({
          error: e
        })
      }
      console.error(e);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Layout title="Sign In" mainContentClasses='bg-image' hideSidebar>
        <h3 className="title is-3">Sign In</h3>
        <form
          onSubmit={this.handleSubmit}
          className="container"
          style={{ width: "540px" }}
        >
          { this.state.error && <div className={"message is-danger"}>
            <div className="message-header">
              <p>Error</p>
            </div>
            <div className="message-body">
              {this.state.error}
            </div>

          </div>
          }
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
          </div>

          <div className="field">
            <p className="control has-text-centered">
              <button type="submit" className="button is-success">
                Login
              </button>
            </p>
          </div>
        </form>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  actions
)(Signup);
