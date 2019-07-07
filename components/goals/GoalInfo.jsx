import React from "react";
import CommentBox from "../layout/Comment/CommentBox";

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
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description } = selectedGoal;

    return (
      <div className="w-full h-full">
          {this.state.editEnabled ?
              <div>
                  <button className="button" onClick={this.handleSubmit}>
                      Save
                  </button>
                  <button className="button is-danger ml-2" onClick={this.handleDelete}>
                      Delete
                  </button>
              </div> :
            <div>
              <button className="button" onClick={this.handleEditGoal}>
                Edit
              </button>
              <button className="button is-danger ml-2" onClick={this.handleDelete}>
                Delete
              </button>
            </div>
          }
        <div className="flex justify-end">
          <span
            className="text-blue-400 is-size-6 cursor-pointer"
            onClick={onClose}
          >
            Close
          </span>
        </div>
        <div className="pt-2">
          <div className="field">
            <p className="control">
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
                  : title
              }
            </p>
          </div>
        </div>
        <div className="pt-2">
          {description ? (
            <span className="is-size-6 is-bold">{description}</span>
          ) : (
            <span className="is-size-6 is-bold text-gray-500">
              Add description...
            </span>
          )}
        </div>

        <CommentBox />
        <div className="p-3">
          <span>{JSON.stringify(selectedGoal)}</span>
        </div>
      </div>
    );
  }
}

export default GoalInfo;
