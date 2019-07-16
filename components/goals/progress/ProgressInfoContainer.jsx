import React from 'react';
import {connect} from 'react-redux';
import * as GoalActions from '../../../store/actions/goals';
import {pick} from "lodash";
import ProgressInfo from "./ProgressInfo";
import ProgressChartContainer from "./ProgressChartContainer";

class ProgressInfoContainer extends React.Component {

    onChangeInput = (changes) => {
        const {selectedGoal} = this.props;

        this.props.dispatch(GoalActions.assignSelectedGoal({
            ...selectedGoal,
            ...changes
        }))
    };

    onChangeProgressInput = async (changes) => {
        const {selectedGoalProgress} = this.props;

        await this.props.dispatch(GoalActions.assignSelectedProgress({
            ...selectedGoalProgress,
            ...changes
        }))
    };

    onUpdateGoal = async () => {
        const {selectedGoal} = this.props;

        await this.props.dispatch(GoalActions.updateGoal(selectedGoal))

        const goal = Object.values(pick(this.props.allGoals, selectedGoal._id))[0];
        await this.props.dispatch(GoalActions.assignSelectedGoal(goal))
    };
    onSelectProgress = async () => {

    }

    render() {
        return (
            <div className="flex flex-col">
                <ProgressInfo
                    onUpdateGoal={this.onUpdateGoal}
                    onChangeInput={this.onChangeInput}
                    onChangeProgressInput={this.onChangeProgressInput}

                    {...this.props}
                />
                <ProgressChartContainer onSelect={this.onSelectProgress}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        selectedGoal,
        goals,
        selectedGoalProgress
    } = state.goals;

    const {
        agreements
    } = state.agreements;

    const {
        userList
    } = state.users;

    return {
        selectedGoal,
        selectedGoalProgress,
        agreements,
        userList,
        allGoals: goals
    };
}

export default connect(mapStateToProps)(ProgressInfoContainer);
