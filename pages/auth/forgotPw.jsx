import React from "react";
import {connect} from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as actions from "../../store/actions/auth";
import LoginButton from "../../components/utils/buttons/LoginButton";
import {requestPasswordResetLink} from "../../services/BackendApi/routes/auth";

class forgotPw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            sended: false,
            isLoading: false
        };
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({...this.state, isLoading: true});
        try {
            await requestPasswordResetLink({email: this.state.email})
            this.setState({...this.state, sended: true});
        } catch (e) {
            console.error(e)
            if (typeof e == "string") {
                this.setState({
                        ...this.state,
                        error: e
                    }
                );
            }

        } finally {
            this.setState({...this.state, isLoading: false});
        }
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const auth = this.props.auth ? this.props.auth : {};
        return (
            <Layout title="Password Reset" hideSidebar>
                <div className="container">
                    <div className="content">
                        <div className="p-1 mt-8 pt-5 pb-4 text-center">
                            <h3 className="title-sign is-3">Password Reset</h3>
                        </div>
                        <div className="p-1 pt-5">
                            <form
                                onSubmit={this.handleSubmit}
                                className="container"
                                style={{width: "540px"}}
                            >
                                {this.state.sended && (
                                    <article className="message is-info">
                                        <div className="message-body">
                                            We have sent an email to {this.state.email} with instructions on how to
                                            reset your
                                            password.
                                        </div>
                                    </article>
                                )}
                                {this.state.error && (
                                    <article className="message is-info">
                                        <div className="message-body">
                                            {error}
                                        </div>
                                    </article>
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
                    </div>
                </div>
                <style jsx>
                    {`
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
