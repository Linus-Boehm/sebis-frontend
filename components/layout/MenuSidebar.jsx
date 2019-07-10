import "../../assets/css/bulma.scss";
import "../../assets/css/tailwind.css";
import Link from "next/link";
import { connect } from "react-redux";
import React from "react";
import Icon from "@mdi/react";
import { mdiEmoticonSadOutline } from "@mdi/js";
import Router from "next/router";
import * as actions from "../../store/actions/auth";
import { fetchTeams } from "../../store/actions/teams";
import ActiveLink from "./ActiveLink";
import {filter, findIndex} from "lodash";

class MenuSidebar extends React.Component {
  render() {
    let teams = filter(this.props.teams.teamList, (team)=>{
      return findIndex(team.team_roles, (role)=>{return role.user_id === this.props.auth.user._id})>=0;
    });

    let teamItems =
      teams.length > 0 ? (
        teams.map(team => (
          <ActiveLink href={"/app/teams?id=" + team._id}>
              <a key={team.id}>{team.name}</a>
          </ActiveLink>
        ))
      ) : (
        <li>
          <div className="flex">
            <Icon size="1em" path={mdiEmoticonSadOutline} />
            <span className="pl-2">No teams yet</span>
          </div>
        </li>
      );

    console.log("TeamItems ", teamItems);

    return (
      <div className="column is-2 is-narrow-mobile is-fullheight is-hidden-mobile border-r-2 border-gray-200">
        <div className="section flex flex-col">
          <div>
            <p className="menu-label">Goals</p>
            <ul className="menu-list">
              <li>
                <ActiveLink href={"/app/dashboard"}>
                  <a>My Goals</a>
                </ActiveLink>
              </li>
              <li>
                <Link href={"/app/agreements"}>
                  <a>My Agreements</a>
                </Link>
              </li>
              <li>
                <Link>
                  <a>Company Goals</a>
                </Link>
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
      </div>
    );
  }
}

export default connect(state => state)(MenuSidebar);
