import React, { Component } from "react";
import CommentForm from "./CommentForm";
import UserAvatar from "../../utils/user/UserAvatar";

import "bulma/css/bulma.css";
import * as CommentActions from "../../../store/actions/comments";
import * as UserActions from "../../../store/actions/users";
import { connect } from "react-redux";
import { createComment } from "../../../store/actions/comments";

class CommentBox extends Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ store }) {
    console.log("Init Comment");
    //await store.dispatch(resetComment());
    return {};
  }
  async componentDidMount() {
    await this.props.dispatch(CommentActions.fetchComments());

    return {};
    console.log(this.props);
  }

  render() {
    const commentItems = Object.values(this.props.comments.commentList).map(
      comment => (
        <div key={comment._id}>
          <div className="columns">
            <div className="column is-2">
              <UserAvatar
                user={this.props.auth.user}
                className="cursor-pointer is-s"
              />
            </div>
            <div className="column is-6">
              <div style={{ fontWeight: "bold" }}>
                {this.props.auth.user.firstname} {this.props.auth.user.lastname}
              </div>

              <div> {comment.text}</div>
            </div>
            <div className="column is-6" style={{ fontSize: 10 }}>
              <p> {comment.date}</p>
            </div>
          </div>
        </div>
      )
    );

    return (
      <div className="comment-box">
        {commentItems}
        <div className="columns" />
        <h3 className="blue-title is-size-5">Add a comment</h3>
        <CommentForm />
      </div>
    );
  } // end render
} // end CommentBox component

export default connect(state => state)(CommentBox);
