import React, { Component } from "react";
import CommentForm from "./CommentForm";
import UserAvatar from "../../utils/user/UserAvatar";

import { connect } from "react-redux";
import { filter, orderBy } from "lodash";
import moment from "moment";

//var moment = require("moment");

class CommentBox extends Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ store }) {
    console.log("Init Comment");
    //await store.dispatch(resetComment());
    return {};
  }
  displayUser(user_id) {
    let user = this.props.users.userList[user_id];
    if (!!user) {
      return user.firstname + " " + user.lastname;
    }
    return "Unbekannter Nutzer";
  }

  filterCommentsByRelatedId() {
    return orderBy(
      filter(this.props.comments.commentList, comment => {
        return comment.related_to == this.props.relatedTo;
      }),
      ["date"],
      ["desc"]
    );
  }
  render() {
    const commentItems = this.filterCommentsByRelatedId().map(comment => (
      <div key={comment._id}>
        <div className="columns p-1">
          <div className="column is-2">
            <UserAvatar
              user={this.props.users.userList[comment.created_by]}
              className="cursor-pointer is-s"
            />
          </div>
          <div className="column is-6">
            <div style={{ fontWeight: "bold" }}>
              {this.displayUser(comment.created_by)}
            </div>

            <div> {comment.text}</div>
          </div>
          <div
            className="column is-6"
            style={{ fontSize: 12, color: "#C5C5C5", fontWeight: "bold" }}
          >
            <p>{moment(comment.date).fromNow()}</p>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="comment-box">
        <h3 className="blue-title goal-info-subheader"><label htmlFor="comment-textarea">Feed</label></h3>
        {commentItems}
        <div className="columns" />
        <h3 className="blue-title goal-info-subheader"><label for="comment-textarea">Add a comment</label></h3>
        <CommentForm className="p-1" />
      </div>
    );
  } // end render
} // end CommentBox component

export default connect(state => state)(CommentBox);
