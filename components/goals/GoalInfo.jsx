import React from "react";
import CommentBox from "../layout/Comment/CommentBox";
import { FaTrashAlt, FaUsers, FaBuilding, FaTimes } from "react-icons/fa";
import UserAvatar from "../utils/user/UserAvatar";
import TextareaAutosize from "react-autosize-textarea";

class GoalInfo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.onUpdateGoal();
  };

  handleDelete = e => {
    e.preventDefault();

    this.props.onDeleteGoal();
  };

  onChange = e => {
    const changes = { [e.target.name]: e.target.value };
    this.props.onChangeInput(changes);
  };

  render() {
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description, assignee } = selectedGoal;

    return (
      <div className="w-full h-full goal-info">
        <div className="goal-detail-header flex">
          <div className="people justify-start flex-1">
            {
              assignee ?
                <UserAvatar className="m-1" user={assignee} />
                :
                ( selectedGoal.related_model === "Organization" ?
                  <UserAvatar className="m-1"><FaBuilding/></UserAvatar> :
                  <UserAvatar className="m-1"><FaUsers/></UserAvatar>
                )
            }
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

        <h3 className="goal-info-subheader">Subgoals</h3>

        <h3 className="goal-info-subheader">Linked to</h3>

        <h3 className="goal-info-subheader">Contributing to</h3>

        <h3 className="goal-info-subheader">Progress</h3>

        <CommentBox relatedTo={selectedGoal._id} />
        <div className="p-3">
          <span>{JSON.stringify(selectedGoal)}</span>
        </div>
      </div>
    );
  }
}

export default GoalInfo;
