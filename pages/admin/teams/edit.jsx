import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import AccountMultipleIcon from "mdi-react/AccountMultipleIcon";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import TeamsForm from "../../../components/teams/TeamsForm";
import ButtonGroup from "../../../components/utils/buttons/ButtonGroup";
import TeamMemberDropdown from "../../../components/teams/TeamMemberDropdown";
import BaseButton from "../../../components/utils/buttons/BaseButton";
import {
  fetchTeamById,
  resetTeam,
  updateTeam
} from "../../../store/actions/teams";

class EditTeam extends React.Component {
  static async getInitialProps({ query }) {
    return { currentId: query.id };
  }

  async componentDidMount() {
    console.log("Init Teams");
    await this.props.dispatch(resetTeam());
    await this.props.dispatch(fetchTeamById(this.props.currentId));
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    try {
      await this.props.dispatch(
        updateTeam(this.props.currentId, this.props.teams.team)
      );
      //Notification.success("Team update successfull")
      Router.push("/admin/teams");
    } catch (e) {
      console.error(e);
      //Notification.error("Error on saving Team")
      //TODO add fancy notification
    }
  };

  render() {
    return (
      <DefaultLayout forceAuth={true}>
        <div className="container">
          <div className="content">
            <div className="flex">
              <h1>Edit Team</h1>
              <div>
                <TeamMemberDropdown teamId={this.props.teams.team._id}>
                  <BaseButton type="is-info">
                    <AccountMultipleIcon size="1em" />
                  </BaseButton>
                </TeamMemberDropdown>
              </div>
            </div>
            <form onSubmit={this.handleOnSubmit}>
              <TeamsForm />
              <ButtonGroup className="mt-8">
                <Link href={"/admin/teams"}>
                  <a className="button is-warning">Cancel</a>
                </Link>
                <button type="submit" className="button is-primary">
                  Save
                </button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

export default connect(state => state)(EditTeam);
