import React from "react";
import { FaUsers, FaBuilding, FaFileContract } from "react-icons/fa";
import UserAvatar from "./UserAvatar";

class GoalAvatar extends React.Component {


  render() {
    const selectedGoal = this.props.selectedGoal;
    const size = this.props.size ? this.props.size : 45;
    //const colors = ['#D6197F','#D6197F']

    return selectedGoal.assignee ?
          <UserAvatar size={size} className={this.props.className} user={selectedGoal.assignee} />
          :
          ( selectedGoal.related_model === "Organization" ?
              /* Organization */
              <UserAvatar size={size} className={this.props.className}><FaBuilding/></UserAvatar> :
            (
              selectedGoal.related_model === "ObjectiveAgreement" ?
                /* Objective Agreement */
                <UserAvatar size={size} className={this.props.className}><FaFileContract/></UserAvatar> :
                /* Team */
                <UserAvatar size={size} className={this.props.className}><FaUsers/></UserAvatar>
            )
          )
  }

}

export default GoalAvatar;
