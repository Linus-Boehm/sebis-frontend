import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";
import SingupButton from "../../components/utils/buttons/SingupButton";
import {resetPassword} from "../../services/BackendApi/routes/auth";
import {logout} from "../../store/actions/auth";
import {LOGOUT} from "../../store/types/auth";
import Router from "next/dist/client/router";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        password: "",
        confirm_password: ""
      },
      error: ""
    };
  }

  static getInitialProps({query}) {
    return {token: query.token}
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.form.password !== this.state.form.confirm_password) {
        this.setState({
          ...this.state,
          error: "Passwords do not match"
        });
        return;
      }

      console.log(this.state);

      this.setState({
        error: null,
        isLoading: true
      });
      //await this.props.dispatch({ type: LOGOUT, payload: null });


      await resetPassword({password: this.state.form.password, token: this.props.token});
      Router.push("/auth/signin?reset=true");
    } catch (e) {
      this.setState({
        ...this.state,
        error: "Token not valid"
      });
      console.log(e);
      //TODO add notification
    }finally {
      this.setState({
        ...this.state,
        isLoading: false
      });
    }


  }

  onChange = e => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  render() {
    return (
      <Layout title="Sign Up" hideSidebar>
        <div className="p-1 pt-5 pb-5">
          <h3 className="title-sign is-3">Reset password</h3>
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
                  Reset
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
