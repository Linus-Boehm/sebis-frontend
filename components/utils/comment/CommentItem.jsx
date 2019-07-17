import React, { Component } from "react";
import UserAvatar from "../user/UserAvatar";
import moment from "moment";

class CommentItem extends Component {




    displayUser(user) {
        if (!!user) {
            return user.firstname + " " + user.lastname;
        }
        return "Unknown User";
    }



    render() {
        const user = this.props.user
        return (

                <div className={"flex "+(this.props.className?this.props.className:'')}>
                    <div className="pr-2">
                        <UserAvatar
                            user={user}
                            className="cursor-pointer is-s"
                        />
                    </div>
                    <div className="flex-1 ">
                        <div style={{ fontWeight: "bold" }}>
                            {this.displayUser(user)}
                        </div>

                        <div className="break-all"> {this.props.comment.text}</div>
                    </div>
                    <div
                        className="flex"
                        style={{ fontSize: 12, color: "#C5C5C5", fontWeight: "bold" }}
                    >
                        <p>{moment(this.props.comment.date).fromNow()}</p>
                    </div>
                </div>
        );


    }
}

export default CommentItem;
