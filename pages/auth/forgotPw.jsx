import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";
import LoginButton from "../../components/utils/buttons/LoginButton";

class forgotPw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: null,
      isLoading: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({
        error: null,
        isLoading: true
      });
      await this.props.login({
        email: this.state.email
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
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const auth = this.props.auth ? this.props.auth : {};
    return (
      <Layout title="Password Reset" hideSidebar>
        <div className="p-1 pt-5 pb-5">
          <h3 className="title-sign is-3">Password Reset</h3>
        </div>
        <div className="p-1 pt-5">
          <form
            onSubmit={this.handleSubmit}
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

            <div className="field pt-2">
              <p className="control has-text-centered">
                <LoginButton type="submit" loading={this.state.isLoading}>
                  Reset
                </LoginButton>
              </p>
            </div>
          </form>
        </div>
        }
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
)(forgotPw);
