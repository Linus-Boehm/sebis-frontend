import React, { Component } from "react";
import UserAvatar from "../user/UserAvatar";
import * as CommentActions from "../../../store/actions/comments";
import { connect } from "react-redux";
import TextareaAutosize from "react-autosize-textarea";


class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    const initComment = {
      createdBy: "",
      text: "",
      date: "",
      comment_type: props.commentType
    }
    this.state = {
      isLoading: false,
      comment: { ...initComment },
      initComment
    };

    this.commentTextarea = React.createRef();
  }

  handleOnChange = e => {
    /*this.props.dispatch(
        CommentActions.assignComment({
            text: e.target.value
        })
    );*/
    let state = { ...this.state };
    state.comment.text = e.target.value;
    this.setState(state);

  };

  handleOnSubmit = async e => {
    e.preventDefault();

    if (this.state.comment.text.length === 0) {
      return;
    }
    try {
      this.setState({
        ...this.state,
        isLoading: true
      });

      await this.props.dispatch(
        CommentActions.createComment(
          this.state.comment,
          this.props.relatedTo
        )
      );
      this.setState({
        ...this.state,
        isLoading: false,
        comment: { ...this.state.initComment }
      });
      if (this.commentTextarea.current != null) {
        this.commentTextarea.current.focus();
      }
    } catch (e) {
      console.error(e);
      //TODO add fancy notification
      this.setState({
        isLoading: false,
      });
    }


  };

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleOnSubmit}>
        <label htmlFor={"comment-textarea-" + this.props.relatedTo} className="flex">
          <div className="pr-4">
            <UserAvatar
              user={this.props.currentUser}
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
              value={this.state.comment.text}
              onChange={this.handleOnChange}
            />
          </div>
        </label>
        <div className="flex w-full pt-3">
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
function mapStateToProps(state) {
  const {
    user
  } = state.auth;

  return {
    currentUser: user
  };
}

export default connect(mapStateToProps)(CommentForm);
