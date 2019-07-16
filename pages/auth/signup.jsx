import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        organization_name: ""
      },
      error: null
    };
    this.onChange = this.onChange.bind(this);
  }

  static getInitialProps(ctx) {}

  async handleSubmit(e) {
    e.preventDefault();
    try {
      this.setState({
        error: null
      });
      await this.props.register(this.state.form, "register");
    } catch (e) {
      if (typeof e == "string") {
        this.setState({
          error: e
        });
      }
      console.log(e);
      //TODO add notification
    }
  }
  onChange(e) {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  }

  render() {
    return (
      <Layout title="Sign Up" hideSidebar>
        <h3 className="title-sign is-3">Sign Up</h3>
        <br />
        <br />
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className="container"
          style={{ width: "540px" }}
        >
          {this.state.error && (
            <div className={"message is-danger"}>
              <div className="message-header">
                <p>Error</p>
              </div>
              <div className="message-body">{this.state.error}</div>
            </div>
          )}
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="firstname"
                placeholder="Firstname"
                required
                value={this.state.form.firstname}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="LastName"
                required
                name="lastname"
                value={this.state.form.lastname}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                required
                value={this.state.form.email}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Organization Name"
                name="organization_name"
                required
                value={this.state.form.organization_name}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={this.state.form.password}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                name="confirm_password"
                value={this.state.form.confirm_password}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control has-text-centered">
              <button type="submit" className="button is-success">
                Register
              </button>
            </div>
          </div>
        </form>
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
)(Signup);
