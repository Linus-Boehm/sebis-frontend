import React from "react";
import {CartesianGrid, ResponsiveContainer, ReferenceLine, Line, LineChart, XAxis, YAxis} from "recharts";
import {take, map} from "lodash";
import moment from "moment";
import ProgressChartPopOver from "./ProgressChartPopOver";
import ChartDot from "./ChartDot";


class ProgressLineChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPopoverIndex: -1,
            cx: 0,
            cy: 0,
            showPopover: false
        };
    }

    calculateProgress() {
        //TODO switch duration between
        const progress = this.props.progress ? this.props.progress : [];

        const maxPoints = this.props.maxPoints ? this.props.maxPoints : 8;
        return take(progress, maxPoints)


    }

    mapProgressToChartData(progress) {
        const cumulated = !!this.props.cumulated;
        let lastVal = 0;
        return map(progress, (point) => {
            let temp = parseFloat(point.value) + lastVal;
            if (cumulated) {
                lastVal = temp;
            }
            return {name: moment(point.date).format("DD.M.YY"), v: temp, vState: point.is_reviewed}
        })
    }

    closePopover = () => {
        this.setState({
            ...this.state,
            showPopover: false,
        })
    }
    handleClick = (e, data, progress) => {
        let {cx, cy, index} = data
        if (this.props.onSelect) {
            this.props.onSelect(e, progress[index])
        }
        this.setState({
            ...this.state,
            showPopover: true,
            currentPopoverIndex: index,
            cx,
            cy
        });
    }

    render() {

        const cClass = 'goal-progress-chart relative w-full'
            + ' '
            + (this.props.className ? this.props.className : '')
        let progress = this.calculateProgress()
        return (
            <div className={cClass}>
                <ResponsiveContainer>
                    <LineChart data={this.mapProgressToChartData(progress)}
                               margin={{top: 5, right: 30, left: 20, bottom: 5,}}>

                        <CartesianGrid strokeDasharray="3 3"/>


                        <XAxis dataKey="name"/>
                        <YAxis/>
                        {!!this.props.cumulated && this.props.maxProgress && (
                            <ReferenceLine y={this.props.maxProgress} label="Max" stroke="red" strokeDasharray="3 3"/>)}
                        <Line type="monotone" dataKey="v" stroke="#3392FF" dot={<ChartDot onClick={(e, index) => {
                            this.handleClick(e, index, progress)
                        }} selectedIndex={this.state.currentPopoverIndex} progress={progress}/>}/>

                    </LineChart>
                </ResponsiveContainer>
                {this.state.showPopover && <ProgressChartPopOver style={{'top': this.state.cy, 'left': this.state.cx}}
                                                                 activeindex={this.state.currentPopoverIndex}
                                                                 progress={progress} onClose={this.closePopover}/>}

                {/*language=CSS*/
                }
                <style jsx global>{`
                    .goal-progress-chart{
                        min-height: 20rem;
                        height: 20rem;
                    }
                `}</style>
            </div>


        )

    }

}

export default ProgressLineChart;
