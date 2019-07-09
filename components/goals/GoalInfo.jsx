import React from "react";
import CommentBox from "../layout/Comment/CommentBox";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import TextareaAutosize from "react-autosize-textarea";
import GoalItem from "./list/GoalItem";
import GoalAvatar from "../utils/user/GoalAvatar";
import SubGoalList from "./list/SubGoalList";
import * as CommentActions from "../../store/actions/comments";
import * as GoalActions from "../../store/actions/goals";

class GoalInfo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.onUpdateGoal();
  };

  handleDelete = e => {
    e.preventDefault();

    this.props.onDeleteGoal();
  };

  onSelectGoal = id => {
    this.props.dispatch(CommentActions.fetchComments(id));
    return this.props.dispatch(GoalActions.assignSelectedGoal(this.props.allGoals[id]));
  };

  onChange = e => {
    const changes = { [e.target.name]: e.target.value };
    this.props.onChangeInput(changes);
  };

  render() {
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description } = selectedGoal;

    return (
      <div className="w-full h-full goal-info">
        <div className="goal-detail-header flex">
          <div className="people justify-start flex-1">
            <GoalAvatar className="m-1" selectedGoal={selectedGoal} />
          </div>

          <div className="justify-end actions">
            <button className="button is-danger ml-2" title={"Delete Goal"} onClick={this.handleDelete}>
              <FaTrashAlt />
            </button>

            <button
              className="ml-3 text-gray-600 is-size-12 cursor-pointer p-2"
              onClick={onClose}
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <div className="field">
            <p className="control">
              <input
                disabled={editModeEnabled}
                className="input goal-title editable-input-and-show-value"
                type="text"
                name="title"
                placeholder="Enter a title"
                value={title ? title : ""}
                onBlur={this.handleSubmit}
                onChange={this.onChange}
              />
            </p>
          </div>
        </div>
        <div className="pt-2">
          <TextareaAutosize
            disabled={editModeEnabled}
            rows={3}
            className="input editable-input-and-show-value"
            name="description"
            placeholder="Add description..."
            onBlur={this.handleSubmit}
            onChange={this.onChange}
            value={description ? description : ""} />

        </div>

        <SubGoalList
          parentGoal={selectedGoal}
          {...this.props}/>

        {selectedGoal.related_to != null &&
          <div>
            <h3 className="goal-info-subheader">Linked to</h3>

          </div>
        }

        {selectedGoal.parent_goal &&
            <div>
              <h3 className="goal-info-subheader">Contributing to</h3>
              <GoalItem goal={this.props.allGoals[selectedGoal.parent_goal]} onSelect={this.onSelectGoal} />
            </div>
        }

        <h3 className="goal-info-subheader">Progress</h3>

        <CommentBox relatedTo={selectedGoal._id} />
      </div>
    );
  }
}

export default GoalInfo;
