import React, {Component} from "react";
import UserAvatar from "../user/UserAvatar";
import moment from "moment";

class FeedItem extends Component {
    render() {
        return (

            <div className={"flex flex-col " + (this.props.className ? this.props.className : '')}>
                <div
                    className="flex"
                    style={{fontSize: 12, color: "#C5C5C5", fontWeight: "bold"}}
                >
                    <p className="ml-auto">{moment(this.props.comment.date).fromNow()}</p>
                </div>
                <div className="flex">
                    <div className="pr-4">
                        <div className="avatar-placeholder"/>
                    </div>
                    <div className="flex-1">
                        <div className="break-all"
                             style={{fontSize: 12, fontWeight: "bold"}}> {this.props.comment.text}</div>
                    </div>
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
