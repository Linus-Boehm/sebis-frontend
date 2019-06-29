import Avatar from 'react-avatar';
import React from "react";


class UserAvatar extends React.Component {


    render() {
        const name = this.props.user.firstname + ' ' + this.props.user.lastname;
        //const colors = ['#D6197F','#D6197F']

        return (
            <div>
                <Avatar name={name} round={true} size="45" onClick={this.props.onClick} className={this.props.className}>

                </Avatar>
                {/*language=CSS*/
                }
                <style jsx global>{`

                `}</style>
            </div>
        )

    }

}

export default UserAvatar;
