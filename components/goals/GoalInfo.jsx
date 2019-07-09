import React from "react";
import CommentBox from "../layout/Comment/CommentBox";
import { FaPencilAlt, FaTrashAlt, FaCheck, FaTimes } from 'react-icons/fa';
import UserAvatar from "../utils/user/UserAvatar";
import TextareaAutosize from "react-autosize-textarea";

class GoalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({editEnabled: false});

    this.props.onUpdateGoal();
  };

  handleDelete = e => {
    e.preventDefault();

    this.props.onDeleteGoal();
  };

  handleEditGoal = e => {
    e.preventDefault();

    this.setState({editEnabled: true});
  };

  onChange = e => {
    const changes = { [e.target.name]: e.target.value };
    this.props.onChangeInput(changes);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.editModeEnabled !== this.props.editModeEnabled) {
      this.setState({
        editEnabled: this.props.editModeEnabled === true
      })
    }
  }

  componentDidMount() {
    this.setState({
      editEnabled: this.props.editModeEnabled === true
    })
  }

  render() {
    const { selectedGoal, onClose } = this.props;

    const { title, description, assignee } = selectedGoal;

    return (
      <div className="w-full h-full">
        <div className="goal-detail-header flex">
          <div className="people justify-start flex-1">
            { assignee ? <UserAvatar user={assignee} /> : "" }
          </div>

          <div className="justify-end actions">
            {this.state.editEnabled ?
              <button className="button" title="Save goal" onClick={this.handleSubmit}>
                <FaCheck/>
              </button> :
              <button className="button" title={"Edit Goal"} onClick={this.handleEditGoal}>
                <FaPencilAlt />
              </button>
            }

            <button className="button is-danger ml-2" title={"Delete Goal"} onClick={this.handleDelete}>
              <FaTrashAlt />
            </button>

            <button
              className="pl-6 text-gray-600 is-size-12 cursor-pointer"
              onClick={onClose}
            >
              <FaTimes size={36} />
            </button>
          </div>
        </div>

        <div className="pt-6">
          <div className="field">
            <p className="control is-size-4">
              {
                this.state.editEnabled ?
                  <input
                    className="input"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChange}
                  />
                  : <h2>{title}</h2>
              }
            </p>
          </div>
        </div>
        <div className="pt-4 pb-4">
          {
            this.state.editEnabled ?
              <TextareaAutosize rows={3} className="input" name="description" placeholder="Add description..." onChange={this.onChange}>{description}</TextareaAutosize>
              :
              (
                description ?
                  <span className="is-size-10 is-bold whitespace-pre-line">{description}</span>
                 :
                  <span className="is-size-10 is-bold text-gray-500">Add description...</span>
              )
          }
        </div>

        <h3 className="is-size-5">Subgoals</h3>

        <h3 className="is-size-5">Linked to</h3>

        <h3 className="is-size-5">Contributing to</h3>

        <h3 className="is-size-5">Progress</h3>

        <CommentBox />
        <div className="p-3">
          <span>{JSON.stringify(selectedGoal)}</span>
        </div>
      </div>
    );
  }
}

export default GoalInfo;
