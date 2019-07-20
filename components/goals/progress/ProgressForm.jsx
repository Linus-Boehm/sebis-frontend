import * as React from "react";
import DatePicker from "react-datepicker";
import {GOAL_QUALITATIVE_ICONS, GOAL_QUALITATIVE_ICONS_CLASS_NAMES, GOAL_TYPE} from "../../../store/types/goal";
import BaseButton from "../../utils/buttons/BaseButton";
import TextareaAutosize from "react-autosize-textarea";
import AddButton from "../../utils/buttons/AddButton";

class ProgressForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = async changes => {
        await this.props.onChangeProgress(changes);
    };


    selectEmoji = async (key) => {
        if (!this.isLocked()) {
            await this.onChange({
                value: key
            })
        }
    };

    isLocked() {
        const {progress} = this.props;
        return progress.is_reviewed === true || progress.is_reviewed === "true";
    }

    render() {
        const {
            progress,
            selectedGoal
        } = this.props;

        const icon_arr = Object.keys(GOAL_QUALITATIVE_ICONS).map(key => ({key, value: GOAL_QUALITATIVE_ICONS[key]}));
        const canSubmit = progress.value !== undefined;
        const isLocked = this.isLocked();

        const classNames = require('classnames');

        return <div
            className={"progress-form flex flex-wrap h-full border-t border-b border-dashed border-gray-300 mt-4 pt-8 pb-8  mb-4"}>
            <div className={"flex-1 control "}>
                <h4 className={"field-info"}><label htmlFor="progress-form-date-picker">Date</label></h4>
                <DatePicker
                    disabled={isLocked}
                    className={"input"}
                    id={"progress-form-date-picker"}
                    selected={new Date(progress.date)}
                    onChange={(date) =>
                        this.onChange({"date": date.toDateString()})
                    }
                />
            </div>

            <div className={"flex-1 ml-2"}>
                <label><h4 className={"field-info"}>Progress</h4>
                    {selectedGoal.progress_type === GOAL_TYPE.COUNT &&
                    <input disabled={isLocked} className="input" name="value" type="number" placeholder="0"
                           value={progress.value} onChange={e =>
                        this.onChange({[e.target.name]: e.target.value})
                    }/>
                    }

                    {selectedGoal.progress_type === GOAL_TYPE.BOOLEAN &&
                    <select disabled={isLocked} name={"value"} value={progress.value} onChange={e =>
                        this.onChange({[e.target.name]: e.target.value})
                    }>
                        <option value={1}>Reached</option>
                        <option value={0}>Not reached, yet</option>
                    </select>
                    }

                    {selectedGoal.progress_type === GOAL_TYPE.QUALITATIVE &&
                    <div className={"emoji-selector " + (isLocked ? "locked" : "")}>
                        {
                            icon_arr.map((element) => {
                                return React.createElement(
                                    element.value,
                                    {
                                        className: classNames(GOAL_QUALITATIVE_ICONS_CLASS_NAMES[element.key], element.key === progress.value ? "emoji active" : "emoji disabled", 'cursor-pointer'),
                                        onClick: this.selectEmoji.bind(this, element.key)
                                    },
                                    []
                                )
                            })
                        }
                    </div>
                    }
                </label>
            </div>

            <div className={"flex-1 ml-2"}>
                <label><h4 className={"field-info"}>Status</h4>
                    <div className="select">
                        <select name={"is_reviewed"} disabled={!this.props.canChangedReviewed} value={progress.is_reviewed} onChange={e =>
                            this.onChange({[e.target.name]: e.target.value})
                        }>
                            <option value={true}>Reviewed</option>
                            <option value={false}>Unreviewed</option>
                        </select>
                    </div>
                </label>
            </div>

            <div className={"ml-auto mt-8 flex-0  ml-2"}>


                {this.props.selectedProgressIndex > 0 ? (
                    <div className="flex -mx-1">
                        <BaseButton className="mx-1" onClick={this.props.onResetProgress}
                                    type="is-warning">Cancel</BaseButton>
                        <BaseButton className="mx-1" disabled={!canSubmit}
                                    onClick={this.props.onUpdateProgress}>Save</BaseButton>
                    </div>
                ) : (
                    <div className="flex -mx-1">
                        <BaseButton className="mx-1" type="is-light"
                                    onClick={this.props.onResetProgress}>Reset</BaseButton>
                        <AddButton disabled={!canSubmit} onClick={this.props.onUpdateProgress} className={"mx-1"}>Add
                            Progress</AddButton>
                    </div>
                )}

            </div>

        </div>
    }
}

export default ProgressForm
