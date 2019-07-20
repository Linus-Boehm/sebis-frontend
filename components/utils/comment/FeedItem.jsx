import React, { Component } from "react";
import UserAvatar from "../user/UserAvatar";
import moment from "moment";

class FeedItem extends Component {
  render() {
    return (

      <div className={"flex " + (this.props.className ? this.props.className : '')}>
        <div className="pr-4">
          <div className="avatar-placeholder"/>
        </div>
        <div className="flex-1">
          <div className="break-all"> {this.props.comment.text}</div>
        </div>
        <div
          className="flex"
          style={{ fontSize: 12, color: "#C5C5C5", fontWeight: "bold" }}
        >
          <p>{moment(this.props.comment.date).fromNow()}</p>
        </div>
        {/*language=CSS*/
        }
        <style jsx>{`
            .avatar-placeholder {
                width: 45px;
            }
        `}</style>
      </div>
    );


  }
}

export default FeedItem;
