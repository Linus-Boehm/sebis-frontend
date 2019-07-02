import React from 'react';

class GoalInfo extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onUpdateGoal()
  };

  onChange = (e) => {
    const changes = { [ e.target.name ]: e.target.value };
    this.props.onChangeInput(changes);
  };

  render() {
    const {
      selectedGoal,
      onClose
    } = this.props;

    const {
      title,
      description
    } = selectedGoal;

    return (
      <div className="w-full h-full">
        <div>
          <button className="button" onClick={this.handleSubmit}>
            Save
          </button>
        </div>
        <div className="flex justify-end">
          <span className="text-blue-400 is-size-6 cursor-pointer" onClick={onClose}>Close</span>
        </div>
        <div className="pt-2">
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.onChange}
              />
            </p>
          </div>
        </div>
        <div className="pt-2">
          {description ?
            (<span className="is-size-6 is-bold">{description}</span>) :
            (<span className="is-size-6 is-bold text-gray-500">Add description...</span>)
          }
        </div>
        <div className="p-3">
          <span>{JSON.stringify(selectedGoal)}</span>
        </div>
      </div>
    )
  }
}

export default GoalInfo