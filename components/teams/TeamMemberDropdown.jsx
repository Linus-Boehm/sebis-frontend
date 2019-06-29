import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../store/actions/teams";
import UserAvatar from "../utils/user/UserAvatar";

class TeamMemberDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggled: true
        }
    }

    toggleDropdown = (e) => {
        //e.preventDefault()
        this.setState({
            ...this.state,
            isToggled: !this.state.isToggled
        })

    }

    getDropDownClass() {
        return 'team-member-dropdown z-50 absolute ' + (this.state.isToggled ? 'hidden' : 'show')
    }

    render() {
        const teamMemberList = this.props.users?this.props.users.map(user => (
            <div className="flex justify-between">
                <UserAvatar user={user}/>
                <span>{user.firstname} {user.lastname}</span>
                <a className="delete"></a>
            </div>
        )): (<span>No Users in Team</span>)
        return <div className="dropdown-wrapper relative" onClick={this.props.onClick}>
            <div className="dropdown-trigger" onClick={this.toggleDropdown}>
                {this.props.children}
            </div>
            <div className={this.getDropDownClass()}>
                <div className="team-member-dropdown-inner bg-white p-4 rounded-lg shadow-md relative">
                    <div className="flex flex-col">
                        <h4>Members</h4>
                        {teamMemberList}
                        <button className="button is-link mt-4">Invite</button>
                    </div>
                </div>


            </div>
            {/*language=CSS*/
            }
            <style jsx>{
                    `
                    .team-member-dropdown-inner {
                        z-index: 40;
                        min-width: 280px;
                    }

                    .team-member-dropdown {
                        left: 50%;
                        transform: translateX(-50%);
                        margin-top: 8px;
                    }

                    .team-member-dropdown::before {
                        display: none;
                        position: absolute;
                        z-index: 5;
                        content: '';
                        top: 0%;
                        right: 50%;
                        background-color: #fff;
                        width: 15px;
                        height: 15px;

                        -webkit-transform: translateY(-50%) translateX(50%) rotate(-45deg);
                        transform: translateY(-50%) translateX(50%) rotate(-45deg);
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    }

                    .team-member-dropdown.show::before {
                        display: block;
                    }
                `

            }
            </style>
        </div>
    }
}

export default connect(state => state)(TeamMemberDropdown);