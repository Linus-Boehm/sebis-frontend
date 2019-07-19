import "../../assets/css/bulma.scss";
import "../../assets/css/tailwind.css";
import Link from "next/link";
import {connect} from "react-redux";
import React from "react";
import Icon from "@mdi/react";
import {mdiEmoticonSadOutline} from "@mdi/js";
import Router from "next/router";
import * as actions from "../../store/actions/auth";
import {fetchTeams} from "../../store/actions/teams";
import ActiveLink from "./ActiveLink";
import {filter, findIndex} from "lodash";

class MenuSidebar extends React.Component {
    render() {
        let teams = filter(this.props.teams.teamList, team => {
            return (
                findIndex(team.team_roles, role => {
                    return role.user_id === this.props.auth.user._id;
                }) >= 0
            );
        });

        let teamItems =
            teams.length > 0 ? (
                teams.map(team => (
                    <ActiveLink key={team._id} href={"/app/teams?id=" + team._id}>
                        <a key={team.id}>{team.name}</a>
                    </ActiveLink>
                ))
            ) : (
                <li>
                    <div className="flex">
                        <Icon size="1em" path={mdiEmoticonSadOutline}/>
                        <span className="pl-2">No teams yet</span>
                    </div>
                </li>
            );


        return (
            <div
                className={"sidemenu column is-2 is-narrow-touch is-fullheight border-r-2 border-gray-200 " + (this.props.sideBarToggeled ? "is-active" : "")}>
                <div className="section flex flex-col overflow-y-scroll">
                    <div>
                        <p className="menu-label">Goals</p>
                        <ul className="menu-list">
                            <li>
                                <ActiveLink href={"/app/dashboard"}>
                                    <a>My Goals</a>
                                </ActiveLink>
                            </li>
                            <li>
                                <ActiveLink href={"/app/agreements"}>
                                    <a>My Agreements</a>
                                </ActiveLink>
                            </li>
                            <li>
                                <ActiveLink href={"/app/company-goals"}>
                                    <a>Company Goals</a>
                                </ActiveLink>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16">
                        <p className="menu-label">My Teams</p>
                        <ul className="menu-list">{teamItems}</ul>
                    </div>
                    {this.props.auth.user &&
                    this.props.auth.user.role === "organization_admin" && (
                        <div className="mt-16">
                            <p className="menu-label">Administration</p>
                            <ul className="menu-list">
                                <ActiveLink href={"/admin/teams"}>
                                    <a>All Teams</a>
                                </ActiveLink>
                                <ActiveLink href={"/admin/users"}>
                                    <a>All Users</a>
                                </ActiveLink>
                            </ul>
                        </div>
                    )}
                </div>
                {/*language=CSS*/
                }
                <style jsx global>{`
                    .sidemenu {
                        min-height: 100%;
                        height: 100%;
                        background: white;
                        position: static;

                    }

                    @media screen and (max-width: 1023px) {
                        .sidemenu {
                            position: absolute;
                            z-index: 100;
                            left: -300px;
                            display: none;
                        }

                        .sidemenu.is-active {
                            position: absolute;
                            display: block;
                            animation-duration: .5s;
                            animation-name: slidein;
                            animation-fill-mode: forwards;
                        }
                    }

                    @keyframes slidein {
                        from {
                            left: -300px;
                        }
                        to {
                            left: 0;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default connect(state => state)(MenuSidebar);
