import React from "react";
import {connect} from "react-redux";
import {fetchUsers} from "~/store/actions/users";
import ProgressLineChart from "../../utils/progress/ProgressLineChart";
import {getProgressPoints} from "../../../services/Goal/GoalProgressService";

class ProgressChartContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            accumulated: props.accumulated !== undefined ? props.accumulated : true
        }
    }

    switchCommulative = (val) => {
        this.setState({
            ...this.state,
            accumulated: val
        })
    };

    render() {
        const maxProgress = this.props.selectedGoal.maximum_progress ? parseFloat(this.props.selectedGoal.maximum_progress) : null;
        return (
            <div className="flex flex-col w-full mt-4 pt-4">
                {this.props.selectedGoal.progress && this.props.selectedGoal.progress.length > 0 ?
                    (
                        <div className="w-full">
                            <div className="flex -mx-2 w-full pl-16">
                                <a className={"progress-chart-switch mx-2 " + (!this.state.accumulated ? ' is-active' : '')}
                                   onClick={() => {
                                       this.switchCommulative(false)
                                   }}>Noncommulative</a>
                                <a className={"progress-chart-switch mx-2 " + (this.state.accumulated ? ' is-active' : '')}
                                   onClick={() => {
                                       this.switchCommulative(true)
                                   }}>Commulative</a>
                            </div>
                            <ProgressLineChart {...this.props} maxProgress={maxProgress} accumulated={this.state.accumulated}
                                               progress={getProgressPoints(this.props.selectedGoal)}/>
                        </div>
                    ) :
                    (<div className="w-full h-64">
                        <p className="text-center pt-16">No progress yet</p>
                    </div>)}


                {/*language=CSS*/
                }
                <style jsx global>{`
                    .progress-chart-switch {
                        color: #E4E4E4;
                        font-weight: bold;
                    }

                    .progress-chart-switch.is-active {
                        color: #5A5A5A;
                    }
                `}</style>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {selectedGoal} = state.goals;

    return {
        selectedGoal: selectedGoal
    };
}

export default connect(mapStateToProps)(ProgressChartContainer);
