import React from 'react';
import {connect} from 'react-redux';
import * as GoalActions from '../../../store/actions/goals';
import * as CommentActions from '../../../store/actions/comments';
import {pick} from "lodash";
import ProgressInfo from "./ProgressInfo";
import ProgressChartContainer from "./ProgressChartContainer";
import { keyBy, map } from 'lodash';
import CommentBox from "../../utils/comment/CommentBox";

class ProgressInfoContainer extends React.Component {

    onChangeInput = (changes) => {
        const {selectedGoal} = this.props;

        this.props.dispatch(GoalActions.assignSelectedGoal({
            ...selectedGoal,
            ...changes
        }))
    };

    onChangeProgressInput = async (changes) => {
        const {selectedGoalProgress,selectedProgressIndex} = this.props;

        await this.props.dispatch(GoalActions.assignSelectedProgress({progress:{
            ...selectedGoalProgress,
            ...changes
        }, index: selectedProgressIndex}))
    };

    onResetProgress = async () =>{
        await this.props.dispatch(GoalActions.resetSelectedGoalProgress())
    }

    onUpdateProgress = async() => {
        //Add Progress to selectedGoal & Update goal
        let goalCopy = {...this.props.selectedGoal};
        const index = this.props.selectedProgressIndex;
        const progress = this.props.selectedGoalProgress;
        if(index>=0){
            //Update entry
            goalCopy.progress[index] =  progress
        }else{
            //Append new entry
            goalCopy.progress.push(progress)
        }
        await this.props.dispatch(GoalActions.updateGoal(goalCopy))
    };

    onUpdateGoal = async () => {
        const {selectedGoal} = this.props;

        await this.props.dispatch(GoalActions.updateGoal(selectedGoal))

        //const goal = Object.values(pick(this.props.allGoals, selectedGoal._id))[0];
        //await this.props.dispatch(GoalActions.assignSelectedGoal(goal))
    };

    onSelectProgress = async (e, data) => {
        await Promise.all([
            this.props.dispatch(GoalActions.assignSelectedProgress(data)),
            this.props.dispatch(CommentActions.fetchComments(data.progress._id)),
        ])

    };

    render() {
        return (
            <div className="flex flex-col">
                <ProgressInfo
                    onResetProgress={this.onResetProgress}
                    onUpdateGoal={this.onUpdateGoal}
                    onChangeInput={this.onChangeInput}
                    onChangeProgressInput={this.onChangeProgressInput}
                    onUpdateProgress={this.onUpdateProgress}
                    selectedProgressIndex={this.props.selectedProgressIndex}
                    {...this.props}
                />
                {this.props.selectedProgressIndex >= 0 && <CommentBox feedTitle="Progress Feed" relatedTo={this.props.selectedGoalProgress._id}/>}

                <ProgressChartContainer onSelect={this.onSelectProgress}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        selectedGoal,
        goals,
        selectedGoalProgress,
        selectedProgressIndex
    } = state.goals;

    const {
        agreements
    } = state.agreements;

    const {
        userList
    } = state.users;

    return {
        selectedProgressIndex,
        selectedGoal,
        selectedGoalProgress,
        agreements,
        userList,
        allGoals: goals
    };
}

export default connect(mapStateToProps)(ProgressInfoContainer);
