import React from "react";
import {CartesianGrid, ReferenceLine, Line, LineChart, XAxis, YAxis} from "recharts";
import {take, map} from "lodash";
import moment from "moment";
import EditButton from "../buttons/EditButton";


class ProgressChartPopOver extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {

        const cClass = 'goal-progress-chart-popover absolute'
            + ' '
            + (this.props.className ? this.props.className : '')
            + (this.props.activeindex < 0 ? ' hidden' : '')
        let progress = this.props.activeindex < 0 ? {} : this.props.progress[this.props.activeindex]
        return (
            <div {...this.props} className={cClass}>
                <div className={"progress-chart-popover-inner bg-white p-4 rounded-lg shadow-md z-50 relative"}>
                    <div className="flex flex-col">
                        <div className="flex">
                            <a onClick={this.props.onClose} className="delete ml-auto"></a>
                        </div>
                        <span>Date: {moment(progress.date).format("DD.M.YY")}</span>
                        <span>Value: {progress.value}</span>
                        <EditButton><span className="pl-1">Edit</span></EditButton>
                    </div>
                </div>

                {/*language=CSS*/
                }
                <style jsx global>{`
                    .goal-progress-chart-popover {
                        transform: translateX(-50%) translateY(10px);
                    }

                    .goal-progress-chart-popover::before {
                        position: absolute;
                        z-index: 5;
                        content: "";
                        top: 0%;
                        right: 50%;
                        background-color: #fff;
                        width: 15px;
                        height: 15px;

                        -webkit-transform: translateY(-50%) translateX(50%) rotate(-45deg);
                        transform: translateY(-50%) translateX(50%) rotate(-45deg);
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    }

                `}</style>
            </div>


        )

    }

}

export default ProgressChartPopOver;
