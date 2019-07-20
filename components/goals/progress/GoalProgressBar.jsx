
import React from "react";
import LoadingIcon from "mdi-react/LoadingIcon";

class GoalProgressBar extends React.Component {
    render() {
        const progress = this.props.progress > 100 ? 100 : this.props.progress;
        return (
            <div className={"goal-progress-bar rounded-sm shadow-md has-background-grey-light relative overflow-hidden " + this.props.className}>
                <div className="has-background-primary h-full inline-block" style={{minWidth: progress+"%"}}>
                  <div className="inner-content content-center text-center text-white py-1 px-4">{this.props.value}</div>
                </div>
            </div>


        )

    }

}

export default GoalProgressBar;
