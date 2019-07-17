import React from 'react';
import {connect} from 'react-redux';
import * as GoalActions from '../../../store/actions/goals';
import {pick} from "lodash";
import ProgressInfo from "./ProgressInfo";
import ProgressChartContainer from "./ProgressChartContainer";
import { keyBy, map } from 'lodash';

class ProgressInfoContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedProgressIndex: -1
        }
    }
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

    onSaveProgress = async() => {
        const {
          selectedGoalProgress,
          selectedGoal
        } = this.props;

        let progress = keyBy({
            ...selectedGoal.progress
        }, '_id');

        progress[selectedGoalProgress._id] = selectedGoalProgress;

        const goal = {
            ...selectedGoal,
            ...{
                progress: Object.values(progress)
            }
        };

        await this.props.dispatch(GoalActions.updateGoal(goal))
        await this.props.dispatch(GoalActions.assignSelectedGoal(goal))
    };

    addNewProgress = async() => {
        await this.props.dispatch(GoalActions.assignSelectedProgress({

        }))
    };

    onUpdateGoal = async () => {
        const {selectedGoal} = this.props;

        await this.props.dispatch(GoalActions.updateGoal(selectedGoal))

        const goal = Object.values(pick(this.props.allGoals, selectedGoal._id))[0];
        await this.props.dispatch(GoalActions.assignSelectedGoal(goal))
    };

    onSelectProgress = async (e, data) => {
        const {progress, index} = data;
        this.setState({
            ...this.state,
            selectedProgressIndex: index
        })
        await this.onChangeProgressInput(progress);
    };

    render() {
        return (
            <div className="flex flex-col">
                <ProgressInfo
                    onUpdateGoal={this.onUpdateGoal}
                    onChangeInput={this.onChangeInput}
                    onChangeProgressInput={this.onChangeProgressInput}
                    onSaveProgress={this.onSaveProgress}
                    addNewProgress={this.addNewProgress}
                    selectedProgressIndex={this.state.selectedProgressIndex}
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
