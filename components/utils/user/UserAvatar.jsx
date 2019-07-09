import Avatar from 'react-avatar';
import React from "react";


class UserAvatar extends React.Component {


  render() {
    const classNames = require('classnames');

    const name = this.props.user ? this.props.user.firstname + ' ' + this.props.user.lastname : "";
    //const colors = ['#D6197F','#D6197F']

    return (
      <div className={classNames(this.props.className, "inline-block")}>
        <div className="inline-block relative">
          <Avatar name={name} value={" "} round={true} size="45" onClick={this.props.onClick}>

          </Avatar>
          <div className="text-white margin-center absolute flex left-0 top-0 bottom-0 right-0">
            <div className="content-center justify-center m-auto">
              {
                this.props.children
              }
            </div>
          </div>
        </div>
        {/*language=CSS*/
        }
        <style jsx global>{`

        `}</style>
      </div>
    )

  }

}

export default UserAvatar;
