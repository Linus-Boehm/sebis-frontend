import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";
import SingupButton from "../../components/utils/buttons/SingupButton";

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
  }

  static getInitialProps(ctx) {
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.form.password !== this.state.form.confirm_password) {
        throw 'Passwords do not match'
      }

      console.log(this.state);

      this.setState({
        error: null,
        isLoading: true
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

    this.setState({
      isLoading: false
    });
  }

  onChange = (e) => {
    this.setState({
      form: { ...this.state.form, [ e.target.name ]: e.target.value }
    });
  }

  render() {
    return (
      <Layout title="Sign Up" hideSidebar>
        <div className="p-1 pt-5 pb-5">
          <h3 className="title-sign is-3">Sign Up</h3>
        </div>
        <div className="p-1 pt-5">
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
                  placeholder="Confirm Password"
                  required
                  name="confirm_password"
                  value={this.state.form.confirm_password}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="field pt-2">
              <div className="control has-text-centered">
                <SingupButton type="submit" loading={this.state.isLoading}>
                  Register
                </SingupButton>
              </div>
            </div>
          </form>
        </div>
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
