import React, { Component } from "react";
import _JSXStyle from "styled-jsx/style";
import UserAvatar from "../../utils/user/UserAvatar";
import * as CommentActions from "../../../store/actions/comments";
import { connect } from "react-redux";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnChange = e => {
    this.props.dispatch(
      CommentActions.assignComment({
        text: e.target.value
      })
    );
  };
  handleOnSubmit = async e => {
    e.preventDefault();
    try {
      await this.props.dispatch(
        CommentActions.createComment(
          this.props.comments.comment,
          this.props.goals.selectedGoal._id
        )
      );
    } catch (e) {
      console.error(e);
      //TODO add fancy notification
    }
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="columns">
          <div className="column is-2">
            <UserAvatar
              user={this.props.auth.user}
              className="cursor-pointer"
            />
          </div>
          <div className="column is-10 ">
            <textarea
              className="textarea"
              type="text"
              placeholder="Write a comment..."
              rows="2"
              //value={this.props.comments.comment.text}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <div className="flex w-full">
          <button type="submit" className="button is-primary ml-auto ">
            Submit
          </button>
        </div>
      </form>
    );
  } // end render
} // end CommentForm component

export default connect(state => state)(CommentForm);
