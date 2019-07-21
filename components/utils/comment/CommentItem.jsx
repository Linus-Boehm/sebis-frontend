import React, {Component} from "react";
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

            <div className={"flex " + (this.props.className ? this.props.className : '')}>
                <div className="pr-4">
                    <UserAvatar
                        user={user}
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex ">
                        <div style={{fontWeight: "bold"}}>
                            {this.displayUser(user)}
                        </div>
                        <div
                            className="flex ml-auto pt-1"
                            style={{fontSize: 12, color: "#C5C5C5", fontWeight: "bold"}}
                        >

                                <p>{moment(this.props.comment.date).fromNow()}</p>

                        </div>

                    </div>

                    <div className=""> {this.props.comment.text}</div>

                </div>

            </div>
        );


    }
}

export default CommentItem;
