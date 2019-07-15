
import React from "react";
import LoadingIcon from "mdi-react/LoadingIcon";

class GoalProgressBar extends React.Component {
    render() {
        const progress = this.props.progress;
        const buttonClass = 'goal-progress-bar rounded-sm shadow-md has-background-grey-light relative overflow-hidden'
            + ' '
            + (this.props.className ? this.props.className : '')
        return (
            <div className={buttonClass} disabled={this.props.disabled || false} onClick={this.props.onClick}>
                <div className="has-background-primary h-full absolute" style={{width: progress+"%"}}>

                </div>
                <div className="inner-content absolute text-white ">{this.props.value}</div>

                {/*language=CSS*/
                }
                <style jsx global>{`
                    .goal-progress-bar{
                        width: 140px;
                        height: 23px;
                    }
                    .inner-content{
                     left: 50%;
                     transform: translateX(-50%);
                    }
                `}</style>
            </div>


        )

    }

}

export default GoalProgressBar;
