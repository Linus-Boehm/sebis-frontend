import React from "react";
import {connect} from "react-redux";
import Layout from "../../components/layout/DefaultLayout";
import * as authApi from "../../services/BackendApi/routes/auth";
import SingupButton from "../../components/utils/buttons/SingupButton";
import Router from "next/router";
import ActiveLink from "../../components/layout/ActiveLink";

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: true
        };
    }

    static getInitialProps({query}) {
        if (!query.token) {
            Router.push("/auth/signin");
        }

        return {token: query.token}
    }

    async componentDidMount() {
        try {
            await authApi.confirm({token: this.props.token})
            this.setState({
                ...this.state,
                loading: false
            })
        } catch (e) {
            this.setState({
                ...this.state,
                error: true
            })
        }
    }

    renderMessage = () => {
        if (this.state.error) {
            return (
                <article className="message is-danger">
                    <div className="message-body">
                        Token is outdated/not valid, please try to login to receive a new Token
                    </div>
                </article>
            )
        }
        return (<div>
            <article className="message is-info">
                <div className="message-body">
                    Your Account is now confirmed!
                </div>
            </article>
            <ActiveLink href={"/auth/signin"}>
                <a className="button is-success mt-4">Sign In</a>
            </ActiveLink>
        </div>)
    }

    render() {
        return (
            <Layout hideSidebar>
                <div className="container">

                    <div className="p-1 pt-5 pb-5">
                        <h3 className="title-sign is-3">Confirm Sign Up</h3>
                    </div>
                    <div className="p-1 pt-5">
                        {!this.state.loading && this.renderMessage()}
                    </div>
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

export default Confirm;
