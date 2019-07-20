import React, { Component } from "react";
import CommentForm from "./CommentForm";
import UserAvatar from "../user/UserAvatar";

import { connect } from "react-redux";
import { filter, orderBy } from "lodash";
import moment from "moment";
import CommentItem from "./CommentItem";
import FeedItem from "./FeedItem";

//var moment = require("moment");

class CommentBox extends Component {
  constructor(props) {
    super(props);
  }

  displayUser(user_id) {
    let user = this.props.users.userList[ user_id ];
    if (!!user) {
      return user.firstname + " " + user.lastname;
    }
    return "Unknown User";
  }

  filterCommentsByRelatedId(commentTypes = []) {
    return orderBy(
      filter(this.props.comments.commentList, comment => {
        return (
          comment.related_to === this.props.relatedTo &&
          commentTypes.indexOf(comment.comment_type) >= 0
        );
      }),
      [ "date" ],
      [ "desc" ]
    );
  }

  render() {
    let commentTypes = this.props.comment_types;
    if (
      !commentTypes ||
      !Array.isArray(commentTypes) ||
      commentTypes.length === 0
    ) {
      commentTypes = [ "comment", "feed_comment", "" ]; //to avoid breaking changes
    }
    const commentItems = this.filterCommentsByRelatedId(commentTypes).map(
      (comment) => {
        if (comment.comment_type === 'comment') {
          return (<CommentItem
            key={comment._id}
            user={this.props.users.userList[ comment.created_by ]}
            comment={comment}
            className="my-2"
          />)
        } else if (comment.comment_type === 'feed_comment') {
          return (<FeedItem
            key={comment._id}
            comment={comment}
            className="pb-1"
          />)
        } else {
          return null
        }
      }
    );

    return (
      <div className="comment-box">
        {commentItems.length > 0 && (
          <h3 className="blue-title goal-info-subheader">
            <label htmlFor="comment-textarea">
              {this.props.feedTitle ? this.props.feedTitle : "Feed"}
            </label>
          </h3>
        )}
        <div style={{ maxHeight: "300px" }} className="overflow-y-scroll">
          <div className="flex flex-col my-4">{commentItems}</div>
        </div>
        <div className="columns"/>
        <h3 className="blue-title goal-info-subheader hide-print">
          <label htmlFor={"comment-textarea-" + this.props.relatedTo}>
            Add a comment
          </label>
        </h3>
        <CommentForm
          commentType={commentTypes[ 0 ]}
          className="px-1 hide-print"
          relatedTo={this.props.relatedTo}
        />
      </div>
    );
  } // end render
} // end CommentBox component

export default connect(state => state)(CommentBox);
