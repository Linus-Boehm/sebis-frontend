import React from 'react';
import { connect } from 'react-redux';
import Layout from "../../components/layout/DefaultLayout";
import actions from '../../store/actions';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password: '',
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static getInitialProps(ctx) {

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);

    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <Layout title="Sign Up">
                <h3 className="title is-3">Sign Up</h3>
                <form
                    onSubmit={this.handleSubmit}
                    className="container"
                    style={{ width: '540px' }}
                >

                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={this.state.email_id}
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