import React, { Component } from "react";
import _JSXStyle from "styled-jsx/style";
import UserAvatar from "../../utils/user/UserAvatar";
import * as CommentActions from "../../../store/actions/comments";
import { connect } from "react-redux";
import TextareaAutosize from "react-autosize-textarea";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.commentTextarea = React.createRef();
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
      this.setState({
        isLoading: true
      });

      await this.props.dispatch(
        CommentActions.createComment(
          this.props.comments.comment,
          this.props.relatedTo
        )
      );
    } catch (e) {
      console.error(e);
      //TODO add fancy notification
    }
    this.setState({
      isLoading: false
    });

    if (this.commentTextarea.current != null) {
      this.commentTextarea.current.focus();
    }
  };

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleOnSubmit}>
        <label htmlFor={"comment-textarea-" + this.props.relatedTo} className="flex">
          <div className="pr-2">
            <UserAvatar
              user={this.props.auth.user}
              className="cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <TextareaAutosize
              disabled={this.state.isLoading}
              className="textarea"
              type="text"
              placeholder="Write a comment..."
              rows={2}
              ref={this.commentTextarea}
              id={"comment-textarea-" + this.props.relatedTo}
              value={this.props.comments.comment.text}
              onChange={this.handleOnChange}
            />
          </div>
        </label>
        <div className="flex w-full pt-2">
          <button
            disabled={this.state.isLoading}
            type="submit"
            className="button is-primary ml-auto "
          >
            Submit
          </button>
        </div>
      </form>
    );
  } // end render
} // end CommentForm component

export default connect(state => state)(CommentForm);
