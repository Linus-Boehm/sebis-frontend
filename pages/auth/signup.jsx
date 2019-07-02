import React from 'react';
import { connect } from 'react-redux';
import Layout from "../../components/layout/DefaultLayout";
import * as actions from '../../store/actions/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        organization_name: ''
      }
    };
    this.onChange = this.onChange.bind(this)
  }

  static getInitialProps(ctx) {
  }

  async handleSubmit(e) {
    e.preventDefault();
    try{
      await this.props.register(this.state.form, 'register');
    }catch (e) {
      console.log(e)
      //TODO add notification
    }




  }
  onChange(e) {
    this.setState({ form:{...this.state.form, [ e.target.name ]: e.target.value }})
  }

  render() {
    return (
      <Layout title="Sign Up" hideSidebar>
        <h3 className="title is-3">Sign Up</h3>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className="container"
          style={{ width: '540px' }}
        >
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
      </Layout>
    );
  }
}

export default connect(
  state => state,
  actions
)(Signup);