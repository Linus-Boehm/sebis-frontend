import React, { Component } from "react";
import CommentForm from "./CommentForm";
import UserAvatar from "../user/UserAvatar";

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
    return "Unknown User";
  }

  filterCommentsByRelatedId(commentTypes = []) {

    return orderBy(
      filter(this.props.comments.commentList, comment => {
        return comment.related_to == this.props.relatedTo && commentTypes.indexOf(comment.comment_type) >= 0;
      }),
      ["date"],
      ["desc"]
    );
  }

  render() {
    let commentTypes =  this.props.commentTypes
    if(!commentTypes || !Array.isArray(commentTypes) || commentTypes.length == 0){
      commentTypes = ["comment",""] //to avoid breaking change
    }
    const commentItems = this.filterCommentsByRelatedId(commentTypes).map(comment => (
      <div key={comment._id}>
        <div className="flex">
          <div className="pr-2">
            <UserAvatar
              user={this.props.users.userList[comment.created_by]}
              className="cursor-pointer is-s"
            />
          </div>
          <div className="flex-1 ">
            <div style={{ fontWeight: "bold" }}>
              {this.displayUser(comment.created_by)}
            </div>

            <div className="break-all"> {comment.text}</div>
          </div>
          <div
            className="flex"
            style={{ fontSize: 12, color: "#C5C5C5", fontWeight: "bold" }}
          >
            <p>{moment(comment.date).fromNow()}</p>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="comment-box">
        {this.filterCommentsByRelatedId().length > 0 && (
          <h3 className="blue-title goal-info-subheader">
            <label htmlFor="comment-textarea">Feed</label>
          </h3>
        )}
        {commentItems}
        <div className="columns" />
        <h3 className="blue-title goal-info-subheader">
          <label htmlFor={"comment-textarea-" + this.props.relatedTo}>
            Add a comment
          </label>
        </h3>
        <CommentForm commentType={commentTypes[0]} className="pl-1 pr-1" relatedTo={this.props.relatedTo} />
      </div>
    );
  } // end render
} // end CommentBox component

export default connect(state => state)(CommentBox);
