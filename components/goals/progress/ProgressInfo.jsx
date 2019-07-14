import React from "react";

class ProgressInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }

  onChangeAndSave = async (changes) => {
    await this.onChange(changes);
    await this.props.onUpdateGoal()
  };

  onChange = async (changes) => {
    await this.props.onChangeInput(changes);
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const { selectedGoal, onClose, editModeEnabled } = this.props;

    const { title, description } = selectedGoal;

    return (
      <div>
        <h2 className="has-text-grey-darker">
          {selectedGoal.title}
        </h2>

        <p className={"whitespace-pre-line"}>{selectedGoal.description}</p>
      </div>
    );
  }
}

export default ProgressInfo;
