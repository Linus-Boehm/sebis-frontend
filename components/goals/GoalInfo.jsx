import React from "react";
import CommentBox from "../layout/Comment/CommentBox";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import TextareaAutosize from "react-autosize-textarea";
import ConfirmModal from "../utils/modal/ConfirmModal";
import GoalItem from "./list/GoalItem";
import GoalAvatar from "../utils/user/GoalAvatar";
import SubGoalList from "./list/SubGoalList";
import * as CommentActions from "../../store/actions/comments";
import * as GoalActions from "../../store/actions/goals";
import GoalProgressBar from "../utils/progress/GoalProgressBar";
import EditButton from "../utils/buttons/EditButton";
import ActiveLink from "../layout/ActiveLink";

class GoalInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false,
      isDeleteModalVisible: false
    };
  }

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
    return this.props.dispatch(GoalActions.assignSelectedGoal(this.props.allGoals[ id ]));
  };

  setDeleteModalVisibility = (isDeleteModalVisible = false) => {
    this.setState({ isDeleteModalVisible });
  }

  onChange = e => {
    const changes = { [ e.target.name ]: e.target.value };
    this.props.onChangeInput(changes);
  };

  render() {
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description } = selectedGoal;

    return (
      <div className="w-full h-full goal-info">
        <div className="content">
        <div className="goal-detail-header flex">
          <div className="people justify-start flex-1">
            <GoalAvatar className="m-1" selectedGoal={selectedGoal}/>
          </div>

          <div className="justify-end actions">
            <button className="button is-danger ml-2" title={"Delete Goal"} onClick={()=> {
              this.setDeleteModalVisibility(true)
            }}>
              <FaTrashAlt/>
            </button>
            <ConfirmModal
              title="Confirm Delete"
              active={this.state.isDeleteModalVisible}
              confirmButtonType="is-danger"
              confirmButtonText="Delete"
              onCloseModal={() => {
                this.setDeleteModalVisibility(false)
              }}
              onConfirm={this.handleDelete}
            >
              Are you sure?
            </ConfirmModal>

            <button
              className="ml-3 text-gray-600 is-size-12 cursor-pointer p-2"
              onClick={onClose}
            >
              <FaTimes size={24}/>
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
            value={description ? description : ""}/>
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
          <GoalItem goal={this.props.allGoals[ selectedGoal.parent_goal ]} onSelect={this.onSelectGoal}/>
        </div>
        }

        <h3 className="goal-info-subheader">Progress</h3>
        <div className="flex w-full justify-between px-1">

          <GoalProgressBar className="mt-0" value="4/5"/>
          <ActiveLink href={"/app/goals/progress?id="+selectedGoal._id}>
            <EditButton className="is-small"><span className="pl-1">Edit Progress</span></EditButton>
          </ActiveLink>
        </div>
        <CommentBox relatedTo={selectedGoal._id}/>
        {JSON.stringify(selectedGoal)}
        </div>
      </div>
    );
  }
}

export default GoalInfo;
